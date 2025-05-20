<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StUserOptionsModel extends Model
{
    use HasFactory;

    protected $table = 'st_user_options';

    protected $primaryKey = 'id';

    public $incrementing = true;

    public $timestamps = false;

    protected $fillable = [
        'route',
        'description',
        'erased',
    ];
}
