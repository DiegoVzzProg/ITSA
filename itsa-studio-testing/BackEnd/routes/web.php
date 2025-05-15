<?php

use App\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return config('mail');
});

Route::post('/enviar-correo', [EmailController::class, 'enviarCorreo']);
