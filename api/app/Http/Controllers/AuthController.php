<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return ["message" => "Token deleted."];
    }

    public function user(Request $request)
    {
        return $request->user();
    }
}
