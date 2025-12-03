<?php

namespace App\Http\Controllers\Api\Public;

use App\Http\Controllers\Controller;
use App\Models\ContactQuery;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ContactController extends Controller
{
    public function store(Request $req)
    {
        $data = $req->validate([
            'name'        => ['required','string','max:120'],
            'email'       => ['required','email','max:160'],
            'phone'       => ['nullable','string','max:60'],
            'timezone'    => ['nullable','string','max:60'],
            'meeting_at'  => ['nullable','date'],
            'service_key' => ['nullable','string','max:120'],
            'message'     => ['nullable','string','max:5000'],
            'source'      => ['nullable','string','max:60'],
        ]);

        $lead = ContactQuery::create($data);

        return response()->json([
            'ok' => true,
            'id' => $lead->id,
            'message' => 'Query saved',
        ], 201);
    }
}
