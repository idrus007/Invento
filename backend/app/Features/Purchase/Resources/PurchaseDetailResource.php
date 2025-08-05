<?php

namespace App\Features\Purchase\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseDetailResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'supplier_id' => $this->supplier_id,
            'po_number' => $this->po_number,
            'supplier' => [
                'id' => $this->supplier->id,
                'name' => $this->supplier->name,
                'address' => $this->supplier->address,
            ],
            'date' => $this->date,
            'total' => $this->total,
            "status" => $this->status,
            'item_count' => $this->purchaseItems->count(),
            'items' => $this->purchaseItems->map(function ($item) {
                return [
                    'purchase_order_id' => $item->purchase_order_id,
                    'product_id' => $item->product_id,
                    'product' => [
                        'id' => $item->product->id,
                        'name' => $item->product->name,
                        'unit' => $item->product->unit,
                    ],
                    'quantity' => $item->quantity,
                    'price' => $item->price
                ];
            }),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at
        ];
    }
}