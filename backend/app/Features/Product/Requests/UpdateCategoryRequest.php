<?php

namespace App\Features\Product\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Helpers\ResponseHelper;
use Illuminate\Validation\Rule;

class UpdateCategoryRequest extends FormRequest
{
    public function rules(): array
    {
        $categoryId = $this->route('id');

        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('categories', 'name')->ignore($categoryId),
            ],
            'description' => 'sometimes|string',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Category name is required.',
            'name.string'   => 'Category name must be a text.',
            'name.max'      => 'Category name maximum 255 characters.',
            'name.unique'   => 'Category name already exists.',

            'description.required' => 'Description is required.',
            'description.string' => 'Description must be a text.',
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