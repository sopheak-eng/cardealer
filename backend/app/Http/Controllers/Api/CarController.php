<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CarController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'make' => ['required', 'string', 'max:80'],
            'model' => ['required', 'string', 'max:120'],
            'model_year' => ['required', 'integer', 'between:1900,2100'],
            'price' => ['required', 'numeric', 'min:0'],
            'fuel_type' => ['required', 'in:gasoline,diesel,hybrid,electric,plugin_hybrid,cng,lpg'],
            'transmission' => ['nullable', 'in:manual,automatic,cvt,semi_automatic'],
            'body_type' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:50'],
            'mileage' => ['nullable', 'integer', 'min:0'],
            'stock_quantity' => ['nullable', 'integer', 'min:0'],
            'vin' => ['nullable', 'string', 'max:64', 'unique:cars,vin'],
            'description' => ['nullable', 'string'],
            'is_featured' => ['nullable', 'boolean'],
            'status' => ['nullable', 'in:available,reserved,sold,hidden'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:5120'],
            'image_alt_text' => ['nullable', 'string', 'max:255'],
        ]);

        $car = DB::transaction(function () use ($request, $validated) {
            $car = Car::create([
                'make' => $validated['make'],
                'model' => $validated['model'],
                'model_year' => $validated['model_year'],
                'price' => $validated['price'],
                'fuel_type' => $validated['fuel_type'],
                'transmission' => $validated['transmission'] ?? null,
                'body_type' => $validated['body_type'] ?? null,
                'color' => $validated['color'] ?? null,
                'mileage' => $validated['mileage'] ?? null,
                'stock_quantity' => $validated['stock_quantity'] ?? 1,
                'vin' => $validated['vin'] ?? null,
                'description' => $validated['description'] ?? null,
                'is_featured' => $validated['is_featured'] ?? false,
                'status' => $validated['status'] ?? 'available',
                'created_by' => $request->user()?->id,
            ]);

            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('cars', 'public');

                $car->images()->create([
                    'image_url' => $path,
                    'alt_text' => $validated['image_alt_text'] ?? $car->make.' '.$car->model,
                    'sort_order' => 0,
                    'is_primary' => true,
                ]);
            }

            return $car->load('images');
        });

        return response()->json([
            'message' => 'Car created successfully.',
            'data' => $car,
        ], 201);
    }
}
