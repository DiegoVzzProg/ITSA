<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TTicketsErrorWeb extends Model
{
    use HasFactory;

    // Especificar el nombre de la tabla si no sigue la convención de nombres de Laravel
    protected $table = 't_tickets_error_web';

    // Definir la clave primaria si tiene un nombre diferente
    protected $primaryKey = 'id_ticket';

    // Indicar si la clave primaria es auto-incremental
    public $incrementing = true;

    // Especificar el tipo de clave primaria (en tu caso es un INT sin signo)
    protected $keyType = 'int';

    // Desactivar las marcas de tiempo (timestamps) ya que no las estás usando
    public $timestamps = true;

    // Atributos que se pueden asignar masivamente
    protected $fillable = [
        'error',
        'id_usuario'
    ];
}
