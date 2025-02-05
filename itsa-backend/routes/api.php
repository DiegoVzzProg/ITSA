<?php

use App\Http\Controllers\CCarritoCliente;
use App\Http\Controllers\CClientes;
use App\Http\Controllers\CGeneral;
use App\Http\Controllers\CProductos;
use App\Http\Controllers\CUsuarios;

use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('public')->group(function () {
        Route::post('/listProducts', [CProductos::class, 'fn_l_productos']);
        Route::get('/downloadFile/{file}', [CGeneral::class, 'DescargarArchivo']);
    });

    Route::prefix('auth')->group(function () {
        Route::post('/loginUser', [CUsuarios::class, 'fn_login']);
        Route::post('/registerUser', [CUsuarios::class, 'fn_register']);
        Route::post('/restorePassword', [CUsuarios::class, 'fn_forgot_password_restore']);
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::prefix('shoppingCart')->group(function () {
            Route::post('/client', [CCarritoCliente::class, 'fn_l_carrito_cliente']);
            Route::post('/addProduct', [CCarritoCliente::class, 'fn_a_carrito_cliente']);
            Route::post('/totalPrice', [CCarritoCliente::class, 'fn_l_precio_carrito_cliente']);
        });

        Route::prefix('customers')->group(function () {
            Route::post('/registerCustomer', [CClientes::class, 'fn_a_clientes']);
            Route::post('/getCustomer', [CClientes::class, 'fn_l_clientes']);
            Route::post('/checkProductInShoppingCart', [CCarritoCliente::class, 'fn_existe_producto_carrito_cliente']);
        });

        Route::prefix('auth')->group(function () {
            Route::delete('/logoutUser', [CUsuarios::class, 'fn_logout']);
        });

        Route::get('/secretKey', [CGeneral::class, 'generarSecretKey']);
        Route::post('/countries', [CGeneral::class, 'fn_l_paises']);
    });
});
