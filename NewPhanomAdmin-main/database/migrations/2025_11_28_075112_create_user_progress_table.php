<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_progress', function (Blueprint $table) {
            $table->id();
            $table->string('session_id')->unique(); // Track by session before registration
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            
            // Step 1: Basic Info
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            
            // Step 2: Personal Details
            $table->date('dob')->nullable();
            $table->string('gender')->nullable();
            $table->string('location')->nullable();
            
            // Step 3: Category & Uploads
            $table->string('category')->nullable();
            $table->string('subcategory')->nullable();
            $table->json('uploads')->nullable();
            
            // Step 4: Experience
            $table->string('experience')->nullable();
            $table->text('notable_projects')->nullable();
            
            // Progress tracking
            $table->integer('current_step')->default(1);
            $table->boolean('is_registered')->default(false);
            $table->boolean('is_paid')->default(false);
            
            // Test Results
            $table->integer('test_score')->nullable();
            $table->boolean('test_passed')->nullable();
            $table->integer('correct_answers')->nullable();
            $table->integer('total_questions')->nullable();
            $table->timestamp('test_completed_at')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_progress');
    }
};
