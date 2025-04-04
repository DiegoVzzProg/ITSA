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

            $checkoutSession = Session::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'metadata' => [
                    'user_id' => $user->id_usuario,
                ],
                'success_url' => config('services.stripe.checkout_success_url') . '?session_id={CHECKOUT_SESSION_ID}&key=' . $guid,
                'cancel_url'  => config('services.stripe.checkout_cancel_url') . '?key=' . $guid,
            ]);

            return CGeneral::CreateMessage('', 200, [
                "redirectStripePayment" => $checkoutSession->url
            ]);
        }, $request);
    }

    public static function fn_stripe_success(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $event = Webhook::constructEvent(
                $request->getContent(),
                $request->header('Stripe-Signature'),
                config('services.stripe.webhook_secret')
            );

            if ($event->type !== 'checkout.session.completed') {
                return;
            }

            $session = $event->data->object;
            $userId = $session->metadata->user_id ?? null;

            if (!$userId) {
                throw new \Exception("Usuario no encontrado en metadata");
            }

            $cliente = TClientes::where('id_usuario', $userId)->firstOrFail();
            $carritos = TCarritoCliente::with('producto')
                ->where('id_usuario', $userId)
                ->where('borrado', false)
                ->get();

            if ($carritos->isEmpty()) {
                return;
            }

            $datosCompra = $carritos->map(fn($item) => [
                'id_cliente' => $cliente->id_cliente,
                'id_producto' => $item->id_producto,
                'pago_confirmado' => true,
                'descargado' => false,
            ])->toArray();

            DB::transaction(function () use ($carritos, $datosCompra) {
                TProductosCompradosCliente::insert($datosCompra);
                TCarritoCliente::whereIn('id_carrito_cliente', $carritos->pluck('id_carrito_cliente'))->update(['borrado' => true]);
            });

            $carritos = TCarritoCliente::with('producto')
                ->where('id_usuario', $userId)
                ->where('borrado', false)
                ->get();

            CGeneral::EventCartCustomer($carritos);
        }, $request);
    }
}
