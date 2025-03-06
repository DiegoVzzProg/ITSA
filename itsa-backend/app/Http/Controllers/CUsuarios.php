<?php

namespace App\Http\Controllers;

use App\Models\TClientes;
use App\Models\TPaises;
use App\Models\TUsuarios;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class CUsuarios extends Controller
{
    /**
     * Genera el access token con una expiración corta (2 horas).
     *
     * @param  \TUsuarios  $usuario
     * @return string
     */
    private static function generateAccessToken($usuario): string
    {
        return $usuario->createToken('auth_token', ['*'], now()->addHours(2))->plainTextToken;
    }

    /**
     * Genera el refresh token con una expiración más prolongada (7 días) y lo almacena.
     *
     * Nota: Para un entorno con múltiples dispositivos es recomendable
     * utilizar una tabla separada de refresh tokens.
     *
     * @param  \TUsuarios  $usuario
     * @return string
     */
    private static function generateRefreshToken($usuario): string
    {
        $refreshToken = Str::random(64);

        // Almacenamos el refresh token y su fecha de expiración en el registro del usuario.
        // Si planeas soportar múltiples sesiones, considera una tabla dedicada.
        TUsuarios::where('id_usuario', $usuario->id_usuario)
            ->update([
                'remember_token'   => $refreshToken,
                'expires_at_token' => now()->addDays(7)
            ]);

        return $refreshToken;
    }

    private static function generateSessionToken($usuario): string
    {
        $token = Str::random(64);
        TUsuarios::where('id_usuario', $usuario->id_usuario)
            ->update([
                'session_token' => $token,
            ]);
        return $token;
    }

    /**
     * Endpoint para la renovación del access token usando el refresh token.
     *
     * En este endpoint no se depende del access token, sino que se valida el refresh token enviado.
     */
    public static function fn_refresh_token(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $refreshTokenProvided = $request->input('refresh_token');

            if (!$refreshTokenProvided) {
                return CGeneral::CreateMessage('Refresh token is required', 599, null);
            }

            // Buscamos al usuario asociado al refresh token activo y no expirado
            $usuario = TUsuarios::where('remember_token', $refreshTokenProvided)
                ->where('expires_at_token', '>', now())
                ->first();

            if (!$usuario) {
                return CGeneral::CreateMessage('Invalid or expired refresh token', 599, null);
            }

            $accessToken  = self::generateAccessToken($usuario);
            $newRefreshToken = self::generateRefreshToken($usuario);

            return CGeneral::CreateMessage('', 200, [
                "access_token"  => $accessToken,
                "refresh_token" => $newRefreshToken,
            ]);
        }, $request);
    }

    public static function fn_login(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $validator = Validator::make($request->all(), [
                'email'    => 'required|email|max:254',
                'password' => 'required|string|min:8',
            ], [
                'email.required'    => 'The email is required.',
                'email.email'       => 'The email must be a valid email address.',
                'email.max'         => 'The email should not exceed 254 characters.',
                'password.required' => 'The password is required.',
                'password.min'      => 'Password must be at least 8 characters long.',
            ]);

            if ($validator->fails()) {
                return CGeneral::CreateMessage('There were validation errors', 599, $validator->errors());
            }

            $credentials = $request->only('email', 'password');

            $usuario = TUsuarios::where('email', $credentials['email'])
                ->where('activo', true)
                ->first();

            if (!$usuario) {
                return CGeneral::CreateMessage('User not found', 599,  null);
            }

            if (!Hash::check($credentials['password'], $usuario->password)) {
                return CGeneral::CreateMessage('Incorrect password', 599, null);
            }

            $usuario->update(['ultima_conexion' => now()]);

            $dt_cliente = CClientes::ObtenerDatosCiente($usuario->id_usuario);

            $accessToken  = self::generateAccessToken($usuario);
            $refreshToken = self::generateRefreshToken($usuario);
            $sessionToken = self::generateSessionToken($usuario);

            return CGeneral::CreateMessage('', 200, [
                "user_data" => [
                    'id_usuario' => $usuario->id_usuario,
                    'email'      => $usuario->email,
                    'nombre'     => $usuario->nombre,
                ],
                "client_data"    => $dt_cliente,
                "token"          => $accessToken,
                "refresh_token"  => $refreshToken,
                "session_token"  => $sessionToken,
            ]);
        }, $request);
    }

    public static function fn_register(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $credentials = $request->only(
                'user_name',
                'email',
                'password',
                'leyo_terms',
                'id_pais',
                'nombre',
                'numero_de_iva_empresa',
                'direccion',
                'estado',
                'codigo_postal',
                'telefono'
            );

            $existeEmail = TUsuarios::where('email', $credentials['email'])->first();
            $exite_cliente = TClientes::where('telefono', $credentials['telefono'])->first();

            if ($existeEmail) {
                return CGeneral::CreateMessage('User already exists', 599, null);
            }

            if ($exite_cliente) {
                return CGeneral::CreateMessage('The details you provided already exist.', 599, null);
            }


            $transaccion = DB::transaction(function () use ($credentials) {
                $usuario = TUsuarios::create([
                    'nombre' => $credentials['user_name'],
                    'email' => $credentials['email'],
                    'password' => Hash::make($credentials['password']),
                    'leyo_terms' => $credentials['leyo_terms'],
                    'creacion' => now(),
                    'ultima_conexion' => now(),
                    'expires_at_token' => now(),
                ]);

                TClientes::create([
                    'id_usuario' => $usuario->id_usuario,
                    'nombre' => $credentials['nombre'],
                    'numero_de_iva_empresa' => $credentials['numero_de_iva_empresa'],
                    'direccion' => $credentials['direccion'],
                    'estado' => $credentials['estado'],
                    'id_pais' => $credentials['id_pais'],
                    'codigo_postal' => $credentials['codigo_postal'],
                    'telefono' => $credentials['telefono']
                ]);

                $accessToken  = self::generateAccessToken($usuario);
                $refreshToken = self::generateRefreshToken($usuario);
                $sessionToken = self::generateSessionToken($usuario);

                return [
                    'usuario' => $usuario,
                    'refreshToken' => $refreshToken,
                    'accessToken' => $accessToken,
                    'sessionToken' => $sessionToken
                ];
            });

            $dt_cliente = CClientes::ObtenerDatosCiente($transaccion['usuario']->id_usuario);

            return CGeneral::CreateMessage('', 200, [
                "user_data" => [
                    'id_usuario' => $transaccion['usuario']->id_usuario,
                    'email' => $transaccion['usuario']->email,
                    'nombre' => $transaccion['usuario']->nombre,
                ],
                "client_data" => $dt_cliente,
                "token" => $transaccion['accessToken'],
                "refresh_token" => $transaccion['refreshToken'],
                "session_token" => $transaccion['sessionToken']
            ]);
        });
    }

    public static function fn_logout(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $user = $request->user();
            $user->tokens()->delete();

            return CGeneral::CreateMessage('', 200, []);
        }, $request);
    }

    public static function fn_forgot_password_restore(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () use ($request) {
            $validator = Validator::make($request->all(), [
                'email'    => 'required|email|max:254'
            ], [
                'email.required'    => 'The email is required.',
                'email.email'       => 'The email must be a valid email address.',
                'email.max'         => 'The email should not exceed 254 characters.'
            ]);

            if ($validator->fails()) {
                return CGeneral::CreateMessage('There were validation errors', 599, $validator->errors());
            }

            $credentials = $request->only('email');

            $usuario = TUsuarios::where('email', $credentials['email'])->where('activo', true)->first();

            if (!$usuario) {
                Log::info('Intento de recuperación de contraseña para email inexistente o inactivo: ' . $credentials['email']);
                return CGeneral::CreateMessage('A message will be sent to reset the password', 599, null);
            }

            $token = Password::CreateToken($usuario);

            $usuario->notify(new \App\Notifications\NotForgotPassword($token));
            return CGeneral::CreateMessage('A message will be sent to reset the password', 200, null);
        }, $request);
    }
}
