<?php

namespace App\Http\Controllers;

use App\Models\TCarritoCliente;
use App\Models\TProducto;
use App\Models\TUsuarios;
use Exception;
use Illuminate\Http\Request;

class CCarritoCliente extends Controller
{
    static function fn_l_carrito_cliente(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {

            $user = $request->user();

            $carrito_cliente = TCarritoCliente::where('id_usuario', $user->id_usuario)->where('borrado', false);

            $tableCarritoCliente = $carrito_cliente->get();

            if (!$tableCarritoCliente) {
                return CGeneral::CreateMessage('Cart empty', 599, null);
            }

            $precio = $carrito_cliente->sum('precio');

            $montoImpuesto = ($precio * 16) / 100;

            $precio = $precio + $montoImpuesto;

            return CGeneral::CreateMessage('', 200, [
                "carrito_cliente" => $carrito_cliente->get(),
                "precio" => $precio,
                "impuesto" => $montoImpuesto
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
                'foto_producto' => $producto->foto_miniatura
            ]);

            return CGeneral::CreateMessage('', 200, null);
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
                "message" => "Product deleted",
                "productos" => $productos
            ]);
        }, $request);
    }
}
