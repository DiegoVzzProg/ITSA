<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionsModel extends Model
{
    use HasFactory;

    protected $table = 'sys_options'; // Nama tabel di database

    protected $primaryKey = 'option_id'; // Nama kolom primary key

    public $incrementing = true; // Apakah primary key menggunakan increment atau tidak

    public $timestamps = false; // Apakah menggunakan kolom created_at dan updated_at

    protected $fillable = [
        'icon',
        'name',
        'route',
        'description',
        'is_active'
    ];
}
