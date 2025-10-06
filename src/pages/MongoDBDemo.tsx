import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import MongoCollectionTable from "@/components/MongoCollectionTable";
import {
  addUser,
  addProduct,
  getUsers,
  getProducts,
  getOrders,
  queryAI,
} from "@/lib/mongoService";
import { Database, Users, Package, ShoppingCart, Sparkles, RefreshCw } from "lucide-react";

export default function MongoDBDemo() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  // User form state
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  // Product form state
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    toast.success("Data refreshed!");
  };

  const handleAddUser = async () => {
    try {
      if (!userName || !userEmail || !userPassword) {
        toast.error("Please fill all user fields");
        return;
      }

      await addUser({
        name: userName,
        email: userEmail,
        password: userPassword,
      });

      toast.success("✅ User added to MongoDB!");
      console.log("✅ User added successfully");
      
      // Clear form
      setUserName("");
      setUserEmail("");
      setUserPassword("");
      
      handleRefresh();
    } catch (error: any) {
      console.error("❌ Failed to add user:", error);
      toast.error("Failed to add user: " + error.message);
    }
  };

  const handleAddProduct = async () => {
    try {
      if (!productName || !productPrice || !productCategory || !productStock) {
        toast.error("Please fill all product fields");
        return;
      }

      await addProduct({
        name: productName,
        price: parseFloat(productPrice),
        category: productCategory,
        stock: parseInt(productStock),
      });

      toast.success("✅ Product added to MongoDB!");
      console.log("✅ Product added successfully");
      
      // Clear form
      setProductName("");
      setProductPrice("");
      setProductCategory("");
      setProductStock("");
      
      handleRefresh();
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
      console.log("🤖 Querying AI...");
      
      const result = await queryAI(aiPrompt);
      setAiResponse(result.response);
      
      toast.success("✅ AI response received!");
      console.log("✅ AI query successful");
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
              MongoDB Atlas Integration Demo
            </h1>
            <p className="text-muted-foreground mt-2">
              Test all MongoDB Atlas + OpenAI operations
            </p>
          </div>
          <Button onClick={handleRefresh} size="lg">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
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

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Add New User</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="userName">Name</Label>
                    <Input
                      id="userName"
                      placeholder="John Doe"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userEmail">Email</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      placeholder="john@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userPassword">Password</Label>
                    <Input
                      id="userPassword"
                      type="password"
                      placeholder="••••••••"
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button onClick={handleAddUser} className="w-full">
                  Add User to MongoDB
                </Button>
              </CardContent>
            </Card>

            <MongoCollectionTable
              collectionName="users"
              fields={[
                { name: "name", label: "Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "password", label: "Password", type: "password" },
              ]}
            />
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  Add Product to MongoDB
                </Button>
              </CardContent>
            </Card>

            <MongoCollectionTable
              collectionName="products"
              fields={[
                { name: "name", label: "Name", type: "text" },
                { name: "price", label: "Price", type: "number" },
                { name: "category", label: "Category", type: "text" },
                { name: "stock", label: "Stock", type: "number" },
              ]}
            />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>Orders Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Orders are created automatically when users add items to cart and checkout.
                  Go to the Cart page to test order creation.
                </p>
              </CardContent>
            </Card>

            <MongoCollectionTable
              collectionName="orders"
              fields={[
                { name: "status", label: "Status", type: "text" },
                { name: "totalAmount", label: "Total Amount", type: "number" },
              ]}
            />
          </TabsContent>

          {/* AI Query Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Test AI Integration (OpenAI GPT-3.5-turbo)
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
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>MongoDB Handler Edge Function: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>AI Query Edge Function: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Cart + Checkout: MongoDB Integrated</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>QR Codes: Scannable QR Generation Active</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
