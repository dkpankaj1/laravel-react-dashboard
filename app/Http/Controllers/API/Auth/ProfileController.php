<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ProfileUpdateRequest;
use App\Traits\HttpAuthResponses;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use App\Models\PermissionGroup;
use App\Models\User;

class ProfileController extends Controller
{
    use HttpResponses;
    public function profile(Request $request)
    {
        return $this->success(
            "user profile",
            [
                "user" => $request->user()
            ],
            200
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(ProfileUpdateRequest $request)
    {

        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        try {

            $request->user()->save();
            return $this->success('profile update success.!',[],200);

        } catch (\Exception $e) {

            return $this->error('profile update failed.!',['error' =>$e->getMessage()],400);

        }
    }
}
