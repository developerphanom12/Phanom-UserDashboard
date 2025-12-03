<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SuggestionController extends Controller {
    // POST /api/suggestions { q: "front-end dev" }
    public function suggest(Request $req){
        $q = $req->validate(['q'=>'required|string|max:200'])['q'];

        // If OPENAI_API_KEY set, call OpenAI for suggestions
        $key = env('OPENAI_API_KEY');
        if(!$key){
            // fallback simple logic: return some static suggestions
            $static = [
                $q,
                $q . " - Frontend",
                $q . " - Backend",
                $q . " - Fullstack",
                "Senior " . $q
            ];
            return response()->json(['ok'=>true,'suggestions'=>$static]);
        }

        // Call OpenAI (Chat completions) — keep minimal
        $prompt = "Given the user typing a skill/category keyword: '{$q}', return 6 short concise category suggestions (comma-separated or JSON array) suitable for a freelancer platform.";

        // Using OpenAI Chat completions API (gpt-4). This is a minimal example.
        $resp = Http::withToken($key)->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4',
            'messages' => [
                ['role'=>'system','content'=>'You are a helpful assistant that suggests short freelance categories.'],
                ['role'=>'user','content'=>$prompt]
            ],
            'max_tokens' => 120,
            'temperature' => 0.8,
        ]);

        if(!$resp->ok()){
            return response()->json(['ok'=>false,'error'=>$resp->body()], 500);
        }

        $choices = $resp->json('choices.0.message.content') ?? '';
        // Try to parse as lines or comma separated
        $suggestions = preg_split("/[\r\n,]+/", strip_tags($choices));
        $suggestions = array_map('trim', $suggestions);
        $suggestions = array_filter($suggestions);

        return response()->json(['ok'=>true,'suggestions'=>array_values(array_slice($suggestions,0,8))]);
    }
}
