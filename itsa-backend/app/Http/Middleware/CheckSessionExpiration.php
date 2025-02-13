<?php

namespace App\Http\Middleware;

use App\Models\TUsuarios;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckSessionExpiration
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::check()) {
            $ultima_conexion = TUsuarios::where('id_usuario', Auth::user()->id_usuario)->pluck('ultima_conexion')->first();

            $diferencia = now()->diffInMinutes($ultima_conexion);

            if ($diferencia >= 1440) {
                return response()->json([
                    'message' => 'session expired'
                ], 401);
            }
        }

        return $next($request);
    }
}
