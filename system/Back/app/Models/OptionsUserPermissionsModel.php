<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OptionsUserPermissionsModel extends Model
{
    use HasFactory;

    protected $table = 'sys_option_user_permissions';

    protected $primaryKey = 'permission_id';

    public $incrementing = true;

    public $timestamps = false;

    protected $fillable = [
        'role_id',
        'option_id',
        'is_active'
    ];
    /**
     * Get the menu option associated with the permission
     */
    public function options(): BelongsTo
    {
        return $this->belongsTo(OptionsModel::class, 'option_id', 'option_id');
    }

    /**
     * Get the user associated with the permission
     */
    public function userRoles(): BelongsTo
    {
        return $this->belongsTo(UserRolesModel::class, 'role_id', 'role_id');
    }
}
