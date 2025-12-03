<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;

class NewsletterController extends Controller
{
    public function index() {
        $subs = NewsletterSubscriber::latest()->paginate(30);
        return view('admin.blog.newsletter.index', compact('subs'));
    }
}
