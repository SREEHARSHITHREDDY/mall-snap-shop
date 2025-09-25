import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  image: string;
  category: "clothing" | "food" | "other";
  type: "purchase" | "trial";
  size?: string;
  color?: string;
  orderType?: "dine-in" | "takeaway";
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: "preparing" | "ready" | "collected" | "delivered";
  category: "clothing" | "food" | "other";
  orderTime: string;
  estimatedTime?: string;
  qrCode: string;
  paymentMethod: string;
  orderType?: "dine-in" | "takeaway";
}

interface OrderContextType {
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'orderTime' | 'qrCode'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getActiveOrders: () => Order[];
  getCompletedOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const generateOrderId = () => {
    return `ORD-${Date.now().toString().slice(-6)}`;
  };

  const generateQRCode = () => {
    return `QR${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  };

  const calculateEstimatedTime = (items: OrderItem[]) => {
    const foodItems = items.filter(item => item.category === 'food');
    if (foodItems.length === 0) return undefined;

    // Base preparation time calculation based on quantity and complexity
    let totalMinutes = 0;
    
    foodItems.forEach(item => {
      // Different prep times based on item type
      let baseTime = 10; // default 10 minutes
      
      if (item.name.includes('Combo') || item.name.includes('Meal')) {
        baseTime = 15;
      } else if (item.name.includes('Sandwich') || item.name.includes('Burger')) {
        baseTime = 12;
      } else if (item.name.includes('Fries') || item.name.includes('Drink')) {
        baseTime = 5;
      } else if (item.name.includes('Coffee') || item.name.includes('Latte')) {
        baseTime = 8;
      }

      totalMinutes += baseTime * item.quantity;
    });

    // Add buffer time for multiple items
    if (foodItems.length > 3) {
      totalMinutes += 5;
    }

    // Cap maximum time at 45 minutes
    totalMinutes = Math.min(totalMinutes, 45);

    const estimatedTime = new Date(Date.now() + totalMinutes * 60000);
    return estimatedTime.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'orderTime' | 'qrCode'>) => {
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      orderTime: new Date().toISOString(),
      qrCode: generateQRCode(),
      estimatedTime: calculateEstimatedTime(orderData.items)
    };

    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const getActiveOrders = () => {
    return orders.filter(order => 
      order.status === "preparing" || order.status === "ready"
    );
  };

  const getCompletedOrders = () => {
    return orders.filter(order => 
      order.status === "collected" || order.status === "delivered"
    );
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      getActiveOrders,
      getCompletedOrders
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}