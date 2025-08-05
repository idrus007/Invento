<?php

namespace App\Features\User\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Helpers\ResponseHelper;

class UpdateProfileRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $this->user()->id,
            'password' => 'nullable|string|min:8|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'        => 'Name is required.',
            'name.string'          => 'Name must be a text.',
            'name.max'             => 'Name must be less than 255 characters.',

            'email.required'       => 'Email is required.',
            'email.email'          => 'Invalid email format.',
            'email.unique'         => 'Email already exists.',

            'password.string'      => 'Password must be a text.',
            'password.min'         => 'Password must be at least 8 characters.',
            'password.confirmed'   => 'Password confirmation does not match.',
        ];
    }

    public function authorize(): bool
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        $firstMessage = collect($validator->errors()->all())->first();

        throw new HttpResponseException(
            ResponseHelper::apiError($firstMessage, null, 422)
        );
    }
}