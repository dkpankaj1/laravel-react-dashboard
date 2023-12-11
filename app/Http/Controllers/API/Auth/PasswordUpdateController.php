<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\PasswordUpdateRequest;
use App\Traits\HttpAuthResponses;
use Illuminate\Support\Facades\Hash;

class PasswordUpdateController extends Controller
{
    use HttpAuthResponses;
    public function update(PasswordUpdateRequest $request)
    {
        if(!$request->validateOldPassword()){
            return $this->sendError(trans('profile.password.invalid'));
        }
      
        try {
            $request->user()->update(['password' => Hash::make($request->password)]);
            return $this->sendSuccess(trans('profile.password.success'),[],200);

        } catch (\Exception $e) {
            return $this->sendError('profile update failed.!',['error' =>$e->getMessage()]);
        }
    }
}
