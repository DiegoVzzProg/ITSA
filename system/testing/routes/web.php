<?php

use App\Http\Controllers\AddOptionsController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

// Route::get('/countries', [CGeneral::class, 'fn_l_paises']);


Route::get('/', [HomeController::class, 'view'])->name('home');

Route::get('/home/user/options', [AddOptionsController::class, 'view'])->name('useroptions');
