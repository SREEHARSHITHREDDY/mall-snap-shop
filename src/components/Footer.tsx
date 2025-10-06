import { Link } from "react-router-dom";
import { ShoppingBagIcon, MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
export function Footer() {
  return <footer className="bg-gradient-to-br from-background via-shopping-surface to-background border-t border-border/50 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShoppingBagIcon className="w-8 h-8 text-shopping-primary" />
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Shopping Matrix
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for seamless shopping and dining experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/clothing" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/food" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                  Food Court
                </Link>
              </li>
              <li>
                <Link to="/other" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                  Other Products
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 text-shopping-primary" />
                <span>123 Mall Street, City 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-shopping-primary" />
                <span>+91 9398939257</span>
              </li>
              <li className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-shopping-primary" />
                <span>support@shoppingmatrix.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Shopping Matrix. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-shopping-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}