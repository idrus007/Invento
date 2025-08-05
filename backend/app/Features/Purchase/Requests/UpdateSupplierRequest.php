<?php

namespace App\Features\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Helpers\ResponseHelper;
use Illuminate\Validation\Rule;

class UpdateSupplierRequest extends FormRequest
{
    public function rules(): array
    {
        $supplierId = $this->route('id');

        return [
            'name' => 'sometimes|string|max:100',
            'phone' => [
                'sometimes',
                'string',
                'max:20',
                Rule::unique('suppliers', 'phone')->ignore($supplierId),
            ],
            'address' => 'sometimes|string',
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'Supplier name must be a text.',
            'name.max' => 'Supplier name maximum 100 characters.',

            'phone.string' => 'Phone number must be a text.',
            'phone.max' => 'Phone number maximum 20 characters.',
            'phone.unique' => 'Phone number already exists.',

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