# Laravel Car API

This Laravel app matches the shared schema in `../database/schema.sql` and provides:

- `POST /api/login`
- `POST /api/cars`
- request validation
- image upload to `storage/app/public/cars`
- Sanctum token creation for login

## Run

Start MySQL from the repository root first:

```bash
docker compose up -d
```

Then run the backend from this folder:

```bash
composer install
php artisan migrate --path=vendor/laravel/sanctum/database/migrations --force
php artisan storage:link
php artisan serve
```

Default Laravel database settings for `management_db-db_management-1`:

```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3308
DB_DATABASE=management_db
DB_USERNAME=admin
DB_PASSWORD=root
```

## Notes

- The main application tables come from `../database/schema.sql`.
- Only Sanctum's `personal_access_tokens` migration should be run from Laravel.
- The app uses `password_hash` instead of Laravel's default `password` column because that is what the shared schema defines.
- Uploaded images are stored under `storage/app/public/cars`.

## Local Login

```text
Email: admin@cardealer.com
Password: password123
```

```text
Email: customer@cardealer.com
Password: password123
```

## API Requests

Login request:

```http
POST /api/login
Content-Type: application/json
Accept: application/json
```

```json
{
  "email": "admin@cardealer.com",
  "password": "password123"
}
```

Create car request:

```http
POST /api/cars
Content-Type: multipart/form-data
```
