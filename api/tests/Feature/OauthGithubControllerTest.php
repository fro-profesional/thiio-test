<?php

namespace Tests\Feature;

use Tests\TestCase;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\RedirectResponse;

class OauthGithubControllerTest extends TestCase
{
    public function test_redirect()
    {
        Socialite::shouldReceive('driver')
            ->with('github')
            ->andReturnSelf()
            ->shouldReceive('redirect')
            ->andReturn(new RedirectResponse('https://github.com/login/oauth/authorize'));

        $response = $this->get('/oauth/github/redirect');

        $response->assertRedirect('https://github.com/login/oauth/authorize');
    }

    public function test_callback()
    {
        Socialite::shouldReceive('driver')
            ->with('github')
            ->andReturnSelf()
            ->shouldReceive('user')
            ->andReturn(new class {
                public function getEmail()
                {
                    return 'user@test.com';
                }

                public function getName()
                {
                    return 'Test User';
                }
            });

        $response = $this->get('/oauth/github/callback?code=1234');
        $response->assertRedirect();
        $redirectUrl = $response->headers->get('Location');

        // Check if the redirected URL contains the 'jwt' token parameter
        $this->assertStringContainsString('jwt=', $redirectUrl);
    }



}
