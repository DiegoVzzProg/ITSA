<?php

use App\Http\Controllers\CCarritoCliente;
use App\Http\Controllers\CClientes;
use App\Http\Controllers\CGeneral;
use App\Http\Controllers\CProductos;
use App\Http\Controllers\CStripe;
use App\Http\Controllers\CUsuarios;

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/countries', [CGeneral::class, 'fn_l_paises']);

    Route::prefix('products')->group(function () {
        Route::post('/list/products', [CProductos::class, 'fn_l_productos']);
        Route::post('/stripe/checkout/success', [CStripe::class, 'fn_stripe_success']);
    });

    Route::prefix('auth')->group(function () {
        Route::post('/loginUser', [CUsuarios::class, 'fn_login']);
        Route::post('/registerUser', [CUsuarios::class, 'fn_register']);
        Route::post('/restorePassword', [CUsuarios::class, 'fn_forgot_password_restore']);
        Route::post('/refreshToken', [CUsuarios::class, 'fn_refresh_token']);
    });

    Route::middleware('auth:sanctum')->group(function () { //, 'session.expire'
        Route::prefix('shopping/cart')->group(function () {
            Route::get('/client', [CCarritoCliente::class, 'fn_l_carrito_cliente']);
            Route::post('/add/product', [CCarritoCliente::class, 'fn_a_carrito_cliente']);
            Route::get('/proceed/to/checkout', [CStripe::class, 'fn_stripe']);
            Route::post('/delete/product/from', [CCarritoCliente::class, 'fn_b_producto_carrito_cliente']);
            Route::post('/check/product/from', [CCarritoCliente::class, 'fn_existe_producto_carrito_cliente']);
            Route::get('/check/number', [CCarritoCliente::class, 'fn_cantidad_carrito']);
        });

        Route::prefix('customers')->group(function () {
            Route::post('/register/customer', [CClientes::class, 'fn_a_clientes']);
            Route::put('/edit/customer', [CClientes::class, 'fn_e_clientes']);
        });

        Route::prefix('auth')->group(function () {
            Route::delete('/logoutUser', [CUsuarios::class, 'fn_logout']);
        });

        Route::prefix('products')->group(function () {
            Route::get('/download/file', [CProductos::class, 'fn_get_downloads_productos']);
            Route::post('/add/product/download/list', [CProductos::class, 'fn_a_producto_para_descargar']);
        });

        Route::get('/secretKey', [CGeneral::class, 'generarSecretKey']);
    });
});
