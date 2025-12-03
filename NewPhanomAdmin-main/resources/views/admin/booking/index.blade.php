<x-layout.layout>
  <x-slot name="title">Queries</x-slot>

  @section('content')
  <div class="page-content">
    <div class="page-container">

      @if(session('ok'))<div class="alert alert-success">{{ session('ok') }}</div>@endif

      <div class="row">
        <div class="col-12">
          <div class="page-title-head d-flex align-items-sm-center flex-sm-row flex-column mb-3">
            <div class="flex-grow-1">
              <h4 class="fs-18 text-uppercase fw-bold m-0">Leads / Queries</h4>
              <p class="text-muted small mb-0">Strategy call requests</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card shadow-sm border-0">
        <div class="card-body table-responsive">
          <table class="table align-middle no-hover">
            <thead class="table-light">
              <tr>
                <th style="min-width:220px;">Name / Email</th>
                <th style="min-width:120px;">Phone</th>
                <th style="min-width:150px;">Service</th>
                <th style="min-width:260px;">Message</th>
                <th style="min-width:140px;">Created</th>
                <th class="text-center" style="width:100px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              @forelse($queries as $q)
                <tr>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <span class="fw-semibold">{{ $q->first_name }} {{ $q->last_name }}</span>
                      @if($q->is_read)
                        <span class="ms-1 d-inline-block rounded-circle" style="width:10px;height:10px;background:#28a745;" title="Read"></span>
                      @else
                        <span class="ms-1 d-inline-block rounded-circle" style="width:10px;height:10px;background:#dc3545;" title="Unread"></span>
                      @endif
                    </div>
                    <div class="text-muted small text-truncate" style="max-width:280px;">
                      <i class="ti ti-mail text-muted me-1"></i>{{ $q->email }}
                    </div>
                  </td>
                  <td><i class="ti ti-phone text-muted me-1"></i>{{ $q->phone }}</td>
                  <td><span class="badge bg-primary-subtle text-primary">{{ $q->service_key }}</span></td>
                  {{-- <td><span class="text-muted">—</span></td> --}}
                  {{-- <td><span class="text-muted">—</span></td> --}}
                  <td style="max-width:360px;"><div class="text-truncate" title="{{ $q->message }}">{{ $q->message }}</div></td>
                  <td>{{ $q->created_at->format('Y-m-d H:i') }}</td>
                  <td class="text-center">
                    <div class="btn-group">
                      <form action="{{ route('admin.booking.toggle',$q) }}" method="POST" class="d-inline">
                        @csrf @method('PATCH')
                        <button type="submit" class="btn btn-sm btn-light border" title="{{ $q->is_read ? 'Mark as Unread' : 'Mark as Read' }}">
                          @if($q->is_read)
                            <i class="ti ti-mail-opened text-success"></i>
                          @else
                            <i class="ti ti-mail text-danger"></i>
                          @endif
                        </button>
                      </form>
                      <form action="{{ route('admin.booking.destroy',$q) }}" method="POST" onsubmit="return confirm('Delete this query?')" class="d-inline">
                        @csrf @method('DELETE')
                        <button type="submit" class="btn btn-sm btn-light border" title="Delete">
                          <i class="ti ti-trash text-danger"></i>
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              @empty
                <tr><td colspan="8" class="text-center text-muted py-4">No queries yet.</td></tr>
              @endforelse
            </tbody>
          </table>
          <div class="mt-3">{{ $queries->links() }}</div>
        </div>
      </div>

    </div>
    <x-partials.footer />
  </div>

  <style>
    table.no-hover tbody tr:hover { background:#fff !important; } /* keep white on hover */
  </style>
  @endsection
</x-layout.layout>
