<?php

namespace App\Http\Controllers;

use App\Models\TProducto;
use Exception;
use Illuminate\Http\Request;

class CProductos extends Controller
{
    public static function fn_l_productos(Request $request)
    {
        try {
            $producto = [];
            $id_producto = $request->input('id_producto');

            if ($id_producto > 0) {
                $producto = TProducto::find($id_producto);
            } else {
                $producto = TProducto::all();
            }
            return CGeneral::CreateMessage('', 200, 'success', CGeneral::JsonToArray($producto));
        } catch (Exception $ex) {
            return CGeneral::CreateMessage($ex->getMessage(), 599, 'error', null);
        }
    }
}
