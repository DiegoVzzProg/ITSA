<?php

namespace App\Http\Controllers;

use App\Models\TClientes;
use Illuminate\Http\Request;

class CClientes extends Controller
{
    public static function fn_l_clientes(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $id_usuario = $request->input('id_usuario');
            if ($id_usuario > 0) {
                $cliente = TClientes::where('id_usuario', $id_usuario)->first();
            } else {
                $cliente = TClientes::all();
            }
            return CGeneral::CreateMessage('', 200, $cliente);
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
