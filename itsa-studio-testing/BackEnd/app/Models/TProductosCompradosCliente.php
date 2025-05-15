<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TProductosCompradosCliente extends Model
{
    use HasFactory;
    public $timestamps = true;

    protected $table = 't_productos_comprados_cliente';

    protected $primaryKey = 'id_producto_comprado';

    protected $fillable = [
        'id_cliente',
        'id_producto',
        'pago_confirmado',
        'descargado',
        'created_at',
        'updated_at',
        'en_proceso_de_pago'
    ];

    protected $casts = [
        'pago_confirmado' => 'boolean',
        'descargado' => 'boolean',
        'en_proceso_de_pago' => 'boolean'
    ];

    public function producto()
    {
        return $this->belongsTo(TProducto::class, 'id_producto', 'id_producto');
    }

    public function cliente()
    {
        return $this->belongsTo(TClientes::class, 'id_cliente', 'id_cliente');
    }
}
