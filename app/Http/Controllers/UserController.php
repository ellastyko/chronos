<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use Illuminate\Support\Facades\ {
    Hash, 
    Auth
};

use App\Http\Requests\ {
    RegisterRequest,
    LoginRequest
};
// Models
use App\Models\ {
    User,
    Calendar,
    Participant
};

class UserController extends Controller
{
    public function index(Request $request) {
        return User::where('email', 'like', '%'.$request->get('search').'%')->get();
    }

    public function login(LoginRequest $request) {

        try {

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response([
                    'message' => 'Invalid credentials'
                ], Response::HTTP_UNAUTHORIZED);
            }

            $data = Auth::user();
            $user = User::find($data['id']);

            $token = $user->createToken('token')->plainTextToken;

            $user->update(['remember_token' => $token]);

            return response([
                'message' => 'You have logged in',
                'user' => $user,
                'token' => $token          
            ]);

        } catch (\Exception $e) {
            return response([
                'message' => $e->getMessage()
            ],  Response::HTTP_BAD_REQUEST);
        }
    }


    public function register(RegisterRequest $request) {
         
        try {
            
            $user = User::create([
                'email' => $request['email'],
                'password' => Hash::make($request['password'])                  
            ]);
            $calendar = Calendar::create([
                'title' => 'My calendar',
                'type' => 'reminder',
                'author' => $user->id
            ]);
            Participant::create([
                'calendar' => $calendar->id,
                'participant' => $user->id
            ]);
            return response([
                'message' => 'You have registered',
                'user' => $user
            ]);

        } catch (\Exception $e) {
            return response([
                'message' => $e->getMessage()
            ],  Response::HTTP_BAD_REQUEST);
        }
    }
}
