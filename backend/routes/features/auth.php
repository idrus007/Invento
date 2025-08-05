<?php

use App\Features\User\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {    
    Route::post('/login', [AuthController::class, 'login']);   
});

Route::middleware('auth:api')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/profile', [AuthController::class, 'profile']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
});