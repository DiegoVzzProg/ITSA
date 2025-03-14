<?php

namespace App\Http\Controllers;

use App\Models\TCarritoCliente;
use App\Models\TClientes;
use App\Models\TErroresInternos;
use App\Models\TProducto;
use App\Models\TProductosCompradosCliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Pusher\Pusher;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Stripe\Webhook;

class CStripe extends Controller
{
    public static function fn_stripe(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
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
                'success_url' => config('services.stripe.checkout_success_url'),
                'cancel_url'  => config('services.stripe.checkout_cancel_url'),
            ]);

            return CGeneral::CreateMessage('', 200, [
                "redirectStripePayment" => $checkoutSession->url
            ]);
        }, $request);
    }

    public static function fn_stripe_success(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {

            $payload = $request->getContent();
            $sigHeader = $request->header('Stripe-Signature');
            $webhookSecret = config('services.stripe.webhook_secret');

            $event = Webhook::constructEvent(
                $payload,
                $sigHeader,
                $webhookSecret
            );

            if ($event->type == 'checkout.session.completed') {
                $session = $event->data->object;
                $userId = $session->metadata->user_id ?? null;
                if ($userId == null) {
                    throw new \Exception("No existe el usuario");
                }

                $carrito = TCarritoCliente::where('id_usuario', $userId)
                    ->where('borrado', false);

                $cliente = TClientes::where('id_usuario', $userId)->firstOrFail();

                if ($carrito->isNotEmpty()) {

                    $datosCompra = $carrito->select('id_producto')
                        ->get()
                        ->map(
                            function ($item) use ($cliente) {
                                return [
                                    'id_cliente' => $cliente->id_cliente,
                                    'id_producto' => $item->id_producto,
                                    'fecha' => date('Y-m-d'),
                                    'pago_confirmado' => true,
                                    'descargado' => false,
                                ];
                            }
                        )->toArray();

                    DB::transaction(function () use ($datosCompra, $carrito) {
                        TProductosCompradosCliente::insert($datosCompra);
                        $carrito->update(['borrado' => true]);
                        CGeneral::EventCartCustomer($carrito->get());
                    });
                }
            }
        });
    }
}
