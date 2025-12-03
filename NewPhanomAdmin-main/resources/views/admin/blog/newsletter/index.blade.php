<x-layout.layout>
  <x-slot name="title">Newsletter</x-slot>
  @section('content')
  <div class="page-content"><div class="page-container">
    <h4>Subscribers</h4>
    <div class="card"><div class="card-body table-responsive">
      <table class="table align-middle">
        <thead><tr><th>ID</th><th>Email</th><th>Subscribed At</th></tr></thead>
        <tbody>
          @forelse($subs as $s)
            <tr><td>{{ $s->id }}</td><td>{{ $s->email }}</td><td>{{ $s->created_at }}</td></tr>
          @empty
            <tr><td colspan="3" class="text-center text-muted">No subscribers</td></tr>
          @endforelse
        </tbody>
      </table>
      {{ $subs->links() }}
    </div></div>
  </div><x-partials.footer />
  @endsection
</x-layout.layout>
