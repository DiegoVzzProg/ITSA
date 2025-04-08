<?php

use App\Http\Controllers\CCarritoCliente;
use App\Http\Controllers\CClientes;
use App\Http\Controllers\CGeneral;
use App\Http\Controllers\CProductos;
use App\Http\Controllers\CStripe;
use App\Http\Controllers\CUsuarios;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {

    Route::post('products/stripe/checkout/success', [CStripe::class, 'fn_stripe_success'])
        ->withoutMiddleware([VerifyCsrfToken::class]);

    Route::get('/countries', [CGeneral::class, 'fn_l_paises']);

    Route::prefix('products')->group(function () {
        Route::post('/list', [CProductos::class, 'fn_l_productos']);
        Route::get('/private/download', [CProductos::class, 'downloadPrivateFile'])
            ->name('private.download');
    });

    Route::prefix('auth')->group(function () {
        Route::post('/login', [CUsuarios::class, 'fn_login'])->middleware('throttle:5,1');
        Route::post('/register', [CUsuarios::class, 'fn_register'])->middleware('throttle:5,1');
        Route::post('/password/forgot', [CUsuarios::class, 'fn_forgot_password_restore'])->middleware('throttle:3,1');;
        Route::post('/token/refresh', [CUsuarios::class, 'fn_refresh_token'])->middleware('throttle:2,1');
    });

    Route::middleware('auth:sanctum')->group(function () { //, 'session.expire'
        Route::prefix('shopping-cart')->group(function () {
            Route::get('/client', [CCarritoCliente::class, 'fn_l_carrito_cliente']);
            Route::post('/add/product', [CCarritoCliente::class, 'fn_a_carrito_cliente']);
            Route::get('/proceed/to/checkout/{guid}', [CStripe::class, 'fn_stripe']);
            Route::post('/delete/product/from', [CCarritoCliente::class, 'fn_b_producto_carrito_cliente']);
            Route::post('/check/product/from', [CCarritoCliente::class, 'fn_existe_producto_carrito_cliente']);
            Route::get('/check/number', [CCarritoCliente::class, 'fn_cantidad_carrito']);
        });

        Route::prefix('customers')->group(function () {
            Route::post('/register/customer', [CClientes::class, 'fn_a_clientes']);
            Route::put('/edit/customer', [CClientes::class, 'fn_e_clientes']);
        });

        Route::prefix('auth')->group(function () {
            Route::post('/logout', [CUsuarios::class, 'fn_logout']);
        });

        Route::prefix('products')->group(function () {
            Route::get('/download/files/{id_usuario}', [CProductos::class, 'fn_obtener_urls_descarga_producto'])->middleware('throttle:10,1');
            Route::get('/download/file/{id_usuario}/{id_producto}', [CProductos::class, 'fn_obtener_urls_descarga_producto'])->middleware('throttle:10,1');
            Route::post('/add/product/download/list', [CProductos::class, 'fn_a_producto_para_descargar'])->middleware('throttle:10,1');
            Route::post('/check', [CProductos::class, 'fn_tiene_producto']);
        });

        Route::get('/secret-key', [CGeneral::class, 'generarSecretKey']);

        Route::post('/stripe/validate-session', [CStripe::class, 'fn_validate_session_stripe'])->middleware('throttle:10,1');
    });
});
