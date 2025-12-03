<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserProgress;
use Illuminate\Http\Request;

class UserProgressController extends Controller
{
    /**
     * Save or update user progress (called on each step)
     */
    public function saveProgress(Request $req)
    {
        $sessionId = $req->input('session_id');
        $email = $req->input('email');
        
        if (!$sessionId) {
            return response()->json(['ok' => false, 'message' => 'Session ID required'], 400);
        }

        // Check if this email already has a completed (paid) registration
        if ($email) {
            $existingPaid = UserProgress::where('email', $email)
                ->where('is_paid', true)
                ->where('session_id', '!=', $sessionId)
                ->first();
            
            if ($existingPaid) {
                return response()->json([
                    'ok' => false,
                    'locked' => true,
                    'message' => 'This email has already completed registration. Please login instead.',
                ], 400);
            }
        }

        // Check if current session is already paid - don't allow updates
        $existingProgress = UserProgress::where('session_id', $sessionId)->first();
        if ($existingProgress && $existingProgress->is_paid) {
            return response()->json([
                'ok' => false,
                'locked' => true,
                'message' => 'Your registration is already complete. Data cannot be modified.',
            ], 400);
        }

        // Find existing progress or create new
        $progress = UserProgress::updateOrCreate(
            ['session_id' => $sessionId],
            [
                'name' => $req->input('name'),
                'email' => $req->input('email'),
                'phone' => $req->input('phone'),
                'dob' => $req->input('dob'),
                'gender' => $req->input('gender'),
                'location' => $req->input('location'),
                'category' => $req->input('category'),
                'subcategory' => $req->input('subcategory'),
                'uploads' => $req->input('uploads'),
                'experience' => $req->input('experience'),
                'notable_projects' => $req->input('notableProjects'),
                'current_step' => $req->input('current_step', 1),
            ]
        );

        return response()->json([
            'ok' => true,
            'progress' => $progress,
        ]);
    }

    /**
     * Mark user as registered (after successful registration)
     */
    public function markRegistered(Request $req)
    {
        $sessionId = $req->input('session_id');
        $userId = $req->input('user_id');

        $progress = UserProgress::where('session_id', $sessionId)->first();
        
        if ($progress) {
            $progress->update([
                'user_id' => $userId,
                'is_registered' => true,
                'is_paid' => true,
            ]);
        }

        return response()->json(['ok' => true]);
    }

    /**
     * Save test results
     */
    public function saveTestResults(Request $req)
    {
        \Log::info('Saving test results', ['request_data' => $req->all()]);
        
        $user = $req->user();
        $userId = $user->id ?? $req->input('user_id');
        
        \Log::info('User info', ['user_id' => $userId, 'user_email' => $user->email ?? 'N/A']);
        
        $progress = UserProgress::where('user_id', $userId)->first();
        
        if (!$progress && $user) {
            // Try to find by email
            $progress = UserProgress::where('email', $user->email)->first();
        }
        
        if (!$progress) {
            // Try to find by session_id
            $sessionId = $req->input('session_id');
            if ($sessionId) {
                $progress = UserProgress::where('session_id', $sessionId)->first();
            }
        }

        if ($progress) {
            $progress->update([
                'test_score' => $req->input('score'),
                'test_passed' => $req->input('passed'),
                'correct_answers' => $req->input('correct_answers'),
                'total_questions' => $req->input('total_questions'),
                'test_responses' => $req->input('test_responses'), // Store detailed question responses
                'test_completed_at' => now(),
            ]);
            
            return response()->json(['ok' => true, 'message' => 'Test results saved successfully']);
        }

        // If still no progress found, create a new record
        if ($user) {
            $progress = UserProgress::create([
                'session_id' => 'test_' . $user->id . '_' . time(),
                'user_id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'is_registered' => true,
                'is_paid' => true,
                'current_step' => 4,
                'test_score' => $req->input('score'),
                'test_passed' => $req->input('passed'),
                'correct_answers' => $req->input('correct_answers'),
                'total_questions' => $req->input('total_questions'),
                'test_responses' => $req->input('test_responses'),
                'test_completed_at' => now(),
            ]);
            
            return response()->json(['ok' => true, 'message' => 'Test results saved (new record created)']);
        }

        return response()->json(['ok' => false, 'message' => 'Could not save test results'], 400);
    }
}

