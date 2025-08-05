<?php

namespace App\Features\User\Controllers;

use App\Features\User\Models\User;
use App\Features\User\Requests\LoginRequest;
use App\Features\User\Requests\UpdateProfileRequest;
use App\Features\User\Resources\UserResource;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{      
    public function login(LoginRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return ResponseHelper::apiError('Email or password is incorrect', null, 401);
        }

        $token = JWTAuth::fromUser($user);

        return ResponseHelper::success('Login successful', [
            'user' => new UserResource($user),
            'token' => $token,
        ]);
    }

    public function logout()
    {        
        JWTAuth::invalidate(JWTAuth::getToken());

        return ResponseHelper::success('Logout successful');
     
    }

    public function profile()
    {        
        $user = JWTAuth::parseToken()->authenticate();

        if (!$user) {
            return ResponseHelper::apiError('User profile not found', null, 404);
        }

        return ResponseHelper::success('User profile fetched', new UserResource($user));   
    }
      
    public function updateProfile(UpdateProfileRequest $request)
    {        
        $user = JWTAuth::parseToken()->authenticate();
        
        $data = $request->validated();

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return ResponseHelper::success('User profile updated', new UserResource($user));
    }
}