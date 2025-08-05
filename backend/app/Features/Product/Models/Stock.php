<?php

namespace App\Features\Product\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Stock extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'stocks';

    protected $fillable = [
       'product_id',
       'type',
       'quantity',
       'notes',
    ];

    public function product():BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

}