<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TCarritoCliente extends Model
{
    use HasFactory;

    protected $table = 't_carrito_cliente';

    protected $primaryKey = 'id_carrito_cliente';

    public $incrementing = true;

    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'id_usuario',
        'id_producto',
        'descripcion',
        'fecha_creacion',
        'borrado',
        'precio',
        'foto_producto'
    ];

    protected $hidden = [];

    protected $attributes = [];

    public function producto()
    {
        return $this->belongsTo(TProducto::class, 'id_producto', 'id_producto');
    }
}
