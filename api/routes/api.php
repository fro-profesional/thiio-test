<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserManagementController;

Route::middleware('auth:sanctum')->group(function () {
    Route::get("/logout", [AuthController::class, 'logout']);
    Route::get("/user", [AuthController::class, 'user']);
    Route::prefix('users')->group(function () {
        Route::post("/",   [UserManagementController::class, 'create']);
        Route::get("/",    [UserManagementController::class, 'read']);
        Route::patch("/",  [UserManagementController::class, 'update']);
        Route::delete("/", [UserManagementController::class, 'delete']);
    });
});
