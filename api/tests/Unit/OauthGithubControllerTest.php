<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\Oauth\OauthGithubController;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\RedirectResponse;
use Mockery;
use App\Models\User;
use Illuminate\Http\Request;

class OauthGithubControllerTest extends TestCase
{
    public function test_redirect()
    {
        Socialite::shouldReceive('driver')
            ->with('github')
            ->andReturnSelf()
            ->shouldReceive('redirect')
            ->andReturn(new RedirectResponse('https://github.com/login/oauth/authorize'));

        $controller = new OauthGithubController();
        $response = $controller->redirect();

        $this->assertInstanceOf(RedirectResponse::class, $response);
        $this->assertEquals('https://github.com/login/oauth/authorize', $response->getTargetUrl());
    }

    public function test_callback()
    {
        $gitHubUser = Mockery::mock(\Laravel\Socialite\Two\User::class);
        $gitHubUser->shouldReceive('getEmail')->andReturn('user@test.com');
        $gitHubUser->shouldReceive('getName')->andReturn('Test User');

        Socialite::shouldReceive('driver')->with('github')->andReturnSelf();
        Socialite::shouldReceive('user')->andReturn($gitHubUser);

        $userMock = Mockery::mock(User::class);
        $userMock->shouldReceive('where')->with('email', 'user@test.com')->andReturnSelf();
        $userMock->shouldReceive('first')->andReturnNull();
        $userMock->shouldReceive('create')->andReturnSelf();
        $userMock->shouldReceive('update')->andReturnSelf();
        $userMock->shouldReceive('createToken')->andReturn((object)['plainTextToken' => 'token']);

        $controller = new OauthGithubController();

        $request = Request::create('/oauth/github/callback', 'GET', ['redirectTo' => 'http://test.com']);

        $response = $controller->callback($request);

        $redirectUrl = $response->getTargetUrl();
        parse_str(parse_url($redirectUrl, PHP_URL_QUERY), $queryParams);

        $this->assertStringStartsWith('http://test.com?jwt=', $redirectUrl);
        $this->assertArrayHasKey('jwt', $queryParams);
    }
}
