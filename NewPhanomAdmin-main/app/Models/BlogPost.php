<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    protected $fillable = [
        'blog_category_id','title','slug','author','cover_image','excerpt','content',
        'is_published','published_at','meta_title','meta_description'
    ];

    protected $casts = ['is_published'=> 'boolean', 'published_at'=> 'datetime'];

    public function category() {
        return $this->belongsTo(BlogCategory::class,'blog_category_id');
    }
}
