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
        Schema::create('t_usuarios', function (Blueprint $table) {
            $table->increments('id_usuario');
            $table->string('nombre', 254);
            $table->string('email', 254);
            $table->text('password');
            $table->timestamp('creacion');
            $table->boolean('activo')->default(true);
            $table->datetime('ultima_conexion')->default(now());
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_usuarios');
    }
};
