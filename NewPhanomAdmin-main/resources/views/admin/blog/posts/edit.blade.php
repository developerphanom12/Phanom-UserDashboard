{{-- resources/views/admin/blog/posts/edit.blade.php --}}
<x-layout.layout>
  <x-slot name="title">Edit Post</x-slot>
  @section('content')
  <div class="page-content"><div class="page-container">

    <h4 class="mb-3">Edit Post</h4>

    <form method="POST" action="{{ route('admin.blog.posts.update', $post) }}" class="card card-body">
      @csrf @method('PUT')

      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Title</label>
          <input name="title" class="form-control" value="{{ old('title',$post->title) }}" required>
          @error('title')<div class="text-danger small">{{ $message }}</div>@enderror
        </div>

        <div class="col-md-6">
          <label class="form-label">Slug</label>
          <input name="slug" class="form-control" value="{{ old('slug',$post->slug) }}">
          @error('slug')<div class="text-danger small">{{ $message }}</div>@enderror
        </div>

        <div class="col-md-6">
          <label class="form-label">Category</label>
          <select name="category_id" class="form-select" required>
            <option value="" disabled>-- choose --</option>
            @foreach($categories as $c)
              <option value="{{ $c->id }}" {{ (old('category_id',$post->category_id)==$c->id)?'selected':'' }}>
                {{ $c->name }}
              </option>
            @endforeach
          </select>
          @error('category_id')<div class="text-danger small">{{ $message }}</div>@enderror
        </div>

        <div class="col-md-6">
          <label class="form-label">Cover URL</label>
          <input name="cover_url" class="form-control" value="{{ old('cover_url',$post->cover_url) }}">
          @error('cover_url')<div class="text-danger small">{{ $message }}</div>@enderror
        </div>

        <div class="col-12">
          <label class="form-label">Excerpt</label>
          <textarea name="excerpt" rows="2" class="form-control">{{ old('excerpt',$post->excerpt) }}</textarea>
        </div>

        <div class="col-12">
          <label class="form-label">Content</label>
          <textarea name="content" rows="8" class="form-control">{{ old('content',$post->content) }}</textarea>
        </div>

        <div class="col-md-4">
          <label class="form-label">Author</label>
          <input name="author" class="form-control" value="{{ old('author',$post->author) }}">
        </div>

        <div class="col-md-4">
          <label class="form-label">Published At</label>
          <input type="datetime-local" name="published_at" class="form-control"
                 value="{{ old('published_at', optional($post->published_at)->format('Y-m-d\TH:i')) }}">
        </div>

        <div class="col-md-4 d-flex align-items-end">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="is_published" id="is_published"
                   {{ old('is_published',$post->is_published) ? 'checked' : '' }} value="1">
            <label class="form-check-label" for="is_published"> Published </label>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <button class="btn btn-primary">Save</button>
        <a href="{{ route('admin.blog.posts.index') }}" class="btn btn-light">Cancel</a>
      </div>
    </form>

  </div><x-partials.footer /></div>
  @endsection
</x-layout.layout>
