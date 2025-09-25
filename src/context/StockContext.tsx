import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StockItem {
  id: string;
  stockCount: number;
  category: "clothing" | "food" | "other";
  brand: string;
}

interface StockContextType {
  stockData: Record<string, StockItem>;
  updateStock: (itemId: string, quantityUsed: number) => void;
  getStock: (itemId: string) => number;
  initializeStock: (items: StockItem[]) => void;
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
  const [stockData, setStockData] = useState<Record<string, StockItem>>({});

  const initializeStock = (items: StockItem[]) => {
    const stockMap: Record<string, StockItem> = {};
    items.forEach(item => {
      stockMap[item.id] = item;
    });
    setStockData(stockMap);
  };

  const updateStock = (itemId: string, quantityUsed: number) => {
    setStockData(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        stockCount: Math.max(0, prev[itemId]?.stockCount - quantityUsed || 0)
      }
    }));
  };

  const getStock = (itemId: string) => {
    return stockData[itemId]?.stockCount || 0;
  };

  return (
    <StockContext.Provider value={{
      stockData,
      updateStock,
      getStock,
      initializeStock
    }}>
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);
  if (context === undefined) {
    throw new Error('useStock must be used within a StockProvider');
  }
  return context;
}