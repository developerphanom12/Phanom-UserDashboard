<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    use HasFactory;

    protected $table = 'user_progress';

    protected $fillable = [
        'session_id',
        'user_id',
        'name',
        'email',
        'phone',
        'dob',
        'gender',
        'location',
        'category',
        'subcategory',
        'uploads',
        'experience',
        'notable_projects',
        'current_step',
        'is_registered',
        'is_paid',
        'test_score',
        'test_passed',
        'correct_answers',
        'total_questions',
        'test_completed_at',
        'test_responses',
        // MockTrail Interview fields
        'interview_unique_id',
        'interview_url',
        'interview_status',
        'interview_score',
        'interview_summary',
        'interview_feedback',
        'interview_transcript',
        'interview_duration_minutes',
        'interview_completed_at',
    ];

    protected $casts = [
        'uploads' => 'array',
        'is_registered' => 'boolean',
        'is_paid' => 'boolean',
        'test_passed' => 'boolean',
        'dob' => 'date',
        'test_completed_at' => 'datetime',
        'test_responses' => 'array',
        'interview_feedback' => 'array',
        'interview_transcript' => 'array',
        'interview_completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
