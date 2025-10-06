import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrashIcon, MinusIcon, PlusIcon, ShoppingCartIcon, ClockIcon, CreditCardIcon, UtensilsIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PaymentModal } from "@/components/PaymentModal";
import { useCart } from "@/context/CartContext";
import { updateProductStock, queryAI } from "@/lib/supabaseService";
import { useOrders } from "@/context/OrderContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  brand: string;
  category: "clothing" | "food" | "other";
  type: "purchase" | "trial"; // Add type to distinguish between purchase and trial items
  size?: string;
  color?: string;
}

const sampleCartItems: CartItem[] = [
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
];

export default function Cart() {
  const { cartItems, updateQuantity: updateCartQuantity, removeFromCart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentProduct, setPaymentProduct] = useState<any>(null);
  const [aiRecommendations, setAiRecommendations] = useState<string>("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Fetch AI recommendations when cart changes
  useEffect(() => {
    if (cartItems.length > 0) {
      fetchAIRecommendations();
    } else {
      setAiRecommendations("");
    }
  }, [cartItems.length]);

  const fetchAIRecommendations = async () => {
    try {
      setIsLoadingAI(true);
      const productNames = cartItems.map(item => item.name).join(", ");
      const prompt = `I have these products in my cart: ${productNames}. Recommend 3 complementary accessories or related products that would go well with these items. Keep it brief and helpful.`;
      
      console.log("🤖 Fetching AI recommendations...");
      const result = await queryAI(prompt);
      setAiRecommendations(result.response);
      console.log("✅ AI Recommendations fetched");
    } catch (error) {
      console.error("❌ Failed to fetch AI recommendations:", error);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      updateCartQuantity(id, newQuantity);
    }
  };

  const removeItem = (id: string) => {
    removeFromCart(id);
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  const clothingPurchaseItems = cartItems.filter(item => item.category === "clothing" && item.type === "purchase");
  const clothingTrialItems = cartItems.filter(item => item.category === "clothing" && item.type === "trial");
  const foodItems = cartItems.filter(item => item.category === "food");
  const otherItems = cartItems.filter(item => item.category === "other");

  const handleCompleteCheckout = async () => {
    try {
      setIsCheckingOut(true);
      
      // Determine the category and payment method based on cart contents
      const hasClothing = clothingPurchaseItems.length > 0 || clothingTrialItems.length > 0;
      const hasFood = foodItems.length > 0;
      const hasOther = otherItems.length > 0;
      
      let category: "clothing" | "food" | "other" = "other";
      if (hasClothing) category = "clothing";
      else if (hasFood) category = "food";
      
      // Create order via OrderContext
      await addOrder({
        items: cartItems,
        total: total,
        status: "preparing",
        category: category,
        paymentMethod: "card",
        orderType: foodItems.length > 0 && foodItems[0].orderType ? foodItems[0].orderType : undefined
      });
      
      // Update product stock
      const stockUpdatePromises = cartItems.map(item => 
        updateProductStock(item.id, -item.quantity).catch(err => {
          console.warn(`⚠️ Could not update stock for ${item.name}:`, err);
        })
      );
      
      await Promise.all(stockUpdatePromises);
      
      // Clear cart
      clearCart();
      
      toast.success("Order completed! 🎉 Check your orders page.");
    } catch (error) {
      console.error("❌ Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleClothingCheckout = (action: "trial" | "purchase") => {
    const clothingItems = action === "purchase" ? clothingPurchaseItems : clothingTrialItems;
    const subtotalAmount = clothingItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (action === "purchase") {
      setPaymentProduct({
        name: `${clothingItems.length} Clothing Items`,
        price: subtotalAmount, // Pass subtotal without tax
        brand: "Various Brands"
      });
      setShowPayment(true);
    } else {
      toast.success("Trial reservation confirmed! Visit store within 2 hours.");
    }
  };

  const handleFoodCheckout = (action: "order" | "schedule") => {
    const subtotalAmount = foodItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (action === "order") {
      setPaymentProduct({
        name: `${foodItems.length} Food Items`,
        price: subtotalAmount, // Pass subtotal without tax
        brand: "Food Court"
      });
      setShowPayment(true);
    } else {
      toast.success("Schedule time picker opened - Feature coming soon!");
    }
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
            {/* Clothing Purchase Items */}
            {clothingPurchaseItems.length > 0 && (
              <Card className="bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCartIcon className="w-5 h-5" />
                    Clothing Items - Purchase
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {clothingPurchaseItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        {item.size && item.color && (
                          <p className="text-xs text-muted-foreground">Size: {item.size}, Color: {item.color}</p>
                        )}
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
                      className="w-full bg-gradient-primary"
                      onClick={() => handleClothingCheckout("purchase")}
                    >
                      <CreditCardIcon className="w-4 h-4 mr-2" />
                      Proceed to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Clothing Trial Items */}
            {clothingTrialItems.length > 0 && (
              <Card className="bg-gradient-card border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-orange-500" />
                    Clothing Items - Reserved for Trial
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">Trial</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {clothingTrialItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-lg bg-orange-50">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        {item.size && item.color && (
                          <p className="text-xs text-muted-foreground">Size: {item.size}, Color: {item.color}</p>
                        )}
                        <p className="font-bold text-shopping-primary">₹{item.price}</p>
                        <Badge variant="secondary" className="bg-orange-200 text-orange-800 mt-1">
                          Trial Period: 2 hours
                        </Badge>
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
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => handleClothingCheckout("trial")}
                    >
                      <ClockIcon className="w-4 h-4 mr-2" />
                      Confirm Trial Reservation
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
                <Button 
                  className="w-full mt-4 bg-gradient-primary" 
                  size="lg"
                  onClick={handleCompleteCheckout}
                  disabled={isCheckingOut || cartItems.length === 0}
                >
                  <ShoppingCartIcon className="w-4 h-4 mr-2" />
                  {isCheckingOut ? "Processing..." : "Complete Checkout"}
                </Button>
              </CardContent>
            </Card>

            {/* AI Recommendations Section */}
            {aiRecommendations && (
              <Card className="bg-gradient-card border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">AI Recommendations</h3>
                      {isLoadingAI ? (
                        <p className="text-muted-foreground">Loading recommendations...</p>
                      ) : (
                        <p className="text-muted-foreground whitespace-pre-line text-sm">{aiRecommendations}</p>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={fetchAIRecommendations}
                        disabled={isLoadingAI}
                      >
                        <Sparkles className="w-3 h-3 mr-2" />
                        Refresh Recommendations
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      
      <PaymentModal
        isOpen={showPayment}
        onClose={() => {
          setShowPayment(false);
          setPaymentProduct(null);
        }}
        product={paymentProduct}
      />
    </div>
  );
}