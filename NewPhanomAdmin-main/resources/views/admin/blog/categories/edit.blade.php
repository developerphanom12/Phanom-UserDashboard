{{-- resources/views/admin/blog/categories/edit.blade.php --}}
<x-layout.layout>
  <x-slot name="title">Edit Category</x-slot>
  @section('content')
  <div class="page-content"><div class="page-container">

    <h4 class="mb-3">Edit Category</h4>

    <form method="POST" action="{{ route('admin.blog.categories.update', $category) }}" class="card card-body">
      @csrf @method('PUT')

      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Name</label>
          <input name="name" class="form-control" value="{{ old('name',$category->name) }}" required>
          @error('name')<div class="text-danger small">{{ $message }}</div>@enderror
        </div>

        <div class="col-md-6">
          <label class="form-label">Slug</label>
          <input name="slug" class="form-control" value="{{ old('slug',$category->slug) }}">
          @error('slug')<div class="text-danger small">{{ $message }}</div>@enderror
        </div>

        <div class="col-md-3">
          <label class="form-label">Sort Order</label>
          <input type="number" name="sort_order" class="form-control" value="{{ old('sort_order',$category->sort_order) }}">
        </div>

        <div class="col-md-3 d-flex align-items-end">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="is_active" id="is_active"
                   {{ old('is_active',$category->is_active) ? 'checked' : '' }} value="1">
            <label class="form-check-label" for="is_active"> Active </label>
          </div>
        </div>
      </div>

      <div class="mt-3">
        <button class="btn btn-primary">Save</button>
        <a href="{{ route('admin.blog.categories.index') }}" class="btn btn-light">Cancel</a>
      </div>
    </form>

  </div><x-partials.footer /></div>
  @endsection
</x-layout.layout>
