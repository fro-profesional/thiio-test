<?php

namespace Tests\Unit;

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Tests\TestCase;
use Mockery;

class AuthControllerTest extends TestCase
{
    public function test_logout()
    {
        // Mock the Request and User model
        $request = Mockery::mock(Request::class);
        $user = Mockery::mock();
        $token = Mockery::mock();

        // Define expectations for the mocks
        $request->shouldReceive('user')->once()->andReturn($user);
        $user->shouldReceive('currentAccessToken')->once()->andReturn($token);
        $token->shouldReceive('delete')->once()->andReturn(true);

        // Create an instance of the controller
        $controller = new AuthController();

        // Call the method and assert the response
        $response = $controller->logout($request);

        $this->assertIsArray($response);
        $this->assertEquals('Token deleted.', $response['message']);
    }
}
