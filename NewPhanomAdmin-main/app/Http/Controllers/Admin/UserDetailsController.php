<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UserProgress;
use App\Models\User;
use Illuminate\Http\Request;

class UserDetailsController extends Controller
{
    public function index()
    {
        $userProgress = UserProgress::orderBy('updated_at', 'desc')->get();
        $registeredUsers = User::with('freelancerProfile')->orderBy('created_at', 'desc')->get();
        
        return view('admin.user-details', compact('userProgress', 'registeredUsers'));
    }
    
    public function show($id)
    {
        $progress = UserProgress::findOrFail($id);
        return view('admin.user-detail-show', compact('progress'));
    }
    
    public function destroy($id)
    {
        $progress = UserProgress::findOrFail($id);
        $progress->delete();
        
        return redirect()->route('admin.user-details.index')
            ->with('success', 'User progress deleted successfully.');
    }
}

