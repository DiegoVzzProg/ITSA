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
use ZipArchive;
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

            $cache = Cache::get("download_token_$token");
            $productos = Crypt::decrypt($cache['productos']); // Todos los archivos
            $type = $cache['type'];

            // Eliminar token (una sola descarga)
            Cache::forget("download_token_$token");

            // Descarga directa
            if ($type === 'direct') {
                return Storage::disk('private')->download($productos[0]['archivo']);
            }

            // Generar ZIP
            $zipName = 'ITSA - ' . now()->format('Y-m-d_H-i-s') . '.zip';

            return response()->streamDownload(function () use ($productos) {
                $zip = new ZipStream(outputName: 'productos.zip', sendHttpHeaders: false);

                foreach ($productos as $producto) {
                    $contenido = Storage::disk('private')->get($producto['archivo']);
                    $zip->addFile(
                        fileName: basename($producto['archivo']),
                        data: $contenido
                    );
                }

                $zip->finish();
            }, $zipName, [
                'Content-Type' => 'application/zip'
            ]);
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

    private static function generarNombrePersonalizado($archivo)
    {
        $fecha = now()->format('Ymd-His');
        $extension = pathinfo($archivo, PATHINFO_EXTENSION);
        return "ITSA-{$fecha}.{$extension}";
    }

    public static function fn_obtener_urls_descarga_producto(string $id_usuario_base64, string $id_producto_base64 = "")
    {
        return CGeneral::invokeFunctionAPI(function () use ($id_usuario_base64, $id_producto_base64) {
            // Validación del ID de usuario
            if (!base64_decode($id_usuario_base64, true)) {
                throw new \Exception("ID de usuario inválido");
            }

            // Validación del ID de producto
            if ($id_producto_base64 != "" && !base64_decode($id_producto_base64, true)) {
                throw new \Exception("ID de producto inválido");
            }

            $id_usuario = base64_decode($id_usuario_base64);
            $id_producto = $id_producto_base64 != "" ? base64_decode($id_producto_base64) : 0;

            // Obtener cliente asociado al usuario
            $cliente = TClientes::where('id_usuario', $id_usuario)
                ->firstOrFail();

            // Obtener productos
            $compras = TProductosCompradosCliente::with('producto')
                ->where('id_cliente', $cliente->id_cliente)
                ->where('pago_confirmado', true)
                ->where('descargado', $id_producto > 0)
                ->when($id_producto > 0, function ($q) use ($id_producto) {
                    return $q->where('id_producto', $id_producto);
                })->get();

            $descargas = collect();
            $errores = collect();

            DB::transaction(function () use ($compras, &$descargas, &$errores, $cliente, $id_usuario) {
                $productosParaZIP = [];

                // Paso 1: Validar y recolectar archivos
                foreach ($compras as $compra) {
                    try {
                        // Validar acceso al producto
                        if ($compra->id_cliente != $cliente->id_cliente) {
                            $errores->push("Acceso denegado para el producto.");
                            continue;
                        }

                        // Validar existencia del archivo
                        $archivo = $compra->producto->archivo;

                        if (!Storage::disk('private')->exists($archivo)) {
                            $errores->push("Archivo no encontrado: " . $archivo);
                            continue;
                        }

                        // Agregar a la lista para ZIP/directo
                        $productosParaZIP[] = [
                            'archivo' => $archivo,
                            'nombre_personalizado' => self::generarNombrePersonalizado($archivo) // Ejemplo
                        ];

                        // Marcar como descargado
                        $compra->update(['descargado' => true]);
                    } catch (\Exception $e) {
                        throw new \Exception($e->getMessage());
                    }
                }


                // Paso 2: Generar URL única
                if (!empty($productosParaZIP)) {
                    $generarZIP = count($productosParaZIP) > 1;
                    $token = \Illuminate\Support\Str::random(40);

                    // Almacenar en caché
                    Cache::put("download_token_$token", [
                        'type' => $generarZIP ? 'zip' : 'direct',
                        'productos' => Crypt::encrypt($productosParaZIP),
                        'user_id' => Crypt::encrypt(base64_decode($id_usuario))
                    ], now()->addMinutes(30));

                    // Generar URL
                    $url = route('private.download', [
                        'token' => $token,
                        'single' => !$generarZIP // Solo aplica si es un archivo único
                    ]);

                    $descargas->push(['url' => $url]);
                }
            });

            return CGeneral::CreateMessage('', 200, [
                'urls' => $descargas
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
