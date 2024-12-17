<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CGeneral extends Controller
{
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
