<?php

namespace App\Features\Purchase\Controllers;

use App\Features\Purchase\Models\Supplier;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Features\Purchase\Requests\CreateSupplierRequest;
use App\Features\Purchase\Requests\UpdateSupplierRequest;
use App\Features\Purchase\Resources\SupplierResource;

class SupplierController extends Controller
{
    public function index()
    {
        $data = Supplier::all();

        if ($data->isEmpty()) {            
            return ResponseHelper::success('There is no supplier data. Please add supplier data.',);
        }

        return ResponseHelper::success('Supplier data has been successfully retrieved', SupplierResource::collection($data));
    }

    public function store(CreateSupplierRequest $request)
    {
        $data = $request->validated();

        $supplier = Supplier::create($data);

        return ResponseHelper::success('Supplier has been successfully added', new SupplierResource($supplier));
    }

    public function show($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return ResponseHelper::apiError('Supplier data not found', null, 404);
        }

        return ResponseHelper::success('Supplier detail has been successfully retrieved', new SupplierResource($supplier));
    }

    public function update(UpdateSupplierRequest $request, $id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return ResponseHelper::apiError('Supplier data not found', null, 404);
        }

        $data = $request->validated();

        $supplier->update($data);

        return ResponseHelper::success('Supplier has been successfully updated', new SupplierResource($supplier));
    }

    public function destroy($id)
    {
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return ResponseHelper::apiError('Supplier data not found', null, 404);
        }

        $supplier->delete();

        return ResponseHelper::success('Supplier has been successfully deleted');
    }
    
}