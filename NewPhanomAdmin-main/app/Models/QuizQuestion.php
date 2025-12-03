<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'quiz_id',
        'question_text',
        'question_image',
        'marks',
        'negative_marks',
        'time_to_solve',
        'explanation',
        'sort_order',
    ];

    protected $casts = [
        'marks' => 'integer',
        'negative_marks' => 'decimal:2',
        'time_to_solve' => 'integer',
        'sort_order' => 'integer',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function options()
    {
        return $this->hasMany(QuizOption::class)->orderBy('sort_order');
    }

    // Get the correct option
    public function correctOption()
    {
        return $this->options()->where('is_correct', true)->first();
    }
}

