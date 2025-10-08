import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BrandSection } from "@/components/BrandSection";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/hooks/useProducts";

const clothingBrands = [
  { id: "zara", name: "Zara", logo: "/api/placeholder/64/64", description: "Contemporary fashion", category: "clothing", isOpen: true, productCount: 0 },
  { id: "hm", name: "H&M", logo: "/api/placeholder/64/64", description: "Affordable fashion", category: "clothing", isOpen: true, productCount: 0 },
  { id: "uniqlo", name: "Uniqlo", logo: "/api/placeholder/64/64", description: "Japanese casual wear", category: "clothing", isOpen: true, productCount: 0 },
  { id: "adidas", name: "Adidas", logo: "/api/placeholder/64/64", description: "Sportswear & activewear", category: "clothing", isOpen: true, productCount: 0 },
];

export default function Clothing() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchParams] = useSearchParams();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const { addToCart } = useCart();
  const { products, loading, error } = useProducts('clothing');

  const searchQuery = searchParams.get('search') || "";

  const updatedBrands = clothingBrands.map(brand => {
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

  const activeSearchQuery = (localSearchQuery || searchQuery).toLowerCase().trim();

  const filteredProducts = activeSearchQuery
    ? products.filter(product => {
        const searchLower = activeSearchQuery;
        return (
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower)
        );
      })
    : selectedBrand 
      ? products.filter(product => {
          const brand = updatedBrands.find(b => b.id === selectedBrand);
          return brand && (
            product.brand.toLowerCase().includes(brand.id) ||
            product.brand.toLowerCase() === brand.name.toLowerCase()
          );
        })
      : products;

  const handleAddToCart = (productId: string, selectedSize?: string, selectedColor?: string) => {
    const product = products.find(p => p.id === productId);
    if (product && product.inStock) {
      addToCart({
        id: `${productId}-${selectedSize}-${selectedColor}-${Date.now()}`,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        type: "purchase",
        size: selectedSize,
        color: selectedColor
      });
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.error('Product is out of stock');
    }
  };

  const handleReserveForTrial = (productId: string, selectedSize?: string, selectedColor?: string) => {
    const product = products.find(p => p.id === productId);
    if (product && product.inStock) {
      addToCart({
        id: `${productId}-trial-${selectedSize}-${selectedColor}-${Date.now()}`,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        type: "trial",
        size: selectedSize,
        color: selectedColor
      });
      toast.success(`${product.name} reserved for trial!`);
    } else {
      toast.error('Product is out of stock');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-surface flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-shopping-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
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
    const brand = updatedBrands.find(b => b.id === selectedBrand);
    
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

          {activeSearchQuery && (
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="max-w-md"
                />
                <Button
                  variant="ghost"
                  onClick={() => setLocalSearchQuery("")}
                >
                  Clear
                </Button>
              </div>
              <p className="text-muted-foreground mt-2">
                Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                brand={product.brand}
                rating={product.rating || 4.5}
                inStock={product.inStock}
                stockCount={product.stockCount}
                category={product.category}
                onAddToCart={(id) => {
                  setSelectedProduct(product);
                }}
                onReserveForTrial={(id) => {
                  setSelectedProduct(product);
                }}
                onViewDetails={() => setSelectedProduct(product)}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>

        {selectedProduct && (
          <ProductDetailModal
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            product={selectedProduct}
            onAddToCart={(id, size, color) => {
              handleAddToCart(id, size, color);
              setSelectedProduct(null);
            }}
            onReserveForTrial={(id, size, color) => {
              handleReserveForTrial(id, size, color);
              setSelectedProduct(null);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      <div className="container mx-auto px-6 py-8">
        <BrandSection
          title="Fashion & Clothing Stores"
          brands={updatedBrands}
          onBrandSelect={handleBrandSelect}
        />
      </div>
    </div>
  );
}
