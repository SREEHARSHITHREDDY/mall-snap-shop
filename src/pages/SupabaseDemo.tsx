import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  addProduct,
  getProducts,
  getOrders,
  queryAI,
} from "@/lib/supabaseService";
import { Database, Package, ShoppingCart, Sparkles, RefreshCw, CheckCircle2 } from "lucide-react";

export default function SupabaseDemo() {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  // Product form state
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productBrand, setProductBrand] = useState("");

  useEffect(() => {
    checkConnection();
    loadData();
  }, []);

  const checkConnection = async () => {
    try {
      await getProducts();
      setConnectionStatus('connected');
    } catch (error) {
      setConnectionStatus('error');
    }
  };

  const loadData = async () => {
    try {
      const [productsData, ordersData] = await Promise.all([
        getProducts(),
        getOrders()
      ]);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  const handleRefresh = async () => {
    await loadData();
    toast.success("Data refreshed!");
  };

  const handleAddProduct = async () => {
    try {
      if (!productName || !productPrice || !productCategory || !productStock || !productBrand) {
        toast.error("Please fill all product fields");
        return;
      }

      await addProduct({
        name: productName,
        price: parseFloat(productPrice),
        category: productCategory,
        stock_count: parseInt(productStock),
        brand: productBrand,
      });

      toast.success("✅ Product added to Supabase!");
      
      // Clear form
      setProductName("");
      setProductPrice("");
      setProductCategory("");
      setProductStock("");
      setProductBrand("");
      
      await handleRefresh();
    } catch (error: any) {
      console.error("❌ Failed to add product:", error);
      toast.error("Failed to add product: " + error.message);
    }
  };

  const handleTestAI = async () => {
    try {
      if (!aiPrompt) {
        toast.error("Please enter a prompt");
        return;
      }

      setIsLoadingAI(true);
      const result = await queryAI(aiPrompt);
      setAiResponse(result.response);
      
      toast.success("✅ AI response received!");
    } catch (error: any) {
      console.error("❌ AI query failed:", error);
      toast.error("AI query failed: " + error.message);
      setAiResponse("Error: " + error.message);
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Database className="w-8 h-8" />
              Supabase Database Demo
            </h1>
            <p className="text-muted-foreground mt-2">
              Connected to Lovable Cloud (Supabase)
            </p>
            {connectionStatus === 'connected' && (
              <Badge className="mt-2 bg-green-500">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Connection Successful
              </Badge>
            )}
          </div>
          <Button onClick={handleRefresh} size="lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              AI Query
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Name</Label>
                    <Input
                      id="productName"
                      placeholder="Product Name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productPrice">Price</Label>
                    <Input
                      id="productPrice"
                      type="number"
                      placeholder="999"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productCategory">Category</Label>
                    <Input
                      id="productCategory"
                      placeholder="clothing"
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productBrand">Brand</Label>
                    <Input
                      id="productBrand"
                      placeholder="Zara"
                      value={productBrand}
                      onChange={(e) => setProductBrand(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productStock">Stock</Label>
                    <Input
                      id="productStock"
                      type="number"
                      placeholder="100"
                      value={productStock}
                      onChange={(e) => setProductStock(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={handleAddProduct} className="w-full">
                  Add Product to Supabase
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Products in Database</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {products.map((product) => (
                    <div key={product.id} className="flex justify-between items-center p-3 bg-muted rounded">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.brand} • {product.category} • ${product.price}
                        </p>
                      </div>
                      <Badge>{product.stock_count} in stock</Badge>
                    </div>
                  ))}
                  {products.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No products yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Orders Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Orders are created automatically when users complete checkout.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Orders in Database</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {orders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-muted rounded">
                      <div>
                        <p className="font-medium">{order.order_number}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items?.length || 0} items • ${order.total}
                        </p>
                      </div>
                      <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No orders yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Query Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Test AI Integration (Lovable AI)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aiPrompt">Prompt</Label>
                  <Input
                    id="aiPrompt"
                    placeholder="Ask AI anything... e.g., 'Recommend accessories for jeans'"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                </div>
                <Button
                  onClick={handleTestAI}
                  className="w-full"
                  disabled={isLoadingAI}
                >
                  {isLoadingAI ? "Querying AI..." : "Query AI"}
                </Button>

                {aiResponse && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">AI Response:</h4>
                    <p className="text-sm whitespace-pre-line">{aiResponse}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Status Info */}
        <Card className="mt-6 bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Integration Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`} />
              <span>Supabase Database: {connectionStatus === 'connected' ? 'Connected' : 'Error'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>AI Query Edge Function: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Products Table: {products.length} items</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Orders Table: {orders.length} orders</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
