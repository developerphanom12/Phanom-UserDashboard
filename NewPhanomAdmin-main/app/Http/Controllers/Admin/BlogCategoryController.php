<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BlogCategoryController extends Controller
{
    public function index()
    {
        $categories = BlogCategory::orderBy('sort_order')->orderBy('name')->paginate(20);
        return view('admin.blog.categories.index', compact('categories'));
    }

    public function create()
    {
        return view('admin.blog.categories.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'       => ['required','string','max:120'],
            'slug'       => ['nullable','string','max:160','unique:blog_categories,slug'],
            'is_active'  => ['nullable','boolean'],
            'sort_order' => ['nullable','integer'],
        ]);

        $data['is_active'] = (bool)($data['is_active'] ?? false);
        BlogCategory::create($data);

        return redirect()->route('admin.blog.categories.index')
            ->with('ok','Category created.');
    }

    public function edit(BlogCategory $category) // <-- route model binding
    {
        return view('admin.blog.categories.edit', compact('category'));
    }

    public function update(Request $request, BlogCategory $category)
    {
        $data = $request->validate([
            'name'       => ['required','string','max:120'],
            'slug'       => ['nullable','string','max:160', Rule::unique('blog_categories','slug')->ignore($category->id)],
            'is_active'  => ['nullable','boolean'],
            'sort_order' => ['nullable','integer'],
        ]);

        $data['is_active'] = (bool)($data['is_active'] ?? false);
        $category->update($data);

        return redirect()->route('admin.blog.categories.index')
            ->with('ok','Category updated.');
    }

    public function destroy(BlogCategory $category)
    {
        $category->delete();
        return back()->with('ok','Category deleted.');
    }
}
