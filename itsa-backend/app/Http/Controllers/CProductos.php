<?php

namespace App\Http\Controllers;

use App\Models\TCarritoCliente;
use App\Models\TClientes;
use App\Models\TProducto;
use App\Models\TProductosCompradosCliente;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use ZipStream\ZipStream;

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

    public function downloadPrivateFile(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $token = $request->query('token');

            if (!$token || !Cache::has("download_token_$token")) {
                throw new \Exception('Enlace inválido o expirado');
            }

            // 2. Obtener datos de la compra desde el token
            $cache = Cache::get("download_token_$token");

            $cliente = TClientes::where('id_usuario', Crypt::decrypt($cache['user_id']))->get()->first();

            $compra = TProductosCompradosCliente::with('producto')
                ->findOrFail(Crypt::decrypt($cache['id_producto_comprado']));

            // 5. Opcional: Validar permisos de usuario (si usas autenticación)
            if ($compra->id_cliente != $cliente->id_cliente) {
                throw new \Exception('No autorizado');
            }

            $compra->update(['descargado' => true]);

            if ($request->has('single')) {
                Cache::forget("download_token_$token");

                return Storage::disk('private')->download($compra->producto->archivo);
            } else {
                // Descarga múltiple (ZIP)
                $productos = Crypt::decrypt($cache['productos']);
                $zipName = 'productos_' . now()->format('YYYY-MM-DD_H-i-s') . '.zip';

                // Crear ZIP dinámico
                return response()->streamDownload(function () use ($productos) {
                    $zip = new ZipStream(outputName: 'productos.zip', sendHttpHeaders: false);

                    foreach ($productos as $producto) {
                        $contenido = Storage::disk('private')->get($producto['archivo']);
                        $zip->addFile(
                            fileName: $producto['archivo'],
                            data: $contenido
                        );
                    }

                    $zip->finish();
                }, $zipName, [
                    'Content-Type' => 'application/zip'
                ]);
            }

            // // 3. Eliminar token inmediatamente (una sola descarga)
            // Cache::forget("download_token_$token");

            // // 4. Validar existencia de archivo
            // $fileName = $compra->producto->archivo;

            // $cliente = TClientes::where('id_usuario', Crypt::decrypt($cache['user_id']))->get()->first();

            // // 5. Opcional: Validar permisos de usuario (si usas autenticación)
            // if ($compra->id_cliente != $cliente->id_cliente) {
            //     throw new \Exception('No autorizado');
            // }

            // // 6. Opcional: Marcar como descargado (si es necesario)
            // $compra->update(['descargado' => true]);

            // // 7. Descargar archivo (versión optimizada)
            // return Storage::disk('private')->download($fileName);
        }, $request);
    }

    public static function fn_a_producto_para_descargar(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();
            $cliente = TClientes::where('id_usuario', $user->id_usuario)->firstOrFail();

            $carrito = TCarritoCliente::where('id_usuario', $user->id_usuario)
                ->where('borrado', false);



            $datosCompra = $carrito
                ->select('id_producto')
                ->get();

            if ($datosCompra->isNotEmpty()) {
                $datosCompra = $datosCompra->map(
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

                CGeneral::EventCartCustomer($carrito->get());
            }

            return CGeneral::CreateMessage('', 200, [
                'redirectToDownload' => 'paymentcompleted'
            ]);
        }, $request);
    }

    public static function fn_get_downloads_productos($id_usuario)
    {
        return CGeneral::invokeFunctionAPI(function () use ($id_usuario) {

            if (!base64_decode($id_usuario, true)) {
                throw new \Exception("ID de usuario inválido");
            }

            $cliente = TClientes::where('id_usuario', base64_decode($id_usuario))
                ->firstOrFail();

            $compras = TProductosCompradosCliente::with('producto')
                ->where('id_cliente', $cliente->id_cliente)
                ->where('descargado', false)
                ->get();

            $descargas = collect();
            $errores = collect();

            DB::transaction(function () use ($compras, &$descargas, &$errores, $cliente, $id_usuario) {
                $generarZIP = $compras->count() > 1;
                $token = \Illuminate\Support\Str::random(40);
                $productosParaZIP = [];

                foreach ($compras as $compra) {
                    try {
                        if ($compra->id_cliente != $cliente->id_cliente) {
                            $errores->push("Acceso denegado para el producto.");
                            continue;
                        }

                        $archivo = $compra->producto->archivo;
                        if (!Storage::disk('private')->exists($archivo)) {
                            $errores->push("Archivo no encontrado: " . $archivo);
                            continue;
                        }

                        $productosParaZIP[] = [
                            'archivo' => $archivo
                        ];

                        // Si es un solo archivo, generar URL normal
                        Cache::put("download_token_$token", [
                            'type' => 'zip',
                            'id_producto_comprado' => Crypt::encrypt($compra->id_producto_comprado),
                            'productos' => Crypt::encrypt($productosParaZIP),
                            'user_id' => Crypt::encrypt(base64_decode($id_usuario))
                        ], now()->addMinutes(30));


                        if (!$generarZIP) {
                            $url = route('private.download', [
                                'token' => $token,
                                'single' => true
                            ]);
                        } else {
                            $url = route('private.download', [
                                'token' => $token,
                                'single' => false
                            ]);
                        }

                        $descargas->push(['url' => $url]);
                        $compra->update(['descargado' => true]);
                    } catch (\Exception $e) {
                        throw new \Exception($e->getMessage());
                    }
                }
            });

            return CGeneral::CreateMessage('', 200, [
                'urls' => $descargas,
                'errores' => $errores->all()
            ]);
        }, null);
    }

    private static function generarNombrePersonalizado($archivo)
    {
        $fecha = now()->format('Ymd-His');
        $extension = pathinfo($archivo, PATHINFO_EXTENSION);
        return "ITSA-{$fecha}.{$extension}";
    }

    public static function fn_get_download_producto($id_usuario, $id_producto)
    {
        return CGeneral::invokeFunctionAPI(function () use ($id_usuario, $id_producto) {

            if (!base64_decode($id_usuario, true)) {
                throw new \Exception("ID de usuario inválido");
            }

            if (!$id_producto || !is_numeric(base64_decode($id_producto))) {
                throw new \Exception("ID de producto inválido");
            }

            $cliente = TClientes::where('id_usuario', base64_decode($id_usuario))
                ->firstOrFail();

            $compras = TProductosCompradosCliente::with('producto')
                ->where('id_cliente', $cliente->id_cliente)
                ->where('id_producto', base64_decode($id_producto))
                ->where('descargado', true)
                ->firstOrFail();

            $descargas = collect();
            $errores = collect();

            DB::transaction(function () use ($compras, &$descargas, &$errores, $cliente, $id_usuario) {
                $generarZIP = $compras->count() > 1;
                $token = \Illuminate\Support\Str::random(40);
                $productosParaZIP = [];

                try {
                    if ($compras->id_cliente != $cliente->id_cliente) {
                        $errores->push("Acceso denegado para el producto.");
                        return;
                    }

                    $archivo = $compras->producto->archivo;
                    if (!Storage::disk('private')->exists($archivo)) {
                        $errores->push("Archivo no encontrado: " . $archivo);
                        return;
                    }

                    $productosParaZIP[] = [
                        'archivo' => $archivo
                    ];

                    // Si es un solo archivo, generar URL normal
                    Cache::put("download_token_$token", [
                        'type' => 'zip',
                        'id_producto_comprado' => Crypt::encrypt($compras->id_producto_comprado),
                        'productos' => Crypt::encrypt($productosParaZIP),
                        'user_id' => Crypt::encrypt(base64_decode($id_usuario))
                    ], now()->addMinutes(30));


                    if (!$generarZIP) {
                        $url = route('private.download', [
                            'token' => $token,
                            'single' => true
                        ]);
                    } else {
                        $url = route('private.download', [
                            'token' => $token,
                            'single' => false
                        ]);
                    }

                    $descargas->push(['url' => $url]);
                    $compras->update(['descargado' => true]);
                } catch (\Exception $e) {
                    throw new \Exception($e->getMessage());
                }
            });

            return CGeneral::CreateMessage('', 200, [
                'urls' => $descargas,
                'errores' => $errores->all()
            ]);
        }, null);
    }

    public static function fn_tiene_producto(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {

            $usuario = $request->user();
            $cliente = TClientes::where('id_usuario', $usuario->id_usuario)->firstOrFail();

            $compra = TProductosCompradosCliente::where('id_cliente', $cliente->id_cliente)
                ->where('id_producto', $request->id_producto)
                ->where('pago_confirmado', true)
                ->exists();

            CGeneral::EventCheckProduct($compra);

            return CGeneral::CreateMessage('', 200, [
                "producto_comprado" => $compra
            ]);
        }, $request);
    }
}
