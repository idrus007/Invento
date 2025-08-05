<?php

namespace App\Features\Product\Controllers;

use App\Features\Product\Models\Category;
use App\Http\Controllers\Controller;
use App\Features\Product\Requests\CreateCategoryRequest;
use App\Features\Product\Requests\UpdateCategoryRequest;
use App\Features\Product\Resources\CategoryResource;
use App\Helpers\ResponseHelper;

class CategoryController extends Controller
{
    public function index()
    {
        $data = Category::all();

        if ($data->isEmpty()) {            
            return ResponseHelper::success('There is no category data. Please add category data.',);
        }

        return ResponseHelper::success('Category data has been successfully retrieved', CategoryResource::collection($data));
    }

    public function store(CreateCategoryRequest $request)
    {    
        $data = $request->validated();

        $category = Category::create($data);

        return ResponseHelper::success('Category has been successfully added', new CategoryResource($category));
    }

    public function show($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return ResponseHelper::apiError('Category data not found', null, 404);
        }

        return ResponseHelper::success('Category detail has been successfully retrieved', new CategoryResource($category));
    }

    public function update(UpdateCategoryRequest $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return ResponseHelper::apiError('Category data not found', null, 404);
        }

        $data = $request->validated();

        $category->update($data);

        return ResponseHelper::success('Category has been successfully updated', new CategoryResource($category));
    }

    public function destroy($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return ResponseHelper::apiError('Category data not found', null, 404);
        }

        $category->delete();

        return ResponseHelper::success('Category has been successfully deleted');
    }
}