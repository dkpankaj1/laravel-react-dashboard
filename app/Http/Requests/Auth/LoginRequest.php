<?php

namespace App\Http\Requests\Auth;

use App\Traits\HttpAuthResponses;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class LoginRequest extends FormRequest
{
     use HttpAuthResponses;
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ];
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator){
        $this->sendError('validation error.', $validator->errors());
    }


    public function authenticate()
    {
        $this->ensureIsNotRateLimited();

        if (! Auth::attempt( ['email' => $this->email,'password' => $this->password,'status' => 1], $this->boolean('remember'))) {
            RateLimiter::hit($this->throttleKey());
            $this->sendError("login errors",['email' => trans('auth.failed')],401);
        }

        RateLimiter::clear($this->throttleKey());

    }


    public function ensureIsNotRateLimited()
    {
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        event(new Lockout($this));

        $seconds = RateLimiter::availableIn($this->throttleKey());

        $this->sendError("too many attempts",['email' => trans('auth.throttle',['seconds' => $seconds, 'minutes' => ceil($seconds / 60)])],429);
    }


    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->input('email')).'|'.$this->ip());
    }

}
