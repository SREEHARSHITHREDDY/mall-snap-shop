import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BrandSection } from "@/components/BrandSection";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const otherBrands = [
  {
    id: "sony",
    name: "Sony",
    logo: "/api/placeholder/64/64",
    description: "Electronics, headphones, and audio devices",
    category: "electronics",
    isOpen: true,
    productCount: 3
  },
  {
    id: "apple",
    name: "Apple Store",
    logo: "/api/placeholder/64/64",
    description: "iPhone, iPad, Mac, and accessories",
    category: "electronics",
    isOpen: true,
    productCount: 5
  },
  {
    id: "lush",
    name: "Lush",
    logo: "/api/placeholder/64/64",
    description: "Handmade cosmetics and skincare",
    category: "beauty",
    isOpen: true, 
    productCount: 3
  },
  {
    id: "bookhaven",
    name: "Book Haven",
    logo: "/api/placeholder/64/64",
    description: "Books, magazines, and stationery",
    category: "books",
    isOpen: true,
    productCount: 3
  },
  {
    id: "decathlon",
    name: "Decathlon",
    logo: "/api/placeholder/64/64",
    description: "Sports equipment and activewear",
    category: "sports",
    isOpen: true,
    productCount: 4
  },
  {
    id: "miniso",
    name: "Miniso",
    logo: "/api/placeholder/64/64",
    description: "Lifestyle products and accessories",
    category: "lifestyle",
    isOpen: true,
    productCount: 4
  }
];

