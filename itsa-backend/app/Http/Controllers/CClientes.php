<?php

namespace App\Http\Controllers;

use App\Models\TClientes;
use Illuminate\Http\Request;

class CClientes extends Controller
{
    public static function fn_l_clientes(Request $request)
    {
        try {
            $id_cliente = $request->input('id_cliente');
            if ($id_cliente > 0) {
                $cliente = TClientes::find($id_cliente)->first();
            } else {
                $cliente = TClientes::all();
            }
            return CGeneral::CreateMessage('', 200, 'success', $cliente);
        } catch (\Exception $e) {
            return CGeneral::CreateMessage('Internal server error', 599, 'error', null);
        }
    }

    public static function fn_a_clientes(Request $request)
    {
        try {

            $cliente = TClientes::create([
                'id_usuario' => $request->input('id_usuario'),
                'nombre' => $request->input('nombre'),
                'telefono' => $request->input('telefono'),
                'direccion' => $request->input('direccion'),
                'estado' => $request->input('estado'),
                'id_pais' => $request->input('id_pais'),
                'codigo_postal' => $request->input('codigo_postal'),
            ]);

            return CGeneral::CreateMessage('', 200, 'success', $cliente);
        } catch (\Exception $e) {
            return CGeneral::CreateMessage($e->getMessage(), 599, 'error', null);
        }
    }
}
