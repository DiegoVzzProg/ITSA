<?php

namespace App\Http\Controllers;

use App\Mail\PruebasMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller
{
    public function enviarCorreo(Request $request)
    {
        // Enviar el correo
        Mail::to('diego.avzz2004@gmail.com')->send(new PruebasMail('Diego'));

        return response()->json(['message' => 'Correo enviado correctamente.']);
    }
}
