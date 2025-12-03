<div class="sidenav-menu">

    <!-- Brand Logo -->
    <a href="{{ url('/') }}" class="logo">
        <span class="logo-light">
            <span class="logo-lg">
                <img src="{{ asset('assets/images/logo-sm.svg') }}" alt="logo" style="height:60px;">
            </span>
            <span class="logo-sm text-center">
                <img src="{{ asset('assets/images/logo-sm.svg') }}" alt="small logo" style="height:30px;">
            </span>
        </span>

        <span class="logo-dark">
            <span class="logo-lg">
                <img src="{{ asset('assets/images/logo-sm.svg') }}" alt="dark logo" style="height:60px;">
            </span>
            <span class="logo-sm text-center">
                <img src="{{ asset('assets/images/logo-sm.svg') }}" alt="small logo" style="height:30px;">
            </span>
        </span>
    </a>

    <!-- Sidebar Hover Menu Toggle Button -->
    <button type="button" class="button-sm-hover">
        <i class="ti ti-circle align-middle"></i>
    </button>

    <!-- Full Sidebar Menu Close Button -->
    <button type="button" class="button-close-fullsidebar">
        <i class="ti ti-x align-middle"></i>
    </button>

    <div data-simplebar>
        <ul class="side-nav">

            <!-- Dashboard -->
            <li class="side-nav-title mt-2">Dashboard</li>
            <li class="side-nav-item">
                <a href="{{ route('dashboard') }}"
                    class="side-nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                    <span class="menu-icon"><i class="ti ti-dashboard"></i></span>
                    <span class="menu-text"> Dashboard </span>
                </a>
            </li>

            <!-- Users -->
            <li class="side-nav-title mt-2">Users</li>
            <li class="side-nav-item">
                <a href="{{ route('admin.user-details.index') }}"
                    class="side-nav-link {{ request()->routeIs('admin.user-details.*') ? 'active' : '' }}">
                    <span class="menu-icon"><i class="ti ti-users"></i></span>
                    <span class="menu-text"> User Details </span>
                </a>
            </li>

            <!-- Quizzes -->
            <li class="side-nav-title mt-2">Quizzes</li>
            <li class="side-nav-item">
                <a href="{{ route('admin.quiz.index') }}"
                    class="side-nav-link {{ request()->routeIs('admin.quiz.*') ? 'active' : '' }}">
                    <span class="menu-icon"><i class="ti ti-file-text"></i></span>
                    <span class="menu-text"> Quiz Manager </span>
                </a>
            </li>

            <!-- Config -->
            <li class="side-nav-title mt-2">Configuration</li>
            <li class="side-nav-item">
                <a href="{{ route('admin.signup-config.index') }}"
                    class="side-nav-link {{ request()->routeIs('admin.signup-config.*') ? 'active' : '' }}">
                    <span class="menu-icon"><i class="ti ti-forms"></i></span>
                    <span class="menu-text"> Signup Form Config </span>
                </a>
            </li>

            <!-- Website -->
            <li class="side-nav-title mt-2">Website</li>

            <li class="side-nav-item">
  <a href="{{ route('admin.queries.index') }}"
     class="side-nav-link {{ request()->routeIs('admin.queries.*') ? 'active' : '' }}">
    <span class="menu-icon"><i class="ti ti-mail"></i></span>
    <span class="menu-text"> Queries </span>
  </a>
</li>


            <li class="side-nav-item">
                <a href="{{ route('topbar.index') }}"
                    class="side-nav-link {{ request()->routeIs('topbar.*') ? 'active' : '' }}">
                    <span class="menu-icon"><i class="ti ti-layout-navbar"></i></span>
                    <span class="menu-text"> Topbar </span>
                </a>
            </li>


          <li class="side-nav-item">
  <a href="{{ route('admin.booking.index') }}"
     class="side-nav-link {{ request()->routeIs('admin.booking.*') ? 'active' : '' }}">
    <span class="menu-icon"><i class="ti ti-calendar"></i></span>
    <span class="menu-text">Booking Appointments</span>
  </a>
</li>


<li class="side-nav-item">
  <a href="{{ route('admin.contact.edit') }}"
     class="side-nav-link {{ request()->routeIs('admin.contact.*') ? 'active' : '' }}">
    <span class="menu-icon"><i class="ti ti-address-book"></i></span>
    <span class="menu-text">Contact Info</span>
  </a>
</li>

<li class="side-nav-title mt-2">Blog</li>

<li class="side-nav-item">
  <a href="{{ route('admin.blog.categories.index') }}"
     class="side-nav-link {{ request()->is('admin/blog/categories*') ? 'active' : '' }}">
    <span class="menu-icon"><i class="ti ti-category"></i></span>
    <span class="menu-text">Categories</span>
  </a>
</li>

<li class="side-nav-item">
  <a href="{{ route('admin.blog.posts.index') }}"
     class="side-nav-link {{ request()->is('admin/blog/posts*') ? 'active' : '' }}">
    <span class="menu-icon"><i class="ti ti-article"></i></span>
    <span class="menu-text">Posts</span>
  </a>
</li>

<li class="side-nav-item">
  <a href="{{ route('admin.newsletter.index') }}"
     class="side-nav-link {{ request()->is('admin/newsletter*') ? 'active' : '' }}">
    <span class="menu-icon"><i class="ti ti-mail"></i></span>
    <span class="menu-text">Newsletter</span>
  </a>
</li>



        </ul>
        <div class="clearfix"></div>
    </div>
</div>
<!-- Sidenav Menu End -->
