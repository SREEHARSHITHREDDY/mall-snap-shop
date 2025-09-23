import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrashIcon, MinusIcon, PlusIcon, ShoppingCartIcon, ClockIcon, CreditCardIcon, UtensilsIcon } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
  category: "clothing" | "food" | "other";
}

const sampleCartItems: CartItem[] = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 1299,
    quantity: 2,
    image: "/api/placeholder/100/100",
    brand: "Zara",
    category: "clothing"
  },
  {
    id: "2",
    name: "Big Mac Combo",
    price: 299,
    quantity: 1,
    image: "/api/placeholder/100/100",
    brand: "McDonald's",
    category: "food"
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const clothingItems = cartItems.filter(item => item.category === "clothing");
  const foodItems = cartItems.filter(item => item.category === "food");
  const otherItems = cartItems.filter(item => item.category === "other");

  const handleClothingCheckout = (action: "trial" | "purchase") => {
    console.log(`Clothing checkout: ${action}`);
    // Handle clothing checkout logic
  };

  const handleFoodCheckout = (action: "order" | "schedule") => {
    console.log(`Food checkout: ${action}`);
    // Handle food checkout logic
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <Card className="text-center p-8 bg-gradient-card">
          <ShoppingCartIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground">Add some items to get started!</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Clothing Items */}
            {clothingItems.length > 0 && (
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCartIcon className="w-5 h-5" />
                    Clothing Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {clothingItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <p className="font-bold text-shopping-primary">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleClothingCheckout("trial")}
                    >
                      <ClockIcon className="w-4 h-4 mr-2" />
                      Reserve for Trial
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-primary"
                      onClick={() => handleClothingCheckout("purchase")}
                    >
                      <CreditCardIcon className="w-4 h-4 mr-2" />
                      Proceed to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Food Items */}
            {foodItems.length > 0 && (
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UtensilsIcon className="w-5 h-5" />
                    Food Items
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {foodItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <p className="font-bold text-shopping-primary">₹{item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"  
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleFoodCheckout("order")}
                    >
                      <ShoppingCartIcon className="w-4 h-4 mr-2" />  
                      Place Order
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-primary"
                      onClick={() => handleFoodCheckout("schedule")}
                    >
                      <ClockIcon className="w-4 h-4 mr-2" />
                      Schedule Time
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-shopping-primary">₹{total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}