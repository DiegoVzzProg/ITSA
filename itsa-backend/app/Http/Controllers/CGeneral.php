<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\URL;

class CGeneral extends Controller
{
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
}
