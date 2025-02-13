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
        Schema::create('t_productos_comprados_cliente', function (Blueprint $table) {
            $table->id('id_producto_comprado');
            $table->integer('id_cliente');
            $table->integer('id_producto');
            $table->date('fecha');
            $table->boolean('activo')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_productos_comprados_cliente');
    }
};
