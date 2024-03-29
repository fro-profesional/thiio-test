<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class UserManagementControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_create()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->withoutExceptionHandling(); // Authenticate as the user

        $userData = [
            'email' => 'test@example.com',
            'name' => 'Test User',
        ];

        $response = $this->postJson('/api/users', $userData);

        $response->assertStatus(201)
            ->assertJson([
                'message' => 'User created successfully',
                'user' => [
                    'email' => $userData['email'],
                    'name' => $userData['name'],
                ],
            ]);
    }

    public function test_read()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->withoutExceptionHandling(); // Authenticate as the user

        $response = $this->get('/api/users');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'data' => [
                    'users',
                    'page',
                    'pageSize',
                    'total',
                    'totalPages',
                ],
            ]);
    }

    public function test_update()
    {
        $user = User::factory()->create();
        $updatedName = 'Updated Name';

        $this->actingAs($user)->withoutExceptionHandling(); // Authenticate as the user

        $response = $this->patchJson('/api/users', [
            'email' => $user->email,
            'name' => $updatedName,
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'User updated successfully',
                'user' => [
                    'email' => $user->email,
                    'name' => $updatedName,
                ],
            ]);
    }

    public function test_delete_success()
    {
        $user = User::factory()->create();
        $userToDelete = User::factory()->create();

        $this->actingAs($user)->withoutExceptionHandling(); // Authenticate as the user

        $response = $this->deleteJson('/api/users', ['email' => $userToDelete->email]);

        $response->assertStatus(200)
            ->assertJson([
                'message' => 'User deleted successfully',
            ]);

        $this->assertDatabaseMissing('users', ['email' => $userToDelete->email]);
    }

    public function test_delete_self_error()
    {
        $user = User::factory()->create();

        $this->actingAs($user)->withoutExceptionHandling(); // Authenticate as the user

        $response = $this->deleteJson('/api/users', ['email' => $user->email]);

        $response->assertStatus(403)
            ->assertJson([
                'message' => 'You cannot delete yourself',
            ]);

        $this->assertDatabaseHas('users', ['email' => $user->email]);
    }
}