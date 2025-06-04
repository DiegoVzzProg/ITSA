<?php

use App\Http\Controllers\MenuController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('menus')->group(function () {
    Route::get('/list/{menu_id}', [MenuController::class, 'fn_l_menus']);
});

Route::prefix('users')->group(function () {
    Route::get('/options/list/{user_id}', [MenuController::class, 'fn_l_options_users']);
    Route::get('/list/{user_id}', [UserController::class, 'fn_l_users']);
});
