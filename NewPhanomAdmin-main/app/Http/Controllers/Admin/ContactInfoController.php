<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use Illuminate\Http\Request;

class ContactInfoController extends Controller
{
    public function edit()
    {
        $info = ContactInfo::first() ?? new ContactInfo();
        return view('admin.contact.edit', compact('info'));
    }

    public function update(Request $req)
    {
        $data = $req->validate([
            'phone'    => 'nullable|string|max:80',
            'email'    => 'nullable|email|max:191',
            'address'  => 'nullable|string|max:2000',
            'twitter'  => 'nullable|url|max:191',
            'instagram'=> 'nullable|url|max:191',
            'linkedin' => 'nullable|url|max:191',
            'discord'  => 'nullable|url|max:191',
        ]);

        $info = ContactInfo::first();
        if (!$info) $info = new ContactInfo();

        $info->fill($data)->save();

        return back()->with('ok', 'Contact info saved.');
    }
}
