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
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $credentials = $request->only('email', 'password');

            $usuario = TUsuarios::where('email', $credentials['email'])->where('activo', true)->first();

            if (!$usuario) {
                return CGeneral::CreateMessage('User not found or inactive', 599,  null);
            }

            if (!Hash::check($credentials['password'], $usuario->password)) {
                return CGeneral::CreateMessage('Incorrect password', 599, null);
            }

            $token = self::token(usuario: $usuario);

            return CGeneral::CreateMessage('', 200,  [
                "user_data" => [
                    'id_usuario' => $usuario->id_usuario,
                    'email' => $usuario->email,
                    'nombre' => $usuario->nombre,
                ],
                "token" => $token
            ]);
        });
    }

    public static function fn_register(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $credentials = $request->only('nombre', 'email', 'password', 'leyo_terms');

            $usuario = TUsuarios::create([
                'nombre' => $credentials['nombre'],
                'email' => $credentials['email'],
                'password' => Hash::make($credentials['password']),
                'leyo_terms' => $credentials['leyo_terms'],
                'creacion' => now()
            ]);

            $token = self::token(usuario: $usuario);

            return CGeneral::CreateMessage('', 200, [
                "user_data" => [
                    'id_usuario' => $usuario->id_usuario,
                    'email' => $usuario->email,
                    'nombre' => $usuario->nombre,
                ],
                "token" => $token
            ]);
        }, $request);
    }

    public static function fn_logout(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();
            $user->tokens()->delete();

            return CGeneral::CreateMessage('', 200,  []);
        }, $request);
    }

    public static function fn_forgot_password_restore(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $credentials = $request->only('email');

            $usuario = TUsuarios::where('email', $credentials['email'])->where('activo', true)->first();

            if (!$usuario) {
                return CGeneral::CreateMessage('User not found or inactive', 599, null);
            }

            $token = Password::CreateToken($usuario);

            $usuario->notify(new \App\Notifications\NotForgotPassword($token));
            return CGeneral::CreateMessage('Message sent', 200, null);
        }, $request);
    }
}
