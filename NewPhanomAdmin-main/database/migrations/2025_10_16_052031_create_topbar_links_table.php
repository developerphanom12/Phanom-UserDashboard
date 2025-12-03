<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  public function up(): void {
    Schema::create('topbar_links', function (Blueprint $t) {
      $t->id();
      $t->string('label');             // e.g. Home, Services, Blog
      $t->string('url');               // e.g. /, /services
      $t->boolean('is_enabled')->default(true);
      $t->integer('sort_order')->default(0);
      $t->string('icon')->nullable();  // optional (tabler/bootstrap icon name or class)
      $t->boolean('is_external')->default(false);
      $t->string('target')->nullable(); // e.g. _blank
      $t->timestamps();
    });
  }
  public function down(): void {
    Schema::dropIfExists('topbar_links');
  }
};
