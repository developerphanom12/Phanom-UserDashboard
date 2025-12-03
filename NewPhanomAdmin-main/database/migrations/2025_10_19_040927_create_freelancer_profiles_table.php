<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('freelancer_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('phone')->nullable();
            $table->date('dob')->nullable();
            $table->string('gender')->nullable();
            $table->string('location')->nullable();
            $table->string('category')->nullable();       // free text
            $table->string('subcategory')->nullable();    // free text
            $table->text('uploads')->nullable(); // json: portfolio,aadhar,pan (store URLs or filenames)
            $table->string('experience')->nullable(); // e.g. "2-5 Years"
            $table->boolean('test_given')->default(false);
            $table->boolean('is_paid')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('freelancer_profiles');
    }
};
