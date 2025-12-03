<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\FreelancerProfile;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FreelancerController extends Controller {

    // Save sign-up multi-step data (single endpoint: upsert)
    public function upsert(Request $req){
        $user = $req->user();

        // if no user, require email/password (create user)
        if(!$user){
            $data = $req->validate([
                'name'=>'required|string|max:120',
                'email'=>'required|email|unique:users,email',
                'password'=>'required|string|min:6',
            ]);

            $user = User::create([
                'name'=>$data['name'],
                'email'=>$data['email'],
                'password'=>bcrypt($data['password'])
            ]);
        }

        $payload = $req->only(['phone','dob','gender','location','category','subcategory','experience']);
        // handle uploads: expect array or object mapping filenames or URLs
        if($req->has('uploads')){
            $payload['uploads'] = $req->input('uploads'); // expect json from frontend
        }

        $profile = FreelancerProfile::updateOrCreate(
            ['user_id'=>$user->id],
            $payload
        );

        // save category if new
        if(!empty($profile->category)){
            Category::firstOrCreate(['name'=>$profile->category], ['slug'=>Str::slug($profile->category)]);
        }
        if(!empty($profile->subcategory)){
            Category::firstOrCreate(['name'=>$profile->subcategory], ['slug'=>Str::slug($profile->subcategory)]);
        }

        return response()->json(['ok'=>true,'profile'=>$profile,'user'=>$user]);
    }

    public function me(Request $req){
        $user = $req->user();
        $profile = $user->freelancerProfile;
        return response()->json(['user'=>$user,'profile'=>$profile]);
    }

    // mark test given
    public function markTestGiven(Request $req){
        $user = $req->user();
        $profile = $user->freelancerProfile;
        if(!$profile) return response()->json(['ok'=>false,'message'=>'Profile not found'],404);
        $profile->update(['test_given'=>true]);
        return response()->json(['ok'=>true,'profile'=>$profile]);
    }
}
