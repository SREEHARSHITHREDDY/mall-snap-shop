import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QrCodeIcon, DownloadIcon, ShareIcon, RefreshCcwIcon } from "lucide-react";
import { useOrders, Order } from "@/context/OrderContext";

const getStatusColor = (status: Order['status'] | 'used' | 'expired') => {
  switch (status) {
    case "preparing":
    case "ready":
      return "default";
    case "collected":
    case "delivered":
    case "used":
      return "outline";
    case "expired":
      return "destructive";
    default:
      return "secondary";
  }
};

const getCategoryColor = (category: Order['category']) => {
  switch (category) {
    case "clothing":
      return "bg-blue-100 text-blue-800";
    case "food":
      return "bg-orange-100 text-orange-800";
    case "other":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function QRCodes() {
  const { getActiveOrders, getCompletedOrders } = useOrders();
  const [selectedQR, setSelectedQR] = useState<Order | null>(null);

  const activeOrders = getActiveOrders();
  const completedOrders = getCompletedOrders();

  const downloadQR = (order: Order) => {
    console.log("Downloading QR code:", order.qrCode);
    // In a real app, this would generate and download the QR code image
  };

  const shareQR = (order: Order) => {
    console.log("Sharing QR code:", order.qrCode);
    // In a real app, this would open share options
  };

  const refreshQR = (order: Order) => {
    console.log("Refreshing QR code:", order.qrCode);
    // In a real app, this would generate a new QR code
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">My QR Codes</h1>

        {/* Active QR Codes */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Active QR Codes</h2>
          {activeOrders.length === 0 ? (
            <Card className="text-center p-8 bg-gradient-card">
              <QrCodeIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">No active QR codes</h3>
              <p className="text-muted-foreground">QR codes for your orders will appear here</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeOrders.map((order) => (
                <Card key={order.id} className="bg-gradient-card hover:shadow-elevated transition-smooth">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={getStatusColor(order.status)}>
                          {order.status.toUpperCase()}
                        </Badge>
                        <Badge className={getCategoryColor(order.category)}>
                          {order.category.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Created: {new Date(order.orderTime).toLocaleString()}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      Valid until order pickup
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div 
                      className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center border cursor-pointer hover:shadow-md transition-smooth"
                      onClick={() => setSelectedQR(order)}
                    >
                      <QrCodeIcon className="w-24 h-24 text-gray-300" />
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Items:</p>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-xs text-muted-foreground">• {item.quantity}x {item.name}</p>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadQR(order)}
                        className="flex-1"
                      >
                        <DownloadIcon className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        variant="outline" 
                        size="sm"
                        onClick={() => shareQR(order)}
                        className="flex-1"
                      >
                        <ShareIcon className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refreshQR(order)}
                      >
                        <RefreshCcwIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Used QR Codes */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Previous QR Codes</h2>
          {completedOrders.length === 0 ? (
            <Card className="text-center p-8 bg-gradient-card opacity-75">
              <QrCodeIcon className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">No previous QR codes</h3>
              <p className="text-muted-foreground">Used QR codes will appear here</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedOrders.map((order) => (
                <Card key={order.id} className="bg-gradient-card opacity-75">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <div className="flex gap-2">
                        <Badge variant={getStatusColor("used")}>
                          USED
                        </Badge>
                        <Badge className={getCategoryColor(order.category)}>
                          {order.category.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Created: {new Date(order.orderTime).toLocaleString()}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border">
                      <QrCodeIcon className="w-24 h-24 text-gray-200" />
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Items:</p>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-xs text-muted-foreground">• {item.quantity}x {item.name}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* QR Code Modal */}
        {selectedQR && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedQR(null)}>
            <Card className="w-full max-w-md mx-4 bg-gradient-card" onClick={(e) => e.stopPropagation()}>
              <CardHeader className="text-center">
                <CardTitle>QR Code - Order #{selectedQR.id}</CardTitle>
                <p className="text-sm text-muted-foreground">Show this QR code to collect your order</p>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border">
                  <QrCodeIcon className="w-32 h-32 text-gray-300" />
                </div>
                <div className="space-y-2">
                  <p className="font-bold">QR Code: {selectedQR.qrCode}</p>
                  <Badge variant={getStatusColor(selectedQR.status)}>
                    {selectedQR.status.toUpperCase()}
                  </Badge>
                  <p className="text-sm text-green-600">
                    Valid until order pickup
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => downloadQR(selectedQR)}
                  >
                    <DownloadIcon className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedQR(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
