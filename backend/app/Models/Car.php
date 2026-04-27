<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Car extends Model
{
    use HasFactory;

    protected $fillable = [
        'make',
        'model',
        'model_year',
        'price',
        'fuel_type',
        'transmission',
        'body_type',
        'color',
        'mileage',
        'stock_quantity',
        'vin',
        'description',
        'is_featured',
        'status',
        'created_by',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'is_featured' => 'boolean',
            'model_year' => 'integer',
            'mileage' => 'integer',
            'stock_quantity' => 'integer',
        ];
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function images(): HasMany
    {
        return $this->hasMany(CarImage::class);
    }
}
