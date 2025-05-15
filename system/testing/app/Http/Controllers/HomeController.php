<?php

namespace App\Http\Controllers;

use App\Models\OpcionesUsuarioModel;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public static function view()
    {
        return view('pages.home.home');
    }
}
