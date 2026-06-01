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
            Schema::create('rug_imges', function (Blueprint $table) {
            $table->id();
            $table->foreignId('rug_id')->constrained('rugs')->onDelete('cascade');
            $table->string('main_rug_path');
            $table->string('second_path_img')->nullable();
            $table->string('third_path_img')->nullable();
            $table->string('fourth_path_img')->nullable();
            $table->string('video_path')->nullable();
            $table->bigInteger('main_rug_file_size')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('rug_imges');
    }
};
