<?php

use App\Http\Controllers\CCarritoCliente;
use App\Http\Controllers\CGeneral;
use App\Http\Controllers\CProductos;
use App\Http\Controllers\CUsuarios;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function(){
    // Rutas públicas
    Route::prefix('public')->group(function () {
        Route::post('/productos', [CProductos::class, 'fn_l_productos']);
        Route::get('/downloadfile/{arch}', [CGeneral::class, 'DescargarArchivo']);
        Route::get('/archivo/{folder}/{filename}', [CGeneral::class, 'manejarArchivo'])->name('archivo');
    });

    // Rutas de autenticación
    Route::prefix('auth')->group(function () {
        Route::post('/login', [CUsuarios::class, 'fn_login']);
        Route::post('/register', [CUsuarios::class, 'fn_register']);
    });
    
    // Rutas protegidas
    Route::middleware('auth:sanctum')->group(function () {
        // Rutas del carrito
        Route::prefix('carrito')->group(function () {
            Route::post('/cliente', [CCarritoCliente::class, 'fn_l_carrito_cliente']);
            Route::post('/agregar', [CCarritoCliente::class, 'fn_a_carrito_cliente']);
            Route::get('/precio/{id_usuario}', [CCarritoCliente::class, 'fn_l_precio_carrito_cliente']);
        });

        // Otras rutas autenticadas
        Route::get('/secret/key', [CGeneral::class, 'generarSecretKey']);
        Route::get('/countries', [CGeneral::class, 'fn_l_paises']);
    });
});
