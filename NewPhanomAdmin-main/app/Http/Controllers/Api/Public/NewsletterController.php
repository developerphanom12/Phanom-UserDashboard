<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function subscribe(Request $r) {
        $data = $r->validate(['email'=>'required|email:rfc,dns|max:191']);
        $sub = NewsletterSubscriber::firstOrCreate(['email'=>$data['email']]);
        return response()->json(['ok'=>true,'id'=>$sub->id,'message'=>'Subscribed successfully']);
    }
}

