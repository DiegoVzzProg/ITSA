<?php

namespace App\Http\Controllers;

use App\Models\TUsuarios;
use DivisionByZeroError;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class CUsuarios extends Controller
{
    static function token($usuario): mixed
    {
        return $usuario->createToken('auth_token', ['*'], now()->addDays(7))->plainTextToken;
    }

    public static function fn_login(Request $request)
    {
        try {

            $credentials = $request->only('email', 'password');

            $usuario = TUsuarios::where('email', $credentials['email'])->where('activo', true)->first();

            if (!$usuario) {
                return CGeneral::CreateMessage('User not found or inactive', 200, 'info', null);
            }

            if (!Hash::check($credentials['password'], $usuario->password)) {
                return CGeneral::CreateMessage('Incorrect password', 200, 'info', null);
            }

            $token = self::token(usuario: $usuario);

            return CGeneral::CreateMessage('', 200, 'success', [
                "user_data" => [
                    'id_usuario' => $usuario->id_usuario,
                    'email' => $usuario->email,
                    'nombre' => $usuario->nombre,
                ],
                "token" => $token
            ]);
        } catch (Exception $ex) {
            return CGeneral::CreateTicketError($ex, 0);
        }
    }

    public static function fn_register(Request $request)
    {
        try {

            $credentials = $request->only('nombre', 'email', 'password', 'leyo_terms');

            $usuario = TUsuarios::create([
                'nombre' => $credentials['nombre'],
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password']),
                'leyo_terms' => $credentials['leyo_terms'],
                'creacion' => now()
            ]);

            $token = self::token(usuario: $usuario);

            return CGeneral::CreateMessage('', 200, 'success', [
                "user_data" => [
                    'id_usuario' => $usuario->id_usuario,
                    'email' => $usuario->email,
                    'nombre' => $usuario->nombre,
                ],
                "token" => $token
            ]);
        } catch (Exception $ex) {
            return CGeneral::CreateTicketError($ex, 0);
        }
    }

    public static function fn_logout(Request $request)
    {
        try {
            $user = $request->user();
            $user->tokens()->delete();

            return CGeneral::CreateMessage('', 200, 'success', ["message" => "Logout successful"]);
        } catch (Exception $ex) {
            $usuario = $request->user();
            return CGeneral::CreateTicketError($ex, $usuario->id_usuario);
        }
    }

    public static function fn_forgot_password_restore(Request $request)
    {
        try {
            $credentials = $request->only('email');

            $usuario = TUsuarios::where('email', $credentials['email'])->where('activo', true)->first();

            if (!$usuario) {
                return CGeneral::CreateMessage('User not found or inactive', 599, 'info', null);
            }

            $token = Password::CreateToken($usuario);

            $usuario->notify(new \App\Notifications\NotForgotPassword($token));
            return response()->json(data: [
                'message' => 'Message sent',
                'data' => []
            ], status: 200);
        } catch (Exception $ex) {
            return CGeneral::CreateTicketError($ex, 0);
        }
    }
}
