<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'header_image',
        'total_duration',
        'total_questions',
        'total_marks',
        'is_published',
        'created_by',
        'category',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'total_duration' => 'integer',
        'total_questions' => 'integer',
        'total_marks' => 'integer',
    ];

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class)->orderBy('sort_order');
    }

    // Recalculate totals based on questions
    public function recalculateTotals()
    {
        $this->total_questions = $this->questions()->count();
        $this->total_marks = $this->questions()->sum('marks');
        $this->total_duration = $this->questions()->sum('time_to_solve');
        $this->save();
    }
}

