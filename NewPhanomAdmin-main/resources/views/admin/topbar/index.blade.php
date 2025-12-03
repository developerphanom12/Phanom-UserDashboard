{{-- resources/views/admin/topbar/index.blade.php --}}
<x-layout.layout>
    <x-slot name="title">Dashboard</x-slot>

    @push('styles')
    <style>
      /* ===== UI Polish ===== */
      .card-soft     { border:1px solid rgba(0,0,0,.08); border-radius:14px; box-shadow:0 6px 18px rgba(0,0,0,.04); }
      .badge-on      { background:rgba(25,135,84,.15); color:#198754; padding:.35rem .75rem; border-radius:30px; font-size:.75rem; }
      .badge-off     { background:rgba(220,53,69,.15); color:#dc3545; padding:.35rem .75rem; border-radius:30px; font-size:.75rem; }
      .btn-icon      { border-radius:50% !important; width:34px; height:34px; display:flex; align-items:center; justify-content:center; }
      .table thead th{ font-weight:600; font-size:.85rem; color:#6b7280; text-transform:uppercase; }
      .table td      { vertical-align:middle; }
      .form-control-sm, .form-select, .btn-sm { height:34px; }
    </style>
    @endpush

    @section('content')

    <div class="page-content">
      <div class="page-container">

        @if(session('ok'))
          <div class="alert alert-success">{{ session('ok') }}</div>
        @endif

        {{-- ================= TOPBAR LINKS ================= --}}
        <div class="card card-soft mb-4">
          <div class="card-body">
            <h5 class="fw-bold mb-3">Topbar Links</h5>

            <form action="{{ route('topbar.links.reorder') }}" method="POST" class="mb-3">
              @csrf
              <div class="table-responsive">
                <table class="table table-hover align-middle">
                  <thead class="table-light">
                    <tr>
                      <th style="width:80px">Order</th>
                      <th>Label</th>
                      <th>URL</th>
                      <th>Status</th>
                      <th class="text-end" style="width:150px;">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    @foreach($links as $l)
                      <tr>
                        <td><input type="number" class="form-control form-control-sm" name="order[]" value="{{ $l->id }}"></td>
                        <td class="fw-semibold">{{ $l->label }}</td>
                        <td><code>{{ $l->url }}</code></td>
                        <td>
                          @if($l->is_enabled)
                            <span class="badge-on">Enabled</span>
                          @else
                            <span class="badge-off">Disabled</span>
                          @endif
                          <form action="{{ route('topbar.links.toggle',$l) }}" method="POST" class="d-inline ms-1">
                            @csrf @method('PATCH')
                            <button class="btn btn-outline-secondary btn-sm btn-icon" type="submit" title="Toggle">
                              <i class="ti ti-switch-horizontal"></i>
                            </button>
                          </form>
                        </td>
                        <td class="text-end">
                          <div class="d-flex gap-2 justify-content-end">
                            <form action="{{ route('topbar.links.update',$l) }}" method="POST">
                              @csrf @method('PUT')
                              <button class="btn btn-dark btn-sm btn-icon" title="Save"><i class="ti ti-device-floppy"></i></button>
                            </form>
                            <form action="{{ route('topbar.links.destroy',$l) }}" method="POST" onsubmit="return confirm('Delete link?')">
                              @csrf @method('DELETE')
                              <button class="btn btn-danger btn-sm btn-icon" title="Delete"><i class="ti ti-trash"></i></button>
                            </form>
                          </div>
                        </td>
                      </tr>
                    @endforeach
                  </tbody>
                </table>
              </div>
              <div class="text-end">
                <button class="btn btn-outline-primary btn-sm"><i class="ti ti-arrows-sort"></i> Save Order</button>
              </div>
            </form>
          </div>
        </div>

        {{-- ================= SERVICE SECTIONS ================= --}}
        <div class="card card-soft">
          <div class="card-body">
            <h5 class="fw-bold mb-3">Service Sections & Items</h5>

            <form action="{{ route('topbar.sections.reorder') }}" method="POST">
              @csrf
              <div class="row g-3">
                @foreach($sections as $s)
                  <div class="col-md-6">
                    <div class="card card-soft h-100">
                      <div class="card-header d-flex justify-content-between align-items-center">
                        <div>
                          <strong>{{ $s->title }}</strong>
                          @if($s->is_enabled)
                            <span class="badge-on ms-2">Enabled</span>
                          @else
                            <span class="badge-off ms-2">Disabled</span>
                          @endif
                        </div>
                        <div class="d-flex gap-2">
                          <form action="{{ route('topbar.sections.update',$s) }}" method="POST">
                            @csrf @method('PUT')
                            <button class="btn btn-dark btn-sm btn-icon" title="Save"><i class="ti ti-device-floppy"></i></button>
                          </form>
                          <form action="{{ route('topbar.sections.toggle',$s) }}" method="POST">
                            @csrf @method('PATCH')
                            <button class="btn btn-outline-secondary btn-sm btn-icon" title="Toggle"><i class="ti ti-switch-horizontal"></i></button>
                          </form>
                        </div>
                      </div>
                      <div class="card-body">
                        <form action="{{ route('topbar.items.reorder',$s) }}" method="POST">
                          @csrf
                          <table class="table table-sm align-middle">
                            <thead class="table-light">
                              <tr>
                                <th>Order</th><th>Label</th><th>URL</th><th>Status</th><th class="text-end">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              @foreach($s->items as $it)
                                <tr>
                                  <td><input type="number" class="form-control form-control-sm" name="order[]" value="{{ $it->id }}"></td>
                                  <td>{{ $it->label }}</td>
                                  <td><code>{{ $it->url }}</code></td>
                                  <td>
                                    @if($it->is_enabled)
                                      <span class="badge-on">On</span>
                                    @else
                                      <span class="badge-off">Off</span>
                                    @endif
                                    <form action="{{ route('topbar.items.toggle',$it) }}" method="POST" class="d-inline ms-1">
                                      @csrf @method('PATCH')
                                      <button class="btn btn-outline-secondary btn-sm btn-icon" title="Toggle"><i class="ti ti-switch-horizontal"></i></button>
                                    </form>
                                  </td>
                                  <td class="text-end">
                                    <div class="d-flex gap-2 justify-content-end">
                                      <form action="{{ route('topbar.items.update',$it) }}" method="POST">
                                        @csrf @method('PUT')
                                        <button class="btn btn-dark btn-sm btn-icon" title="Save"><i class="ti ti-device-floppy"></i></button>
                                      </form>
                                      <form action="{{ route('topbar.items.destroy',$it) }}" method="POST" onsubmit="return confirm('Delete?')">
                                        @csrf @method('DELETE')
                                        <button class="btn btn-danger btn-sm btn-icon" title="Delete"><i class="ti ti-trash"></i></button>
                                      </form>
                                    </div>
                                  </td>
                                </tr>
                              @endforeach
                            </tbody>
                          </table>
                          <div class="text-end">
                            <button class="btn btn-outline-primary btn-sm"><i class="ti ti-arrows-sort"></i> Save Items Order</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                @endforeach
              </div>
              <div class="text-end mt-3">
                <button class="btn btn-outline-primary btn-sm"><i class="ti ti-arrows-sort"></i> Save Sections Order</button>
              </div>
            </form>
          </div>
        </div>

        <x-partials.footer />
      </div>
    </div>
    @endsection
</x-layout.layout>
