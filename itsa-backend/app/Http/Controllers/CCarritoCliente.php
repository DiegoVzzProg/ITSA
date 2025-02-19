<?php

namespace App\Http\Controllers;

use App\Models\TCarritoCliente;
use App\Models\TProducto;
use App\Models\TUsuarios;
use Exception;
use Illuminate\Http\Request;

class CCarritoCliente extends Controller
{
    public static function fn_l_carrito_cliente(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();

            $carritoQuery = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false);

            $carritoItems = $carritoQuery->get();


            $precioFormateado = 0;
            $impuestoFormateado = 0;

            if (!$carritoItems->isEmpty()) {
                $precioSinImpuesto = $carritoQuery->sum('precio');
                $montoImpuesto = round(($precioSinImpuesto * 0.16), 2);
                $precioTotal = round($precioSinImpuesto + $montoImpuesto, 2);
                $precioFormateado = number_format($precioTotal, 2, '.', ',');
                $impuestoFormateado = number_format($montoImpuesto, 2, '.', ',');
            }

            return CGeneral::CreateMessage('', 200, [
                "carrito_cliente" => $carritoItems,
                "precio" => $precioFormateado,
                "impuesto" => $impuestoFormateado
            ]);
        }, $request);
    }

    static function fn_a_carrito_cliente(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $producto = TProducto::where('id_producto', $request->id_producto)->first();

            TCarritoCliente::create([
                'id_usuario' => $request->id_usuario,
                'id_producto' => $request->id_producto,
                'descripcion' => $request->descripcion,
                'fecha_creacion' => now(),
                'precio' => $producto->precio,
                'foto_producto' => $producto->carpeta_recursos . '/' . $producto->foto_miniatura
            ]);

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

            $producto = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('id_producto', base64_decode($request->id_producto))
                ->where('borrado', false)->first();

            if (!$producto) {
                return CGeneral::CreateMessage('Product not found or already deleted', 599, null);
            }

            $producto->update(['borrado' => true]);

            $productos = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false)->get();

            return CGeneral::CreateMessage('', 200, [
                "productos" => $productos
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
}
