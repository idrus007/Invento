<?php

namespace App\Features\Product\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Helpers\ResponseHelper;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'category_id' => [
                'sometimes',
                Rule::exists('categories', 'id')->whereNull('deleted_at'),
            ],
            'unit' => 'sometimes|string|max:50',
            'purchase_price' => 'sometimes|integer|min:0',
            'selling_price' => 'sometimes|integer|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'name.string'             => 'Product name must be a text.',
            'name.max'                => 'Product name maximum 255 characters.',

            'category_id.exists'      => 'Category not found.',

            'unit.string'             => 'Satuan must be a text.',
            'unit.max'                => 'Satuan maximum 50 characters.',

            'purchase_price.integer' => 'Purchase price must be a number.',
            'purchase_price.min'     => 'Purchase price minimum 0.',

            'selling_price.integer'  => 'Selling price must be a number.',
            'selling_price.min'      => 'Selling price minimum 0.',
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