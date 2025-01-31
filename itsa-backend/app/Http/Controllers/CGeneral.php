<?php

namespace App\Http\Controllers;

use App\Models\TErroresInternos;
use App\Models\TPaises;
use Exception;
use Illuminate\Http\Client\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class CGeneral extends Controller
{
    static function DescargarArchivo($arch)
    {
        $path = storage_path('app/public/' . $arch);

        if (!file_exists($path)) {
            return CGeneral::CreateMessage("File not found", 599, 'error', null);
        }

        return response()->download($path, 'basicsicons');
    }

    public static function JsonToArray($json): mixed
    {
        return json_decode(json: json_encode(value: $json), associative: true);
    }

    public static function CreateMessage($message, $status, $type, $data): JsonResponse
    {
        return response()->json(data: [
            'type' => $type,
            'message' => $message,
            'data' => $data
        ], status: $status);
    }

    public static function EncryptValue($value)
    {
        return Hash::make($value);
    }

    public static function CreateTicketError($error, $id_usuario)
    {
        try {
            $ticket = TErroresInternos::create([
                'id_ticket' => uniqid(),
                'codigo_error' => 599,
                'id_usuario' => $id_usuario,
                'detalle_error' => $error->getMessage(),
                'controlador' => $error->getFile(),
                'linea' => $error->getLine()
            ]);

            return CGeneral::CreateMessage('Internal server error', 599, 'error', [
                "id_ticket" => $ticket->id_ticket
            ]);
        } catch (Exception $ex) {
            return CGeneral::CreateMessage("Contact support", 599, 'error', null);
        }
    }

    static function fn_l_paises(Request $request)
    {
        try {
            $paises = TPaises::all();

            return CGeneral::CreateMessage('', 200, 'error', [
                "data_pais" => $paises
            ]);
        } catch (Exception $ex) {
            $usuario = $request->user();
            return CGeneral::CreateTicketError($ex, $usuario->id_usuario);
        }
    }

    public static function generarSecretKey()
    {
        return self::CreateMessage("", 200, "success", ['secretKey' => bin2hex(random_bytes(10))]);
    }
}
