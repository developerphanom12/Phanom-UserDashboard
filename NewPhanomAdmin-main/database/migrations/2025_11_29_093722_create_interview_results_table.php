<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('interview_results', function (Blueprint $table) {
            $table->id();
            $table->string('unique_id')->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('session_id')->nullable();
            
            // Scores
            $table->integer('overall_score')->nullable();
            $table->integer('technical_score')->nullable();
            $table->integer('communication_score')->nullable();
            $table->integer('problem_solving_score')->nullable();
            
            // Feedback
            $table->text('summary')->nullable();
            $table->json('strengths')->nullable();
            $table->json('improvements')->nullable();
            $table->string('recommendation')->nullable(); // strong_yes, yes, maybe, no
            
            // Interview data
            $table->json('transcript')->nullable();
            $table->integer('duration_minutes')->nullable();
            $table->json('screenshots')->nullable();
            $table->json('raw_feedback')->nullable();
            
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        // Add interview fields to freelancer_profiles
        Schema::table('freelancer_profiles', function (Blueprint $table) {
            $table->string('interview_session_id')->nullable();
            $table->string('interview_url')->nullable();
            $table->string('interview_status')->default('not_started'); // not_started, pending, completed
            $table->integer('interview_score')->nullable();
            $table->boolean('interview_passed')->nullable();
            $table->timestamp('interview_completed_at')->nullable();
        });

        // Add interview fields to user_progress
        Schema::table('user_progress', function (Blueprint $table) {
            $table->string('interview_session_id')->nullable();
            $table->string('interview_status')->default('not_started');
            $table->integer('interview_score')->nullable();
            $table->boolean('interview_passed')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('interview_results');
        
        Schema::table('freelancer_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'interview_session_id', 
                'interview_url', 
                'interview_status',
                'interview_score',
                'interview_passed',
                'interview_completed_at'
            ]);
        });

        Schema::table('user_progress', function (Blueprint $table) {
            $table->dropColumn([
                'interview_session_id',
                'interview_status', 
                'interview_score',
                'interview_passed'
            ]);
        });
    }
};
