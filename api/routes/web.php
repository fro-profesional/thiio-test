<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Oauth\OauthGithubController;
use App\Http\Controllers\Oauth\OauthGoogleController;

Route::prefix('oauth')->group(function () {
    Route::prefix('github')->group(function () {
        Route::get("/redirect", [OauthGithubController::class, 'redirect']);
        Route::get("/callback", [OauthGithubController::class, 'callback']);
    });
    Route::prefix('google')->group(function () {
        Route::get("/redirect", [OauthGoogleController::class, 'redirect']);
        Route::get("/callback", [OauthGoogleController::class, 'callback']);
    });
});
