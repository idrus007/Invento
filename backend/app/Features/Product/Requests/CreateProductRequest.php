<?php

namespace App\Features\Product\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Helpers\ResponseHelper;
use Illuminate\Validation\Rule;

class CreateProductRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name'           => 'required|string|max:255',
            'category_id'    => [
                'required',
                Rule::exists('categories', 'id')->whereNull('deleted_at'),
            ],
            'unit'           => 'required|string|max:50',
            'purchase_price' => 'required|integer|min:0',
            'selling_price'  => 'required|integer|min:0',                     
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Prodct name is required.',
            'name.string' => 'Product name must be a text.',
            'name.max' => 'Product name maximum 255 characters.',

            'category_id.required' => 'Category is required.',
            'category_id.exists' => 'Category not found.',

            'unit.required' => 'Product unit is required.',
            'unit.string' => 'Product unit must be a text.',
            'unit.max' => 'Product unit maximum 50 characters.',

            'purchase_price.required' => 'Purchase price is required.',
            'purchase_price.integer' => 'Purchase price must be a number.',
            'purchase_price.min' => 'Purchase price minimum 0.',

            'selling_price.required' => 'Selling price is required.',
            'selling_price.integer' => 'Selling price must be a number.',
            'selling_price.min' => 'Selling price minimum 0.',            
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