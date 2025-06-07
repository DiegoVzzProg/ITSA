<?php

namespace App\Http\Controllers;

use App\Models\OptionsModel;
use App\Models\OptionsUserPermissionsModel;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public static function fn_l_options($option_id = null)
    {
        return self::Structure(function () use ($option_id) {
            $data = (!empty($option_id) && $option_id > 0)
                ? OptionsModel::where('option_id', $option_id)->get()
                : OptionsModel::get();
            return response()->json([
                'data' => $data
            ], 200);
        });
    }

    public static function fn_l_options_users($user_id = null)
    {
        return self::Structure(function () use ($user_id) {
            
        });
        // return self::Structure(function () use ($user_id) {
        //     $query = OptionsUserPermissionsModel::with(['options', 'userRoles'])
        //         ->join('users', 'sys_option_user_permissions.user_id', '=', 'users.id')
        //         ->join('options', 'sys_option_user_permissions.option_id', '=', 'options.option_id')
        //         ->select(
        //             'sys_option_user_permissions.permission_id',
        //             'users.name',
        //             'options.name as menu_name',
        //             'options.description',
        //             'sys_option_user_permissions.is_active'
        //         );

        //     if (!empty($user_id) && $user_id > 0) {
        //         $query->where('users.id', $user_id);
        //     }

        //     $data = $query->get();

        //     // Transform data to include menu and user details
        //     $menuPermissions = $data->map(function ($permission) {
        //         return [
        //             'id' => $permission->permission_id,
        //             'user' => $permission->name,
        //             'option_name' => $permission->menu_name,
        //             'description' => $permission->description,
        //             'is_active' => $permission->is_active
        //         ];
        //     });

        //     return response()->json([
        //         'data' => $menuPermissions
        //     ], 200);
        // });
    }
}
