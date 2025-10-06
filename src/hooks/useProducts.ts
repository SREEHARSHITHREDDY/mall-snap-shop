import { useState, useEffect } from 'react';
import { getProducts } from '@/lib/supabaseService';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  rating?: number;
  inStock: boolean;
  stockCount: number;
  category: 'clothing' | 'food' | 'other';
  description?: string;
  sizes?: string[];
  colors?: string[];
  fitStyle?: string;
  material?: string;
  prepTime?: string;
}

export function useProducts(category?: 'clothing' | 'food' | 'other') {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, [category]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(category);
      
      const formattedProducts: Product[] = data.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image || '/api/placeholder/300/300',
        brand: p.brand,
        rating: 4.5,
        inStock: p.stock_count > 0,
        stockCount: p.stock_count,
        category: p.category as 'clothing' | 'food' | 'other',
        description: p.description || undefined,
      }));
      
      setProducts(formattedProducts);
      setError(null);
    } catch (err) {
      console.error('Failed to load products:', err);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    loadProducts();
  };

  return { products, loading, error, refreshProducts };
}
