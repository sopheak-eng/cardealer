# Demo Workspace

 This repository currently contains:

- `frontend/` for the React + Vite client
- `backend/` for the Laravel API
- `database/schema.sql` for the shared schema reference
- `docker-compose.yml` for a local MySQL database

## Run The Database

This project includes a Docker Compose setup for MySQL 8.4.

1. Copy `.env.docker.example` to `.env.docker`.
2. Start the database from the repository root:

```bash
docker compose up -d
```

The container will create `car_dealership_db` and import `database/schema.sql` automatically on first start.

Connection details by default:

```text
Host: 127.0.0.1
Port: 3306
Database: car_dealership_db
Username: car_user
Password: car_pass
```

If you need to rebuild the database from scratch after changing `database/schema.sql`, remove the volume and start again:

```bash
docker compose down -v
docker compose up -d
```

## Run The Frontend

Run the frontend from the repository root:

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173` after Vite starts.

The root `vite.config.ts` uses `frontend/` as the Vite root, so you should run the command from the repository root, not from inside `frontend/`.

If needed, set `VITE_API_BASE_URL` to point at your API, for example:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## Run The Backend

Run the backend from `backend/`:

```bash
composer install
php artisan migrate --path=vendor/laravel/sanctum/database/migrations --force
php artisan storage:link
php artisan serve
```

Laravel is configured for the `management_db-db_management-1` Docker database with:

```text
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3308
DB_DATABASE=management_db
DB_USERNAME=admin
DB_PASSWORD=root
```

Local API login:

```text
Email: admin@cardealer.com
Password: password123
```

See `backend/README.md` for the available API routes and backend notes.
