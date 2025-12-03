<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    // --- Login ---
    public function showLogin()
    {
        return view('auth.admin-login');
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email'    => ['required','email'],
            'password' => ['required','string','min:6'],
        ]);

        $admin = Admin::where('email', $validated['email'])->first();
        if (!$admin || !Hash::check($validated['password'], $admin->password)) {
            return back()->withInput()->with('login_error', 'Invalid credentials.');
        }

        // Store in session
        session([
            'admin_id'   => $admin->id,
            'admin_name' => $admin->name,
            'admin_email'=> $admin->email,
        ]);

        return redirect()->route('dashboard');
    }

    public function logout()
    {
        session()->forget(['admin_id','admin_name','admin_email']);
        session()->invalidate();
        session()->regenerateToken();
        return redirect()->route('admin.login.show');
    }

    // --- Hidden Registration ---
    // Only show if there is NO admin yet (keeps it "hidden"/one-time setup)
    public function showRegister()
    {
        if (Admin::count() > 0) {
            abort(404); // hide once an admin exists
        }
        return view('auth.admin-register');
    }

    public function register(Request $request)
    {
        if (Admin::count() > 0) {
            abort(404);
        }

        $validated = $request->validate([
            'name'     => ['required','string','max:100'],
            'email'    => ['required','email','max:150','unique:admins,email'],
            'password' => ['required','string','min:6','confirmed'],
        ]);

        $admin = Admin::create([
            'name'     => $validated['name'],
            'email'    => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Auto-login after register
        session([
            'admin_id'   => $admin->id,
            'admin_name' => $admin->name,
            'admin_email'=> $admin->email,
        ]);

        return redirect()->route('dashboard');
    }
}
