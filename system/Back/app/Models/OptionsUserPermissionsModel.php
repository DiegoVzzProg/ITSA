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

    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'option_id',
        'is_active'
    ];
    /**
     * Get the menu option associated with the permission
     */
    public function sys_options(): BelongsTo
    {
        return $this->belongsTo(OptionsModel::class, 'option_id', 'option_id');
    }

    /**
     * Get the user associated with the permission
     */
    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
