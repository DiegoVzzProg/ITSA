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
            $table->increments('id_carrito_cliente');
            $table->integer('id_usuario');
            $table->integer('id_producto');
            $table->string('descripcion')->nullable()->default(null);
            $table->timestamp('fecha_creacion');
            $table->boolean('borrado')->default(false);
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
