<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('quizzes');
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('header_image')->nullable();
            $table->integer('total_duration')->default(3600); // in seconds
            $table->integer('total_questions')->default(0);
            $table->integer('total_marks')->default(0);
            $table->boolean('is_published')->default(false);
            $table->string('created_by')->default('admin');
            $table->string('category')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
