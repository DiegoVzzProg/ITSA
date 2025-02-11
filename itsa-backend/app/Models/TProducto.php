<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TProducto extends Model
{
    use HasFactory;

    // Especificar el nombre de la tabla si no sigue la convención de nombres de Laravel
    protected $table = 't_productos';

    // Definir la clave primaria si tiene un nombre diferente
    protected $primaryKey = 'id_producto';

    // Indicar si la clave primaria es auto-incremental
    public $incrementing = true;

    // Especificar el tipo de clave primaria (en tu caso es un INT sin signo)
    protected $keyType = 'int';

    // Desactivar las marcas de tiempo (timestamps) ya que no las estás usando
    public $timestamps = false;

    // Atributos que se pueden asignar masivamente
    protected $fillable = [
        'url',
        'precio',
        'titulo',
        'subtitulo',
        'descripcion',
        'imagen',
        'archivo',
        'hover_efecto',
        'foto_miniatura',
        'id_stripe'
    ];

    // Valores por defecto de los atributos
    protected $attributes = [
        'precio' => 0.00,
        'descripcion' => '',
    ];
}
