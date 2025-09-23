import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
  category: "clothing" | "food" | "other";
  type: "purchase" | "trial";
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      price: 1299,
      quantity: 1,
      image: "/api/placeholder/100/100",
      brand: "Zara",
      category: "clothing",
      type: "purchase",
      size: "M",
      color: "Black"
    },
    {
      id: "2",
      name: "Textured Knit Sweater",
      price: 2899,
      quantity: 1,
      image: "/api/placeholder/100/100",
      brand: "Zara",
      category: "clothing",
      type: "trial",
      size: "L",
      color: "Grey"
    },
    {
      id: "3",
      name: "Big Mac Combo",
      price: 299,
      quantity: 1,
      image: "/api/placeholder/100/100",
      brand: "McDonald's",
      category: "food",
      type: "purchase"
    }
  ]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const existingItem = cartItems.find(cartItem => 
      cartItem.id === item.id && 
      cartItem.size === item.size && 
      cartItem.color === item.color &&
      cartItem.type === item.type
    );

    if (existingItem) {
      updateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}