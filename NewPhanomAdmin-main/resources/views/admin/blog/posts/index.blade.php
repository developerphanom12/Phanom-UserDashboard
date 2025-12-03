{{-- resources/views/admin/blog/posts/index.blade.php --}}
<x-layout.layout>
  <x-slot name="title">Blog Posts</x-slot>
  @section('content')

  <div class="page-content">
    <div class="page-container">
      @if(session('ok')) <div class="alert alert-success">{{ session('ok') }}</div> @endif

      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="m-0">Posts</h4>
        <a class="btn btn-primary" href="{{ route('admin.blog.posts.create') }}">Add Post</a>
      </div>

      <div class="card">
        <div class="card-body table-responsive">
          <table class="table align-middle">
            <thead class="table-light">
              <tr>
                <th>#</th><th>Title</th><th>Category</th><th>Published</th><th>Author</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              @foreach($posts as $p)
                <tr>
                  <td>{{ $p->id }}</td>
                  <td>{{ $p->title }}</td>
                  <td class="text-muted">{{ $p->category?->name }}</td>
                  <td>{{ $p->is_published ? 'Yes' : 'No' }}</td>
                  <td class="text-muted">{{ $p->author }}</td>
                  <td class="d-flex gap-2">
                    <a href="{{ route('admin.blog.posts.edit', $p) }}" class="btn btn-sm btn-outline-primary">Edit</a>
                    <form method="POST" action="{{ route('admin.blog.posts.destroy', $p) }}" onsubmit="return confirm('Delete?')">
                      @csrf @method('DELETE')
                      <button class="btn btn-sm btn-outline-danger">Delete</button>
                    </form>
                  </td>
                </tr>
              @endforeach
            </tbody>
          </table>
          <div class="mt-2">{{ $posts->links() }}</div>
        </div>
      </div>
    </div>
    <x-partials.footer />
  </div>
  @endsection
</x-layout.layout>
