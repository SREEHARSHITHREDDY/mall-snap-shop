import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCardIcon, SmartphoneIcon, BanknoteIcon, ShieldCheckIcon, ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";

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

  if (!product) return null;

  const tax = product.price * 0.18;
  const total = product.price + tax;

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    setShowPaymentForm(true);
  };

  const handlePayment = () => {
    toast.success("Payment successful! Your order has been placed.");
    onClose();
    setShowPaymentForm(false);
    setSelectedPaymentMethod("");
  };

  const handleBack = () => {
    setShowPaymentForm(false);
    setSelectedPaymentMethod("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
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
      </DialogContent>
    </Dialog>
  );
}