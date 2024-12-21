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
        Schema::create('t_carrito_cliente', function (Blueprint $table) {
            $table->increments('id_carrito');
            $table->integer('id_usuario');
            $table->integer('cantidad_carrito');
            $table->timestamp('fecha_registro');
            $table->boolean('borrado');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_carrito_cliente');
    }
};
