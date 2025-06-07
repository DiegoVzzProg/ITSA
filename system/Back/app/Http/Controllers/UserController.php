<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserRolesModel;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public static function fn_l_users($user_id = null)
    {
        return self::Structure(function () use ($user_id) {

            $query = User::with(['userRoles'])
                ->select(
                    'users.id',
                    'users.name',
                    'users.email',
                    'users.password',
                    'sys_user_roles.role_id',
                    'users.is_active'
                )
                ->join('sys_user_roles', 'users.role_id', '=', 'sys_user_roles.role_id');

            $data = (!empty($user_id) && $user_id > 0)
                ? $query->where('users.id', $user_id)->first()
                : $query->get();

            try {
                if ($data instanceof \Illuminate\Support\Collection) {
                    // Cuando vienen varios usuarios (get())
                    $data->transform(function ($user) {
                        // decrypt() arrojará excepción si no es un string cifrado válido
                        Log::info($user->password);
                        $user->password = decrypt($user->password);
                        return $user;
                    });
                } else {
                    // Cuando viene un solo usuario (first())
                    $data->password = decrypt($data->password);
                }
            } catch (\Illuminate\Contracts\Encryption\DecryptException $e) {
                if ($data instanceof \Illuminate\Support\Collection) {
                    $data->transform(function ($user) {
                        $user->password = null;
                        return $user;
                    });
                } else {
                    $data->password = null;
                }
            }

            return response()->json([
                'data' => $data
            ], 200);
        });
    }

    public static function fn_l_role_users()
    {
        return self::Structure(function () {
            $data = UserRolesModel::where('is_active', true)->get();
            return response()->json([
                'data' => $data
            ], 200);
        });
    }
    public static function fn_a_user(Request $request)
    {
        return self::Structure(function () use ($request) {
            // $validatedData = $request->validate([
            //     'name' => 'required|string|max:255',
            //     'email' => 'required|string|email|max:255|unique:users',
            //     'password' => 'required|string|min:8',
            //     'role_id' => 'required|exists:user_roles,id'
            // ]);

            $validatedData = $request->input(['username', 'email', 'password', 'role_id']);

            $user = User::create([
                'name' => $request->username,
                'email' => $request->email,
                'password' => encrypt($request->password),
                'role_id' => $request->role_id
            ]);

            return response()->json([
                'data' => $user
            ], 201);
        });
    }
}
