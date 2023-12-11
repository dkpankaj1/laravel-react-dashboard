<?php

namespace App\Http\Requests\API\V1;

use App\Traits\HttpAuthResponses;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class UserStoreRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'status' =>  ['required', 'between:0,1'],
        ];
    }

    public function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
        return $this->sendError(trans('api.validation.error'), $validator->errors(), 406);
    }
    public function generatePassword(){
        return Str::random(8);
    }
}
