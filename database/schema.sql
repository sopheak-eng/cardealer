CREATE DATABASE IF NOT EXISTS car_dealership_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE car_dealership_db;

CREATE TABLE users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NULL,
  role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
  status ENUM('active', 'inactive', 'blocked') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role (role),
  KEY idx_users_status (status)
) ENGINE=InnoDB;

CREATE TABLE cars (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  make VARCHAR(80) NOT NULL,
  model VARCHAR(120) NOT NULL,
  model_year SMALLINT UNSIGNED NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  fuel_type ENUM('gasoline', 'diesel', 'hybrid', 'electric', 'plugin_hybrid', 'cng', 'lpg') NOT NULL,
  transmission ENUM('manual', 'automatic', 'cvt', 'semi_automatic') NULL,
  body_type VARCHAR(50) NULL,
  color VARCHAR(50) NULL,
  mileage INT UNSIGNED NULL,
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 1,
  vin VARCHAR(64) NULL,
  description TEXT NULL,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  status ENUM('available', 'reserved', 'sold', 'hidden') NOT NULL DEFAULT 'available',
  created_by BIGINT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_cars_vin (vin),
  KEY idx_cars_make_model (make, model),
  KEY idx_cars_model_year (model_year),
  KEY idx_cars_price (price),
  KEY idx_cars_fuel_type (fuel_type),
  KEY idx_cars_status (status),
  KEY idx_cars_created_by (created_by),
  CONSTRAINT fk_cars_created_by
    FOREIGN KEY (created_by) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  CONSTRAINT chk_cars_model_year CHECK (model_year BETWEEN 1900 AND 2100),
  CONSTRAINT chk_cars_price CHECK (price >= 0),
  CONSTRAINT chk_cars_stock_quantity CHECK (stock_quantity >= 0),
  CONSTRAINT chk_cars_mileage CHECK (mileage IS NULL OR mileage >= 0)
) ENGINE=InnoDB;

CREATE TABLE car_images (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  car_id BIGINT UNSIGNED NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255) NULL,
  sort_order INT UNSIGNED NOT NULL DEFAULT 0,
  is_primary TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_car_images_car_id (car_id),
  KEY idx_car_images_primary (car_id, is_primary),
  CONSTRAINT fk_car_images_car
    FOREIGN KEY (car_id) REFERENCES cars(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO users (full_name, email, password_hash, role)
VALUES
  ('Admin User', 'admin@cardealer.com', '$2y$12$LdjpIwmW6T6oD4d6bcduzePwmWkrqm56.jL8cVee6sHfi3bIt3cpy', 'admin'),
  ('Customer User', 'customer@cardealer.com', '$2y$12$LdjpIwmW6T6oD4d6bcduzePwmWkrqm56.jL8cVee6sHfi3bIt3cpy', 'customer');
