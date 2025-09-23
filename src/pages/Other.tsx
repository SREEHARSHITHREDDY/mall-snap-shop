import { useState } from "react";
import { BrandSection } from "@/components/BrandSection";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

const otherBrands = [
  {
    id: "sony",
    name: "Sony",
    logo: "/api/placeholder/64/64",
    description: "Electronics, headphones, and audio devices",
    category: "electronics",
    isOpen: true,
    productCount: 156
  },
  {
    id: "apple",
    name: "Apple Store",
    logo: "/api/placeholder/64/64",
    description: "iPhone, iPad, Mac, and accessories",
    category: "electronics",
    isOpen: true,
    productCount: 89
  },
  {
    id: "lush",
    name: "Lush",
    logo: "/api/placeholder/64/64",
    description: "Handmade cosmetics and skincare",
    category: "beauty",
    isOpen: true, 
    productCount: 67
  },
  {
    id: "bookhaven",
    name: "Book Haven",
    logo: "/api/placeholder/64/64",
    description: "Books, magazines, and stationery",
    category: "books",
    isOpen: false,
    productCount: 234
  },
  {
    id: "decathlon",
    name: "Decathlon",
    logo: "/api/placeholder/64/64",
    description: "Sports equipment and activewear",
    category: "sports",
    isOpen: true,
    productCount: 178
  },
  {
    id: "miniso",
    name: "Miniso",
    logo: "/api/placeholder/64/64",
    description: "Lifestyle products and accessories",
    category: "lifestyle",
    isOpen: true,
    productCount: 123
  }
];

const sampleProducts = [
  {
    id: "o1",
    name: "Wireless Noise Cancelling Headphones",
    price: 12999,
    image: "/api/placeholder/300/300",
    brand: "Sony",
    rating: 4.8,
    inStock: true,
    stockCount: 8,
    category: "other" as const
  },
  {
    id: "o2",
    name: "iPhone 15 Pro Max",
    price: 134900,
    image: "/api/placeholder/300/300",
    brand: "Apple",
    rating: 4.9,
    inStock: true,
    stockCount: 3,
    category: "other" as const
  },
  {
    id: "o3",
    name: "Refreshing Face Mask Set",
    price: 1599,
    image: "/api/placeholder/300/300",
    brand: "Lush",
    rating: 4.4,
    inStock: false,
    category: "other" as const
  }
];

export default function Other() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [products, setProducts] = useState(sampleProducts);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  const handleAddToCart = (productId: string) => {
    console.log("Added other item to cart:", productId);
  };

  if (selectedBrand) {
    const brand = otherBrands.find(b => b.id === selectedBrand);
    
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
              Back to Stores
            </Button>
            <h1 className="text-3xl font-bold text-foreground">{brand?.name}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
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
          title="Other Stores"
          brands={otherBrands}
          onBrandSelect={handleBrandSelect}
        />
      </div>
    </div>
  );
}