<?php

namespace App\Http\Controllers;

use App\Models\TUsuarios;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CUsuarios extends Controller
{
    public static function fn_login(Request $request)
    {
        try {
            // 1. Validación de entrada
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required|string|min:3',
            ]);

            if ($validator->fails()) {
                return CGeneral::CreateMessage('Invalid data', 599, 'info', $validator->errors());
            }

            $email = $request->input('email');
            $password = $request->input('password');

            $usuario = TUsuarios::where('email', $email)->first();

            if (!$usuario || !Hash::check(Hash::make($password), $usuario->passwrd)) {
                return CGeneral::CreateMessage('Incorrect credentials', 599, 'info', null);
            }

            return CGeneral::CreateMessage('', 200, 'success', [
                'id' => $usuario->id,
                'email' => $usuario->email,
                'nombre' => $usuario->nombre,
            ]);
        } catch (Exception $ex) {
            return CGeneral::CreateMessage($ex->getMessage(), 599, 'error', null);
        }
    }
}
