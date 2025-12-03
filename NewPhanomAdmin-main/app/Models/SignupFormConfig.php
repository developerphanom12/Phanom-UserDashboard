<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SignupFormConfig extends Model
{
    use HasFactory;

    protected $table = 'signup_form_config';

    protected $fillable = [
        'step_number',
        'field_name',
        'field_label',
        'field_type',
        'is_required',
        'placeholder',
        'options',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_required' => 'boolean',
        'is_active' => 'boolean',
        'options' => 'array',
        'step_number' => 'integer',
        'sort_order' => 'integer',
    ];
}

