<?php

use App\Http\Controllers\CCarritoCliente;
use App\Http\Controllers\CClientes;
use App\Http\Controllers\CGeneral;
use App\Http\Controllers\CProductos;
use App\Http\Controllers\CUsuarios;

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('public')->group(function () {
        Route::post('/productos', [CProductos::class, 'fn_l_productos']);
        Route::get('/downloadfile/{arch}', [CGeneral::class, 'DescargarArchivo']);
    });

    Route::prefix('auth')->group(function () {
        Route::post('/login', [CUsuarios::class, 'fn_login']);
        Route::post('/register', [CUsuarios::class, 'fn_register']);
        Route::post('/forgot/password/restore', [CUsuarios::class, 'fn_forgot_password_restore']);
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('carrito')->group(function () {
            Route::post('/cliente', [CCarritoCliente::class, 'fn_l_carrito_cliente']);
            Route::post('/agregar', [CCarritoCliente::class, 'fn_a_carrito_cliente']);
            Route::get('/precio/{id_usuario}', [CCarritoCliente::class, 'fn_l_precio_carrito_cliente']);
        });

        Route::prefix('clientes')->group(function () {
            Route::post('/alta/cliente', [CClientes::class, 'fn_a_clientes']);
            Route::get('/obtener/cliente/{id_cliente}', [CClientes::class, 'fn_l_clientes']);
        });

        Route::prefix('auth')->group(function () {
            Route::delete('/logout/user', [CUsuarios::class, 'fn_logout']);
        });

        Route::get('/secret/key', [CGeneral::class, 'generarSecretKey']);
        Route::get('/countries', [CGeneral::class, 'fn_l_paises']);
    });
});
