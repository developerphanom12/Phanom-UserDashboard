<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileUploadController extends Controller
{
    /**
     * Upload a file and return its URL
     */
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // 10MB max
            'type' => 'required|string', // portfolio, aadhar, pan
            'session_id' => 'required|string',
        ]);

        $file = $request->file('file');
        $type = $request->input('type');
        $sessionId = $request->input('session_id');
        
        // Create a unique filename
        $filename = $sessionId . '_' . $type . '_' . time() . '.' . $file->getClientOriginalExtension();
        
        // Store in public/uploads directory
        $path = $file->storeAs('uploads/user-documents', $filename, 'public');
        
        // Generate URL
        $url = asset('storage/' . $path);
        
        return response()->json([
            'ok' => true,
            'filename' => $file->getClientOriginalName(),
            'path' => $path,
            'url' => $url,
            'type' => $type,
        ]);
    }
}

