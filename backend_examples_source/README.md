# Laravel Create Car API Example

This example matches the `../database/schema.sql` tables and provides:

- `POST /api/login`
- `POST /api/cars`
- request validation
- image upload to `storage/app/public/cars`
- image path saved into `car_images.image_url`

## Database

Use the root-level Docker setup to start MySQL:

```bash
docker compose up -d
```

Default connection values for a real Laravel app:

```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=car_dealership_db
DB_USERNAME=car_user
DB_PASSWORD=car_pass
```

The schema is loaded from `../database/schema.sql` when the MySQL container starts for the first time.

## Current Status

This folder is not a complete Laravel project. It documents example Laravel source files only.

At the moment, these files cannot be started directly with:

```bash
php artisan serve
```

That command requires a full Laravel application with files such as `artisan`, `composer.json`, `bootstrap/`, `config/`, and `vendor/`.

To run this backend, place these files inside an actual Laravel app and then run the normal Laravel setup steps there.

## Files

- `app/Http/Controllers/Api/CarController.php`
- `app/Http/Controllers/Api/AuthController.php`
- `routes/api.php`

## Assumptions

- You already have `Car` and `CarImage` Eloquent models.
- You already have a `User` model.
- `Car` has an `images()` relation:

```php
public function images()
{
    return $this->hasMany(CarImage::class);
}
```

- `Car` should allow mass assignment for the fields used in `create()`.
- The `User` model must use Laravel Sanctum's `HasApiTokens` trait.
- Run `php artisan storage:link` so uploaded files are publicly accessible.
- Install Sanctum and enable API tokens before using the login endpoint.

## Login Request

Use `application/json`:

```http
POST /api/login
Content-Type: application/json
Accept: application/json
```

Body:

```json
{
  "email": "admin@cardealer.com",
  "password": "your-plain-password"
}
```

Notes:

- `password_hash` in your SQL seed file is currently a placeholder, so login will fail until you store a real hash.
- The controller checks `password_hash`, not Laravel's default `password` column, because that is what your schema uses.

## Example Request

Use `multipart/form-data`:

```http
POST /api/cars
Content-Type: multipart/form-data
```

Fields:

- `make`
- `model`
- `model_year`
- `price`
- `fuel_type`
- `transmission`
- `body_type`
- `color`
- `mileage`
- `stock_quantity`
- `vin`
- `description`
- `is_featured`
- `status`
- `image`
- `image_alt_text`

If you want the image to be mandatory, change the `image` rule from `nullable` to `required`.
