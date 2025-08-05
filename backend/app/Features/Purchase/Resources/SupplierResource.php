<?php

namespace App\Features\Purchase\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SupplierResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'    => $this->id,
            'name'  => $this->name,            
            'phone' => $this->phone,
            'address' => $this->address,
        ];
    }
}