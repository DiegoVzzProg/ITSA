<?php

namespace App\Http\Controllers;

use App\Models\TErroresInternos;
use App\Models\TPaises;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class CGeneral extends Controller
{
    static function DescargarArchivo($arch)
    {
        $path = storage_path('app/public/' . $arch);

        if (!file_exists($path)) {
            return CGeneral::CreateMessage("File not found", 599, null);
        }

        return response()->download($path, 'basicsicons');
    }

    public static function JsonToArray($json): mixed
    {
        return json_decode(json: json_encode(value: $json), associative: true);
    }

    public static function CreateMessage($message, $status, $data, $encrypt = true): JsonResponse
    {
        return response()->json(data: [
            'message' => $message,
            'data' => $encrypt ? base64_encode(json_encode($data)) : $data
        ], status: $status);
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

            return CGeneral::CreateMessage('Internal server error ticket: ' . $ticket->id_ticket, 599, null, false);
        } catch (Exception $ex) {
            return CGeneral::CreateMessage("Contact support", 599, null, false);
        }
    }

    static function fn_l_paises(Request $request)
    {
        return CGeneral::invokeFunctionAPI(function () {
            $paises = TPaises::all();

            return CGeneral::CreateMessage('', 200, [
                "data_pais" => $paises
            ]);
        }, $request);
    }

    public static function generarSecretKey()
    {
        return self::CreateMessage("", 200, ['secretKey' => bin2hex(random_bytes(10))]);
    }

    public static function invokeFunctionAPI(callable $function, Request $request = null)
    {
        try {
            return $function();
        } catch (Exception $ex) {

            if ($request) {
                try {
                    $user = $request->user();
                    return self::CreateTicketError($ex, $user->id_usuario);
                } catch (Exception $ex) {
                    return self::CreateMessage("Contact support", 599,  null);
                }
            }
            return self::CreateMessage("Contact support", 599, null);
        }
    }
}
