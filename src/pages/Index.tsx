import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShirtIcon, 
  UtensilsIcon, 
  ShoppingBagIcon, 
  ClockIcon, 
  SearchIcon,
  TrendingUpIcon,
  MapPinIcon,
  ShieldCheckIcon,
  HeartIcon,
  StarIcon,
  MessageCircleIcon,
  GiftIcon,
  ZapIcon,
  UsersIcon,
  ShoppingCartIcon
} from "lucide-react";
import heroImage from "@/assets/hero-shopping-video-frame.jpg";

const quickStats = [
  { label: "Active Stores", value: "150+", icon: ShoppingBagIcon },
  { label: "Food Outlets", value: "25+", icon: UtensilsIcon },
  { label: "Happy Customers", value: "10K+", icon: TrendingUpIcon },
  { label: "Orders Today", value: "450+", icon: ClockIcon },
];

const features = [
  {
    title: "Try Before Buy",
    description: "Reserve items for trial and only pay after you're satisfied",
    icon: ShirtIcon,
    link: "/clothing"
  },
  {
    title: "Skip the Queue",
    description: "Order food ahead and collect instantly when ready",  
    icon: UtensilsIcon,
    link: "/food"
  },
  {
    title: "Smart Search",
    description: "Find exactly what you need across all stores instantly",
    icon: SearchIcon,
    link: "/clothing"
  },
  {
    title: "Secure Payments",
    description: "Shop with confidence using our encrypted payment system",
    icon: ShieldCheckIcon,
    link: "/cart"
  },
  {
    title: "Instant Deals",
    description: "Get notified about flash sales and exclusive member offers",
    icon: ZapIcon,
    link: "/clothing"
  },
  {
    title: "24/7 Support",
    description: "Round-the-clock customer service for seamless shopping",
    icon: MessageCircleIcon,
    link: "/orders"
  }
];

