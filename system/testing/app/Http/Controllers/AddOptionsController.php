<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AddOptionsController extends Controller
{
    public static function view()
    {
        return view('pages.user.user_options.catalog_user_options');
    }
}
