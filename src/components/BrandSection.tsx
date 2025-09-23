import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, StoreIcon } from "lucide-react";

interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  isOpen: boolean;
  productCount: number;
}

interface BrandSectionProps {
  title: string;
  brands: Brand[];
  onBrandSelect: (brandId: string) => void;
}

export function BrandSection({ title, brands, onBrandSelect }: BrandSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <StoreIcon className="w-6 h-6 text-shopping-primary" />
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card 
            key={brand.id} 
            className="group cursor-pointer transition-smooth hover:shadow-elevated hover:-translate-y-1 bg-gradient-card"
            onClick={() => onBrandSelect(brand.id)}
          >
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-shopping-surface-variant flex items-center justify-center">
                <img 
                  src={brand.logo} 
                  alt={`${brand.name} logo`}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <CardTitle className="text-lg">{brand.name}</CardTitle>
            </CardHeader>
            
            <CardContent className="text-center space-y-3">
              <p className="text-muted-foreground text-sm">{brand.description}</p>
              
              <div className="flex items-center justify-center gap-2">
                <Badge variant={brand.isOpen ? "default" : "destructive"}>
                  {brand.isOpen ? "Open" : "Closed"}
                </Badge>
                <Badge variant="secondary">
                  {brand.productCount} items
                </Badge>
              </div>
              
              <Button 
                variant="ghost" 
                className="w-full group-hover:bg-shopping-primary group-hover:text-primary-foreground transition-smooth"
                disabled={!brand.isOpen}
              >
                Visit Store
                <ChevronRightIcon className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}