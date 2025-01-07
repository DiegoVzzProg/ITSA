<?php

namespace App\Http\Controllers;

use App\Models\TPaises;
use App\Models\TTicketsErrorWeb;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;

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
    public static function generarUrlFirmada($folder, $filename)
    {
        try {
            $encryptedFilename = Crypt::encrypt($filename);

            $url = URL::temporarySignedRoute(
                'archivo',
                now()->addMinutes(5),
                ["folder" => $folder, 'filename' => $encryptedFilename, "signed" => true]
            );

            return CGeneral::CreateMessage('', 200, 'success', CGeneral::JsonToArray([
                "url" => $url
            ]));
        } catch (Exception $ex) {
            return CGeneral::CreateMessage($ex->getMessage(), 599, 'error', null);
        }
    }

    public static function entregarArchivoFirmado($folder, $encryptedFilename)
    {
        try {
            $decryptedFilename = Crypt::decrypt($encryptedFilename);
            $filePath = storage_path('app/public/' . $folder . '/' . $decryptedFilename);

            if (!file_exists($filePath)) {
                return CGeneral::CreateMessage('No se encontro el archivo', 200, 'error', null);
            }

            return response()->file($filePath);
        } catch (Exception $ex) {
            return CGeneral::CreateMessage($ex->getMessage(), 599, 'error', null);
        }
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
            $ticket = TTicketsErrorWeb::create([
                "error" => $error,
                "id_usuario" => $id_usuario
            ]);

            return CGeneral::CreateMessage('', 599, 'error', [
                "id_ticket" => $ticket->id_ticket
            ]);
        } catch (Exception $ex) {
            return CGeneral::CreateMessage("Contact support", 599, 'error', null);
        }
    }

    static function fn_l_paises()
    {
        try {
            $paises = TPaises::all();

            return CGeneral::CreateMessage('', 200, 'error', [
                "data_pais" => $paises
            ]);
        } catch (Exception $ex) {
            return CGeneral::CreateMessage("Contact support", 599, 'error', null);
        }
    }
}
