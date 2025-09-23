import { ShoppingCartIcon, BellIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="h-16 border-b border-border bg-shopping-surface shadow-card sticky top-0 z-50">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="text-foreground hover:bg-shopping-surface-variant" />
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-foreground">Welcome to Shopping Matrix</h1>
            <p className="text-sm text-muted-foreground">Discover, Order, Enjoy</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-shopping-secondary">
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCartIcon className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-shopping-primary">
              2
            </Badge>
          </Button>

          <Button variant="ghost" size="icon">
            <UserIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}