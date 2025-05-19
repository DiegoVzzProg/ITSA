<?php

namespace App\Http\Controllers;

use App\Models\OpcionesUsuarioModel;
use App\Models\TUsuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public static function view()
    {
        $url_recursos = env('URL_RECURSOS');
        $registros = DB::table('t_usuarios')
            ->join('t_clientes', 't_clientes.id_usuario', '=', 't_usuarios.id_usuario')
            ->join('t_productos_comprados_cliente', 't_productos_comprados_cliente.id_cliente', '=', 't_clientes.id_cliente')
            ->join('t_productos', 't_productos.id_producto', '=', 't_productos_comprados_cliente.id_producto')
            ->join('t_paises', 't_paises.id_pais', '=', 't_clientes.id_pais')
            ->select([
                't_usuarios.nombre as usuario',
                't_usuarios.leyo_terms',
                't_clientes.nombre',
                't_clientes.numero_de_iva_empresa as rfc',
                't_clientes.direccion',
                't_clientes.estado',
                't_paises.nombre as pais',
                't_clientes.codigo_postal',
                't_clientes.telefono',
                't_productos.titulo as producto',
                't_productos.precio',
                't_productos.foto_miniatura as imagen'
            ])
            ->get();

        return view('pages.home.home', [
            "registros" => $registros,
            "url_recursos" => $url_recursos
        ]);
    }
}