const sampleProducts = [
  // Sony Electronics
  {
    id: "sony-1",
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
    id: "sony-2",
    name: "WH-1000XM5 Headphones",
    price: 24999,
    image: "/api/placeholder/300/300",
    brand: "Sony",
    rating: 4.9,
    inStock: true,
    stockCount: 5,
    category: "other" as const
  },
  {
    id: "sony-3",
    name: "PlayStation 5 Console",
    price: 49999,
    image: "/api/placeholder/300/300",
    brand: "Sony",
    rating: 4.8,
    inStock: true,
    stockCount: 3,
    category: "other" as const
  },
  
  // Apple Products
  {
    id: "apple-1",
    name: "iPhone 15 Pro Max",
    price: 134900,
    image: "/api/placeholder/300/300",
    brand: "Apple Store",
    rating: 4.9,
    inStock: true,
    stockCount: 3,
    category: "other" as const
  },
  {
    id: "apple-2",
    name: "MacBook Air M2",
    price: 99900,
    image: "/api/placeholder/300/300",
    brand: "Apple Store",
    rating: 4.9,
    inStock: true,
    stockCount: 4,
    category: "other" as const
  },
  {
    id: "apple-3",
    name: "AirPods Pro (2nd Gen)",
    price: 24900,
    image: "/api/placeholder/300/300",
    brand: "Apple Store",
    rating: 4.8,
    inStock: true,
    stockCount: 12,
    category: "other" as const
  },
  {
    id: "apple-4",
    name: "iPad Pro 12.9",
    price: 109900,
    image: "/api/placeholder/300/300",
    brand: "Apple Store",
    rating: 4.9,
    inStock: true,
    stockCount: 5,
    category: "other" as const
  },
  {
    id: "apple-5",
    name: "Apple Watch Series 9",
    price: 39900,
    image: "/api/placeholder/300/300",
    brand: "Apple Store",
    rating: 4.7,
    inStock: true,
    stockCount: 8,
    category: "other" as const
  },
  
  // Lush Beauty Products
  {
    id: "lush-1",
    name: "Refreshing Face Mask Set",
    price: 1599,
    image: "/api/placeholder/300/300",
    brand: "Lush",
    rating: 4.4,
    inStock: true,
    stockCount: 15,
    category: "other" as const
  },
  {
    id: "lush-2",
    name: "Bath Bomb Collection",
    price: 2499,
    image: "/api/placeholder/300/300",
    brand: "Lush",
    rating: 4.6,
    inStock: true,
    stockCount: 20,
    category: "other" as const
  },
  {
    id: "lush-3",
    name: "Solid Shampoo Bar",
    price: 899,
    image: "/api/placeholder/300/300",
    brand: "Lush",
    rating: 4.5,
    inStock: true,
    stockCount: 25,
    category: "other" as const
  },
  
  // Decathlon Sports Items
  {
    id: "decathlon-1",
    name: "Yoga Mat Premium",
    price: 1999,
    image: "/api/placeholder/300/300",
    brand: "Decathlon",
    rating: 4.5,
    inStock: true,
    stockCount: 18,
    category: "other" as const
  },
  {
    id: "decathlon-2",
    name: "Camping Tent 4-Person",
    price: 12999,
    image: "/api/placeholder/300/300",
    brand: "Decathlon",
    rating: 4.6,
    inStock: true,
    stockCount: 5,
    category: "other" as const
  },
  {
    id: "decathlon-3",
    name: "Hiking Backpack 50L",
    price: 4999,
    image: "/api/placeholder/300/300",
    brand: "Decathlon",
    rating: 4.7,
    inStock: true,
    stockCount: 10,
    category: "other" as const
  },
  {
    id: "decathlon-4",
    name: "Mountain Bike 27.5",
    price: 24999,
    image: "/api/placeholder/300/300",
    brand: "Decathlon",
    rating: 4.8,
    inStock: true,
    stockCount: 3,
    category: "other" as const
  },
  
  // Miniso Lifestyle
  {
    id: "miniso-1",
    name: "Wireless Charging Pad",
    price: 999,
    image: "/api/placeholder/300/300",
    brand: "Miniso",
    rating: 4.3,
    inStock: true,
    stockCount: 30,
    category: "other" as const
  },
  {
    id: "miniso-2",
    name: "Plush Toy Collection",
    price: 499,
    image: "/api/placeholder/300/300",
    brand: "Miniso",
    rating: 4.5,
    inStock: true,
    stockCount: 40,
    category: "other" as const
  },
  {
    id: "miniso-3",
    name: "Travel Organizer Bag Set",
    price: 1299,
    image: "/api/placeholder/300/300",
    brand: "Miniso",
    rating: 4.4,
    inStock: true,
    stockCount: 22,
    category: "other" as const
  },
  {
    id: "miniso-4",
    name: "Smart LED Desk Lamp",
    price: 1999,
    image: "/api/placeholder/300/300",
    brand: "Miniso",
    rating: 4.6,
    inStock: true,
    stockCount: 15,
    category: "other" as const
  },
  
  // Book Haven
  {
    id: "bookhaven-1",
    name: "Bestseller Fiction Bundle",
    price: 1999,
    image: "/api/placeholder/300/300",
    brand: "Book Haven",
    rating: 4.7,
    inStock: true,
    stockCount: 25,
    category: "other" as const
  },
  {
    id: "bookhaven-2",
    name: "Premium Notebook Set",
    price: 799,
    image: "/api/placeholder/300/300",
    brand: "Book Haven",
    rating: 4.5,
    inStock: true,
    stockCount: 35,
    category: "other" as const
  },
  {
    id: "bookhaven-3",
    name: "Art & Design Magazine Collection",
    price: 1499,
    image: "/api/placeholder/300/300",
    brand: "Book Haven",
    rating: 4.4,
    inStock: true,
    stockCount: 20,
    category: "other" as const
  }
];

export default function Other() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const { addToCart } = useCart();

  const searchQuery = searchParams.get('search') || "";

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  const activeSearchQuery = (localSearchQuery || searchQuery).toLowerCase().trim();

  const filteredProducts = sampleProducts.filter(product => {
    const matchesBrand = !selectedBrand || (() => {
      const brand = otherBrands.find(b => b.id === selectedBrand);
      return brand && product.brand === brand.name;
    })();
    
    const matchesSearch = !activeSearchQuery || 
      product.name.toLowerCase().includes(activeSearchQuery) ||
      product.brand.toLowerCase().includes(activeSearchQuery);
    
    return matchesBrand && matchesSearch;
  });

  const handleAddToCart = (productId: string) => {
    const product = sampleProducts.find(p => p.id === productId);
    if (product && product.inStock) {
      addToCart({
        id: `${productId}-${Date.now()}`,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        type: "purchase"
      });
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error(`${product?.name || 'Item'} is out of stock!`);
    }
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

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">No items found matching your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        {activeSearchQuery && (
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">No items found matching "{activeSearchQuery}".</p>
              </div>
            ) : (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">Search Results for "{activeSearchQuery}"</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!activeSearchQuery && (
          <BrandSection
            title="Other Stores"
            brands={otherBrands}
            onBrandSelect={handleBrandSelect}
          />
        )}
      </div>
    </div>
  );
}