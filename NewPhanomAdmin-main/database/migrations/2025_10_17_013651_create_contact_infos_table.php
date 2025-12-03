<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('contact_infos', function (Blueprint $table) {
            $table->id();
            $table->string('phone', 80)->nullable();
            $table->string('email', 191)->nullable();
            $table->text('address')->nullable();
            // Socials
            $table->string('twitter')->nullable();
            $table->string('instagram')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('discord')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('contact_infos');
    }
};
