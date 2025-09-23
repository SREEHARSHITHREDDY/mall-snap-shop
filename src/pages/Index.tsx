import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShirtIcon, 
  UtensilsIcon, 
  ShoppingBagIcon, 
  ClockIcon, 
  QrCodeIcon,
  TrendingUpIcon,
  MapPinIcon,
  ShieldCheckIcon
} from "lucide-react";
import heroImage from "@/assets/hero-shopping-mall.jpg";

const quickStats = [
  { label: "Active Stores", value: "150+", icon: ShoppingBagIcon },
  { label: "Food Outlets", value: "25+", icon: UtensilsIcon },
  { label: "Happy Customers", value: "10K+", icon: TrendingUpIcon },
  { label: "Orders Today", value: "450+", icon: ClockIcon },
];

const features = [
  {
    title: "Browse & Reserve",
    description: "Check stock availability and reserve items for trial before purchase",
    icon: ShirtIcon,
    link: "/clothing"
  },
  {
    title: "Order Ahead",
    description: "Skip the queue! Order food in advance and collect when ready",  
    icon: UtensilsIcon,
    link: "/food"
  },
  {
    title: "QR Collection",
    description: "Get QR codes for seamless pickup and collection of your orders",
    icon: QrCodeIcon,
    link: "/qr-codes"
  },
  {
    title: "Live Updates",
    description: "Real-time stock updates and order status tracking",
    icon: ShieldCheckIcon,
    link: "/orders"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Shopping Mall Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-shopping-primary/10 text-shopping-primary border-shopping-primary/20">
              <MapPinIcon className="w-4 h-4 mr-2" />
              Your Complete Mall Experience
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Shopping Matrix
              </span>
            </h1>
            
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Discover, order, and enjoy a seamless shopping experience. Browse all stores, 
              check stock, order food ahead, and collect with QR codes - all in one platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-3"
              >
                <Link to="/clothing">Start Shopping</Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8 py-3"
              >
                <Link to="/food">Order Food</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-shopping-surface">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="text-center bg-gradient-card hover:shadow-elevated transition-smooth">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-shopping-primary" />
                  <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose Shopping Matrix?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of mall shopping with our innovative platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group cursor-pointer transition-smooth hover:shadow-elevated hover:-translate-y-2 bg-gradient-card"
              >
                <Link to={feature.link}>
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-smooth">
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save time and enjoy hassle-free mall visits
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-3"
            >
              <Link to="/clothing">Browse Clothing</Link>
            </Button>
            
            <Button 
              asChild 
              size="lg"
              variant="outline" 
              className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-3"
            >
              <Link to="/orders">View My Orders</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;