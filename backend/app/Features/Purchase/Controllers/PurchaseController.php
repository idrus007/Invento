<?php

namespace App\Features\Purchase\Controllers;

use App\Features\Purchase\Models\PurchaseOrder;
use App\Helpers\ResponseHelper;
use App\Http\Controllers\Controller;
use App\Features\Product\Models\Product;
use App\Features\Purchase\Models\PurchaseItem;
use App\Features\Purchase\Resources\PurchaseDetailResource;
use App\Features\Purchase\Resources\PurchaseResource;
use App\Features\Product\Models\Stock;
use App\Features\Purchase\Requests\CreatePurchaseOrderRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PurchaseController extends Controller
{
    public function index()
    {
        $data = PurchaseOrder::with('purchaseItems.product')->get();

        if ($data->isEmpty()) {            
            return ResponseHelper::success('There is no purchase data. Please add purchase data.');
        }
        
        return ResponseHelper::success('Purchase data has been successfully retrieved', PurchaseResource::collection($data));        
    }

    public function store(CreatePurchaseOrderRequest $request)
    {
        $data = $request->validated();

        DB::beginTransaction();

        try {
            // Generate nomor PO
            $poNumber = 'PO-' . strtoupper(Str::random(8));

            // Hitung total
            $total = 0;
            foreach ($data['items'] as $item) {                
                $total += $item['price'] * $item['quantity'];
            }

            // Simpan purchase order
            $purchaseOrder = PurchaseOrder::create([
                'supplier_id' => $data['supplier_id'],
                'po_number'   => $poNumber,
                'date'        => $data['date'],
                'total'       => $total,
                'status'      => 'pending',
            ]);

            // Simpan setiap item
            foreach ($data['items'] as $item) {
                $product = Product::findOrFail($item['product_id']);
                $quantity = $item['quantity'];
                $price = $item['price'];

                // Simpan purchase item
                PurchaseItem::create([
                    'purchase_order_id' => $purchaseOrder->id,
                    'product_id'        => $product->id,
                    'quantity'          => $quantity,
                    'price'             => $price,
                ]);

                // Simpan ke stok
                Stock::create([
                    'product_id' => $product->id,
                    'type'       => 'in',
                    'quantity'   => $quantity,
                ]);

                // Update current_stock
                $product->increment('current_stock', $quantity);
                $product->update(['purchase_price' => $price]);
            }

            DB::commit();

            return ResponseHelper::success('Purchase order has been successfully created', [
                'po_number' => $purchaseOrder->po_number,
                'total'     => $purchaseOrder->total,
                'items'     => count($data['items']),
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return ResponseHelper::apiError('Failed to create purchase order: ' . $e->getMessage(), null, 500);
        }
    }

    public function show($id)
    {
        $purchase = PurchaseOrder::with('supplier', 'purchaseItems.product')->find($id);

        if (!$purchase) {
            return ResponseHelper::apiError('Purchase data not found', null, 404);
        }

        return ResponseHelper::success('Purchase detail has been successfully retrieved', new PurchaseDetailResource($purchase));
    }
}