import { useState } from "react";
import { BrandSection } from "@/components/BrandSection";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";

const foodBrands = [
  { id: "mcdonalds", name: "McDonald's", logo: "/api/placeholder/64/64", description: "Fast food favorites", category: "food", isOpen: true, productCount: 0 },
  { id: "kfc", name: "KFC", logo: "/api/placeholder/64/64", description: "Finger lickin' good", category: "food", isOpen: true, productCount: 0 },
  { id: "starbucks", name: "Starbucks", logo: "/api/placeholder/64/64", description: "Coffee & beverages", category: "food", isOpen: true, productCount: 0 },
  { id: "subway", name: "Subway", logo: "/api/placeholder/64/64", description: "Fresh sandwiches", category: "food", isOpen: true, productCount: 0 },
];

export default function Food() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts('food');

  const updatedFoodBrands = foodBrands.map(brand => {
    const brandProducts = products.filter(p => 
      p.brand.toLowerCase().includes(brand.id) ||
      p.brand.toLowerCase() === brand.name.toLowerCase()
    );
    return {
      ...brand,
      productCount: brandProducts.filter(p => p.inStock).length,
      isOpen: brandProducts.some(p => p.inStock)
    };
  });

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  const filteredFoodItems = selectedBrand 
    ? products.filter(item => {
        const brand = updatedFoodBrands.find(b => b.id === selectedBrand);
        return brand && (
          item.brand.toLowerCase().includes(brand.id) ||
          item.brand.toLowerCase() === brand.name.toLowerCase()
        );
      })
    : products;

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product && product.inStock && product.stockCount > 0) {
      addToCart({
        id: `${productId}-${Date.now()}`,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        type: "purchase",
        orderType: orderType
      });
      toast.success(`${product.name} added to ${orderType} order!`);
    } else {
      toast.error(`${product?.name || 'Item'} is out of stock!`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-shopping-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (selectedBrand) {
    const brand = updatedFoodBrands.find(b => b.id === selectedBrand);
    
    return (
      <div className="min-h-screen bg-gradient-surface">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedBrand(null)}
              className="hover:bg-shopping-surface-variant"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to Restaurants
            </Button>
            <h1 className="text-3xl font-bold text-foreground">{brand?.name}</h1>
          </div>

          <Card className="mb-8 bg-gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-shopping-primary" />
                Restaurant Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Prep Time: 15-20 mins</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Order Type:</span>
                  <div className="flex gap-2">
                    <Button
                      variant={orderType === "dine-in" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOrderType("dine-in")}
                      className="text-xs"
                    >
                      Dine In
                    </Button>
                    <Button
                      variant={orderType === "takeaway" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setOrderType("takeaway")}
                      className="text-xs"
                    >
                      Takeaway
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={orderType === "takeaway" ? "default" : "secondary"}>
                    {orderType === "takeaway" ? "Takeaway Selected" : "Dine In Selected"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFoodItems.map((item) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                brand={item.brand}
                rating={item.rating || 4.5}
                inStock={item.inStock}
                stockCount={item.stockCount}
                category={item.category}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredFoodItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items available</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-6 py-8">
        <BrandSection
          title="Food Court & Restaurants"
          brands={updatedFoodBrands}
          onBrandSelect={handleBrandSelect}
        />
      </div>
    </div>
  );
}
