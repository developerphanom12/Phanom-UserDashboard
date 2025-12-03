<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Query extends Model
{
    protected $fillable = [
        'first_name','last_name','email','phone','service_key','message','is_read','name'
    ];

    protected $casts = [
        'is_read' => 'boolean',
    ];
}
