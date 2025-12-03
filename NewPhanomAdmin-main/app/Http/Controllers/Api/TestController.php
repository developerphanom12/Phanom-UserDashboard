<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TestController extends Controller {
    // GET /api/test/status
    public function status(Request $req){
        $profile = $req->user()->freelancerProfile ?? null;
        return response()->json(['ok'=>true,'test_given'=>($profile->test_given ?? false)]);
    }

    // POST /api/test/submit  (for example, after user finishes test)
    public function submit(Request $req){
        $profile = $req->user()->freelancerProfile ?? null;
        if(!$profile) return response()->json(['ok'=>false,'message'=>'No profile'],404);

        // Here you might store results; for now just mark true
        $profile->update(['test_given'=>true]);
        return response()->json(['ok'=>true,'profile'=>$profile]);
    }

    // GET /api/user/questions - Generate AI test questions based on user's category/subcategory
    public function questions(Request $req){
        $user = $req->user();
        $profile = $user->freelancerProfile ?? null;

        if(!$profile){
            return response()->json([
                'ok' => false,
                'message' => 'User profile not found. Please complete your profile first.'
            ], 404);
        }

        $category = $profile->category ?? 'General';
        $subcategory = $profile->subcategory ?? 'General';

        // Try OpenAI if key is set
        $key = env('OPENAI_API_KEY');

        if($key){
            try {
                $prompt = "Generate 20 multiple choice questions for a freelancer test in the field of '{$category}' with specialization in '{$subcategory}'. 
                
Return the response as a valid JSON array where each question object has:
- 'question': the question text
- 'options': array of 4 possible answers
- 'correct': index of correct answer (0-3)
- 'category': '{$category}'
- 'subcategory': '{$subcategory}'

Only return the JSON array, no other text.";

                $resp = Http::withToken($key)
                    ->timeout(60)
                    ->post('https://api.openai.com/v1/chat/completions', [
                        'model' => 'gpt-4',
                        'messages' => [
                            ['role' => 'system', 'content' => 'You are a professional test question generator for freelancer skill assessments. Always return valid JSON.'],
                            ['role' => 'user', 'content' => $prompt]
                        ],
                        'max_tokens' => 3000,
                        'temperature' => 0.7,
                    ]);

                if($resp->ok()){
                    $content = $resp->json('choices.0.message.content') ?? '';
                    // Try to parse JSON from response
                    $content = trim($content);
                    // Remove markdown code blocks if present
                    $content = preg_replace('/^```json\s*/', '', $content);
                    $content = preg_replace('/\s*```$/', '', $content);
                    
                    $questions = json_decode($content, true);
                    
                    if(is_array($questions) && count($questions) > 0){
                        return response()->json([
                            'ok' => true,
                            'questions' => $questions,
                            'generated_by' => 'ai'
                        ]);
                    }
                }
            } catch(\Exception $e){
                // Fall through to static questions
            }
        }

        // Fallback: return static sample questions
        $staticQuestions = $this->getStaticQuestions($category, $subcategory);
        
        return response()->json([
            'ok' => true,
            'questions' => $staticQuestions,
            'generated_by' => 'static'
        ]);
    }

    // Static fallback questions generator
    private function getStaticQuestions($category, $subcategory){
        $questions = [];
        
        // Generate 20 generic questions based on category
        $baseQuestions = [
            [
                'question' => "What is the most important skill for a {$subcategory} professional?",
                'options' => ['Communication', 'Technical expertise', 'Time management', 'All of the above'],
                'correct' => 3
            ],
            [
                'question' => "How do you handle tight deadlines in {$category}?",
                'options' => ['Panic and rush', 'Plan and prioritize', 'Ask for extension always', 'Ignore them'],
                'correct' => 1
            ],
            [
                'question' => "What tools are essential for {$subcategory} work?",
                'options' => ['None needed', 'Industry-standard software', 'Only free tools', 'Random tools'],
                'correct' => 1
            ],
            [
                'question' => "How do you stay updated with {$category} trends?",
                'options' => ['I don\'t', 'Online courses and blogs', 'Ignore trends', 'Ask friends only'],
                'correct' => 1
            ],
            [
                'question' => "What makes a successful {$subcategory} freelancer?",
                'options' => ['Luck only', 'Skills and reliability', 'Low prices', 'Being aggressive'],
                'correct' => 1
            ],
            [
                'question' => "How do you handle client feedback in {$category}?",
                'options' => ['Ignore it', 'Accept and improve', 'Argue always', 'Get defensive'],
                'correct' => 1
            ],
            [
                'question' => "What is quality assurance in {$subcategory}?",
                'options' => ['Not important', 'Testing and validation', 'Optional step', 'Client\'s job'],
                'correct' => 1
            ],
            [
                'question' => "How do you price your {$category} services?",
                'options' => ['Random numbers', 'Based on value and market', 'Always lowest', 'Copy competitors'],
                'correct' => 1
            ],
            [
                'question' => "What is the role of documentation in {$subcategory}?",
                'options' => ['Waste of time', 'Essential for clarity', 'Only for big projects', 'Not needed'],
                'correct' => 1
            ],
            [
                'question' => "How do you manage multiple {$category} projects?",
                'options' => ['One at a time only', 'Project management tools', 'Memory only', 'Don\'t manage'],
                'correct' => 1
            ],
            [
                'question' => "What is client communication best practice in {$subcategory}?",
                'options' => ['Reply once a week', 'Regular and clear updates', 'Only when asked', 'Avoid communication'],
                'correct' => 1
            ],
            [
                'question' => "How do you handle revisions in {$category}?",
                'options' => ['Refuse all', 'Set clear limits upfront', 'Unlimited free revisions', 'Charge extra always'],
                'correct' => 1
            ],
            [
                'question' => "What makes a strong portfolio for {$subcategory}?",
                'options' => ['Quantity over quality', 'Quality work samples', 'No portfolio needed', 'Copy others\' work'],
                'correct' => 1
            ],
            [
                'question' => "How important is deadline adherence in {$category}?",
                'options' => ['Not important', 'Critical for reputation', 'Sometimes okay to miss', 'Client can wait'],
                'correct' => 1
            ],
            [
                'question' => "What is scope creep in {$subcategory} projects?",
                'options' => ['Good thing', 'Uncontrolled project expansion', 'Normal behavior', 'Client right'],
                'correct' => 1
            ],
            [
                'question' => "How do you maintain work-life balance as a {$category} freelancer?",
                'options' => ['Work 24/7', 'Set boundaries', 'No balance needed', 'Work when feeling like'],
                'correct' => 1
            ],
            [
                'question' => "What is the importance of contracts in {$subcategory}?",
                'options' => ['Not needed', 'Protects both parties', 'Only for big clients', 'Waste of time'],
                'correct' => 1
            ],
            [
                'question' => "How do you handle difficult clients in {$category}?",
                'options' => ['Fight back', 'Professional communication', 'Quit immediately', 'Ignore them'],
                'correct' => 1
            ],
            [
                'question' => "What is continuous learning in {$subcategory}?",
                'options' => ['Not needed once skilled', 'Ongoing skill development', 'Only for beginners', 'Waste of money'],
                'correct' => 1
            ],
            [
                'question' => "How do you ensure client satisfaction in {$category}?",
                'options' => ['Deliver and forget', 'Exceed expectations', 'Do minimum required', 'Hope for the best'],
                'correct' => 1
            ]
        ];

        foreach($baseQuestions as $q){
            $q['category'] = $category;
            $q['subcategory'] = $subcategory;
            $questions[] = $q;
        }

        return $questions;
    }
}