const featuredDeals = [
  {
    title: "Flash Sale",
    description: "Up to 70% off on designer clothing",
    discount: "70% OFF",
    category: "Clothing",
    icon: ShirtIcon,
    link: "/clothing"
  },
  {
    title: "Food Combo",
    description: "Buy 2 meals, get 1 free from top restaurants",
    discount: "Buy2Get1",
    category: "Food",
    icon: UtensilsIcon,
    link: "/food"
  },
  {
    title: "New Member",
    description: "Extra 20% off on your first purchase",
    discount: "20% OFF",
    category: "Special",
    icon: GiftIcon,
    link: "/clothing"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing experience! The try-before-buy feature saved me so much time.",
    category: "Verified Buyer"
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "Food ordering is super convenient. No more waiting in long queues!",
    category: "Food Lover"
  },
  {
    name: "Emma Wilson",
    rating: 5,
    comment: "Best shopping app ever! Fast, reliable, and great customer service.",
    category: "Regular Customer"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/clothing?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            {/* Placeholder for video - in production this would be a video element */}
            <img 
              src={heroImage} 
              alt="People shopping in modern mall"
              className="w-full h-full object-cover"
            />
            {/* Animated overlay to simulate video movement */}
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-r from-black/60 via-transparent to-black/60 animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/20 rounded-full animate-float"></div>
                <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/15 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/30 to-black/60" />
          </div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24 lg:py-32 z-10">
          <div className="max-w-4xl animate-fade-in-up">
            <div className="glass glass-hover rounded-3xl p-8 mb-8 max-w-2xl backdrop-blur-xl border-white/20">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm font-medium">
                <MapPinIcon className="w-4 h-4 mr-2" />
                Shop Smart, Shop Easy
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent font-black">
                  Shopping Matrix
                </span>
              </h1>
              
              <p className="text-lg text-white/95 mb-8 leading-relaxed font-medium">
                Experience seamless shopping with modern technology. Browse, reserve, and enjoy - all in one platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild 
                  size="lg" 
                  className="glass glass-hover border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4 magnetic font-semibold backdrop-blur-md"
                >
                  <Link to="/clothing">Start Shopping</Link>
                </Button>
                
                <Button 
                  asChild 
                  size="lg"
                  className="glass glass-hover border-white/30 text-white hover:bg-white/20 text-lg px-8 py-4 magnetic font-semibold backdrop-blur-md"
                >
                  <Link to="/food">Order Food</Link>
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative mt-8 max-w-md">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search products, brands, food..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-12 py-4 bg-white/10 border-white/20 text-white placeholder-white/60 backdrop-blur-md"
                />
                <Button 
                  onClick={handleSearch}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-white/20"
                  size="sm"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-shopping-primary/10 rounded-full blur-xl float"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-shopping-secondary/10 rounded-full blur-xl float" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-shopping-primary/5 to-shopping-secondary/5"></div>
        <div className="container mx-auto px-6 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="glass glass-hover rounded-2xl p-6 text-center group animate-scale-in magnetic"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <stat.icon className="w-12 h-12 mx-auto mb-4 text-shopping-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute -inset-2 bg-gradient-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <p className="text-3xl font-bold text-foreground mb-2 group-hover:text-shopping-primary transition-colors">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-shopping-secondary/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              Shopping Made{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">Simple</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your mall experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.link} 
                className="group block animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="glass glass-hover rounded-2xl p-8 h-full parallax magnetic">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-shopping-primary/10 group-hover:bg-shopping-primary/20 transition-all duration-300">
                        <feature.icon className="w-10 h-10 text-shopping-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-shopping-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section className="py-20 bg-gradient-to-br from-shopping-primary/5 to-shopping-secondary/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Today's <span className="bg-gradient-primary bg-clip-text text-transparent">Hot Deals</span>
            </h2>
            <p className="text-muted-foreground text-lg">Limited time offers you can't miss</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredDeals.map((deal, index) => (
              <Link key={index} to={deal.link} className="group block">
                <Card className="glass glass-hover h-full group-hover:scale-105 transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 mx-auto rounded-full bg-shopping-primary/10 flex items-center justify-center">
                        <deal.icon className="w-8 h-8 text-shopping-primary" />
                      </div>
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white pulse-glow">
                        {deal.discount}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{deal.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{deal.description}</p>
                      <Badge variant="outline">{deal.category}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our <span className="bg-gradient-primary bg-clip-text text-transparent">Customers Say</span>
            </h2>
            <p className="text-muted-foreground text-lg">Join thousands of satisfied shoppers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass glass-hover">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.comment}"</p>
                  <div className="pt-4 border-t">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.category}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-shopping-primary/10 to-shopping-secondary/10">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Stay Updated with Exclusive Deals
            </h2>
            <p className="text-muted-foreground mb-8">
              Get notified about flash sales, new arrivals, and member-only offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-shopping-primary hover:bg-shopping-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary"></div>
        <div className="absolute inset-0">
          <div className="glass-dark w-full h-full"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Ready to Transform Your{" "}
              <span className="shimmer">Shopping Experience?</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join thousands of smart shoppers who save time and enjoy hassle-free mall visits
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="glass glass-hover border-white/30 text-white hover:bg-white/20 text-lg px-10 py-4 magnetic backdrop-blur-md font-semibold"
              >
                <Link to="/clothing">
                  <ShoppingCartIcon className="w-5 h-5 mr-2" />
                  Start Shopping Now
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg"
                className="glass glass-hover border-white/30 text-white hover:bg-white/20 text-lg px-10 py-4 magnetic backdrop-blur-md font-semibold"
              >
                <Link to="/food">
                  <UtensilsIcon className="w-5 h-5 mr-2" />
                  Order Delicious Food
                </Link>
              </Button>
            </div>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/80">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                <span className="text-sm">10K+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                <span className="text-sm">100% Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <ZapIcon className="w-5 h-5" />
                <span className="text-sm">Lightning Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;