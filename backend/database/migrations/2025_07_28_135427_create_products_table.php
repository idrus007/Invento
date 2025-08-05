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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->nullable(false);
            $table->string('sku', 50)->nullable(false)->unique();
            $table->foreignId('category_id')->constrained('categories')->onDelete('cascade');
            $table->string('unit', 50)->nullable(false);
            $table->integer(('purchase_price'))->nullable(false);
            $table->integer('selling_price')->nullable(false);
            $table->integer('current_stock')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
