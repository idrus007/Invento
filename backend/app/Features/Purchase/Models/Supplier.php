<?php

namespace App\Features\Purchase\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Supplier extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'suppliers';

    protected $fillable = [
        'name',
        'phone',
        'address',
    ];

    public function purchaseOrders():HasMany
    {
        return $this->hasMany(PurchaseOrder::class);
    }
}