<x-layout.layout>
  <x-slot name="title">Add Category</x-slot>
  @section('content')
  <div class="page-content"><div class="page-container">
    <div class="card"><div class="card-body">
      <form method="POST" action="{{ route('admin.blog.categories.store') }}" class="row g-3">
        @csrf
        <div class="col-md-6">
          <label class="form-label">Name</label>
          <input name="name" class="form-control" required>
        </div>
        <div class="col-md-6">
          <label class="form-label">Slug (optional)</label>
          <input name="slug" class="form-control" placeholder="auto if blank">
        </div>
        <div class="col-md-3">
          <label class="form-label">Order</label>
          <input name="sort_order" type="number" class="form-control" value="0">
        </div>
        <div class="col-md-3 d-flex align-items-end">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" name="is_active" checked value="1" id="a1">
            <label class="form-check-label" for="a1">Active</label>
          </div>
        </div>
        <div class="col-12">
          <button class="btn btn-primary">Save</button>
        </div>
      </form>
    </div></div>
  </div><x-partials.footer />
  @endsection
</x-layout.layout>
