<?php

use App\Http\Controllers\CCarritoCliente;
use App\Http\Controllers\CClientes;
use App\Http\Controllers\CGeneral;
use App\Http\Controllers\CProductos;
use App\Http\Controllers\CStripe;
use App\Http\Controllers\CUsuarios;

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
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
        Route::prefix('shoppingCart')->group(function () {
            Route::get('/client', [CCarritoCliente::class, 'fn_l_carrito_cliente']);
            Route::post('/addProduct', [CCarritoCliente::class, 'fn_a_carrito_cliente']);
            Route::get('/proceedToCheckout', [CStripe::class, 'fn_stripe']);
            Route::post('/deleteProductFromShoppingCart', [CCarritoCliente::class, 'fn_b_producto_carrito_cliente']);
            Route::post('/checkProductInShoppingCart', [CCarritoCliente::class, 'fn_existe_producto_carrito_cliente']);
        });

        Route::prefix('customers')->group(function () {
            Route::post('/registerCustomer', [CClientes::class, 'fn_a_clientes']);
            Route::put('/editCustomer', [CClientes::class, 'fn_e_clientes']);
            Route::post('/getCustomer', [CClientes::class, 'fn_l_clientes']);
        });

        Route::prefix('auth')->group(function () {
            Route::delete('/logoutUser', [CUsuarios::class, 'fn_logout']);
        });

        Route::prefix('products')->group(function () {
            Route::get('/download/file', [CProductos::class, 'fn_get_downloads_productos']);
            Route::post('/add/product/download/list', [CProductos::class, 'fn_a_producto_para_descargar']);
        });

        Route::get('/secretKey', [CGeneral::class, 'generarSecretKey']);
        Route::get('/countries', [CGeneral::class, 'fn_l_paises']);
    });
});
