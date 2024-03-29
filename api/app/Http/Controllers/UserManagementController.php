<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class UserManagementController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'name' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'email' => $request->input('email'),
            'name' => $request->input('name'),
        ]);

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
        ], 201);
    }

    public function read(Request $request)
    {
        $pageSize = $request->input('pageSize', 10);
        $page = $request->input('page', 1);

        // Retrieve the paginated users
        $users = User::paginate($pageSize, ['*'], 'page', $page);
        $totalUsers = User::count();
        $totalPages = ceil($totalUsers / $pageSize);

        // Prepare the response data
        $responseData = [
            'users' => $users->items(),
            'page' => $users->currentPage(),
            'pageSize' => $users->perPage(),
            'total' => $totalUsers,
            'totalPages' => $totalPages,
        ];

        return response()->json([
            'message' => 'Users retrieved successfully',
            'data' => $responseData,
        ]);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'name' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        $name = $request->input('name');

        if ($name) $user->update($request->only(['name']));

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'User not found',
            ], 404);
        }

        $currentUser = $request->user();
        $isSameUser = $currentUser->email === $user->email;

        if ($isSameUser) {
            return response()->json([
                'message' => 'You cannot delete yourself',
            ], 403);
        }

        if ($user->tokens) {
            $user->tokens()->delete();
        }
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully',
        ]);
    }
}
