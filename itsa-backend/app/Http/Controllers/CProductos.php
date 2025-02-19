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
            $cliente = TClientes::where('id_usuario', $user->id_usuario)->firstOrFail();

            $carrito = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false)
                ->select('id_producto')
                ->get();


            if ($carrito->isNotEmpty()) {

                $datosCompra = $carrito
                    ->map(
                        function ($item) use ($cliente) {
                            return [
                                'id_cliente' => $cliente->id_cliente,
                                'id_producto' => $item->id_producto,
                                'pago_confirmado' => true,
                                'descargado' => false,
                            ];
                        }
                    )->toArray();

                $id_usuario = $user->id_usuario;
                DB::transaction(function () use ($datosCompra, $id_usuario) {
                    TProductosCompradosCliente::insert($datosCompra);
                    TCarritoCliente::where('id_usuario', $id_usuario)->update(['borrado' => true]);
                });
            }

            return CGeneral::CreateMessage('', 200, [
                'redirectToDownload' => 'paymentcompleted'
            ]);
        }, $request);
    }

    public static function fn_get_downloads_productos($request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();

            $cliente = TClientes::where('id_usuario', $user->id_usuario)
                ->firstOrFail();

            $compras = TProductosCompradosCliente::where('id_cliente', $cliente->id_cliente)
                ->where('descargado', false)
                ->get();

            $producto = TProducto::whereIn('id_producto', $compras->pluck('id_producto'))->get();

            $descargas = collect();

            DB::transaction(function () use ($producto, &$descargas) {
                foreach ($producto as $compra) {
                    try {
                        $rutaArchivo = $compra->carpeta_recursos . '/' . $compra->archivo;

                        if (!Storage::disk('private')->exists($rutaArchivo)) {
                            throw new \Exception("File Not Found" . $compra->archivo);
                        }

                        // Para storage local usar URL firmada
                        $url = "prueba";

                        $descargas->push([
                            'url' => $url
                        ]);

                        $compra->update(['descargado' => true]);
                    } catch (\Exception $e) {
                        throw new \Exception($e->getMessage());
                    }
                }
            });

            return CGeneral::CreateMessage('', 200, [
                'urls' => $descargas
            ]);
        }, $request);
    }
}
