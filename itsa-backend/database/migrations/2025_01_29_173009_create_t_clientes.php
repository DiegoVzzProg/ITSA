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
        Schema::create('t_clientes', function (Blueprint $table) {
            $table->id('id_cliente');
            $table->integer('id_usuario');
            $table->string("nombre");
            $table->string("telefono");
            $table->string("direccion");
            $table->string("estado");
            $table->integer("id_pais");
            $table->string("codigo_postal");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_clientes');
    }
};
