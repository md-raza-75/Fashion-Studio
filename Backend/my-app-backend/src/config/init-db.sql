-- Drop tables if they exist
DROP TABLE IF EXISTS products;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('Long Kurti', 'Short Kurti', 'Saree', 'Gown', 'Jewellery')),
  price DECIMAL(10, 2) NOT NULL,
  img TEXT NOT NULL,
  description TEXT,
  stock VARCHAR(50) NOT NULL DEFAULT 'In Stock' CHECK (stock IN ('In Stock', 'Out of Stock', 'Limited Stock')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for category search
CREATE INDEX idx_products_category ON products(category); 