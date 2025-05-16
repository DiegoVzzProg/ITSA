<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TTokensParaArchivos extends Model
{
    use HasFactory;
    // Nombre de la tabla
    protected $table = 't_tokens_para_archivos';

    // Llave primaria y tipo
    protected $primaryKey = 'id_token_archivos';
    public $incrementing = true;
    protected $keyType = 'int';

    // Activa timestamps (created_at, updated_at)
    public $timestamps = true;

    // Campos que pueden asignarse masivamente
    // No incluimos 'token' para que el DEFAULT de la BD lo genere
    protected $fillable = [
        'id_usuario',
        'tipo',
        'archivos_cadena',
        'borrado'
    ];

    // Castings
    protected $casts = [
        'borrado'           => 'boolean',
        'token'             => 'string',
        'archivos_cadena'   => 'string',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {

            if (empty($model->token)) {
                $model->token = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }
}
