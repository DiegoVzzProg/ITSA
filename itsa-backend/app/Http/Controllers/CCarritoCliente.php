<?php

namespace App\Http\Controllers;

use App\Models\TCarritoCliente;
use App\Models\TProducto;
use Exception;
use Illuminate\Http\Request;

class CCarritoCliente extends Controller
{
    static function fn_l_carrito_cliente(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            if ($request->id_usuario > 0) {
                $carrito_cliente = TCarritoCliente::where('id_usuario', $request->id_usuario)->where('borrado', false)->get();
            } else {
                $carrito_cliente = [];
            }
            return CGeneral::CreateMessage('', 200, $carrito_cliente);
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
                'precio' => $producto->precio
            ]);

            return CGeneral::CreateMessage('', 200, null);
        }, $request);
    }

    static function fn_l_precio_carrito_cliente(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $precio = TCarritoCliente::where('id_usuario', $request->id_usuario)->where('borrado', false)->sum('precio');

            $montoImpuesto = ($precio * 16) / 100;

            $precio = $precio + $montoImpuesto;
            return CGeneral::CreateMessage('', 200, [
                "precio" => $precio,
                "impuesto" => $montoImpuesto
            ]);
        }, $request);
    }
}
