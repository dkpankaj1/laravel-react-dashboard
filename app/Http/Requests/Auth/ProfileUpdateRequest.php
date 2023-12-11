<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\User;

class ProfileUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'max:255'],
            'email' => ['sometimes', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
            'phone' => ['sometimes','digit:10'],
            'address' => ['sometimes','string'],
            'city' => ['sometimes','string'],
            'state' => ['sometimes','string'],
            'postal_code' => ['sometimes','string'],
            'avater' => ['sometimes','mimes:jpg,png']
        ];
    }
}
