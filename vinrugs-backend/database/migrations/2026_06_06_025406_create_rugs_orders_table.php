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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('stripe_payment_intent_id')->nullable()->unique();
            $table->string('status')->default('pending');
            $table->decimal('submount', 10, 2)->default(0);
            $table->decimal('shipping_price', 10, 2)->default(0);
            $table->string('discount_name')->nullable();
            $table->string('discount_porcent')->default(0)->nullable();
            $table->decimal('discount_mount', 10, 2)->default(0)->nullable();
            $table->decimal('total_amount', 10, 2)->default(0);

            $table->string('shipping_name');
            $table->string('shipping_adress');
            $table->string('shipping_city');
            $table->string('shipping_postalcode');
            $table->string('shipping_country')->default('US');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
