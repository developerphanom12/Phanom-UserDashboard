<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('queries', function (Blueprint $table) {
            $table->id();

            $table->string('first_name', 120);
            $table->string('last_name', 120)->nullable();

            // ❌ Remove generated column to avoid MySQL issues
            // $table->string('name')->virtualAs("CONCAT(first_name,' ',COALESCE(last_name,''))");

            $table->string('email', 191);
            $table->string('phone', 60)->nullable();

            // fullstack / design / ecommerce / marketing (or anything you send)
            $table->string('service_key', 120)->nullable();

            $table->text('message')->nullable();

            $table->boolean('is_read')->default(false);

            $table->timestamps();

            // Helpful indexes
            $table->index('email');
            $table->index('service_key');
            $table->index('is_read');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('queries');
    }
};
