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
        Schema::table('budgets', function(Blueprint $table){
            $table->integer('day')->nullable()->change(); // allow for the day of the month to be nullable in case the frequency is not monthly
            $table->integer('weekday')->nullable(); // Add new column for users that have income / expenses that comes in on a regular day of week. (0 = sunday, 2 = monday, etc)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('budgets', function(Blueprint $table){
            $table->dropColumn('weekday');
            $table->integer('day')->change();
        });
    }
};