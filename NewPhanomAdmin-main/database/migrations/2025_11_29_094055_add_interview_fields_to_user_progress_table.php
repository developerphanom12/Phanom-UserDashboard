<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_progress', function (Blueprint $table) {
            // Only add columns that don't exist
            if (!Schema::hasColumn('user_progress', 'interview_unique_id')) {
                $table->string('interview_unique_id')->nullable();
            }
            if (!Schema::hasColumn('user_progress', 'interview_url')) {
                $table->string('interview_url')->nullable();
    }
            if (!Schema::hasColumn('user_progress', 'interview_summary')) {
                $table->text('interview_summary')->nullable();
            }
            if (!Schema::hasColumn('user_progress', 'interview_feedback')) {
                $table->json('interview_feedback')->nullable();
            }
            if (!Schema::hasColumn('user_progress', 'interview_transcript')) {
                $table->json('interview_transcript')->nullable();
            }
            if (!Schema::hasColumn('user_progress', 'interview_duration_minutes')) {
                $table->integer('interview_duration_minutes')->nullable();
            }
            if (!Schema::hasColumn('user_progress', 'interview_completed_at')) {
                $table->timestamp('interview_completed_at')->nullable();
            }
        });
    }

    public function down(): void
    {
        Schema::table('user_progress', function (Blueprint $table) {
            $columns = [
                'interview_unique_id',
                'interview_url',
                'interview_summary',
                'interview_feedback',
                'interview_transcript',
                'interview_duration_minutes',
                'interview_completed_at',
            ];
            
            foreach ($columns as $column) {
                if (Schema::hasColumn('user_progress', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
