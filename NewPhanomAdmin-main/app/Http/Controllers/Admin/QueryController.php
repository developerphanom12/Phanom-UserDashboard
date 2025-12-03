<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Query;
use Illuminate\Http\Request;

class QueryController extends Controller
{
    public function index()
    {
        $queries = Query::latest()->paginate(15);
        return view('admin.booking.index', compact('queries'));
    }

    public function toggle(Query $query)
    {
        $query->is_read = !$query->is_read;
        $query->save();

        return redirect()->back()->with('ok', 'Status updated.');
    }

    public function destroy(Query $query)
    {
        $query->delete();
        return redirect()->back()->with('ok', 'Query deleted.');
    }
}
