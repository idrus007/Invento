<?php

namespace App\Features\Purchase\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
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
        ];
    }
}