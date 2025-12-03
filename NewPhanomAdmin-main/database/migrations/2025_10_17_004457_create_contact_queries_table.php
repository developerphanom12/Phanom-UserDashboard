<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('contact_queries', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('email');
      $table->string('phone')->nullable();
      $table->string('timezone')->nullable();
      $table->dateTime('meeting_at')->nullable();
      $table->string('service_key')->nullable(); // e.g., development/marketing etc.
      $table->text('message')->nullable();
      $table->string('source')->nullable(); // e.g., website
      $table->timestamps();
    });
  }
  public function down(): void {
    Schema::dropIfExists('contact_queries');
  }
};
