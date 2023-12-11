<?php

namespace App\Http\Controllers\API\V1;

use App\Filters\API\V1\UserFilters;
use App\Http\Controllers\Controller;
use App\Http\Requests\API\V1\UserStoreRequest;
use App\Http\Requests\API\V1\UserUpdateRequest;
use App\Http\Resources\API\V1\UserCollection;
use App\Http\Resources\API\V1\UserResource;
use App\Models\User;
use App\Notifications\sendWelcomeUserNotification;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use HttpResponses;
    public function index(Request $request): UserCollection
    {
        $userFilters = User::query();

        $userFilters = $userFilters->where('role','staff');

        $filter = new UserFilters();

        $queryFilter = $filter->transform($request);

        if (count($queryFilter) == 0) {
            return new UserCollection(User::where('role','staff')->paginate());
        }
        
        return new UserCollection($userFilters->where($queryFilter)->paginate()->appends($request->query()));
    }

    public function store(UserStoreRequest $request)
    {
        try {
            $password = $request->generatePassword();

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($password),
                'role' => 'staff',
                'status' => $request->status,
            ]);

            // sand notification
            $status = $user->notify(
                new sendWelcomeUserNotification(
                    $user,
                    $password
                    )
                );

            return $this->success(trans('crud.create', ['model' => 'user']), new UserResource($user), 200);

        } catch (\Exception $e) {
            $this->error(trans('api.400'), ["error" => $e->getMessage()],400);
        }
    }


    public function show(User $user): UserResource
    {
        return new UserResource($user);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        try {
            $user->update([
                'name' => $request->name ?? $user->name,
                'status' => $request->status ?? $user->status,
            ]);
            return $this->success(trans('crud.update', ['model' => 'user']),new UserResource($user));
        } catch (\Exception $e) {
            $this->error(trans('crud.401'), ["error" => $e->getMessage()]);
        }
    }

    public function destroy(Request $request, User $user)
    {
        if ($user->id == 1) {
            return $this->error(trans('api.405'), [], 405);
        }

        try {

            $user->delete();
            return $this->success(trans('crud.delete', ['model' => 'users']), new UserResource($user));

        } catch (\Exception $e) {
            $this->error(trans('crud.401'), ["error" => $e->getMessage()]);
        }
    }

}