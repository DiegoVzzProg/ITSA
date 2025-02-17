<?php

namespace App\Http\Controllers;

use App\Models\TCarritoCliente;
use App\Models\TClientes;
use App\Models\TProducto;
use App\Models\TProductosCompradosCliente;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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

    // public static function fn_descargar_archivo($id_producto)
    // {
    //     $producto = TProducto::find($id_producto);

    //     if (!$producto) {
    //         return CGeneral::CreateMessage('Product not found', 599, null);
    //     }

    //     $filePath = $producto->archivo;
    //     return CGeneral::CreateMessage('File not found', 200, $filePath);


    //     if (!Storage::disk('local')->exists($filePath)) {
    //         return CGeneral::CreateMessage('File not found', 599, null);
    //     }

    //     $path = Storage::disk('local')->path($filePath);
    //     return response()->download($path);
    // }

    public static function fn_a_producto_para_descargar(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();

            $carrito = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false)
                ->select('id_producto')
                ->get();

            $cliente = TClientes::where('id_usuario', $user->id_usuario)->firstOrFail();

            if ($carrito->isNotEmpty()) {

                $datosCompra = $carrito
                    ->map(
                        function ($item) use ($cliente) {
                            return [
                                'id_cliente' => $cliente->id_cliente,
                                'id_producto' => $item->id_producto,
                                'fecha' => date('Y-m-d'),
                                'pago_confirmado' => true,
                                'descargado' => false,
                            ];
                        }
                    )->toArray();

                DB::transaction(function () use ($datosCompra, $carrito) {
                    TProductosCompradosCliente::insert($datosCompra);
                    $carrito->update(['borrado' => true]);
                });
            }

            return CGeneral::CreateMessage('', 200, [
                'redirectToDownload' => env('CHECKOUT_SUCCESS_URL')
            ]);
        }, $request);
    }

    // public static function fn_get_downloads_productos($request)
    // {
    //     return CGeneral::invokeFunctionAPI(function () use ($request) {
    //         $user = $request->user();

    //         $cliente = TClientes::where('id_usuario', $user->id_usuario)->firstOrFail();

    //         $compras = TProductosCompradosCliente::where('id_cliente', $cliente->id_cliente)
    //             ->where('descargado', false)
    //             ->with('producto')
    //             ->get();

    //         $descargas = $compras->map(function ($compra) {
    //             return [
    //                 'url' => Storage::disk('private')->temporaryUrl(
    //                     $compra->producto->ruta_archivo,
    //                     now()->addMinutes(30)
    //                 ),
    //                 'id_producto_comprado' => $compra->id_producto_comprado
    //             ];
    //         });

    //         DB::transaction(function () use ($descargas) {
    //             TProductosCompradosCliente::whereIn('id_producto_comprado', $descargas->pluck('id_producto_comprado'))
    //                 ->update(['descargado' => true]);
    //         });

    //         return CGeneral::CreateMessage('', 200, [
    //             'urls' => $descargas,
    //         ]);
    //     }, $request);
    // }
}
