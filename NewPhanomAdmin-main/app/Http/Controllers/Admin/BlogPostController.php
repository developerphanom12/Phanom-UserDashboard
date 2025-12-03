<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('category')->orderByDesc('created_at')->paginate(20);
        return view('admin.blog.posts.index', compact('posts'));
    }

    public function create()
    {
        $categories = BlogCategory::orderBy('name')->get();
        return view('admin.blog.posts.create', compact('categories'));
    }

    public function store(Request $request)
{
    $data = $request->validate([
        'blog_category_id' => ['required','exists:blog_categories,id'],
        'title'        => ['required','string','max:180'],
        'slug'         => ['nullable','string','max:200','unique:blog_posts,slug'],
        'excerpt'      => ['nullable','string','max:600'],
        'content'      => ['nullable','string'],
        'cover_image'  => ['nullable','url','max:500'],
        'is_published' => ['nullable','boolean'],
        'published_at' => ['nullable','date'],
        'author'       => ['nullable','string','max:120'],
        'meta_title'   => ['nullable','string','max:180'],
        'meta_description' => ['nullable','string','max:255'],
    ]);

    $data['is_published'] = (bool)($data['is_published'] ?? false);
    BlogPost::create($data);

    return redirect()->route('admin.blog.posts.index')->with('ok','Post created.');
}


    public function edit(BlogPost $post) // <-- route model binding
    {
        $categories = BlogCategory::orderBy('name')->get();
        return view('admin.blog.posts.edit', compact('post','categories'));
    }

   public function update(Request $request, BlogPost $post)
{
    $data = $request->validate([
        'blog_category_id' => ['required','exists:blog_categories,id'],
        'title'        => ['required','string','max:180'],
        'slug'         => ['nullable','string','max:200', Rule::unique('blog_posts','slug')->ignore($post->id)],
        'excerpt'      => ['nullable','string','max:600'],
        'content'      => ['nullable','string'],
        'cover_image'  => ['nullable','url','max:500'],
        'is_published' => ['nullable','boolean'],
        'published_at' => ['nullable','date'],
        'author'       => ['nullable','string','max:120'],
        'meta_title'   => ['nullable','string','max:180'],
        'meta_description' => ['nullable','string','max:255'],
    ]);

    $data['is_published'] = (bool)($data['is_published'] ?? false);
    $post->update($data);

    return redirect()->route('admin.blog.posts.index')->with('ok','Post updated.');
}


    public function destroy(BlogPost $post)
    {
        $post->delete();
        return back()->with('ok','Post deleted.');
    }
}
