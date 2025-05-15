<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TPaises extends Model
{
    use HasFactory;

    protected $table = 't_paises';

    protected $primaryKey = 'id_pais';

    public $incrementing = true;

    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'activo'
    ];

    protected $hidden = [];

    protected $attributes = [];
}
