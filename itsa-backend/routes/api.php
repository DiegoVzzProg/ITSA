<?php

use App\Http\Controllers\CCarritoCliente;
use App\Http\Controllers\CGeneral;
use App\Http\Controllers\CProductos;
use App\Http\Controllers\CUsuarios;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/carrito/cliente', function (Request $request) {
        return CCarritoCliente::fn_l_carrito_cliente($request);
    });

    Route::post('/agregar/carrito', function (Request $request) {
        return CCarritoCliente::fn_a_carrito_cliente($request);
    });

    Route::get("/precio/{id_usuario}", function ($id_usuario) {
        return CCarritoCliente::fn_l_precio_carrito_cliente($id_usuario);
    });

    Route::get('/scret/key', function () {
        return CGeneral::CreateMessage("", 200, "success", ['secretKey' => bin2hex(random_bytes(10))]);
    });

    Route::get('/countries', function () {
        return CGeneral::fn_l_paises();
    });
});

Route::post('/auth/login', function (Request $request) {
    return CUsuarios::fn_login($request);
});

Route::post('/auth/register', function (Request $request) {
    return CUsuarios::fn_register($request);
});

Route::get('/downloadfile/{arch}', function ($arch) {
    return CGeneral::DescargarArchivo($arch);
});


Route::post('/productos', function (Request $request) {
    return CProductos::fn_l_productos($request);
});


Route::get('/archivo/{folder}/{filename}', function (Request $request, $folder, $filename) {
    if ($request->has('signed')) {
        return CGeneral::entregarArchivoFirmado($folder, $filename);
    } else {
        return CGeneral::generarUrlFirmada($folder, $filename);
    }
})->name('archivo');
