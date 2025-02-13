<?php

namespace App\Http\Controllers;

use App\Models\TClientes;
use App\Models\TPaises;
use Illuminate\Http\Request;

class CClientes extends Controller
{
    public static function fn_l_clientes(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {

            $user = $request->user();

            if ($user->id_usuario > 0) {
                $cliente = TClientes::where('id_usuario', $user->id_usuario)->first();
            } else {
                $cliente = TClientes::all();
            }

            $paises = TPaises::where('activo', true)->where('id_pais', $cliente->id_pais)->first();

            $dt_cliente = [
                "nombre" => $cliente->nombre,
                "numero_de_iva_empresa" => $cliente->numero_de_iva_empresa,
                "direccion" => $cliente->direccion,
                "estado" => $cliente->estado,
                "codigo_postal" => $cliente->codigo_postal,
                "pais" => $paises->nombre
            ];

            return CGeneral::CreateMessage('', 200, $dt_cliente);
        }, $request);
    }

    public static function fn_a_clientes(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $cliente = TClientes::create([
                'id_usuario' => $request->input('id_usuario'),
                'nombre' => $request->input('nombre'),
                'telefono' => $request->input('telefono'),
                'direccion' => $request->input('direccion'),
                'estado' => $request->input('estado'),
                'id_pais' => $request->input('id_pais'),
                'codigo_postal' => $request->input('codigo_postal'),
            ]);

            return CGeneral::CreateMessage('', 200, $cliente);
        }, $request);
    }
}
