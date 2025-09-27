-- Create products table for perfume store
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2),
    competitor_price DECIMAL(10,2),
    category VARCHAR(50) NOT NULL CHECK (category IN ('men', 'women', 'unisex')),
    volume_ml INTEGER,
    is_new BOOLEAN DEFAULT false,
    discount_percent INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searches
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_price ON products(price);

-- Create competitor prices tracking table
CREATE TABLE competitor_prices (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    competitor_name VARCHAR(100) NOT NULL,
    competitor_price DECIMAL(10,2) NOT NULL,
    competitor_url VARCHAR(500),
    scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_competitor_prices_product ON competitor_prices(product_name, brand);