<?php

namespace App\Features\Product\Controllers;

use App\Features\Product\Models\Product;
use App\Http\Controllers\Controller;
use App\Features\Product\Requests\CreateProductRequest;
use App\Features\Product\Requests\UpdateProductRequest;
use App\Features\Product\Resources\ProductDetailResource;
use App\Features\Product\Resources\ProductResource;
use App\Helpers\ResponseHelper;

class ProductController extends Controller
{
    public function index()
    {
        $data = Product::all();

        if ($data->isEmpty()) {            
            return ResponseHelper::success('There is no product data. Please add product data.');
        }
        
        return ResponseHelper::success('Product data has been successfully retrieved', ProductResource::collection($data));
    }

    public function store(CreateProductRequest $request)
    {
        $data = $request->validated();

        $product = Product::create($data);

        return ResponseHelper::success('Product has been successfully added', new ProductResource($product));
    }

    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return ResponseHelper::apiError('Product data not found', null, 404);
        }

        return ResponseHelper::success('Product detail has been successfully retrieved', new ProductDetailResource($product));
    }

    public function update(UpdateProductRequest $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return ResponseHelper::apiError('Product data not found', null, 404);
        }

        $data = $request->validated();

        $product->update($data);

        return ResponseHelper::success('Product has been successfully updated', new ProductResource($product));
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return ResponseHelper::apiError('Product data not found', null, 404);
        }

        $product->delete();

        return ResponseHelper::success('Product has been successfully deleted');
    }
}