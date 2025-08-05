<?php

namespace App\Features\Product\Models;

use App\Features\Purchase\Models\PurchaseItem;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'products';

    protected $with = ['category'];

    protected $fillable = [
        'name',
        'sku',
        'category_id',
        'unit',
        'purchase_price',
        'selling_price',
        'current_stock'
    ];

    protected $casts = [
        'purchase_price' => 'integer',
        'selling_price' => 'integer',
        'current_stock' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($product) {
            do {
                $sku = 'PRD-' . Str::upper(Str::random(8));
            } while (self::where('sku', $sku)->exists());
        
            $product->sku = $sku;
        });
    }    

    public function category():BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function purchaseItems():HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }

    public function stocks():HasMany
    {
        return $this->hasMany(Stock::class);
    }
}