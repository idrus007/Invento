<?php

namespace App\Features\Purchase\Models;

use App\Features\Product\Models\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseItem extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'purchase_items';
    
    protected $fillable = [
        'purchase_order_id',
        'product_id',        
        'quantity',
        'price',        
    ];

    public function product():BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function purchaseOrder():BelongsTo
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

}