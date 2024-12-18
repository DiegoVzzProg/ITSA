<?php

use App\Http\Controllers\CGeneral;
use App\Http\Controllers\CProductos;
use App\Http\Controllers\CUsuarios;
use App\Http\Controllers\EntProductosController;
use App\Http\Controllers\SpProductosController;
use App\Models\TUsuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;

Route::post('/productos', function (Request $request) {
    return CProductos::fn_l_productos($request);
});

Route::post('/login', function (Request $request) {
    return CUsuarios::fn_login($request);
});

Route::get('/archivo/{folder}/{filename}', function ($folder, $filename) {
    return CGeneral::ObtenerUrlArchEncriptada($folder, $filename);
});


Route::get('/get/{folder}/{filename}', function ($filename, $carpeta) {
    return response()->file(storage_path('app/public/' . $carpeta . '/' . Crypt::decrypt($filename)));
})->name('photo.show')->middleware('signed');
