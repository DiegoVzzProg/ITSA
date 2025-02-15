<?php

namespace App\Http\Controllers;

use App\Models\TCarritoCliente;
use App\Models\TErroresInternos;
use App\Models\TProducto;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Stripe\Webhook;

class CStripe extends Controller
{
    public static function fn_stripe(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();
            $carritoQuery = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false);

            $productosCarrito = $carritoQuery->pluck('id_producto')->toArray();

            $productos = TProducto::whereIntegerInRaw('id_producto', $productosCarrito)->get();

            if ($productos->isEmpty()) {
                return CGeneral::CreateMessage('Products not found', 599, null);
            }

            Stripe::setApiKey(config('services.stripe.secret'));

            $lineItems = [];
            foreach ($productos as $producto) {
                $lineItems[] = [
                    'price_data' => [
                        "product_data" => [
                            "name" => $producto->titulo,
                            "description" => $producto->subtitulo,
                        ],
                        "currency" => "mxn",
                        "unit_amount" => $producto->precio * 100,
                    ],
                    'quantity' => 1,
                ];
            }

            $precioSinImpuesto = round($carritoQuery->sum('precio'), 2);
            $montoImpuesto = round($precioSinImpuesto * 0.16 * 100);

            $lineItems[] = [
                'price_data' => [
                    "product_data" => [
                        "name" => "IVA 16%",
                    ],
                    "currency" => "mxn",
                    "unit_amount" => $montoImpuesto,
                ],
                'quantity' => 1,
            ];


            $checkoutSession = Session::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'metadata' => [
                    'user_id' => $user->id_usuario,
                ],
                'success_url' => env('CHECKOUT_SUCCESS_URL'),
                'cancel_url'  => env('CHECKOUT_CANCEL_URL'),
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
            $webhookSecret = "whsec_cfAxIkUMPonkapWKhIl0BnDukKjZLNj6"; //cambiar config('services.stripe.webhook_secret');

            $event = Webhook::constructEvent(
                $payload,
                $sigHeader,
                $webhookSecret
            );

            if ($event->type == 'checkout.session.completed') {
                $session = $event->data->object;
                $userId = $session->metadata->user_id ?? null;

                if ($userId) {
                    TCarritoCliente::where('id_usuario', $userId)
                        ->where('borrado', false)
                        ->update(['borrado' => true]);
                } else {
                    TErroresInternos::create([
                        'id_ticket' => uniqid(),
                        'codigo_error' => 599,
                        'id_usuario' => 0,
                        'detalle_error' => "Webhook recibido sin user_id en metadata.",
                        'controlador' => __FILE__,
                        'linea' => __LINE__
                    ]);
                }
            }
        });
    }
}
