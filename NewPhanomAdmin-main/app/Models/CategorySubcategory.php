<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategorySubcategory extends Model
{
    use HasFactory;

    protected $table = 'category_subcategory';

    protected $fillable = [
        'category_name',
        'subcategories',
        'is_active',
    ];

    protected $casts = [
        'subcategories' => 'array',
        'is_active' => 'boolean',
    ];
}

