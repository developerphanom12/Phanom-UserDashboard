<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UserProgress;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MockTrailController extends Controller
{
    private $apiKey;
    private $baseUrl = 'https://api.mocktrail.app';
    private $webhookBaseUrl;

    public function __construct()
    {
        $this->apiKey = env('MOCKTRAIL_API_KEY', '');
        // Use WEBHOOK_URL if set (for ngrok/production), otherwise fall back to APP_URL
        $this->webhookBaseUrl = env('WEBHOOK_URL', env('APP_URL', 'http://127.0.0.1:8000'));
    }

    /**
     * Create interview session for a user
     */
    public function createInterview(Request $req)
    {
        $user = $req->user();
        
        if (!$user) {
            return response()->json(['ok' => false, 'message' => 'Unauthorized'], 401);
        }

        // Get freelancer profile for category/subcategory
        $freelancerProfile = $user->freelancerProfile;
        $testScore = $freelancerProfile->test_score ?? 0;

        // Get user progress (for additional data)
        $progress = UserProgress::where('user_id', $user->id)->first();
        
        if (!$progress) {
            // Try to find by email
            $progress = UserProgress::where('email', $user->email)->first();
        }

        // Check if interview already exists
        if ($progress && $progress->interview_url && $progress->interview_status !== 'failed') {
            return response()->json([
                'ok' => true,
                'interview_url' => $progress->interview_url,
                'status' => $progress->interview_status,
                'message' => 'Interview already scheduled',
            ]);
        }

        // Generate unique ID for this interview
        $uniqueId = 'phanom_' . $user->id . '_' . time();
        
        // Create interview config with MockTrail - get data from progress or freelancerProfile
        $category = $progress->category ?? $freelancerProfile->category ?? 'General';
        $subcategory = $progress->subcategory ?? $freelancerProfile->subcategory ?? 'General';
        $experience = $progress->experience ?? $freelancerProfile->experience ?? 'Entry Level';

        $systemPrompt = "You are an expert technical interviewer for Phanom Professionals. 
You are interviewing a candidate for a {$category} - {$subcategory} role with {$experience} experience level.
Be professional, friendly, and thorough. Ask relevant technical questions about {$subcategory}.
Start with an introduction, then ask 3-5 technical questions based on their experience level.
Allow the candidate to explain their thought process and probe deeper when needed.
End by asking if they have any questions about the role.";

        $feedbackInstructions = "Evaluate the candidate on the following criteria:
1. Technical Knowledge (0-100): Understanding of {$subcategory} concepts and best practices
2. Communication Skills (0-100): Clarity of expression and ability to explain technical concepts
3. Problem Solving (0-100): Approach to tackling problems and thinking through solutions
4. Experience Relevance (0-100): How well their experience matches the {$category} - {$subcategory} role
5. Overall Recommendation: Whether to recommend the candidate for the next round

Provide specific examples from the interview to support your evaluation.";

        $payload = [
            'unique_id' => $uniqueId,
            'system_prompt' => $systemPrompt,
            'feedback_instructions' => $feedbackInstructions,
            'feedback_schema' => [
                'technicalScore' => ['type' => 'number', 'description' => 'Technical knowledge score 0-100'],
                'communicationScore' => ['type' => 'number', 'description' => 'Communication skills score 0-100'],
                'problemSolvingScore' => ['type' => 'number', 'description' => 'Problem solving score 0-100'],
                'experienceScore' => ['type' => 'number', 'description' => 'Experience relevance score 0-100'],
                'overallScore' => ['type' => 'number', 'description' => 'Overall score 0-100'],
                'summary' => ['type' => 'string', 'description' => 'Brief interview summary'],
                'strengths' => ['type' => 'array', 'description' => 'List of candidate strengths'],
                'areasToImprove' => ['type' => 'array', 'description' => 'Areas where candidate can improve'],
                'recommendation' => ['type' => 'string', 'description' => 'Hire recommendation: recommended, maybe, not_recommended'],
            ],
            'webhook_url' => $this->webhookBaseUrl . '/api/mocktrail/webhook',
            'company_details' => [
                'name' => 'Phanom Professionals',
                'photoUrl' => 'https://www.phanomprofessionals.com/assets/logo-CNCxeMLZ.png',
            ],
            'candidate' => [
                'name' => $progress->name ?? $user->name,
                'photoUrl' => null,
            ],
            'metadata' => [
                'user_id' => $user->id,
                'progress_id' => $progress->id ?? null,
                'category' => $category,
                'subcategory' => $subcategory,
                'experience' => $experience,
            ],
        ];

        try {
            // Create or get progress record for storing interview data
            if (!$progress) {
                $progress = UserProgress::create([
                    'session_id' => 'interview_' . $user->id . '_' . time(),
                    'user_id' => $user->id,
                    'email' => $user->email,
                    'name' => $user->name,
                    'category' => $category,
                    'subcategory' => $subcategory,
                    'experience' => $experience,
                    'is_registered' => true,
                    'is_paid' => true,
                    'test_passed' => true,
                    'test_score' => $testScore,
                    'current_step' => 4,
                ]);
            }

            // Check if API key is set
            if (empty($this->apiKey)) {
                // No API key - return error with instructions
                return response()->json([
                    'ok' => false,
                    'message' => 'MockTrail API key not configured. Please add MOCKTRAIL_API_KEY to your .env file.',
                    'fallback_url' => '/technicalround', // Frontend can redirect here instead
                    'dev_mode' => true,
                ], 400);
            }

            $response = Http::withHeaders([
                'x-api-key' => $this->apiKey,
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl . '/implementor/interview-config', $payload);

            if ($response->successful()) {
                $data = $response->json();
                
                // Handle nested response: { data: { data: { interview_url, ... } } }
                $interviewData = $data['data']['data'] ?? $data['data'] ?? $data;
                $interviewUrl = $interviewData['interview_url'] ?? null;
                
                if (!$interviewUrl) {
                    Log::error('MockTrail: No interview_url in response', $data);
                    return response()->json([
                        'ok' => false,
                        'message' => 'Invalid response from interview service',
                    ], 500);
                }
                
                $progress->update([
                    'interview_unique_id' => $interviewData['unique_id'] ?? $uniqueId,
                    'interview_url' => $interviewUrl,
                    'interview_status' => 'scheduled',
                ]);

                return response()->json([
                    'ok' => true,
                    'interview_url' => $interviewUrl,
                    'unique_id' => $interviewData['unique_id'] ?? $uniqueId,
                    'expires_at' => $interviewData['expires_at'] ?? null,
                    'message' => 'Interview scheduled successfully',
                ]);
            } else {
                Log::error('MockTrail API Error', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
                
                return response()->json([
                    'ok' => false,
                    'message' => 'Failed to create interview session',
                    'error' => $response->json()['message'] ?? 'Unknown error',
                ], 500);
            }
        } catch (\Exception $e) {
            Log::error('MockTrail Exception', ['error' => $e->getMessage()]);
            
            return response()->json([
                'ok' => false,
                'message' => 'Error connecting to interview service',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Webhook endpoint to receive interview results from MockTrail
     */
    public function webhook(Request $req)
    {
        Log::info('MockTrail Webhook Received', $req->all());

        $uniqueId = $req->input('unique_id');
        $feedback = $req->input('feedback');
        $transcript = $req->input('transcript');
        $durationMinutes = $req->input('duration_minutes');

        if (!$uniqueId) {
            return response()->json(['error' => 'Missing unique_id'], 400);
        }

        // Find the user progress by interview unique ID
        $progress = UserProgress::where('interview_unique_id', $uniqueId)->first();

        if (!$progress) {
            Log::warning('MockTrail Webhook: Progress not found', ['unique_id' => $uniqueId]);
            return response()->json(['error' => 'Session not found'], 404);
        }

        // Update progress with interview results
        $progress->update([
                    'interview_status' => 'completed',
                    'interview_score' => $feedback['overallScore'] ?? null,
            'interview_summary' => $feedback['summary'] ?? null,
            'interview_feedback' => $feedback,
            'interview_transcript' => $transcript,
            'interview_duration_minutes' => $durationMinutes,
            'interview_completed_at' => now(),
            ]);

        Log::info('MockTrail Webhook Processed', [
                'unique_id' => $uniqueId,
            'score' => $feedback['overallScore'] ?? null,
            ]);
            
        return response()->json(['ok' => true, 'message' => 'Webhook processed']);
    }

    /**
     * Get interview status for a user
     */
    public function getStatus(Request $req)
    {
        $user = $req->user();
        
        if (!$user) {
            return response()->json(['ok' => false, 'message' => 'Unauthorized'], 401);
        }

        $progress = UserProgress::where('user_id', $user->id)
            ->orWhere('email', $user->email)
            ->first();

        if (!$progress) {
            return response()->json(['ok' => false, 'message' => 'Not found'], 404);
        }

        return response()->json([
            'ok' => true,
            'interview' => [
                'status' => $progress->interview_status,
                'url' => $progress->interview_url,
                'score' => $progress->interview_score,
                'summary' => $progress->interview_summary,
                'feedback' => $progress->interview_feedback,
                'duration_minutes' => $progress->interview_duration_minutes,
                'completed_at' => $progress->interview_completed_at,
            ],
        ]);
    }

    /**
     * Save interview results from frontend (fallback for webhook)
     * Called when MockTrail postMessage sends feedback data
     */
    public function saveResults(Request $req)
    {
        $user = $req->user();
        
        if (!$user) {
            return response()->json(['ok' => false, 'message' => 'Unauthorized'], 401);
        }

        $feedback = $req->input('feedback');
        $interviewId = $req->input('interview_id');

        Log::info('Interview Save Results Called', [
            'user_id' => $user->id,
            'interview_id' => $interviewId,
            'feedback' => $feedback,
        ]);

        // Find user progress
        $progress = UserProgress::where('user_id', $user->id)->first();
        
        if (!$progress) {
            $progress = UserProgress::where('email', $user->email)->first();
        }

        if (!$progress) {
            // Try to find by interview_unique_id if provided
            if ($interviewId) {
                $progress = UserProgress::where('interview_unique_id', $interviewId)->first();
            }
        }

        if (!$progress) {
            Log::warning('Interview Save Results: No progress found', [
                'user_id' => $user->id,
                'email' => $user->email,
            ]);
            return response()->json(['ok' => false, 'message' => 'User progress not found'], 404);
        }

        // Don't overwrite if webhook already populated the data
        if ($progress->interview_status === 'completed' && $progress->interview_feedback) {
            Log::info('Interview results already saved via webhook', ['progress_id' => $progress->id]);
            return response()->json([
                'ok' => true,
                'message' => 'Results already saved',
                'feedback' => $progress->interview_feedback,
            ]);
        }

        // Save the feedback data
        $updateData = [
            'interview_status' => 'completed',
            'interview_completed_at' => now(),
        ];

        if ($feedback) {
            $updateData['interview_score'] = $feedback['overallScore'] ?? null;
            $updateData['interview_summary'] = $feedback['summary'] ?? null;
            $updateData['interview_feedback'] = $feedback;
        }

        $progress->update($updateData);

        Log::info('Interview Results Saved from Frontend', [
            'progress_id' => $progress->id,
            'score' => $feedback['overallScore'] ?? null,
        ]);

        return response()->json([
            'ok' => true,
            'message' => 'Interview results saved successfully',
            'feedback' => $feedback,
        ]);
    }
}
