<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FreelancerProfile extends Model {
    protected $fillable = [
        'user_id','phone','dob','gender','location','category','subcategory','uploads','experience','test_given','is_paid','test_score',
        'interview_session_id','interview_url','interview_status','interview_score','interview_passed','interview_completed_at'
    ];

    protected $casts = [
        'uploads' => 'array',
        'test_given' => 'boolean',
        'is_paid' => 'boolean',
        'interview_passed' => 'boolean',
        'interview_completed_at' => 'datetime',
    ];

    public function user() {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function interviewResult() {
        return $this->hasOne(InterviewResult::class, 'user_id', 'user_id');
    }
}
