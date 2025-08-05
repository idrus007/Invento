<?php

namespace App\Features\Product\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ProductDetailResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'    => $this->id,
            'name'  => $this->name,
            'sku'   => $this->sku,
            'category_id' => $this->category_id,
            'unit'  => $this->unit,
            'purchase_price' => $this->purchase_price,
            'selling_price'  => $this->selling_price,
            'current_stock'  => $this->current_stock,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at
        ];
    }
}