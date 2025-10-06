import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  image: string | null;
  stock_count: number;
  description: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Order {
  id: string;
  order_number: string;
  items: any;
  total: number;
  status: 'preparing' | 'ready' | 'collected' | 'delivered';
  qr_code: string;
  estimated_time: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Get all products from Supabase
 */
export async function getProducts(category?: string): Promise<Product[]> {
  try {
    let query = supabase.from('products').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Get a single product by ID
 */
export async function getProduct(id: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}

/**
 * Add a new product
 */
export async function addProduct(productData: {
  name: string;
  price: number;
  category: string;
  brand: string;
  image?: string;
  stock_count: number;
  description?: string;
}): Promise<Product> {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

/**
 * Update product stock
 */
export async function updateProductStock(id: string, stockChange: number): Promise<void> {
  try {
    // Get current stock
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('stock_count')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    const newStock = Math.max(0, (product?.stock_count || 0) + stockChange);
    
    const { error } = await supabase
      .from('products')
      .update({ stock_count: newStock })
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error updating product stock:', error);
    throw error;
  }
}

/**
 * Get all orders from Supabase
 */
export async function getOrders(status?: string): Promise<Order[]> {
  try {
    let query = supabase.from('orders').select('*');
    
    if (status) {
      query = query.eq('status', status);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data || []) as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

/**
 * Add a new order
 */
export async function addOrder(orderData: {
  order_number: string;
  items: any;
  total: number;
  status: 'preparing' | 'ready' | 'collected' | 'delivered';
  qr_code: string;
  estimated_time: number;
}): Promise<Order> {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (error) throw error;
    return data as Order;
  } catch (error) {
    console.error('Error adding order:', error);
    throw error;
  }
}

/**
 * Update order status
 */
export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  try {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
}

/**
 * Query AI for product recommendations
 */
export async function queryAI(prompt: string): Promise<{ response: string; model: string }> {
  try {
    const { data, error } = await supabase.functions.invoke('ai-query', {
      body: { prompt }
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error querying AI:', error);
    throw error;
  }
}
