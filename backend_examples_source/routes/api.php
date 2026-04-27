<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CarController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/cars', [CarController::class, 'store']);
