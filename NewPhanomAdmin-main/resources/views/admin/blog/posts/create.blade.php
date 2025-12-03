<x-layout.layout>
  <x-slot name="title">Add Post</x-slot>
  @section('content')
  <div class="page-content"><div class="page-container">
    <div class="card"><div class="card-body">
      <form method="POST" action="{{ route('admin.blog.posts.store') }}" class="row g-3">
        @csrf
        <div class="col-md-8">
          <label class="form-label">Title</label>
          <input name="title" class="form-control" required>
        </div>
        <div class="col-md-4">
          <label class="form-label">Slug (optional)</label>
          <input name="slug" class="form-control" placeholder="auto if blank">
        </div>
        <div class="col-md-4">
          <label class="form-label">Category</label>
          <select name="blog_category_id" class="form-select">
            <option value="">— None —</option>
            @foreach($categories as $c)
              <option value="{{ $c->id }}">{{ $c->name }}</option>
            @endforeach
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Author</label>
          <input name="author" class="form-control">
        </div>
        <div class="col-md-4">
          <label class="form-label">Cover Image URL</label>
          <input name="cover_image" class="form-control">
        </div>
        <div class="col-12">
          <label class="form-label">Excerpt</label>
          <textarea name="excerpt" class="form-control" rows="2"></textarea>
        </div>
        <div class="col-12">
          <label class="form-label">Content (HTML allowed)</label>
          <textarea name="content" class="form-control" rows="8"></textarea>
        </div>
        <div class="col-md-3">
          <div class="form-check mt-4">
            <input class="form-check-input" type="checkbox" name="is_published" value="1" id="pub">
            <label class="form-check-label" for="pub">Published</label>
          </div>
        </div>
        <div class="col-md-3">
          <label class="form-label">Published At</label>
          <input name="published_at" type="datetime-local" class="form-control">
        </div>
        <div class="col-md-6"></div>
        <div class="col-md-6">
          <label class="form-label">Meta Title</label>
          <input name="meta_title" class="form-control">
        </div>
        <div class="col-md-6">
          <label class="form-label">Meta Description</label>
          <textarea name="meta_description" class="form-control" rows="2"></textarea>
        </div>
        <div class="col-12"><button class="btn btn-primary">Save</button></div>
      </form>
    </div></div>
  </div><x-partials.footer />
  @endsection
</x-layout.layout>
