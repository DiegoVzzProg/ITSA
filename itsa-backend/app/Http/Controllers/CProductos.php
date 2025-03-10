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

    public function downloadPrivateFile($fileName)
    {
        if (Storage::disk('private')->exists($fileName)) {
            $file = Storage::disk('private')->get($fileName);
            $mimeType = Storage::disk('private')->mimeType($fileName);

            return response($file, 200)
                ->header('Content-Type', $mimeType)
                ->header('Content-Disposition', 'attachment; filename="' . $fileName . '"');
        }

        return response()->json(['error' => 'File not found'], 404);
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
                                'created_at' => now(),
                                'updated_at' => now(),
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
    public static function fn_get_downloads_productos($id_usuario)
    {
        return CGeneral::invokeFunctionAPI(function () use ($id_usuario) {

            $cliente = TClientes::where('id_usuario', base64_decode($id_usuario))
                ->firstOrFail();

            $compras = TProductosCompradosCliente::with('producto')
                ->where('id_cliente', $cliente->id_cliente)
                ->where('descargado', false)
                ->get();

            $descargas = collect();
            $errores = collect();

            DB::transaction(function () use ($compras, &$descargas, &$errores) {
                foreach ($compras as $compra) {
                    try {
                        $rutaArchivo = $compra->producto->archivo;
                        if (!Storage::disk('private')->exists($rutaArchivo)) {
                            $errores->push("Archivo no encontrado: " . $rutaArchivo);
                            continue;
                        }

                        $url = route('private.download', ['fileName' => $rutaArchivo]);

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
        }, null);
    }
}
