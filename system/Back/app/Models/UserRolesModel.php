<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRolesModel extends Model
{
    use HasFactory;

    protected $table = 'sys_user_roles';

    protected $primaryKey = 'role_id';

    public $incrementing = true;

    public $timestamps = false;

    protected $fillable = [
        'role_name',
        'is_active'
    ];
}
