<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function categories() {
        return BlogCategory::where('is_active',true)
            ->orderBy('sort_order')
            ->get(['id','name','slug','sort_order']);
    }

    public function posts(Request $r) {
        $q = BlogPost::query()
            ->with('category:id,name,slug')
            ->where('is_published',true)
            ->latest('published_at')->latest();

        if ($cat = $r->query('category')) {
            $q->whereHas('category', fn($qq)=>$qq->where('slug',$cat));
        }
        if ($search = $r->query('search')) {
            $q->where(function($qq) use ($search) {
                $qq->where('title','like',"%$search%")
                   ->orWhere('excerpt','like',"%$search%");
            });
        }

        $per = (int)($r->query('per_page', 9));
        $posts = $q->paginate($per)->onEachSide(1);

        // minimal payload
        $posts->getCollection()->transform(function($p){
            return [
                'id'=>$p->id,
                'slug'=>$p->slug,
                'title'=>$p->title,
                'excerpt'=>$p->excerpt,
                'author'=>$p->author,
                'content'=>$p->content,
                'cover_image'=>$p->cover_image,
                'category'=>$p->category?->name,
                'category_slug'=>$p->category?->slug,
                'published_at'=>optional($p->published_at)->toIso8601String(),
            ];
        });

        return $posts;
    }

    public function show($slug) {
        $p = BlogPost::with('category:id,name,slug')
            ->where('slug',$slug)
            ->where('is_published',true)
            ->firstOrFail();

        return [
            'id'=>$p->id,
            'slug'=>$p->slug,
            'title'=>$p->title,
            'author'=>$p->author,
            'cover_image'=>$p->cover_image,
            'excerpt'=>$p->excerpt,
            'content'=>$p->content,
            'category'=>$p->category?->name,
            'category_slug'=>$p->category?->slug,
            'published_at'=>optional($p->published_at)->toIso8601String(),
            'meta_title'=>$p->meta_title,
            'meta_description'=>$p->meta_description,
        ];
    }
}
