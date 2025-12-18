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
        Schema::table('user_progress', function (Blueprint $table) {
            // Only add column if it doesn't exist
            if (!Schema::hasColumn('user_progress', 'test_responses')) {
                $table->json('test_responses')->nullable()->after('test_completed_at');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_progress', function (Blueprint $table) {
            // Only drop column if it exists
            if (Schema::hasColumn('user_progress', 'test_responses')) {
                $table->dropColumn('test_responses');
            }
        });
    }
};
