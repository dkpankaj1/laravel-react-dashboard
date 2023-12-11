<?php

namespace App\Http\Controllers\API\Auth;

use App\Events\UserLoginEvent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Traits\HttpAuthResponses;
use Illuminate\Http\Request;
use App\Http\Resources\API\V1\UserResource;

use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use HttpAuthResponses;
    public function login(LoginRequest $request)
    {
        $request->authenticate();

        if(Auth::user()->currentAccessToken()){
            Auth::user()->currentAccessToken()->delete();
        }
        
        $data = [
            'user' => new UserResource(Auth::user()),
            'token' => Auth::user()->createToken($request->throttleKey())->plainTextToken,
        ];

        event(new UserLoginEvent(auth()->user(),$request->ip()));        
       
        return $this->sendSuccess("login success", $data,200);
    }
    
    public function logout(Request $request)
    {
        // $request->user()->currentAccessToken()->delete();
        $request->user()->tokens()->delete();
        return $this->sendSuccess("logout success");
    }
}
