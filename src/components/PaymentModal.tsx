import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCardIcon, SmartphoneIcon, BanknoteIcon, ShieldCheckIcon, ArrowLeftIcon, TicketIcon } from "lucide-react";
import { toast } from "sonner";
import { useOrders } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";
import { useStock } from "@/context/StockContext";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: number;
    brand: string;
    size?: string;
    color?: string;
  } | null;
}

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    description: "Visa, Mastercard, RuPay",
    icon: <CreditCardIcon className="w-5 h-5" />
  },
  {
    id: "upi",
    name: "UPI Payment",
    description: "GPay, PhonePe, Paytm",
    icon: <SmartphoneIcon className="w-5 h-5" />
  },
  {
    id: "wallet",
    name: "Digital Wallet",
    description: "Paytm, Amazon Pay, etc.",
    icon: <BanknoteIcon className="w-5 h-5" />
  }
];

export function PaymentModal({ isOpen, onClose, product }: PaymentModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  
  const { addOrder } = useOrders();
  const { cartItems, clearCart } = useCart();
  const { updateStock } = useStock();

  if (!product) return null;

  const discountAmount = (product.price * couponDiscount) / 100;
  const discountedPrice = product.price - discountAmount;
  const tax = discountedPrice * 0.18;
  const total = discountedPrice + tax;

  const applyCoupon = () => {
    const validCoupons = {
      "SAVE10": 10,
      "FIRST20": 20,
      "WELCOME15": 15,
      "STUDENT25": 25
    };
    
    if (validCoupons[couponCode as keyof typeof validCoupons]) {
      setCouponDiscount(validCoupons[couponCode as keyof typeof validCoupons]);
      setCouponApplied(true);
      toast.success(`Coupon applied! ${validCoupons[couponCode as keyof typeof validCoupons]}% discount`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponDiscount(0);
    setCouponApplied(false);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setShowPaymentForm(true);
  };

  const handlePayment = () => {
    // Create order from cart items
    const orderItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      brand: item.brand,
      image: item.image,
      category: item.category,
      type: item.type,
      size: item.size,
      color: item.color,
      orderType: item.orderType
    }));

    // Determine order category (prioritize food orders)
    const hasFood = orderItems.some(item => item.category === 'food');
    const category = hasFood ? 'food' : orderItems[0]?.category || 'other';

    // Create the order
    addOrder({
      items: orderItems,
      total: total,
      status: category === 'food' ? 'preparing' : 'ready',
      category: category,
      paymentMethod: selectedPaymentMethod,
      orderType: orderItems[0]?.orderType
    });

    // Update stock for all items
    orderItems.forEach(item => {
      updateStock(item.id, item.quantity);
    });

    // Clear the cart
    clearCart();

    toast.success("Payment successful! Your order has been placed.");
    onClose();
    resetModal();
  };

  const handleBack = () => {
    setShowPaymentForm(false);
    setSelectedPaymentMethod("");
  };

  const resetModal = () => {
    setShowPaymentForm(false);
    setSelectedPaymentMethod("");
    setCouponCode("");
    setCouponDiscount(0);
    setCouponApplied(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {showPaymentForm && (
              <Button variant="ghost" size="icon" onClick={handleBack} className="mr-2">
                <ArrowLeftIcon className="w-4 h-4" />
              </Button>
            )}
            <ShieldCheckIcon className="w-5 h-5" />
            {showPaymentForm ? "Complete Payment" : "Choose Payment Method"}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1 pr-2">
          {!showPaymentForm ? (
            <div className="space-y-4">
              {/* Order Summary */}
              <Card className="bg-shopping-surface">
                <CardHeader>
                  <CardTitle className="text-lg">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      {product.size && product.color && (
                        <p className="text-sm text-muted-foreground">
                          Size: {product.size}, Color: {product.color}
                        </p>
                      )}
                    </div>
                    <p className="font-semibold">₹{product.price}</p>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{product.price}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount ({couponDiscount}%)</span>
                      <span>-₹{discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Tax (GST 18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total Amount</span>
                    <span className="text-shopping-primary">₹{total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Coupon Section */}
              <Card className="bg-shopping-surface">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TicketIcon className="w-5 h-5" />
                    Apply Coupon
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!couponApplied ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1"
                      />
                      <Button 
                        onClick={applyCoupon} 
                        disabled={!couponCode}
                        variant="outline"
                      >
                        Apply
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <TicketIcon className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          {couponCode} - {couponDiscount}% OFF
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={removeCoupon}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Available codes: SAVE10, FIRST20, WELCOME15, STUDENT25
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <div className="space-y-3">
                <h3 className="font-semibold">Select Payment Method</h3>
                {paymentMethods.map((method) => (
                  <Card 
                    key={method.id}
                    className="cursor-pointer hover:bg-shopping-surface transition-colors"
                    onClick={() => handlePaymentMethodSelect(method.id)}
                  >
                    <CardContent className="flex items-center gap-3 p-4">
                      {method.icon}
                      <div className="flex-1">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Payment Form */}
              <Card className="bg-shopping-surface">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.icon}
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedPaymentMethod === "card" && (
                    <div className="space-y-3">
                      <div className="p-4 border border-border rounded-lg bg-background">
                        <p className="text-sm text-muted-foreground mb-2">Card Number</p>
                        <p className="font-mono">**** **** **** 1234</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 border border-border rounded-lg bg-background">
                          <p className="text-xs text-muted-foreground">Expiry</p>
                          <p className="font-mono">12/25</p>
                        </div>
                        <div className="p-3 border border-border rounded-lg bg-background">
                          <p className="text-xs text-muted-foreground">CVV</p>
                          <p className="font-mono">***</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {selectedPaymentMethod === "upi" && (
                    <div className="text-center p-6">
                      <div className="w-32 h-32 bg-white border-2 border-shopping-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <p className="text-xs text-center">QR Code<br/>Scan to Pay</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Scan QR code with any UPI app
                      </p>
                    </div>
                  )}
                  
                  {selectedPaymentMethod === "wallet" && (
                    <div className="space-y-3">
                      <div className="p-4 border border-border rounded-lg bg-background">
                        <p className="text-sm text-muted-foreground mb-2">Wallet Balance</p>
                        <p className="text-xl font-bold text-green-600">₹5,250.00</p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center p-3 bg-shopping-surface rounded-lg">
                    <span className="font-medium">Amount to Pay</span>
                    <span className="text-xl font-bold text-shopping-primary">₹{total.toFixed(2)}</span>
                  </div>

                  <Button 
                    onClick={handlePayment}
                    className="w-full bg-gradient-primary hover:opacity-90"
                    size="lg"
                  >
                    Pay Now ₹{total.toFixed(2)}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}