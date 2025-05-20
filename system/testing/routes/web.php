<?php

use App\Http\Controllers\CatalogUserOptions;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Route::get('/countries', [CGeneral::class, 'fn_l_paises']);

Route::get('/', function () {
    return to_route('home');
});

Route::get('/home', [HomeController::class, 'view'])->name('home');

Route::prefix('home')->name('home.')->group(function () {
    Route::get('/user', [HomeController::class, 'view'])
        ->name('user');
    Route::get('/user/options', [CatalogUserOptions::class, 'view'])
        ->name('user.options');
});
