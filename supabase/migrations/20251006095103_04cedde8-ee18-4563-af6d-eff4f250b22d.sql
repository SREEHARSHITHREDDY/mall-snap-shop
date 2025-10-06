-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('clothing', 'food', 'other')),
  brand TEXT NOT NULL,
  image TEXT,
  stock_count INTEGER NOT NULL DEFAULT 0,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('preparing', 'ready', 'collected', 'delivered')),
  qr_code TEXT NOT NULL,
  estimated_time INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Products are publicly readable
CREATE POLICY "Products are viewable by everyone"
  ON public.products
  FOR SELECT
  USING (true);

-- Orders are viewable by everyone (for public kiosk use)
CREATE POLICY "Orders are viewable by everyone"
  ON public.orders
  FOR SELECT
  USING (true);

-- Orders can be created by everyone (for public kiosk use)
CREATE POLICY "Orders can be created by everyone"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Orders can be updated by everyone (for status updates)
CREATE POLICY "Orders can be updated by everyone"
  ON public.orders
  FOR UPDATE
  USING (true);

-- Create indexes
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_brand ON public.products(brand);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

-- Insert sample products
INSERT INTO public.products (name, price, category, brand, image, stock_count, description) VALUES
('Zara T-Shirt', 29.99, 'clothing', 'Zara', '/src/assets/products/zara-tshirt.jpg', 50, 'Classic cotton t-shirt'),
('Zara Jeans', 59.99, 'clothing', 'Zara', '/src/assets/products/zara-jeans.jpg', 30, 'Slim fit denim jeans'),
('Zara Sweater', 49.99, 'clothing', 'Zara', '/src/assets/products/zara-sweater.jpg', 25, 'Cozy knit sweater'),
('McDonald''s Big Mac', 5.99, 'food', 'McDonald''s', '/src/assets/products/mcdonalds-bigmac.jpg', 100, 'Iconic burger with special sauce'),
('KFC Zinger', 6.99, 'food', 'KFC', '/src/assets/products/kfc-zinger.jpg', 80, 'Spicy chicken burger'),
('Starbucks Caramel Latte', 4.99, 'food', 'Starbucks', '/src/assets/products/starbucks-caramel.jpg', 120, 'Sweet caramel coffee drink');