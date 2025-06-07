<?php

use App\Http\Controllers\MenuController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('menus')->group(function () {
    Route::get('/list/{option_id}', [MenuController::class, 'fn_l_options']);
});

Route::prefix('users')->group(function () {
    Route::get('/options/list/{user_id}', [MenuController::class, 'fn_l_options_users']);
    Route::get('/list/{user_id}', [UserController::class, 'fn_l_users']);
    Route::get('/roles', [UserController::class, 'fn_l_role_users']);
    Route::post('/add', [UserController::class, 'fn_a_user']);
});
