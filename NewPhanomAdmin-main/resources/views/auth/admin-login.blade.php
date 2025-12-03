{{-- resources/views/auth/admin-login.blade.php --}}
<x-partials.html />

<head>
    <x-partials.title-meta :title="'Log In'" />
    <x-partials.head-css />
</head>

<body>
<div class="auth-bg d-flex min-vh-100 justify-content-center align-items-center">
    <div class="row g-0 justify-content-center w-100 m-xxl-5 px-xxl-4 m-3">
        <div class="col-xl-4 col-lg-5 col-md-6">
            <div class="card overflow-hidden text-center h-100 p-xxl-4 p-3 mb-0">
                <a href="{{ route('admin.login.show') }}" class="auth-brand mb-3">
                    <img src="{{ asset('assets/images/logo-sm.svg') }}" alt="dark logo" height="60" class="logo-dark">
                    <img src="{{ asset('assets/images/logo-sm.svg') }}" alt="logo light" height="60" class="logo-light">
                </a>

                <h4 class="fw-semibold mb-2">Login your account</h4>
                <p class="text-muted mb-4">Enter your email address and password to access admin panel.</p>

                <form action="{{ route('admin.login') }}" method="POST" class="text-start mb-3">
                    @csrf
                    <div class="mb-3">
                        <label class="form-label" for="email">Email</label>
                        <input type="email" id="email" name="email" class="form-control"
                               placeholder="Enter your email" value="{{ old('email') }}" required autofocus>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="password">Password</label>
                        <input type="password" id="password" name="password" class="form-control"
                               placeholder="Enter your password" required>
                    </div>

                    

                    <div class="d-grid">
                        <button class="btn btn-primary" type="submit">Login</button>
                    </div>

                    @if (session('login_error'))
                        <div class="mt-3 text-danger">{{ session('login_error') }}</div>
                    @endif
                    @error('email') <div class="text-danger mt-2">{{ $message }}</div> @enderror
                    @error('password') <div class="text-danger mt-2">{{ $message }}</div> @enderror
                </form>
            </div>
        </div>
    </div>
</div>

<x-partials.footer-scripts />
</body>
</html>
