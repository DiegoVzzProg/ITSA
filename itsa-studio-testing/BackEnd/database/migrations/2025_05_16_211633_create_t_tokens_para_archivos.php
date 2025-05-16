<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('t_tokens_para_archivos', function (Blueprint $table) {
            $table->id('id_token_archivos');
            $table->uuid('token')->default(DB::raw('(UUID())'));
            $table->unsignedBigInteger('id_usuario');
            $table->enum('tipo', ['zip', 'direct']);
            $table->text('archivos_cadena');
            $table->boolean('borrado')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('t_tokens_para_archivos');
    }
};
