import { ShoppingCartIcon, BellIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NotificationModal } from "./NotificationModal";
import { ProfileModal } from "./ProfileModal";
import { useCart } from "@/context/CartContext";
import { useNotifications } from "@/context/NotificationContext";
export function Header() {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const {
    cartCount
  } = useCart();
  const {
    unreadCount
  } = useNotifications();
  const handleCartClick = () => {
    navigate('/cart');
  };
  const handleNotificationsClick = () => {
    setShowNotifications(true);
  };
  const handleProfileClick = () => {
    setShowProfile(true);
  };
  return <>
      <header className="h-16 border-b border-border bg-shopping-surface shadow-card sticky top-0 z-50">
        <div className="flex items-center justify-between h-full px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-foreground hover:bg-shopping-surface-variant" />
            <div className="hidden md:block">
              <h1 className="text-xl font-semibold text-foreground">Welcome to Shopping Matrix</h1>
              <p className="text-sm text-muted-foreground">Style it. Schedule it. Snack it — Shop Smart in the Matrix!</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-shopping-surface-variant" onClick={handleNotificationsClick}>
              <BellIcon className="w-5 h-5" />
              {unreadCount > 0 && <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-shopping-secondary">
                  {unreadCount}
                </Badge>}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative hover:bg-shopping-surface-variant" onClick={handleCartClick}>
              <ShoppingCartIcon className="w-5 h-5" />
              {cartCount > 0 && <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-shopping-primary">
                  {cartCount}
                </Badge>}
            </Button>

            <Button variant="ghost" size="icon" className="hover:bg-shopping-surface-variant" onClick={handleProfileClick}>
              <UserIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
      
      <NotificationModal isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
      <ProfileModal isOpen={showProfile} onClose={() => setShowProfile(false)} />
    </>;
}