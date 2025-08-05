<?php

namespace App\Features\Purchase\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'purchase_orders';

    protected $fillable = [
        'supplier_id',
        'po_number',
        'date',
        'total',
        'status',
    ];    

    protected $casts = [
        'date' => 'date',
        'total' => 'integer',        
    ];

    public function supplier():BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function purchaseItems():HasMany
    {
        return $this->hasMany(PurchaseItem::class);
    }
}