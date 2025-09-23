import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartIcon, StarIcon, ShoppingCartIcon } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  brand: string;
  rating: number;
  inStock: boolean;
  stockCount?: number;
  category: "clothing" | "food" | "other";
  onAddToCart: (id: string) => void;
  onReserveForTrial?: (id: string) => void;
  onViewDetails?: () => void;
}

export function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  brand, 
  rating, 
  inStock, 
  stockCount,
  category,
  onAddToCart,
  onReserveForTrial,
  onViewDetails 
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(id);
  };

  const handleReserveTrial = () => {
    if (onReserveForTrial) {
      onReserveForTrial(id);
    }
  };

  return (
    <Card className="group overflow-hidden transition-smooth hover:shadow-elevated hover:-translate-y-1 bg-gradient-card">
      <CardHeader className="p-0 relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-shopping-surface/80 hover:bg-shopping-surface"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <HeartIcon className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
        
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Badge variant={inStock ? "default" : "destructive"} className="text-xs">
            {inStock ? (stockCount ? `${stockCount} left` : 'In Stock') : 'Out of Stock'}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {brand}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 
          className="font-semibold text-foreground mb-1 line-clamp-2 cursor-pointer hover:text-shopping-primary transition-colors" 
          onClick={onViewDetails}
        >
          {name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-muted-foreground">{rating}</span>
        </div>
        <p className="text-lg font-bold text-shopping-primary">₹{price}</p>
        {onViewDetails && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-auto text-xs text-shopping-primary hover:text-shopping-primary/80 mt-1"
            onClick={onViewDetails}
          >
            View Details →
          </Button>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {category === "clothing" ? (
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleReserveTrial}
              disabled={!inStock}
            >
              Reserve for Trial
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-gradient-primary hover:opacity-90"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <ShoppingCartIcon className="w-4 h-4 mr-1" />
              Buy Now
            </Button>
          </div>
        ) : (
          <Button 
            size="sm" 
            className="w-full bg-gradient-primary hover:opacity-90"
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <ShoppingCartIcon className="w-4 h-4 mr-2" />
            {category === "food" ? "Order Now" : "Add to Cart"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}