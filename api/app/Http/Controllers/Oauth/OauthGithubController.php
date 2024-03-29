<?php

namespace App\Http\Controllers\Oauth;

use Illuminate\Http\Request;
use App\Models\User;
use Socialite;
use App\Http\Controllers\Controller;

class OauthGithubController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('github')->redirect();
    }

    public function callback(Request $request)
    {

        $githubUser = Socialite::driver('github')->user();
        $user = User::where('email', $githubUser->getEmail())->first();

        if (!$user) {
            $user = User::create([
                'email' => $githubUser->getEmail(),
                'name' => $githubUser->getName(),
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
