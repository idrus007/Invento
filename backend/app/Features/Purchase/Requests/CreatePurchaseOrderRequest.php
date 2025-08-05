<?php

namespace App\Features\Purchase\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Helpers\ResponseHelper;
use Illuminate\Validation\Rule;

class CreatePurchaseOrderRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'supplier_id' => [
                'required', 
                'integer',
                Rule::exists('suppliers', 'id')->whereNull('deleted_at')
            ],
            'date' => 'required|date',
            'items' => ['required', 'array'],
            'items.*.product_id' => [
                'required', 
                'integer',
                Rule::exists('products', 'id')->whereNull('deleted_at'),
                'distinct'
            ],
            'items.*.price' => [
                'required', 
                'numeric'
            ],
            'items.*.quantity' => [
                'required', 
                'numeric',
                'min:1'
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'supplier_id.required' => 'Supplier must be selected.',
            'supplier_id.integer' => 'Supplier must be a number.',
            'supplier_id.exists' => 'Supplier not found.',

            'date.required' => 'PO date is required.',
            'date.date' => 'PO date must be a valid date.',

            'items.required' => 'Items is required.',
            'items.array' => 'Items must be an array.',
            'items.*.product_id.required' => 'Product is required.',
            'items.*.product_id.integer' => 'Product must be a number.',
            'items.*.product_id.exists' => 'Product not found.',

            'items.*.quantity.required' => 'Quantity is required.',
            'items.*.quantity.numeric' => 'Quantity must be a number.',
            'items.*.quantity.min' => 'Quantity must be at least 1.',

            'items.*.price.required' => 'Price is required.',
            'items.*.price.numeric' => 'Price must be a number.',            
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