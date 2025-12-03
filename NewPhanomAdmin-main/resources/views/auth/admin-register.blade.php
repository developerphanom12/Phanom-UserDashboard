{{-- resources/views/auth/admin-register.blade.php --}}
<x-partials.html />

<head>
    <x-partials.title-meta :title="'Admin Setup'" />
    <x-partials.head-css />
</head>

<body>
<div class="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
    <div class="row g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <div class="card overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
                <a href="{{ route('admin.login.show') }}" class="auth-brand mb-3">
                    <img src="{{ asset('assets/images/logo-sm.svg') }}" alt="logo" height="60">
                </a>

                <h4 class="fw-semibold mb-2">Initial Admin Setup</h4>
                <p class="text-muted mb-4">Create the first admin account.</p>

                <form action="{{ route('admin.register') }}" method="POST" class="text-start mb-3">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label" for="name">Name</label>
                        <input id="name" name="name" type="text" class="form-control"
                               placeholder="Admin name" value="{{ old('name') }}" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="email">Email</label>
                        <input id="email" name="email" type="email" class="form-control"
                               placeholder="admin@example.com" value="{{ old('email') }}" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="password">Password</label>
                        <input id="password" name="password" type="password" class="form-control"
                               placeholder="Minimum 6 characters" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="password_confirmation">Confirm Password</label>
                        <input id="password_confirmation" name="password_confirmation" type="password"
                               class="form-control" required>
                    </div>

                    <div class="d-grid">
                        <button class="btn btn-primary" type="submit">Create Admin</button>
                    </div>

                    @if ($errors->any())
                        <div class="alert alert-danger mt-3">
                            <ul class="mb-0">
                                @foreach ($errors->all() as $err)
                                    <li>{{ $err }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif
                </form>
            </div>
        </div>
    </div>
</div>

<x-partials.footer-scripts />
</body>
</html>
