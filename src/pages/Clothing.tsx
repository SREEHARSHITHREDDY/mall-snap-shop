import { useState } from "react";
import { BrandSection } from "@/components/BrandSection";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

const clothingBrands = [
  {
    id: "zara",
    name: "Zara", 
    logo: "/api/placeholder/64/64",
    description: "Fashion-forward clothing for modern lifestyles",
    category: "clothing",
    isOpen: true,
    productCount: 234
  },
  {
    id: "hm",
    name: "H&M",
    logo: "/api/placeholder/64/64", 
    description: "Sustainable fashion accessible to everyone",
    category: "clothing",
    isOpen: true,
    productCount: 187
  },
  {
    id: "uniqlo",
    name: "Uniqlo",
    logo: "/api/placeholder/64/64",
    description: "Japanese casual wear and basics",
    category: "clothing", 
    isOpen: false,
    productCount: 156
  },
  {
    id: "adidas",
    name: "Adidas",
    logo: "/api/placeholder/64/64",
    description: "Sports and athleisure wear",
    category: "clothing",
    isOpen: true,
    productCount: 98
  }
];

const sampleProducts = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 1299,
    image: "/api/placeholder/300/300",
    brand: "Zara",
    rating: 4.5,
    inStock: true,
    stockCount: 12,
    category: "clothing" as const
  },
  {
    id: "2", 
    name: "Slim Fit Denim Jeans",
    price: 2499,
    image: "/api/placeholder/300/300",
    brand: "H&M",
    rating: 4.2,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const
  },
  {
    id: "3",
    name: "Classic White Sneakers", 
    price: 3999,
    image: "/api/placeholder/300/300",
    brand: "Adidas",
    rating: 4.7,
    inStock: false,
    category: "clothing" as const
  }
];

export default function Clothing() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [products, setProducts] = useState(sampleProducts);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
    // In a real app, this would filter products by brand
  };

  const handleAddToCart = (productId: string) => {
    console.log("Added to cart:", productId);
    // In a real app, this would add to cart
  };

  const handleReserveForTrial = (productId: string) => {
    console.log("Reserved for trial:", productId);
    // In a real app, this would reserve for trial
  };

  if (selectedBrand) {
    const brand = clothingBrands.find(b => b.id === selectedBrand);
    
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
              Back to Brands
            </Button>
            <h1 className="text-3xl font-bold text-foreground">{brand?.name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
                onReserveForTrial={handleReserveForTrial}
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
          title="Clothing Stores"
          brands={clothingBrands}
          onBrandSelect={handleBrandSelect}
        />
      </div>
    </div>
  );
}