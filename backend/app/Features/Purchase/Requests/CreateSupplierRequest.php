<?php

namespace App\Features\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Helpers\ResponseHelper;
use Illuminate\Validation\Rule;

class CreateSupplierRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:15|unique:suppliers',
            'address' => 'required|string',            
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Supplier name is required.',
            'name.string' => 'Supplier name must be a text.',
            'name.max' => 'Supplier name maximum 100 characters.',

            'phone.required' => 'Phone number is required.',
            'phone.string' => 'Phone number must be a text.',
            'phone.max' => 'Phone number maximum 15 characters.',
            'phone.unique' => 'Phone number already exists.',

            'address.required' => 'Address is required.',
            'address.string' => 'Address must be a text.',
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