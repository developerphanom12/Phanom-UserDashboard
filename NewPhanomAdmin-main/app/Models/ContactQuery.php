<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactQuery extends Model
{
    protected $fillable = [
        'name','email','phone','timezone','meeting_at','service_key','message','source'
    ];

    protected $casts = [
        'meeting_at' => 'datetime',
    ];
}
