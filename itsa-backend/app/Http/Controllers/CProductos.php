<?php

namespace App\Http\Controllers;

use App\Models\TProducto;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CProductos extends Controller
{
    public static function fn_l_productos(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $producto = [];
            $id_producto = $request->input('id_producto');

            if ($id_producto > 0) {
                $producto = TProducto::find($id_producto);
            } else {
                $producto = TProducto::all();
            }
            return CGeneral::CreateMessage('', 200, $producto);
        }, $request);
    }

    public static function fn_descargar_archivo($id_producto)
    {
        $producto = TProducto::find($id_producto);

        if (!$producto) {
            return CGeneral::CreateMessage('Product not found', 599, null);
        }

        $filePath = $producto->archivo;
        return CGeneral::CreateMessage('File not found', 200, $filePath);


        if (!Storage::disk('local')->exists($filePath)) {
            return CGeneral::CreateMessage('File not found', 599, null);
        }

        $path = Storage::disk('local')->path($filePath);
        return response()->download($path);
    }
}
