<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('service_items', function (Blueprint $t) {
      $t->id();
      $t->foreignId('service_section_id')->constrained()->cascadeOnDelete();
      $t->string('label');             // e.g. SEO, Web Development
      $t->string('url')->default('/services'); // where to go on click
      $t->boolean('is_enabled')->default(true);
      $t->integer('sort_order')->default(0);
      $t->timestamps();
    });
  }
  public function down(): void {
    Schema::dropIfExists('service_items');
  }
};
