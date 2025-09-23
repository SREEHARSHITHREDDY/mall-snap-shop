import { useState } from "react";
import { BrandSection } from "@/components/BrandSection";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ClockIcon, MapPinIcon } from "lucide-react";

const foodBrands = [
  {
    id: "mcdonalds",
    name: "McDonald's",
    logo: "/api/placeholder/64/64",
    description: "Fast food favorites and quick bites",
    category: "food",
    isOpen: true,
    productCount: 45
  },
  {
    id: "kfc",
    name: "KFC", 
    logo: "/api/placeholder/64/64",
    description: "Finger lickin' good chicken",
    category: "food",
    isOpen: true,
    productCount: 38
  },
  {
    id: "starbucks",
    name: "Starbucks",
    logo: "/api/placeholder/64/64",
    description: "Coffee, beverages and light snacks",
    category: "food",
    isOpen: true,
    productCount: 52
  },
  {
    id: "subway",
    name: "Subway",
    logo: "/api/placeholder/64/64",
    description: "Fresh sandwiches and healthy options",
    category: "food", 
    isOpen: false,
    productCount: 29
  }
];

const sampleFoodItems = [
  {
    id: "f1",
    name: "Big Mac Combo",
    price: 299,
    image: "/api/placeholder/300/300",
    brand: "McDonald's",
    rating: 4.3,
    inStock: true,
    stockCount: 25,
    category: "food" as const
  },
  {
    id: "f2",
    name: "Zinger Burger Meal",
    price: 349,
    image: "/api/placeholder/300/300", 
    brand: "KFC",
    rating: 4.5,
    inStock: true,
    stockCount: 18,
    category: "food" as const
  },
  {
    id: "f3",
    name: "Caramel Macchiato",
    price: 195,
    image: "/api/placeholder/300/300",
    brand: "Starbucks", 
    rating: 4.6,
    inStock: true,
    stockCount: 32,
    category: "food" as const
  }
];

export default function Food() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [foodItems, setFoodItems] = useState(sampleFoodItems);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  const handleAddToCart = (productId: string) => {
    console.log("Added food item to cart:", productId);
  };

  if (selectedBrand) {
    const brand = foodBrands.find(b => b.id === selectedBrand);
    
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

          {/* Restaurant Info Card */}
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
                <div className="flex items-center gap-2">
                  <Badge variant="default">Dine In Available</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Takeaway Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foodItems.map((item) => (
              <ProductCard
                key={item.id}
                {...item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-6 py-8">
        <BrandSection
          title="Food Court & Restaurants"
          brands={foodBrands}
          onBrandSelect={handleBrandSelect}
        />
      </div>
    </div>
  );
}