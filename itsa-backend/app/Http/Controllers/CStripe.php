<?php

namespace App\Http\Controllers;

use App\Models\TCarritoCliente;
use App\Models\TClientes;
use App\Models\TProducto;
use App\Models\TProductosCompradosCliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Stripe\Checkout\Session;
use Stripe\Stripe;
use Stripe\Webhook;

class CStripe extends Controller
{
    public static function fn_stripe(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {

            $ids = explode(';', $request->cadena);
            $ids = array_filter($ids);
            $ids = array_map('intval', $ids);

            $productos = TProducto::whereIntegerInRaw('id_producto', $ids)->get();

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

            $checkoutSession = Session::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => env('CHECKOUT_SUCCESS_URL') . '?session_id={CHECKOUT_SESSION_ID}',
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
            $webhookSecret = config('services.stripe.webhook_secret');

            $event = Webhook::constructEvent(
                $payload,
                $sigHeader,
                $webhookSecret
            );

            if ($event->type == 'checkout.session.completed') {
                $user = $request->user();

                TCarritoCliente::where('id_usuario', $user->id_usuario)
                    ->where('borrado', false)
                    ->update(['borrado' => true]);
            }
        }, $request);
    }
}
