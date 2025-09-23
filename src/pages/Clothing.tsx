import { useState } from "react";
import { BrandSection } from "@/components/BrandSection";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

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

const allProducts = [
  // Zara Products
  {
    id: "zara-1",
    name: "Premium Cotton T-Shirt",
    price: 1299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.5,
    inStock: true,
    stockCount: 12,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    fitStyle: "Regular Fit",
    description: "Soft cotton t-shirt with a comfortable regular fit. Perfect for casual wear.",
    material: "100% Cotton"
  },
  {
    id: "zara-2",
    name: "Textured Knit Sweater",
    price: 2899,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.3,
    inStock: true,
    stockCount: 5,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Grey", "Burgundy"],
    fitStyle: "Oversized Fit",
    description: "Cozy textured knit sweater with an oversized fit for maximum comfort.",
    material: "60% Cotton, 40% Acrylic"
  },
  {
    id: "zara-3",
    name: "High Waist Wide Leg Jeans",
    price: 3299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.6,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const,
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    fitStyle: "High Waist Wide Leg",
    description: "Trendy high waist jeans with a wide leg cut for a modern silhouette.",
    material: "98% Cotton, 2% Elastane"
  },
  
  // H&M Products
  {
    id: "hm-1",
    name: "Slim Fit Denim Jeans",
    price: 2499,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.2,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    fitStyle: "Slim Fit",
    description: "Classic slim fit jeans perfect for everyday wear.",
    material: "99% Cotton, 1% Elastane"
  },
  {
    id: "hm-2",
    name: "Ribbed Tank Top",
    price: 799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.4,
    inStock: true,
    stockCount: 15,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Black", "Pink", "Blue"],
    fitStyle: "Fitted",
    description: "Soft ribbed tank top with a fitted silhouette.",
    material: "95% Cotton, 5% Elastane"
  },
  {
    id: "hm-3",
    name: "Oversized Blazer",
    price: 4999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.1,
    inStock: true,
    stockCount: 3,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Beige"],
    fitStyle: "Oversized",
    description: "Stylish oversized blazer perfect for professional or casual wear.",
    material: "68% Polyester, 30% Viscose, 2% Elastane"
  },
  
  // Adidas Products
  {
    id: "adidas-1",
    name: "Classic White Sneakers",
    price: 3999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.7,
    inStock: false,
    category: "clothing" as const,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Grey"],
    fitStyle: "Regular",
    description: "Classic white sneakers with superior comfort and style.",
    material: "Leather Upper, Rubber Sole"
  },
  {
    id: "adidas-2",
    name: "3-Stripes Track Pants",
    price: 2799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.5,
    inStock: true,
    stockCount: 10,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey"],
    fitStyle: "Regular Fit",
    description: "Comfortable track pants with iconic 3-stripes design.",
    material: "100% Polyester"
  },
  {
    id: "adidas-3",
    name: "Performance Sports Bra",
    price: 1899,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.6,
    inStock: true,
    stockCount: 7,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Pink", "Blue"],
    fitStyle: "Compression Fit",
    description: "High-performance sports bra with moisture-wicking technology.",
    material: "78% Recycled Polyester, 22% Elastane"
  }
];

export default function Clothing() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { addToCart } = useCart();

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  const filteredProducts = selectedBrand 
    ? allProducts.filter(product => product.brand.toLowerCase() === selectedBrand.toLowerCase())
    : allProducts;

  const handleAddToCart = (productId: string, size?: string, color?: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: `${productId}-${Date.now()}`, // Unique ID for cart item
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        type: "purchase",
        size,
        color
      });
      toast.success(`${product.name} added to cart for purchase!`);
    }
    setSelectedProduct(null);
  };

  const handleReserveForTrial = (productId: string, size?: string, color?: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: `${productId}-trial-${Date.now()}`, // Unique ID for trial item
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        type: "trial",
        size,
        color
      });
      toast.success(`${product.name} reserved for trial (2 hours)!`);
    }
    setSelectedProduct(null);
  };

  const selectedProductData = selectedProduct 
    ? allProducts.find(p => p.id === selectedProduct) 
    : null;

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
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
                onReserveForTrial={handleReserveForTrial}
                onViewDetails={() => setSelectedProduct(product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-surface">
        <div className="container mx-auto px-6 py-8">
          <BrandSection
            title="Clothing Stores"
            brands={clothingBrands}
            onBrandSelect={handleBrandSelect}
          />
        </div>
      </div>
      
      <ProductDetailModal
        product={selectedProductData}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onReserveForTrial={handleReserveForTrial}
      />
    </>
  );
}