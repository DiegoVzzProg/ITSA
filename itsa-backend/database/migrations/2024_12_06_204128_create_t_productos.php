<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('t_productos', function (Blueprint $table) {
            $table->increments("id_producto");
            $table->string("url")->nullable();
            $table->decimal("precio")->default(0.00);
            $table->string("titulo", 100);
            $table->string("subtitulo", 100);
            $table->string("descripcion", 254)->default("");
            $table->string("imagen")->nullable();
            $table->string("foto_miniatura")->nullable();
            $table->string("archivo")->nullable();
            $table->string("hover_efecto")->default("hover_efecto_basicsIcons");
            $table->string("carpeta_recursos")->default(null)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_productos');
    }
};
