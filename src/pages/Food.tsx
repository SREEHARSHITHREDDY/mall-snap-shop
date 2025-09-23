import { useState } from "react";
import { BrandSection } from "@/components/BrandSection";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { toast } from "sonner";

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

const allFoodItems = [
  // McDonald's Products
  {
    id: "mcdonalds-1",
    name: "Big Mac Combo",
    price: 299,
    image: "/api/placeholder/300/300",
    brand: "McDonald's",
    rating: 4.3,
    inStock: true,
    stockCount: 25,
    category: "food" as const,
    prepTime: "15-20 mins",
    description: "Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun with fries and drink"
  },
  {
    id: "mcdonalds-2", 
    name: "McChicken Deluxe",
    price: 189,
    image: "/api/placeholder/300/300",
    brand: "McDonald's",
    rating: 4.1,
    inStock: true,
    stockCount: 30,
    category: "food" as const,
    prepTime: "10-15 mins",
    description: "Crispy chicken fillet with lettuce and mayo in a sesame seed bun"
  },
  {
    id: "mcdonalds-3",
    name: "French Fries Large",
    price: 89,
    image: "/api/placeholder/300/300",
    brand: "McDonald's",
    rating: 4.4,
    inStock: true,
    stockCount: 40,
    category: "food" as const,
    prepTime: "5-10 mins",
    description: "Golden, crispy and delicious french fries"
  },
  {
    id: "mcdonalds-4",
    name: "McFlurry Oreo",
    price: 99,
    image: "/api/placeholder/300/300",
    brand: "McDonald's",
    rating: 4.5,
    inStock: true,
    stockCount: 20,
    category: "food" as const,
    prepTime: "5 mins",
    description: "Vanilla soft serve with crushed Oreo cookies"
  },

  // KFC Products
  {
    id: "kfc-1",
    name: "Zinger Burger Meal",
    price: 349,
    image: "/api/placeholder/300/300",
    brand: "KFC",
    rating: 4.5,
    inStock: true,
    stockCount: 18,
    category: "food" as const,
    prepTime: "15-20 mins",
    description: "Spicy zinger fillet with lettuce and mayo, served with fries and drink"
  },
  {
    id: "kfc-2",
    name: "Hot & Crispy Chicken",
    price: 199,
    image: "/api/placeholder/300/300",
    brand: "KFC",
    rating: 4.3,
    inStock: true,
    stockCount: 15,
    category: "food" as const,
    prepTime: "20-25 mins",
    description: "1 piece of KFC's signature hot and crispy chicken"
  },
  {
    id: "kfc-3",
    name: "Popcorn Chicken Large",
    price: 149,
    image: "/api/placeholder/300/300",
    brand: "KFC",
    rating: 4.2,
    inStock: true,
    stockCount: 22,
    category: "food" as const,
    prepTime: "10-15 mins",
    description: "Bite-sized pieces of tender chicken with KFC's secret recipe"
  },
  {
    id: "kfc-4",
    name: "Krushems Chocolate",
    price: 129,
    image: "/api/placeholder/300/300",
    brand: "KFC",
    rating: 4.4,
    inStock: false,
    category: "food" as const,
    prepTime: "5 mins",
    description: "Thick chocolate shake with whipped cream"
  },

  // Starbucks Products  
  {
    id: "starbucks-1",
    name: "Caramel Macchiato",
    price: 195,
    image: "/api/placeholder/300/300",
    brand: "Starbucks",
    rating: 4.6,
    inStock: true,
    stockCount: 32,
    category: "food" as const,
    prepTime: "5-8 mins",
    description: "Steamed milk with vanilla syrup, marked with espresso and finished with caramel drizzle"
  },
  {
    id: "starbucks-2",
    name: "Cappuccino Venti",
    price: 175,
    image: "/api/placeholder/300/300",
    brand: "Starbucks",
    rating: 4.4,
    inStock: true,
    stockCount: 28,
    category: "food" as const,
    prepTime: "5-8 mins",
    description: "Rich espresso with steamed milk foam"
  },
  {
    id: "starbucks-3",
    name: "Chicken Sandwich",
    price: 285,
    image: "/api/placeholder/300/300",
    brand: "Starbucks",
    rating: 4.1,
    inStock: true,
    stockCount: 12,
    category: "food" as const,
    prepTime: "10-12 mins",
    description: "Grilled chicken breast with fresh vegetables in artisan bread"
  },
  {
    id: "starbucks-4",
    name: "Blueberry Muffin",
    price: 125,
    image: "/api/placeholder/300/300",
    brand: "Starbucks",
    rating: 4.3,
    inStock: true,
    stockCount: 8,
    category: "food" as const,
    prepTime: "2 mins",
    description: "Freshly baked muffin with real blueberries"
  }
];

export default function Food() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  const filteredFoodItems = selectedBrand 
    ? allFoodItems.filter(item => item.brand.toLowerCase() === selectedBrand.toLowerCase())
    : allFoodItems;

  const handleAddToCart = (productId: string) => {
    const product = allFoodItems.find(p => p.id === productId);
    toast.success(`${product?.name} added to food order!`);
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
            {filteredFoodItems.map((item) => (
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