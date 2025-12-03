<x-layout.layout>
  <x-slot name="title">Contact Info</x-slot>

  @section('content')
  <div class="page-content">
    <div class="page-container">

      @if(session('ok'))<div class="alert alert-success">{{ session('ok') }}</div>@endif
      @if($errors->any())
        <div class="alert alert-danger"><ul class="mb-0">@foreach($errors->all() as $e)<li>{{ $e }}</li>@endforeach</ul></div>
      @endif

      <div class="row">
        <div class="col-12">
          <div class="page-title-head d-flex align-items-sm-center flex-sm-row flex-column mb-3">
            <div class="flex-grow-1">
              <h4 class="fs-18 text-uppercase fw-bold m-0">Contact Information</h4>
              <p class="text-muted small mb-0">Controls the left panel on Book Appointment page (React)</p>
            </div>
          </div>
        </div>
      </div>

      <form action="{{ route('admin.contact.update') }}" method="POST" class="card shadow-sm border-0">
        @csrf
        <div class="card-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">Phone</label>
              <input type="text" name="phone" class="form-control" value="{{ old('phone',$info->phone) }}">
            </div>
            <div class="col-md-6">
              <label class="form-label">Email</label>
              <input type="email" name="email" class="form-control" value="{{ old('email',$info->email) }}">
            </div>
            <div class="col-12">
              <label class="form-label">Address</label>
              <textarea name="address" class="form-control" rows="3">{{ old('address',$info->address) }}</textarea>
            </div>

            <div class="col-md-6">
              <label class="form-label">Twitter</label>
              <input type="url" name="twitter" class="form-control" value="{{ old('twitter',$info->twitter) }}">
            </div>
            <div class="col-md-6">
              <label class="form-label">Instagram</label>
              <input type="url" name="instagram" class="form-control" value="{{ old('instagram',$info->instagram) }}">
            </div>
            <div class="col-md-6">
              <label class="form-label">LinkedIn</label>
              <input type="url" name="linkedin" class="form-control" value="{{ old('linkedin',$info->linkedin) }}">
            </div>
            <div class="col-md-6">
              <label class="form-label">Discord</label>
              <input type="url" name="discord" class="form-control" value="{{ old('discord',$info->discord) }}">
            </div>
          </div>
        </div>
        <div class="card-footer d-flex justify-content-end gap-2">
          <button class="btn btn-primary"><i class="ti ti-device-floppy me-1"></i>Save</button>
        </div>
      </form>

    </div>
    <x-partials.footer />
  </div>
  @endsection
</x-layout.layout>
