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
            $email = $request->input('email');
            $password = $request->input('password');

            $usuario = TUsuarios::where('email', $email)->where('activo', true)->first();

            if (!$usuario || !Hash::check($password, $usuario->password)) {
                return CGeneral::CreateMessage('Incorrect credentials', 200, 'info', null);
            }

            return CGeneral::CreateMessage('', 200, 'success', [
                'id_usuario' => $usuario->id_usuario,
                'email' => $usuario->email,
                'nombre' => $usuario->nombre,
            ]);
        } catch (Exception $ex) {
            return CGeneral::CreateMessage($ex->getMessage(), 599, 'error', null);
        }
    }
}
