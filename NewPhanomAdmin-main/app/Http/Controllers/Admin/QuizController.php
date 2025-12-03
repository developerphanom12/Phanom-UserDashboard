<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use App\Models\QuizQuestion;
use App\Models\QuizOption;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    /**
     * Display quiz manager page
     */
    public function index()
    {
        $quizzes = Quiz::withCount('questions')
            ->orderBy('created_at', 'desc')
            ->get();
            
        return view('admin.quiz-manager', compact('quizzes'));
    }

    /**
     * Store a new quiz
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        $quiz = Quiz::create([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
            'is_published' => false,
        ]);

        return redirect()->route('admin.quiz.edit', $quiz->id)
            ->with('success', 'Quiz created successfully!');
    }

    /**
     * Show quiz editor
     */
    public function edit($id)
    {
        $quiz = Quiz::with(['questions.options'])->findOrFail($id);
        
        return view('admin.quiz-editor', compact('quiz'));
    }

    /**
     * Update quiz metadata
     */
    public function update(Request $request, $id)
    {
        $quiz = Quiz::findOrFail($id);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'header_image' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        $quiz->update($request->only(['title', 'description', 'header_image', 'category']));
        
        return response()->json(['ok' => true, 'quiz' => $quiz]);
    }

    /**
     * Delete a quiz
     */
    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();
        
        return redirect()->route('admin.quiz.index')
            ->with('success', 'Quiz deleted successfully!');
    }

    /**
     * Toggle publish status
     */
    public function togglePublish($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->is_published = !$quiz->is_published;
        $quiz->save();
        
        return response()->json([
            'ok' => true,
            'is_published' => $quiz->is_published,
        ]);
    }

    /**
     * Add a question to quiz
     */
    public function addQuestion(Request $request, $quizId)
    {
        $quiz = Quiz::findOrFail($quizId);
        
        $maxOrder = $quiz->questions()->max('sort_order') ?? 0;
        
        $question = QuizQuestion::create([
            'quiz_id' => $quizId,
            'question_text' => $request->question_text ?? '',
            'marks' => $request->marks ?? 1,
            'negative_marks' => $request->negative_marks ?? 0,
            'time_to_solve' => $request->time_to_solve ?? 60,
            'sort_order' => $maxOrder + 1,
        ]);

        // Create 4 default options
        for ($i = 0; $i < 4; $i++) {
            QuizOption::create([
                'quiz_question_id' => $question->id,
                'text' => '',
                'is_correct' => false,
                'sort_order' => $i,
            ]);
        }

        $question->load('options');
        $quiz->recalculateTotals();
        
        return response()->json(['ok' => true, 'question' => $question]);
    }

    /**
     * Update a question
     */
    public function updateQuestion(Request $request, $questionId)
    {
        $question = QuizQuestion::findOrFail($questionId);
        
        $question->update($request->only([
            'question_text',
            'question_image',
            'marks',
            'negative_marks',
            'time_to_solve',
            'explanation',
        ]));

        $question->quiz->recalculateTotals();
        
        return response()->json(['ok' => true, 'question' => $question]);
    }

    /**
     * Delete a question
     */
    public function deleteQuestion($questionId)
    {
        $question = QuizQuestion::findOrFail($questionId);
        $quiz = $question->quiz;
        $question->delete();
        $quiz->recalculateTotals();
        
        return response()->json(['ok' => true]);
    }

    /**
     * Update an option
     */
    public function updateOption(Request $request, $optionId)
    {
        $option = QuizOption::findOrFail($optionId);
        
        // If setting this option as correct, unset others
        if ($request->is_correct) {
            QuizOption::where('quiz_question_id', $option->quiz_question_id)
                ->where('id', '!=', $optionId)
                ->update(['is_correct' => false]);
        }
        
        $option->update($request->only(['text', 'image', 'is_correct']));
        
        return response()->json(['ok' => true, 'option' => $option]);
    }

    /**
     * Save entire quiz (questions and options)
     */
    public function saveQuiz(Request $request, $id)
    {
        try {
            $quiz = Quiz::findOrFail($id);
            
            // Update quiz metadata
            $quiz->update([
                'title' => $request->title,
                'description' => $request->description,
                'header_image' => $request->header_image,
                'category' => $request->category,
            ]);

            // Process questions
            if ($request->has('questions')) {
                // Delete existing questions and recreate
                $quiz->questions()->delete();
                
                foreach ($request->questions as $index => $qData) {
                    $question = QuizQuestion::create([
                        'quiz_id' => $quiz->id,
                        'question_text' => $qData['question_text'] ?? '',
                        'question_image' => $qData['question_image'] ?? null,
                        'marks' => (int)($qData['marks'] ?? 1),
                        'negative_marks' => (float)($qData['negative_marks'] ?? 0),
                        'time_to_solve' => (int)($qData['time_to_solve'] ?? 60),
                        'explanation' => $qData['explanation'] ?? null,
                        'sort_order' => $index,
                    ]);

                    // Create options
                    foreach ($qData['options'] ?? [] as $optIndex => $optData) {
                        QuizOption::create([
                            'quiz_question_id' => $question->id,
                            'text' => $optData['text'] ?? '',
                            'image' => $optData['image'] ?? null,
                            'is_correct' => (bool)($optData['is_correct'] ?? false),
                            'sort_order' => $optIndex,
                        ]);
                    }
                }
            }

            $quiz->recalculateTotals();
            
            return response()->json(['ok' => true, 'quiz' => $quiz->load('questions.options')]);
        } catch (\Exception $e) {
            \Log::error('Quiz save error: ' . $e->getMessage());
            return response()->json(['ok' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Get quiz data as JSON
     */
    public function getQuiz($id)
    {
        $quiz = Quiz::with(['questions.options'])->findOrFail($id);
        
        return response()->json(['ok' => true, 'quiz' => $quiz]);
    }
}

