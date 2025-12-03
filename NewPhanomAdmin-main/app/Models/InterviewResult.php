<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InterviewResult extends Model
{
    use HasFactory;

    protected $fillable = [
        'unique_id',
        'user_id',
        'session_id',
        'overall_score',
        'technical_score',
        'communication_score',
        'problem_solving_score',
        'summary',
        'strengths',
        'improvements',
        'recommendation',
        'transcript',
        'duration_minutes',
        'screenshots',
        'raw_feedback',
        'completed_at',
    ];

    protected $casts = [
        'strengths' => 'array',
        'improvements' => 'array',
        'transcript' => 'array',
        'screenshots' => 'array',
        'raw_feedback' => 'array',
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
