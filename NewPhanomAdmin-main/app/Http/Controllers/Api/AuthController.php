<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\FreelancerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller {
    // Register - creates both User and FreelancerProfile
    public function register(Request $req){
        $data = $req->validate([
            'name'=>'required|string|max:120',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|min:6',
        ]);

        // Create user
        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>bcrypt($data['password']),
        ]);

        // Create freelancer profile with all the signup data
        $profileData = [
            'user_id' => $user->id,
            'phone' => $req->input('phone'),
            'dob' => $req->input('dob'),
            'gender' => $req->input('gender'),
            'location' => $req->input('location'),
            'category' => $req->input('category'),
            'subcategory' => $req->input('subcategory'),
            'experience' => $req->input('experience'),
            'uploads' => $req->input('uploads'),
            'is_paid' => true, // They paid via Razorpay
            'test_given' => false,
        ];

        $profile = FreelancerProfile::create($profileData);

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'ok'=>true,
            'user'=>$user,
            'profile'=>$profile,
            'token'=>$token
        ],201);
    }

    // Login
    public function login(Request $req){
        $data = $req->validate([
            'email'=>'required|email',
            'password'=>'required|string'
        ]);

        $user = User::where('email',$data['email'])->first();
        if(!$user || !Hash::check($data['password'],$user->password)){
            throw ValidationException::withMessages(['email'=>'The provided credentials are incorrect.']);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        // include profile info
        $profile = $user->freelancerProfile ?? null;

        return response()->json([
            'ok'=>true,
            'user'=>$user,
            'profile'=>$profile,
            'token'=>$token,
        ]);
    }

    public function logout(Request $req){
        $req->user()->currentAccessToken()->delete();
        return response()->json(['ok'=>true]);
    }

    // Check if user already exists by email (for signup flow)
    public function verifyUserIfAlreadyExist(Request $req){
        $data = $req->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $data['email'])->first();

        if($user){
            return response()->json([
                'ok' => true,
                'exists' => true,
                'message' => 'A user with this email already exists.',
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email
                ]
            ]);
        }

        return response()->json([
            'ok' => true,
            'exists' => false,
            'message' => 'Email is available.'
        ]);
    }
}
