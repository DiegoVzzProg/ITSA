<?php

namespace App\Http\Controllers;

use App\Events\CartUpdated;
use App\Models\TCarritoCliente;
use App\Models\TProducto;
use App\Models\TUsuarios;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Pusher\Pusher;

class CCarritoCliente extends Controller
{
    public static function fn_l_carrito_cliente(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();

            $carritoQuery = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false);

            $carritoItems = $carritoQuery->get();

            $totales = [
                'total' => 0,
                'impuesto' => 0
            ];
            if (!$carritoItems->isEmpty()) {
                $totales = self::calcularTotal($carritoItems);
            }


            $total_productos = $carritoQuery->count();

            $pusher = new Pusher(
                env('PUSHER_APP_KEY'),
                env('PUSHER_APP_SECRET'),
                env('PUSHER_APP_ID'),
                [
                    'cluster' => env('PUSHER_APP_CLUSTER'),
                    'useTLS' => true,
                ]
            );

            $pusher->trigger(
                'cart-channel',
                'cart.updated',
                [
                    'carrito' => $carritoItems,
                    'totales' => $totales,
                    'total_productos' => $carritoItems->count()
                ]
            );

            return CGeneral::CreateMessage('', 200, [
                "carrito_cliente" => $carritoItems,
                "total_productos" => $total_productos,
                "precio" => $totales['total'],
                "impuesto" => $totales['impuesto']
            ]);
        }, $request);
    }

    static function fn_a_carrito_cliente(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();
            $producto = TProducto::where('id_producto', $request->id_producto)->first();

            // Crear el item en el carrito
            TCarritoCliente::create([
                'id_usuario' => $user->id_usuario,
                'id_producto' => $request->id_producto,
                'descripcion' => $request->descripcion,
                'fecha_creacion' => now(),
                'precio' => $producto->precio,
                'foto_producto' => $producto->foto_miniatura
            ]);

            // Obtener el carrito actualizado
            $carritoActualizado = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false)
                ->get();

            $pusher = new Pusher(
                env('PUSHER_APP_KEY'),
                env('PUSHER_APP_SECRET'),
                env('PUSHER_APP_ID'),
                [
                    'cluster' => env('PUSHER_APP_CLUSTER'),
                    'useTLS' => true,
                ]
            );

            $pusher->trigger(
                'cart-channel',
                'cart.updated',
                [
                    'carrito' => $carritoActualizado,
                    'totales' => self::calcularTotal($carritoActualizado),
                    'total_productos' => $carritoActualizado->count()
                ]
            );

            return CGeneral::CreateMessage('', 200, $producto);
        }, $request);
    }

    public static function fn_existe_producto_carrito_cliente(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {

            $user = $request->user();
            $producto = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('id_producto', $request->id_producto)
                ->where('borrado', false)->first();


            return CGeneral::CreateMessage('', 200, [
                "existe" => $producto != null && strlen($producto) > 0
            ]);
        }, $request);
    }

    public static function fn_b_producto_carrito_cliente(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();

            // Eliminar el producto
            $producto = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('id_producto', $request->id_producto)
                ->where('borrado', false)->first();

            if (!$producto) {
                return CGeneral::CreateMessage('Product not found or already deleted', 599, null);
            }

            $producto->update(['borrado' => true]);

            $carritoActualizado = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false)->get();

            CGeneral::EventCartCustomer($carritoActualizado);

            return CGeneral::CreateMessage('', 200, [
                "productos" => $carritoActualizado
            ]);
        }, $request);
    }

    public static function fn_cantidad_carrito(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();

            $cantidad = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false)->count();

            return CGeneral::CreateMessage('', 200, [
                "cantidad" => $cantidad
            ]);
        }, $request);
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
