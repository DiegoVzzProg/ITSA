<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;

abstract class Controller
{
    public static function Structure(callable $function)
    {
        try {
            return $function();
        } catch (\Exception $ex) {
            Log::info('API Error Mensaje: ' . $ex->getMessage());
            Log::info('API Error Archivo: ' . $ex->getFile());
            Log::info('API Error Linea: ' . $ex->getLine());

            return response()->json([
                'message' => $ex->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
