<?php

namespace App\Http\Controllers;

use App\Models\TCarritoCliente;
use App\Models\TClientes;
use App\Models\TProductosCompradosCliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Stripe\Webhook;

class CStripe extends Controller
{
    public static function fn_stripe(Request $request, $guid)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request, $guid) {
            $user = $request->user();

            $carritoItems = TCarritoCliente::with('producto')
                ->where('id_usuario', $user->id_usuario)
                ->where('borrado', false)
                ->get();

            if ($carritoItems->isEmpty()) {
                return CGeneral::CreateMessage('Products not found', 599, null);
            }

            Stripe::setApiKey(config('services.stripe.secret'));

            $lineItems = [];
            $totalSinImpuesto = 0;

            foreach ($carritoItems as $item) {
                if (!$item->producto) {
                    continue;
                }
                $producto = $item->producto;

                $subtotal = round($producto->precio * 1, 2);
                $totalSinImpuesto += $subtotal;

                $lineItems[] = [
                    'price_data' => [
                        'product_data' => [
                            'name' => $producto->titulo,
                            'description' => $producto->subtitulo,
                        ],
                        'currency' => 'mxn',
                        'unit_amount' => (int) round($producto->precio * 100),
                    ],
                    'quantity' => 1,
                ];
            }

            $totalSinImpuesto = round($totalSinImpuesto, 2);
            $montoImpuesto = round($totalSinImpuesto * 0.16, 2);
            $montoImpuestoCents = (int) round($montoImpuesto * 100);

            $lineItems[] = [
                'price_data' => [
                    'product_data' => [
                        'name' => 'IVA 16%',
                    ],
                    'currency' => 'mxn',
                    'unit_amount' => $montoImpuestoCents,
                ],
                'quantity' => 1,
            ];

            $checkoutSession = [];

            $cliente = TClientes::where('id_usuario', $user->id_usuario)->firstOrFail();

            $checkoutSession = Session::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'metadata' => [
                    'user_id' => $user->id_usuario,
                ],
                'success_url' => config('services.stripe.checkout_success_url') . '?session={CHECKOUT_SESSION_ID}',
                'cancel_url'  => config('services.stripe.checkout_cancel_url') . '?session={CHECKOUT_SESSION_ID}',
            ]);

            DB::transaction(function () use (&$carritoItems, $cliente) {

                $datosCompra = $carritoItems->map(fn($item) => [
                    'id_cliente' => $cliente->id_cliente,
                    'id_producto' => $item->id_producto,
                    'en_proceso_de_pago' => true,
                    'pago_confirmado' => false,
                    'descargado' => false,
                    'created_at' => now(),
                    'updated_at' => now(),
                ])->toArray();

                TProductosCompradosCliente::insert($datosCompra);
            });

            return CGeneral::CreateMessage('', 200, [
                "redirectStripePayment" => $checkoutSession['url']
            ]);
        }, $request);
    }

    public static function fn_stripe_success(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            // Construir y verificar el evento de Stripe
            $payload = $request->getContent();
            $signature = $request->header('Stripe-Signature');
            $webhookSecret = config('services.stripe.webhook_secret');
            $event = Webhook::constructEvent($payload, $signature, $webhookSecret);

            if ($event->type !== 'checkout.session.completed') {
                throw new \Exception("Tipo de evento no válido: {$event->type}");
            }

            // Extraer el usuario del objeto de sesión
            $session = $event->data->object;
            $userId = $session->metadata->user_id ?? null;
            if (!$userId) {
                throw new \Exception("Usuario no encontrado en metadata");
            }

            // Iniciar la transacción
            DB::beginTransaction();
            try {
                // Buscar el cliente basado en el usuario
                $cliente = TClientes::where('id_usuario', $userId)->firstOrFail();

                // Construir la consulta de productos comprados en proceso de pago
                $productosQuery = TProductosCompradosCliente::where('id_cliente', $cliente->id_cliente)
                    ->where('en_proceso_de_pago', true)
                    ->update(['pago_confirmado' => true]);

                // Actualizar el carrito relacionado, marcándolo como borrado
                TCarritoCliente::where('id_usuario', $userId)
                    ->where('borrado', false)
                    ->update(['borrado' => true]);
                    
                if ($productosQuery === 0) {
                    throw new \Exception("No se encontraron registros para confirmar");
                }

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                throw new \Exception($e->getMessage(), $e->getCode());
            }

            // Notificar al sistema sobre el estado actualizado del carrito
            $activeCartItems = TCarritoCliente::with('producto')
                ->where('id_usuario', $userId)
                ->where('borrado', false)
                ->get();

            CGeneral::EventCartCustomer($activeCartItems);
        }, $request);
    }

    public function fn_validate_session_stripe(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $sessionId = $request->session;

            if (!$sessionId) {
                return CGeneral::CreateMessage('', 200, [
                    "valid" => false
                ]);
            }

            try {
                \Stripe\Stripe::setApiKey(config('services.stripe.secret'));
                $session = \Stripe\Checkout\Session::retrieve($sessionId);

                return CGeneral::CreateMessage('', 200, [
                    "valid" => $session->payment_status === 'paid' || $session->payment_status === 'unpaid'
                ]);
            } catch (\Stripe\Exception\InvalidRequestException $e) {
                return CGeneral::CreateMessage('', 200, [
                    "valid" => false
                ]);
            }
        }, $request);
    }
}
