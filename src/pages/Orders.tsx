import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCodeIcon, ClockIcon, CheckCircleIcon, TruckIcon } from "lucide-react";

interface Order {
  id: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    brand: string;
  }>;
  total: number;
  status: "preparing" | "ready" | "collected" | "delivered";
  category: "clothing" | "food" | "other";
  orderTime: string;
  estimatedTime?: string;
  qrCode: string;
}

const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    items: [
      { name: "Premium Cotton T-Shirt", quantity: 2, price: 1299, brand: "Zara" },
    ],
    total: 2598,
    status: "ready",
    category: "clothing",
    orderTime: "2024-01-15 14:30",
    qrCode: "QR001",
  },
  {
    id: "ORD-002",
    items: [
      { name: "Big Mac Combo", quantity: 1, price: 299, brand: "McDonald's" },
      { name: "Apple Pie", quantity: 2, price: 65, brand: "McDonald's" },
    ],
    total: 429,
    status: "preparing",
    category: "food",
    orderTime: "2024-01-15 15:45",
    estimatedTime: "16:05",
    qrCode: "QR002",
  },
  {
    id: "ORD-003",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 4999, brand: "Sony" },
    ],
    total: 4999,
    status: "collected",
    category: "other",
    orderTime: "2024-01-14 11:20",
    qrCode: "QR003",
  },
];

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case "preparing":
      return "secondary";
    case "ready":
      return "default";
    case "collected":
    case "delivered":
      return "outline";
    default:
      return "secondary";
  }
};

const getStatusIcon = (status: Order['status']) => {
  switch (status) {
    case "preparing":
      return <ClockIcon className="w-4 h-4" />;
    case "ready":
      return <TruckIcon className="w-4 h-4" />;
    case "collected":
    case "delivered":
      return <CheckCircleIcon className="w-4 h-4" />;
    default:
      return <ClockIcon className="w-4 h-4" />;
  }
};

const getStatusText = (order: Order) => {
  if (order.category === "food") {
    switch (order.status) {
      case "preparing":
        return "Preparing";
      case "ready":
        return "Ready for Pickup";
      case "collected":
        return "Served";
      default:
        return order.status;
    }
  }
  return order.status === "collected" ? "Collected" : order.status;
};

export default function Orders() {
  const [orders] = useState<Order[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const activeOrders = orders.filter(order => 
    order.status === "preparing" || order.status === "ready"
  );
  const completedOrders = orders.filter(order => 
    order.status === "collected" || order.status === "delivered"
  );

  const showQRCode = (order: Order) => {
    setSelectedOrder(order);
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">My Orders</h1>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">Active Orders ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Order History ({completedOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeOrders.length === 0 ? (
              <Card className="text-center p-8 bg-gradient-card">
                <ClockIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-2">No active orders</h2>
                <p className="text-muted-foreground">Your current orders will appear here</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeOrders.map((order) => (
                  <Card key={order.id} className="bg-gradient-card">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {getStatusText(order)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ordered: {new Date(order.orderTime).toLocaleString()}
                      </p>
                      {order.estimatedTime && (
                        <p className="text-sm text-shopping-primary font-medium">
                          Estimated ready: {order.estimatedTime}
                        </p>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-shopping-primary">₹{order.total.toFixed(2)}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-gradient-primary"
                        onClick={() => showQRCode(order)}
                      >
                        <QrCodeIcon className="w-4 h-4 mr-2" />
                        Show QR Code
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {completedOrders.length === 0 ? (
              <Card className="text-center p-8 bg-gradient-card">
                <CheckCircleIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-bold mb-2">No completed orders</h2>
                <p className="text-muted-foreground">Your order history will appear here</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedOrders.map((order) => (
                  <Card key={order.id} className="bg-gradient-card opacity-90">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <Badge variant={getStatusColor(order.status)} className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {getStatusText(order)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ordered: {new Date(order.orderTime).toLocaleString()}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.quantity}x {item.name}</span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-3">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-shopping-primary">₹{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* QR Code Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedOrder(null)}>
            <Card className="w-full max-w-md mx-4 bg-gradient-card" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="text-center">
                <CardTitle>Order QR Code</CardTitle>
                <p className="text-sm text-muted-foreground">Show this QR code to collect your order</p>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border">
                  <QrCodeIcon className="w-32 h-32 text-gray-300" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold">Order #{selectedOrder.id}</p>
                  <p className="text-sm text-muted-foreground">QR Code: {selectedOrder.qrCode}</p>
                  <Badge variant={getStatusColor(selectedOrder.status)} className="flex items-center gap-1 mx-auto w-fit">
                    {getStatusIcon(selectedOrder.status)}
                    {getStatusText(selectedOrder)}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedOrder(null)}
                >
                  Close
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}