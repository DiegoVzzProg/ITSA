<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public static function fn_l_users($user_id = null)
    {
        return self::Structure(function () use ($user_id) {
            $data = (!empty($user_id) && $user_id > 0)
                ? User::where('id', $user_id)->get()
                : User::get();

            return response()->json([
                'data' => $data
            ], 200);
        });
    }
}
