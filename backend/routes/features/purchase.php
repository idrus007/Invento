<?php

use App\Features\Purchase\Controllers\PurchaseController;
use App\Features\Purchase\Controllers\SupplierController;
use Illuminate\Support\Facades\Route;

Route::prefix('suppliers')->middleware('auth:api')->group(function () {
    Route::get('/', [SupplierController::class, 'index']);
    Route::post('/', [SupplierController::class, 'store']);
    Route::get('/{id}', [SupplierController::class, 'show']);
    Route::put('/{id}', [SupplierController::class, 'update']);
    Route::delete('/{id}', [SupplierController::class, 'destroy']);
});


Route::prefix('purchases')->middleware('auth:api')->group(function () {
    Route::get('/', [PurchaseController::class, 'index']);
    Route::post('/', [PurchaseController::class, 'store']);
    Route::get('/{id}', [PurchaseController::class, 'show']);
});
