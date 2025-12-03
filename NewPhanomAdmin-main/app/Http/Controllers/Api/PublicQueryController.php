<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactInfo;
use App\Models\Query;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;


class PublicQueryController extends Controller
{
    // GET /api/contact-info
    public function contact()
    {
        $info = ContactInfo::first();
        return response()->json($info ?: [
            'phone' => null, 'email' => null, 'address' => null,
            'twitter'=>null,'instagram'=>null,'linkedin'=>null,'discord'=>null
        ]);
    }

    // POST /api/queries  (form submission)
    public function store(Request $req)
    {
        $data = $req->validate([
            'firstName' => 'required|string|max:120',
            'lastName'  => 'nullable|string|max:120',
            'email'     => 'required|email|max:191',
            'phoneNumber' => 'nullable|string|max:60',
            'service'   => 'required|string|max:120',   // fullstack/design/ecommerce/marketing
            'message'   => 'required|string|max:5000',
        ]);

        $payload = [
            'first_name'  => $data['firstName'],
            'last_name'   => $data['lastName'] ?? null,
            'email'       => $data['email'],
            'phone'       => $data['phoneNumber'] ?? null,
            'service_key' => $data['service'],
            'message'     => $data['message'],
            'is_read'     => false,
        ];

        // If you didn't keep virtual name column, also set:
         if (Schema::hasColumn('queries','name')) {
            $payload['name'] = trim(($data['firstName'] ?? '').' '.($data['lastName'] ?? ''));
        }

        $q = Query::create($payload);

        return response()->json([
            'ok' => true,
            'id' => $q->id,
            'message' => 'Thanks! We received your request.'
        ], 201);
    }
}
