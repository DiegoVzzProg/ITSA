<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TProductosCompradosCliente extends Model
{
    use HasFactory;

    protected $table = 't_productos_comprados_cliente';

    protected $fillable = [
        'id_cliente',
        'id_producto',
        'pago_confirmado',
        'descargado'
    ];
}
