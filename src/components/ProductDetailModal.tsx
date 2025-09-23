import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StarIcon, HeartIcon, ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ProductDetailModalProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    images: string[];
    brand: string;
    rating: number;
    inStock: boolean;
    stockCount?: number;
    sizes: string[];
    colors: string[];
    fitStyle: string;
    description: string;
    material: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (id: string, size: string, color: string) => void;
  onReserveForTrial: (id: string, size: string, color: string) => void;
}

export function ProductDetailModal({ 
  product, 
  isOpen, 
  onClose, 
  onAddToCart, 
  onReserveForTrial 
}: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    if (selectedSize && selectedColor) {
      onAddToCart(product.id, selectedSize, selectedColor);
    }
  };

  const handleReserveForTrial = () => {
    if (selectedSize && selectedColor) {
      onReserveForTrial(product.id, selectedSize, selectedColor);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-shopping-surface rounded-lg overflow-hidden">
              <img 
                src={product.images[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={prevImage}
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={nextImage}
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </Button>
                </>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <HeartIcon className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                      index === currentImageIndex ? 'border-shopping-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{product.brand}</Badge>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
              </div>
              
              <p className="text-3xl font-bold text-shopping-primary mb-2">₹{product.price}</p>
              
              <Badge variant={product.inStock ? "default" : "destructive"} className="mb-4">
                {product.inStock ? (product.stockCount ? `${product.stockCount} left` : 'In Stock') : 'Out of Stock'}
              </Badge>
              
              <p className="text-muted-foreground mb-4">{product.description}</p>
              
              <div className="space-y-2">
                <p><span className="font-semibold">Fit Style:</span> {product.fitStyle}</p>
                <p><span className="font-semibold">Material:</span> {product.material}</p>
              </div>
            </div>
            
            <Separator />
            
            {/* Size Selection */}
            <div>
              <h4 className="font-semibold mb-3">Size</h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[3rem]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Color Selection */}
            <div>
              <h4 className="font-semibold mb-3">Color</h4>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <Button
                    key={color}
                    variant={selectedColor === color ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </Button>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Action Buttons */}
            <div className="space-y-3">
              {!selectedSize || !selectedColor ? (
                <p className="text-sm text-muted-foreground">Please select size and color</p>
              ) : null}
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleReserveForTrial}
                  disabled={!product.inStock || !selectedSize || !selectedColor}
                >
                  Reserve for Trial
                </Button>
                <Button 
                  className="flex-1 bg-gradient-primary hover:opacity-90"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || !selectedSize || !selectedColor}
                >
                  <ShoppingCartIcon className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}