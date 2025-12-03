<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\TopbarLink;
use App\Models\ServiceSection;
use App\Http\Controllers\Api\Admin\TopbarApiController;
use App\Http\Controllers\Api\Public\ContactController;
use App\Http\Controllers\Api\PublicQueryController;
use App\Http\Controllers\Api\Public\BlogController as PublicBlogController;
use App\Http\Controllers\Api\Public\NewsletterController as PublicNewsletterController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FreelancerController;
use App\Http\Controllers\Api\SuggestionController;
use App\Http\Controllers\Api\RazorpayController;
use App\Http\Controllers\Api\TestController;
use App\Http\Controllers\Api\UserProgressController;
use App\Http\Controllers\Api\FileUploadController;
use App\Http\Controllers\Api\MockTrailController;




// PUBLIC: fetch enabled links (sorted)
Route::get('/topbar', function () {
  return TopbarLink::where('is_enabled', true)->orderBy('sort_order')->get([
    'id','label','url','icon','is_external','target'
  ]);
});

// PUBLIC: fetch services structure (enabled only, sorted)
Route::get('/services', function () {
  return ServiceSection::where('is_enabled', true)
    ->orderBy('sort_order')
    ->with(['items' => function($q){
      $q->where('is_enabled', true)->orderBy('sort_order')->get(['id','label','url','service_section_id']);
    }])
    ->get(['id','title']);
});


Route::middleware('auth:sanctum') // ya JWT middleware
  ->prefix('admin')
  ->group(function () {
    // Links
    Route::get('/topbar/links', [TopbarApiController::class,'linksIndex']);
    Route::post('/topbar/links', [TopbarApiController::class,'linksStore']);
    Route::put('/topbar/links/{link}', [TopbarApiController::class,'linksUpdate']);
    Route::patch('/topbar/links/{link}/toggle', [TopbarApiController::class,'linksToggle']);
    Route::post('/topbar/links/reorder', [TopbarApiController::class,'linksReorder']);
    Route::delete('/topbar/links/{link}', [TopbarApiController::class,'linksDestroy']);

    // Sections
    Route::get('/services/sections', [TopbarApiController::class,'sectionsIndex']);
    Route::post('/services/sections', [TopbarApiController::class,'sectionsStore']);
    Route::put('/services/sections/{section}', [TopbarApiController::class,'sectionsUpdate']);
    Route::patch('/services/sections/{section}/toggle', [TopbarApiController::class,'sectionsToggle']);
    Route::post('/services/sections/reorder', [TopbarApiController::class,'sectionsReorder']);
    Route::delete('/services/sections/{section}', [TopbarApiController::class,'sectionsDestroy']);

    // Items
    Route::get('/services/sections/{section}/items', [TopbarApiController::class,'itemsIndex']);
    Route::post('/services/sections/{section}/items', [TopbarApiController::class,'itemsStore']);
    Route::put('/services/items/{item}', [TopbarApiController::class,'itemsUpdate']);
    Route::patch('/services/items/{item}/toggle', [TopbarApiController::class,'itemsToggle']);
    Route::post('/services/sections/{section}/items/reorder', [TopbarApiController::class,'itemsReorder']);
    Route::delete('/services/items/{item}', [TopbarApiController::class,'itemsDestroy']);
});


Route::post('/contact', [ContactController::class, 'store']);
Route::post('/booking-appointments', [PublicQueryController::class,'store']);
Route::get('/contact-info', [PublicQueryController::class,'contact']);

Route::prefix('blog')->group(function () {
    Route::get('/categories', [PublicBlogController::class,'categories']);
    Route::get('/posts', [PublicBlogController::class,'posts']);              // ?page=&per_page=&category=&search=
    Route::get('/posts/{slug}', [PublicBlogController::class,'show']);
});

Route::post('/newsletter/subscribe', [PublicNewsletterController::class,'subscribe']);




Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);
Route::post('/verifyUserIfAlreadyExist', [AuthController::class,'verifyUserIfAlreadyExist']); // Check if email exists
Route::post('/suggestions', [SuggestionController::class,'suggest']); // OpenAI suggestions
Route::post('/razorpay/order', [RazorpayController::class,'createOrder']); // can be public but better auth
Route::post('/razorpay/verify', [RazorpayController::class,'verify']);

// User Progress (public - saves signup progress before registration)
Route::post('/user-progress/save', [UserProgressController::class,'saveProgress']);
Route::post('/user-progress/registered', [UserProgressController::class,'markRegistered']);

// File Upload
Route::post('/upload', [FileUploadController::class,'upload']);

// MockTrail Interview Webhook (public - called by MockTrail)
Route::post('/mocktrail/webhook', [MockTrailController::class,'webhook']);

// Public API for signup form config (categories/subcategories)
Route::get('/signup-config/categories', function () {
    return App\Models\CategorySubcategory::where('is_active', true)
        ->orderBy('category_name')
        ->get(['id', 'category_name', 'subcategories']);
});

// Public API to get form field configuration
Route::get('/signup-config/fields', function () {
    return App\Models\SignupFormConfig::where('is_active', true)
        ->orderBy('step_number')
        ->orderBy('sort_order')
        ->get(['step_number', 'field_name', 'field_label', 'field_type', 'is_required', 'placeholder', 'options']);
});

// Public API to check if quiz is available and get questions
Route::get('/quiz/available', function () {
    $quiz = App\Models\Quiz::where('is_published', true)
        ->with(['questions.options'])
        ->first();
    
    if (!$quiz || $quiz->questions->count() === 0) {
        return response()->json([
            'available' => false,
            'quiz' => null,
        ]);
    }
    
    // Format questions for the test page
    $questions = $quiz->questions->map(function ($q) {
        return [
            'question' => $q->question_text,
            'options' => $q->options->pluck('text')->toArray(),
            'correct' => $q->options->search(fn($opt) => $opt->is_correct),
            'marks' => $q->marks,
        ];
    });
    
    return response()->json([
        'available' => true,
        'quiz' => [
            'id' => $quiz->id,
            'title' => $quiz->title,
            'description' => $quiz->description,
            'total_duration' => $quiz->total_duration,
            'total_questions' => $quiz->questions->count(),
            'total_marks' => $quiz->total_marks,
        ],
        'questions' => $questions,
    ]);
});

// Booking / contact etc can be here too...

// Protected routes (token)
Route::middleware('auth:sanctum')->group(function(){
    Route::post('/logout', [AuthController::class,'logout']);
    Route::post('/freelancer/upsert', [FreelancerController::class,'upsert']);
    Route::get('/freelancer/me', [FreelancerController::class,'me']);
    Route::post('/freelancer/mark-test', [FreelancerController::class,'markTestGiven']);

    // Razorpay endpoints for auth users
    Route::post('/razorpay/order/auth', [RazorpayController::class,'createOrder']);
    Route::post('/razorpay/verify/auth', [RazorpayController::class,'verify']);

    // Tests
    Route::get('/test/status', [TestController::class,'status']);
    Route::post('/test/submit', [TestController::class,'submit']);
    Route::get('/user/questions', [TestController::class,'questions']); // AI-generated test questions
    Route::post('/user-progress/test-results', [UserProgressController::class,'saveTestResults']); // Save test results
    
    // MockTrail Interview
    Route::post('/interview/create', [MockTrailController::class,'createInterview']);
    Route::get('/interview/status', [MockTrailController::class,'getStatus']);
    Route::post('/interview/save-results', [MockTrailController::class,'saveResults']);
});
