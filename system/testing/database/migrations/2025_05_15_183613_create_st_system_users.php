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
        Schema::create('st_users', function (Blueprint $table) {
            $table->id();
            $table->string('username', 20);
            $table->string('nombre', 250);
            $table->string('apellido', 250);
            $table->string('email', 250)->unique();
            $table->text('password');
            $table->boolean('active', true);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('st_users');
    }
};
