<?php

namespace App\Http\Controllers;

use App\Models\TErroresInternos;
use App\Models\TPaises;
use App\Models\TUsuarios;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Pusher\Pusher;

class CGeneral extends Controller
{
    public static function JsonToArray($json): mixed
    {
        return json_decode(json: json_encode(value: $json), associative: true);
    }

    public static function CreateMessage($message, $status, $data, $encrypt = true): JsonResponse
    {
        return response()->json(data: [
            'message' => $message,
            'data' => $encrypt ? base64_encode(json_encode($data)) : $data
        ], status: $status);
    }

    public static function CreateTicketError($error, $id_usuario)
    {
        try {
            $ticket = TErroresInternos::create([
                'id_ticket' => uniqid(),
                'codigo_error' => 599,
                'id_usuario' => $id_usuario,
                'detalle_error' => $error->getMessage(),
                'controlador' => $error->getFile(),
                'linea' => $error->getLine()
            ]);

            return CGeneral::CreateMessage('Internal server error ticket: ' . $ticket->id_ticket, 599, null, false);
        } catch (Exception $ex) {
            return CGeneral::CreateMessage("Contact support", 599, null, false);
        }
    }

    static function fn_l_paises(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () {
            $paises = TPaises::all();

            return CGeneral::CreateMessage('', 200, [
                "data_pais" => $paises
            ]);
        }, $request);
    }

    public static function generarSecretKey()
    {
        return self::CreateMessage("", 200, ['secretKey' => bin2hex(random_bytes(10))]);
    }

    public static function invokeFunctionAPI(callable $function, Request $request = null)
    {
        try {
            return $function();
        } catch (Exception $ex) {
            try {
                $user = null;
                if ($request) {
                    $user_meta_data_id_user = $request->input('metadata.user_id');
                    $user = $request->user();

                    if (!$request->user() && $user_meta_data_id_user) {
                        $user = TUsuarios::find($user_meta_data_id_user);
                    }
                }

                $usuario_defualt = $user == null ? 0 : $user->id_usuario;
                return self::CreateTicketError($ex, $usuario_defualt);
            } catch (Exception $ex) {
                Log::error($ex);
                return response()->json(data: [
                    'message' => "Contact support",
                    'data' => null
                ], status: 599);
            }
        }
    }

    private static function ConfigPusher()
    {
        $config = config('broadcasting.connections.pusher');
        return new Pusher(
            $config['key'],
            $config['secret'],
            $config['app_id'],
            [
                'cluster' => $config['options']['cluster'],
                'useTLS'  => $config['options']['useTLS'],
            ]
        );
    }

    public static function EventCartCustomer($carrito)
    {
        self::ConfigPusher()->trigger(
            'cart-channel',
            'cart.updated',
            [
                'carrito' => $carrito,
                'totales' => self::calcularTotal($carrito),
                'total_productos' => $carrito->count()
            ]
        );
    }

    public static function EventCheckProduct($existe)
    {
        self::ConfigPusher()->trigger(
            'check-product-channel',
            'check.product',
            [
                'producto_comprado' => $existe
            ]
        );
    }

    private static function calcularTotal($carritoItems)
    {
        $precioSinImpuesto = $carritoItems->sum('precio');
        $montoImpuesto = round(($precioSinImpuesto * 0.16), 2);
        return [
            'subtotal' => number_format($precioSinImpuesto, 2, '.', ','),
            'impuesto' => number_format($montoImpuesto, 2, '.', ','),
            'total' => number_format($precioSinImpuesto + $montoImpuesto, 2, '.', ',')
        ];
    }
}
