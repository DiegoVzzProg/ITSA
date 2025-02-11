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
        Route::post('/listProducts', [CProductos::class, 'fn_l_productos']);
    });

    Route::prefix('auth')->group(function () {
        Route::post('/loginUser', [CUsuarios::class, 'fn_login']);
        Route::post('/registerUser', [CUsuarios::class, 'fn_register']);
        Route::post('/restorePassword', [CUsuarios::class, 'fn_forgot_password_restore']);
    });

    Route::middleware('auth:sanctum', 'session.expire')->group(function () {
        Route::prefix('shoppingCart')->group(function () {
            Route::post('/client', [CCarritoCliente::class, 'fn_l_carrito_cliente']);
            Route::post('/addProduct', [CCarritoCliente::class, 'fn_a_carrito_cliente']);
            Route::post('/totalPrice', [CCarritoCliente::class, 'fn_l_precio_carrito_cliente']);
            Route::post('/proceedToCheckout', [CStripe::class, 'fn_stripe']);
        });

        Route::prefix('customers')->group(function () {
            Route::post('/registerCustomer', [CClientes::class, 'fn_a_clientes']);
            Route::post('/getCustomer', [CClientes::class, 'fn_l_clientes']);
            Route::post('/checkProductInShoppingCart', [CCarritoCliente::class, 'fn_existe_producto_carrito_cliente']);
        });

        Route::prefix('auth')->group(function () {
            Route::delete('/logoutUser', [CUsuarios::class, 'fn_logout']);
        });

        Route::prefix('products')->group(function () {
            Route::get('/downloadFile/{id_producto}', [CProductos::class, 'fn_descargar_archivo']);
        });

        Route::get('/secretKey', [CGeneral::class, 'generarSecretKey']);
        Route::post('/countries', [CGeneral::class, 'fn_l_paises']);
    });
});
