<?php

namespace App\Http\Requests\API\V1;

use App\Models\User;
use App\Traits\HttpAuthResponses;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;

class UserUpdateRequest extends FormRequest
{
    use HttpAuthResponses;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['sometimes', 'string'],
            'status' =>  ['required', 'between:0,1'],
            // 'email' => ['sometimes', 'email', Rule::unique(User::class)->ignore($this->user)],
        ];
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        return $this->sendError(trans('api.validation.error'),$validator->errors());
    }
}
