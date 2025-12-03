{{-- resources/views/admin/blog/categories/index.blade.php --}}
<x-layout.layout>
  <x-slot name="title">Blog Categories</x-slot>
  @section('content')

  <div class="page-content">
    <div class="page-container">
      @if(session('ok')) <div class="alert alert-success">{{ session('ok') }}</div> @endif

      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="m-0">Categories</h4>
        <a class="btn btn-primary" href="{{ route('admin.blog.categories.create') }}">Add Category</a>
      </div>

      <div class="card">
        <div class="card-body table-responsive">
          <table class="table align-middle">
            <thead class="table-light">
              <tr>
                <th>#</th><th>Name</th><th>Slug</th><th>Active</th><th>Sort</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @foreach($categories as $c)
                <tr>
                  <td>{{ $c->id }}</td>
                  <td>{{ $c->name }}</td>
                  <td class="text-muted">{{ $c->slug }}</td>
                  <td>{{ $c->is_active ? 'Yes' : 'No' }}</td>
                  <td>{{ $c->sort_order }}</td>
                  <td class="d-flex gap-2">
                    <a href="{{ route('admin.blog.categories.edit', $c) }}" class="btn btn-sm btn-outline-primary">Edit</a>
                    <form method="POST" action="{{ route('admin.blog.categories.destroy', $c) }}" onsubmit="return confirm('Delete?')">
                      @csrf @method('DELETE')
                      <button class="btn btn-sm btn-outline-danger">Delete</button>
                    </form>
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          <div class="mt-2">{{ $categories->links() }}</div>
        </div>
      </div>
    </div>
    <x-partials.footer />
  </div>
  @endsection
</x-layout.layout>
