<?php

use App\Http\Controllers\CProductos;
use App\Http\Controllers\CUsuarios;
use App\Http\Controllers\EntProductosController;
use App\Http\Controllers\SpProductosController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

Route::post('/productos', function (Request $request) {
    return CProductos::fn_l_productos($request);
});

Route::post('/login', function (Request $request) {
    return CUsuarios::fn_login($request);
});

// Route::get('/url/{filename}', function ($filename) {

//     $json = null;
//     try {
//         $url = URL::temporarySignedRoute(
//             'photo.show',
//             now()->addMinutes(5),
//             ['filename' => Crypt::encrypt($filename), 'carpeta' => "img"]
//         );

//         $json = [
//             "status" => 200,
//             "url" => $url
//         ];
//     } catch (Exception $ex) {

//         $json = [
//             "status" => 500,
//             "mensaje" => $ex
//         ];
//     }

//     return response()->json(['respuesta' => $json]);
// });

// Route::get('/foto/{filename}/{carpeta}', function ($filename, $carpeta) {
//     return response()->file(storage_path('app/public/' . $carpeta . '/' . Crypt::decrypt($filename)));
// })->name('photo.show')->middleware('signed');
