<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'Welcome to the API!']);
});

require __DIR__.'/features/auth.php';
require __DIR__.'/features/product.php';
require __DIR__.'/features/purchase.php';
// require __DIR__.'/features/sales.php';
