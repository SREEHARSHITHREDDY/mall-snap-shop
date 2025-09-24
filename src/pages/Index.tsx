import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShirtIcon, 
  UtensilsIcon, 
  ShoppingBagIcon, 
  ClockIcon, 
  SearchIcon,
  TrendingUpIcon,
  MapPinIcon,
  ShieldCheckIcon,
  HeartIcon
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
  }
];

const Index = () => {
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
                <span className="bg-gradient-primary bg-clip-text text-transparent shimmer font-black">
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Link 
                key={index} 
                to={feature.link} 
                className="group block animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-center space-y-8 parallax magnetic">
                  <div className="relative">
                    <div className="glass glass-hover w-28 h-28 mx-auto rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-500 shimmer">
                      <feature.icon className="w-12 h-12 text-shopping-primary" />
                    </div>
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-lg font-bold text-white shadow-lg pulse-glow">
                      {index + 1}
                    </div>
                    
                    {/* Floating Ring */}
                    <div className="absolute inset-0 w-32 h-32 mx-auto border-2 border-shopping-primary/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-shopping-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed max-w-sm mx-auto">
                      {feature.description}
                    </p>
                    
                    {/* Interactive Arrow */}
                    <div className="pt-4">
                      <div className="inline-flex items-center text-shopping-primary font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Explore Now 
                        <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
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
                <Link to="/clothing">Browse Clothing</Link>
              </Button>
              
              <Button 
                asChild 
                size="lg"
                variant="outline" 
                className="glass glass-hover border-white/30 text-white hover:bg-white/10 text-lg px-10 py-4 magnetic backdrop-blur-md font-semibold"
              >
                <Link to="/orders">View My Orders</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;