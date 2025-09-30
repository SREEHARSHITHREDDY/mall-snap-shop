import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MainLayout } from "@/components/MainLayout";
import { CartProvider } from "@/context/CartContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { OrderProvider } from "@/context/OrderContext";
import { StockProvider } from "@/context/StockContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Clothing from "./pages/Clothing";
import Food from "./pages/Food";
import Other from "./pages/Other";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import QRCodes from "./pages/QRCodes";

const queryClient = new QueryClient();

const App = () => {
  console.log('Shopping Matrix App Initialized');
  
  return (
  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
      <StockProvider>
        <OrderProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/clothing" element={<Clothing />} />
                    <Route path="/food" element={<Food />} />
                    <Route path="/other" element={<Other />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/qr-codes" element={<QRCodes />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </MainLayout>
              </BrowserRouter>
            </TooltipProvider>
          </CartProvider>
        </OrderProvider>
      </StockProvider>
    </NotificationProvider>
  </QueryClientProvider>
  );
};

export default App;