<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactQuery;

class ContactQueryController extends Controller
{
    public function index()
    {
        $queries = ContactQuery::latest()->paginate(20);
        return view('admin.queries.index', compact('queries'));
    }
    public function toggleRead(ContactQuery $query)
{
    $query->is_read = ! $query->is_read;
    $query->save();

    return back()->with('status', 'Updated');
}
}
