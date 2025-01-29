<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TClientes extends Model
{
    use HasFactory;

    protected $table = 't_clientes';

    protected $fillable = [
        'id_usuario',
        'nombre',
        'telefono',
        'direccion',
        'estado',
        'pais',
        'codigo_postal'
    ];

    protected $hidden = [
        'created_at',
        'updated_at'
    ];


    public $timestamps = true;
}
