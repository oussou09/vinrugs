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
        Schema::create('rugs', function (Blueprint $table) {
            $table->id();
            $table->char('rug_title');
            $table->string('rug_slug')->unique();
            $table->text('rug_description');
            $table->integer('rug_category');
            $table->integer('rug_quantity')->default(0);
            $table->decimal('rug_price',8 ,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rugs');
    }
};
