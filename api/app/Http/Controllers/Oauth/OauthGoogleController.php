<?php

namespace App\Http\Controllers\Oauth;

use Illuminate\Http\Request;
use App\Models\User;
use Socialite;
use App\Http\Controllers\Controller;

class OauthGoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(Request $request)
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $user = User::where('email', $googleUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'email' => $googleUser->getEmail(),
                'name' => $googleUser->getName(),
                'last_login_at' => now(),
            ]);
        } else {
            $user->update([
                'last_login_at' => now(),
            ]);
        }

        $token = $user->createToken($user->email);
        $redirectTo = $request->input('redirectTo', env('CLIENT_HOST'));

        return redirect()->to($redirectTo . '?jwt=' . urlencode($token->plainTextToken));
    }
}