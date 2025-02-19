<?php

namespace App\Http\Controllers;

use App\Models\TClientes;
use App\Models\TPaises;
use Illuminate\Http\Request;

class CClientes extends Controller
{
    public static function ObtenerDatosCiente($id_usuario)
    {
        if ($id_usuario == null) {
            return null;
        }

        $cliente = TClientes::where('id_usuario', $id_usuario)->first();

        $paises = TPaises::where('activo', true)
            ->where('id_pais', $cliente->id_pais)->first();

        $dt_cliente = [
            "id_cliente" => $cliente->id_cliente,
            "nombre" => $cliente->nombre,
            "numero_de_iva_empresa" => $cliente->numero_de_iva_empresa,
            "direccion" => $cliente->direccion,
            "estado" => $cliente->estado,
            "codigo_postal" => $cliente->codigo_postal,
            "pais" => $paises->nombre,
            "id_pais" => $paises->id_pais,
            "telefono" => $cliente->telefono
        ];

        return $dt_cliente;
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

            $paises = TPaises::where('activo', true)
                ->where('id_pais', $cliente->id_pais)->first();

            $dt_cliente = [
                "id_cliente" => $cliente->id_cliente,
                "nombre" => $cliente->nombre,
                "numero_de_iva_empresa" => $cliente->numero_de_iva_empresa,
                "direccion" => $cliente->direccion,
                "estado" => $cliente->estado,
                "codigo_postal" => $cliente->codigo_postal,
                "pais" => $paises->nombre,
                "id_pais" => $paises->id_pais
            ];

            return CGeneral::CreateMessage('', 200, $dt_cliente);
        }, $request);
    }

    public static function fn_e_clientes(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            TClientes::where('id_cliente', $request->input('id_cliente'))
                ->update([
                    'nombre' => $request->input('nombre'),
                    'numero_de_iva_empresa' => $request->input('numero_de_iva_empresa'),
                    'direccion' => $request->input('direccion'),
                    'estado' => $request->input('estado'),
                    'id_pais' => $request->input('id_pais'),
                    'codigo_postal' => $request->input('codigo_postal'),
                    'telefono' => $request->input('telefono')
                ]);

            $cliente = TClientes::where('id_cliente', $request->input('id_cliente'))->first();

            $paises = TPaises::where('activo', true)
                ->where('id_pais', $cliente->id_pais)->first();

            $dt_cliente = [
                "id_cliente" => $cliente->id_cliente,
                "nombre" => $cliente->nombre,
                "numero_de_iva_empresa" => $cliente->numero_de_iva_empresa,
                "direccion" => $cliente->direccion,
                "estado" => $cliente->estado,
                "codigo_postal" => $cliente->codigo_postal,
                "pais" => $paises->nombre,
                "id_pais" => $paises->id_pais,
                "telefono" => $cliente->telefono
            ];

            return CGeneral::CreateMessage('', 200, $dt_cliente);
        }, $request);
    }
}
