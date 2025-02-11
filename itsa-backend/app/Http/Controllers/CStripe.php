<?php

namespace App\Http\Controllers;

use App\Models\TProducto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Stripe\Checkout\Session;
use Stripe\Stripe;

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

            $user = $request->user();

            $checkoutSession = Session::create([
                'line_items' => $lineItems,
                'mode' => 'payment',
                'success_url' => env('CHECKOUT_SUCCESS_URL') . '?idu=' . Hash::make($user->id_usuario),
                'cancel_url'  => env('CHECKOUT_CANCEL_URL'),
            ]);

            return CGeneral::CreateMessage('', 200, [
                "redirectStripePayment" => $checkoutSession->url
            ]);
        }, $request);
    }
}
