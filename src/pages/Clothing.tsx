import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { BrandSection } from "@/components/BrandSection";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";


const allProducts = [
  // Zara Products
  {
    id: "zara-1",
    name: "Premium Cotton T-Shirt",
    price: 1299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.5,
    inStock: true,
    stockCount: 12,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy"],
    fitStyle: "Regular Fit",
    description: "Soft cotton t-shirt with a comfortable regular fit. Perfect for casual wear.",
    material: "100% Cotton"
  },
  {
    id: "zara-2",
    name: "Textured Knit Sweater",
    price: 2899,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.3,
    inStock: true,
    stockCount: 5,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Grey", "Burgundy"],
    fitStyle: "Oversized Fit",
    description: "Cozy textured knit sweater with an oversized fit for maximum comfort.",
    material: "60% Cotton, 40% Acrylic"
  },
  {
    id: "zara-3",
    name: "High Waist Wide Leg Jeans",
    price: 3299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.6,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const,
    sizes: ["26", "28", "30", "32", "34"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    fitStyle: "High Waist Wide Leg",
    description: "Trendy high waist jeans with a wide leg cut for a modern silhouette.",
    material: "98% Cotton, 2% Elastane"
  },
  {
    id: "zara-4",
    name: "Silk Blend Blouse",
    price: 3999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.4,
    inStock: true,
    stockCount: 6,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Black", "Emerald"],
    fitStyle: "Regular Fit",
    description: "Elegant silk blend blouse perfect for office or evening wear.",
    material: "70% Silk, 30% Viscose"
  },
  {
    id: "zara-5",
    name: "Cropped Leather Jacket",
    price: 7999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.7,
    inStock: true,
    stockCount: 3,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Black", "Brown", "Tan"],
    fitStyle: "Fitted",
    description: "Stylish cropped leather jacket with zip closure and side pockets.",
    material: "100% Genuine Leather"
  },
  {
    id: "zara-6",
    name: "Pleated Midi Skirt",
    price: 2599,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.2,
    inStock: true,
    stockCount: 9,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Khaki"],
    fitStyle: "A-Line",
    description: "Classic pleated midi skirt with elastic waistband for comfort.",
    material: "65% Polyester, 35% Cotton"
  },
  {
    id: "zara-7",
    name: "Linen Blazer",
    price: 4799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.5,
    inStock: true,
    stockCount: 7,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Beige", "Light Grey"],
    fitStyle: "Relaxed Fit",
    description: "Lightweight linen blazer perfect for summer business casual.",
    material: "100% Linen"
  },
  {
    id: "zara-8",
    name: "Ribbed Bodysuit",
    price: 1799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.3,
    inStock: true,
    stockCount: 11,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Camel"],
    fitStyle: "Fitted",
    description: "Seamless ribbed bodysuit with snap closure for easy wear.",
    material: "95% Cotton, 5% Elastane"
  },

  // H&M Products
  {
    id: "hm-1",
    name: "Slim Fit Denim Jeans",
    price: 2499,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.2,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    fitStyle: "Slim Fit",
    description: "Classic slim fit jeans perfect for everyday wear.",
    material: "99% Cotton, 1% Elastane"
  },
  {
    id: "hm-2",
    name: "Ribbed Tank Top",
    price: 799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.4,
    inStock: true,
    stockCount: 15,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Black", "Pink", "Blue"],
    fitStyle: "Fitted",
    description: "Soft ribbed tank top with a fitted silhouette.",
    material: "95% Cotton, 5% Elastane"
  },
  {
    id: "hm-3",
    name: "Oversized Blazer",
    price: 4999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.1,
    inStock: true,
    stockCount: 3,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Beige"],
    fitStyle: "Oversized",
    description: "Stylish oversized blazer perfect for professional or casual wear.",
    material: "68% Polyester, 30% Viscose, 2% Elastane"
  },
  {
    id: "hm-4",
    name: "Conscious Cotton Hoodie",
    price: 1999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.6,
    inStock: true,
    stockCount: 12,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Grey", "Black", "White", "Green"],
    fitStyle: "Regular Fit",
    description: "Comfortable hoodie made from organic cotton with kangaroo pocket.",
    material: "100% Organic Cotton"
  },
  {
    id: "hm-5",
    name: "Wrap Dress",
    price: 2299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.3,
    inStock: true,
    stockCount: 6,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral Print", "Solid Black", "Navy"],
    fitStyle: "Wrap Style",
    description: "Flattering wrap dress with tie waist and 3/4 sleeves.",
    material: "100% Viscose"
  },
  {
    id: "hm-6",
    name: "High Waisted Shorts",
    price: 1299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.1,
    inStock: true,
    stockCount: 14,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Denim Blue", "White", "Black", "Khaki"],
    fitStyle: "High Waisted",
    description: "Casual high waisted shorts with front and back pockets.",
    material: "100% Cotton"
  },
  {
    id: "hm-7",
    name: "Knit Cardigan",
    price: 2799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.4,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Cream", "Grey", "Pink", "Navy"],
    fitStyle: "Regular Fit",
    description: "Soft knit cardigan with button closure and front pockets.",
    material: "60% Cotton, 40% Acrylic"
  },
  {
    id: "hm-8",
    name: "Wide Leg Trousers",
    price: 2599,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.2,
    inStock: true,
    stockCount: 10,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Camel", "Grey"],
    fitStyle: "Wide Leg",
    description: "Elegant wide leg trousers with elastic waistband.",
    material: "68% Polyester, 30% Viscose, 2% Elastane"
  },

  // Uniqlo Products
  {
    id: "uniqlo-1",
    name: "Heattech Crew Neck Long Sleeve T-Shirt",
    price: 990,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Uniqlo",
    rating: 4.6,
    inStock: true,
    stockCount: 20,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Grey", "Navy"],
    fitStyle: "Regular Fit",
    description: "Innovative Heattech fabric keeps you warm while maintaining breathability.",
    material: "Heattech Fiber Blend"
  },
  {
    id: "uniqlo-2",
    name: "Ultra Light Down Jacket",
    price: 5990,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Uniqlo",
    rating: 4.8,
    inStock: true,
    stockCount: 7,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Red", "Green"],
    fitStyle: "Regular Fit",
    description: "Packable down jacket that's incredibly lightweight yet warm.",
    material: "90% Down, 10% Feather"
  },
  {
    id: "uniqlo-3",
    name: "Supima Cotton T-Shirt",
    price: 790,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Uniqlo",
    rating: 4.7,
    inStock: true,
    stockCount: 25,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey", "Navy", "Blue"],
    fitStyle: "Regular Fit",
    description: "Premium Supima cotton t-shirt with superior softness and durability.",
    material: "100% Supima Cotton"
  },
  {
    id: "uniqlo-4",
    name: "Fleece Full-Zip Jacket",
    price: 2990,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Uniqlo",
    rating: 4.5,
    inStock: true,
    stockCount: 11,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Navy", "Brown"],
    fitStyle: "Regular Fit",
    description: "Cozy fleece jacket with full zip closure and side pockets.",
    material: "100% Polyester Fleece"
  },
  {
    id: "uniqlo-5",
    name: "Straight Jeans",
    price: 2990,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Uniqlo",
    rating: 4.4,
    inStock: true,
    stockCount: 16,
    category: "clothing" as const,
    sizes: ["28", "29", "30", "31", "32", "33", "34"],
    colors: ["Indigo", "Black", "Light Blue"],
    fitStyle: "Straight Fit",
    description: "Classic straight jeans with comfortable fit and quality denim.",
    material: "100% Cotton Denim"
  },
  {
    id: "uniqlo-6",
    name: "Cashmere Crew Neck Sweater",
    price: 7990,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Uniqlo",
    rating: 4.9,
    inStock: true,
    stockCount: 4,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Black", "Grey", "Navy"],
    fitStyle: "Regular Fit",
    description: "Luxurious 100% cashmere sweater with timeless crew neck design.",
    material: "100% Cashmere"
  },
  {
    id: "uniqlo-7",
    name: "Airism Mesh T-Shirt",
    price: 990,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Uniqlo",
    rating: 4.5,
    inStock: true,
    stockCount: 18,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey"],
    fitStyle: "Regular Fit",
    description: "Cooling Airism mesh t-shirt perfect for hot weather and sports.",
    material: "Airism Technology Fabric"
  },
  {
    id: "uniqlo-8",
    name: "Cotton Linen Relaxed Pants",
    price: 2990,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Uniqlo",
    rating: 4.3,
    inStock: true,
    stockCount: 13,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Beige", "Navy", "Olive", "Black"],
    fitStyle: "Relaxed Fit",
    description: "Comfortable cotton linen blend pants with elastic waistband.",
    material: "70% Cotton, 30% Linen"
  },

  // Adidas Products
  {
    id: "adidas-1",
    name: "Classic White Sneakers",
    price: 3999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.7,
    inStock: true,
    stockCount: 15,
    category: "clothing" as const,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Grey"],
    fitStyle: "Regular",
    description: "Classic white sneakers with superior comfort and style.",
    material: "Leather Upper, Rubber Sole"
  },
  {
    id: "adidas-2",
    name: "3-Stripes Track Pants",
    price: 2799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.5,
    inStock: true,
    stockCount: 10,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey"],
    fitStyle: "Regular Fit",
    description: "Comfortable track pants with iconic 3-stripes design.",
    material: "100% Polyester"
  },
  {
    id: "adidas-3",
    name: "Performance Sports Bra",
    price: 1899,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.6,
    inStock: true,
    stockCount: 7,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Pink", "Blue"],
    fitStyle: "Compression Fit",
    description: "High-performance sports bra with moisture-wicking technology.",
    material: "78% Recycled Polyester, 22% Elastane"
  },
  {
    id: "adidas-4",
    name: "Ultraboost 22 Running Shoes",
    price: 8999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.8,
    inStock: true,
    stockCount: 12,
    category: "clothing" as const,
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["Black", "White", "Blue", "Red"],
    fitStyle: "Athletic Fit",
    description: "Premium running shoes with Boost cushioning technology.",
    material: "Primeknit Upper, Boost Midsole"
  },
  {
    id: "adidas-5",
    name: "Essentials Hoodie",
    price: 3299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.4,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Navy", "White"],
    fitStyle: "Regular Fit",
    description: "Classic hoodie with drawstring hood and kangaroo pocket.",
    material: "70% Cotton, 30% Polyester"
  },
  {
    id: "adidas-6",
    name: "Training Shorts",
    price: 1999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.3,
    inStock: true,
    stockCount: 14,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Red", "Grey"],
    fitStyle: "Athletic Fit",
    description: "Lightweight training shorts with moisture-wicking fabric.",
    material: "100% Recycled Polyester"
  },
  {
    id: "adidas-7",
    name: "Stan Smith Sneakers",
    price: 5999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.6,
    inStock: true,
    stockCount: 9,
    category: "clothing" as const,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["White/Green", "White/Blue", "All White"],
    fitStyle: "Regular",
    description: "Iconic Stan Smith sneakers with minimalist design.",
    material: "Leather Upper, Rubber Sole"
  },
  {
    id: "adidas-8",
    name: "Tiro 21 Training Jacket",
    price: 3799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.5,
    inStock: true,
    stockCount: 6,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey"],
    fitStyle: "Athletic Fit",
    description: "Professional training jacket with full zip and side pockets.",
    material: "100% Recycled Polyester"
  },

  // Nike Products
  {
    id: "nike-1",
    name: "Air Force 1 Sneakers",
    price: 7999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Nike",
    rating: 4.8,
    inStock: true,
    stockCount: 11,
    category: "clothing" as const,
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Red"],
    fitStyle: "Regular",
    description: "Iconic Air Force 1 sneakers with classic basketball heritage.",
    material: "Leather Upper, Rubber Sole"
  },
  {
    id: "nike-2",
    name: "Dri-FIT Training Top",
    price: 2299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Nike",
    rating: 4.5,
    inStock: true,
    stockCount: 13,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Grey", "Blue"],
    fitStyle: "Athletic Fit",
    description: "Performance training top with Dri-FIT moisture-wicking technology.",
    material: "Dri-FIT Polyester Blend"
  },
  {
    id: "nike-3",
    name: "Tech Fleece Joggers",
    price: 4299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Nike",
    rating: 4.7,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "Navy"],
    fitStyle: "Tapered Fit",
    description: "Premium tech fleece joggers with modern tapered fit.",
    material: "Tech Fleece Cotton Blend"
  },
  {
    id: "nike-4",
    name: "Sportswear Club Hoodie",
    price: 2799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Nike",
    rating: 4.4,
    inStock: true,
    stockCount: 15,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Grey", "White", "Navy"],
    fitStyle: "Regular Fit",
    description: "Classic pullover hoodie with soft fleece interior.",
    material: "80% Cotton, 20% Polyester"
  },
  {
    id: "nike-5",
    name: "Pro Compression Leggings",
    price: 2599,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Nike",
    rating: 4.6,
    inStock: true,
    stockCount: 10,
    category: "clothing" as const,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Grey"],
    fitStyle: "Compression Fit",
    description: "High-performance compression leggings for training and workouts.",
    material: "Dri-FIT Stretch Fabric"
  },
  {
    id: "nike-6",
    name: "Revolution 6 Running Shoes",
    price: 4999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Nike",
    rating: 4.3,
    inStock: true,
    stockCount: 12,
    category: "clothing" as const,
    sizes: ["6", "7", "8", "9", "10", "11"],
    colors: ["Black/White", "Grey", "Navy"],
    fitStyle: "Regular",
    description: "Comfortable running shoes with cushioned midsole.",
    material: "Mesh Upper, Foam Midsole"
  },
  {
    id: "nike-7",
    name: "Dri-FIT Shorts",
    price: 1899,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Nike",
    rating: 4.2,
    inStock: true,
    stockCount: 16,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey", "White"],
    fitStyle: "Athletic Fit",
    description: "Lightweight shorts with Dri-FIT technology for sports and training.",
    material: "Dri-FIT Polyester"
  },
  {
    id: "nike-8",
    name: "Windrunner Jacket",
    price: 5299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Nike",
    rating: 4.5,
    inStock: true,
    stockCount: 7,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "White"],
    fitStyle: "Regular Fit",
    description: "Classic windbreaker jacket with chevron design and full zip.",
    material: "Water-Resistant Polyester"
  },

  // Levi's Products
  {
    id: "levis-1",
    name: "501 Original Jeans",
    price: 4999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Levi's",
    rating: 4.7,
    inStock: true,
    stockCount: 14,
    category: "clothing" as const,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Dark Indigo", "Light Blue", "Black"],
    fitStyle: "Straight Fit",
    description: "The original straight fit jeans that started it all.",
    material: "100% Cotton Denim"
  },
  {
    id: "levis-2",
    name: "Trucker Denim Jacket",
    price: 5999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Levi's",
    rating: 4.8,
    inStock: true,
    stockCount: 6,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Classic Blue", "Black", "Light Wash"],
    fitStyle: "Regular Fit",
    description: "Iconic trucker jacket in classic denim with button closure.",
    material: "100% Cotton Denim"
  },
  {
    id: "levis-3",
    name: "511 Slim Jeans",
    price: 4599,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Levi's",
    rating: 4.5,
    inStock: true,
    stockCount: 11,
    category: "clothing" as const,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Dark Blue", "Light Blue", "Black", "Grey"],
    fitStyle: "Slim Fit",
    description: "Slim fit jeans that sit below the waist with a narrow leg.",
    material: "99% Cotton, 1% Elastane"
  },
  {
    id: "levis-4",
    name: "Classic Logo T-Shirt",
    price: 1599,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Levi's",
    rating: 4.3,
    inStock: true,
    stockCount: 20,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Red", "Navy"],
    fitStyle: "Regular Fit",
    description: "Classic cotton t-shirt with iconic Levi's logo.",
    material: "100% Cotton"
  },
  {
    id: "levis-5",
    name: "Wedgie Straight Jeans",
    price: 4799,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Levi's",
    rating: 4.4,
    inStock: true,
    stockCount: 9,
    category: "clothing" as const,
    sizes: ["25", "26", "27", "28", "30", "32"],
    colors: ["Dark Blue", "Light Blue", "Black"],
    fitStyle: "High Rise Straight",
    description: "High rise straight jeans with a vintage-inspired fit.",
    material: "100% Cotton"
  },
  {
    id: "levis-6",
    name: "Sherpa Trucker Jacket",
    price: 7999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Levi's",
    rating: 4.6,
    inStock: true,
    stockCount: 4,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue/White", "Black/Grey"],
    fitStyle: "Regular Fit",
    description: "Denim trucker jacket lined with cozy sherpa fleece.",
    material: "Cotton Denim with Sherpa Lining"
  },
  {
    id: "levis-7",
    name: "710 Super Skinny Jeans",
    price: 4299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Levi's",
    rating: 4.2,
    inStock: true,
    stockCount: 12,
    category: "clothing" as const,
    sizes: ["25", "26", "27", "28", "30", "32"],
    colors: ["Dark Blue", "Black", "Grey"],
    fitStyle: "Super Skinny",
    description: "Ultra-skinny jeans that hug your curves in all the right places.",
    material: "92% Cotton, 7% Polyester, 1% Elastane"
  },
  {
    id: "levis-8",
    name: "Vintage Graphic Hoodie",
    price: 3999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Levi's",
    rating: 4.4,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Grey", "Black", "Navy"],
    fitStyle: "Regular Fit",
    description: "Comfortable hoodie with vintage Levi's graphics.",
    material: "60% Cotton, 40% Polyester"
  },

  // Bags & Accessories - Zara
  {
    id: "zara-bag-1",
    name: "Leather Crossbody Bag",
    price: 2999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.5,
    inStock: true,
    stockCount: 8,
    category: "clothing" as const,
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Beige"],
    fitStyle: "Adjustable Strap",
    description: "Elegant leather crossbody bag with adjustable strap and multiple compartments.",
    material: "100% Genuine Leather"
  },
  {
    id: "zara-bag-2",
    name: "Canvas Tote Bag",
    price: 1499,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Zara",
    rating: 4.3,
    inStock: true,
    stockCount: 15,
    category: "clothing" as const,
    sizes: ["One Size"],
    colors: ["Natural", "Black", "Navy"],
    fitStyle: "Tote Style",
    description: "Spacious canvas tote bag perfect for everyday use and shopping.",
    material: "100% Cotton Canvas"
  },
  {
    id: "hm-bag-1",
    name: "Structured Shoulder Bag",
    price: 1999,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "H&M",
    rating: 4.4,
    inStock: true,
    stockCount: 10,
    category: "clothing" as const,
    sizes: ["One Size"],
    colors: ["Black", "White", "Red"],
    fitStyle: "Shoulder Strap",
    description: "Chic structured shoulder bag with metallic hardware.",
    material: "Synthetic Leather"
  },
  {
    id: "nike-bag-1",
    name: "Sport Backpack",
    price: 2499,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Nike",
    rating: 4.6,
    inStock: true,
    stockCount: 12,
    category: "clothing" as const,
    sizes: ["One Size"],
    colors: ["Black", "Navy", "Grey"],
    fitStyle: "Backpack",
    description: "Durable sport backpack with padded laptop compartment and water bottle holder.",
    material: "100% Polyester"
  },
  {
    id: "adidas-bag-1",
    name: "Classic Backpack",
    price: 2299,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.5,
    inStock: true,
    stockCount: 14,
    category: "clothing" as const,
    sizes: ["One Size"],
    colors: ["Black", "Navy", "Grey"],
    fitStyle: "Backpack",
    description: "Classic Adidas backpack with three stripes design and multiple pockets.",
    material: "100% Recycled Polyester"
  },
  {
    id: "adidas-bag-2",
    name: "Gym Duffel Bag",
    price: 3499,
    image: "/api/placeholder/300/300",
    images: ["/api/placeholder/300/300", "/api/placeholder/300/300", "/api/placeholder/300/300"],
    brand: "Adidas",
    rating: 4.7,
    inStock: true,
    stockCount: 6,
    category: "clothing" as const,
    sizes: ["Medium", "Large"],
    colors: ["Black", "Navy", "Red"],
    fitStyle: "Duffel",
    description: "Spacious gym duffel bag with shoe compartment and adjustable shoulder strap.",
    material: "Water-Resistant Polyester"
  }
];

// Calculate actual product counts for each brand
const getBrandProductCount = (brandName: string) => {
  return allProducts.filter(product => product.brand.toLowerCase() === brandName.toLowerCase()).length;
};

const clothingBrands = [
  {
    id: "zara",
    name: "Zara", 
    logo: "/api/placeholder/64/64",
    description: "Fashion-forward clothing for modern lifestyles",
    category: "clothing",
    isOpen: true,
    productCount: getBrandProductCount("Zara")
  },
  {
    id: "hm",
    name: "H&M",
    logo: "/api/placeholder/64/64", 
    description: "Sustainable fashion accessible to everyone",
    category: "clothing",
    isOpen: true,
    productCount: getBrandProductCount("H&M")
  },
  {
    id: "uniqlo",
    name: "Uniqlo",
    logo: "/api/placeholder/64/64",
    description: "Japanese casual wear and basics",
    category: "clothing", 
    isOpen: true,
    productCount: getBrandProductCount("Uniqlo")
  },
  {
    id: "adidas",
    name: "Adidas",
    logo: "/api/placeholder/64/64",
    description: "Sports and athleisure wear",
    category: "clothing",
    isOpen: true,
    productCount: getBrandProductCount("Adidas")
  },
  {
    id: "nike",
    name: "Nike",
    logo: "/api/placeholder/64/64",
    description: "Athletic wear and performance gear",
    category: "clothing",
    isOpen: true,
    productCount: getBrandProductCount("Nike")
  },
  {
    id: "levis",
    name: "Levi's",
    logo: "/api/placeholder/64/64",
    description: "Premium denim and casual wear",
    category: "clothing",
    isOpen: true,
    productCount: getBrandProductCount("Levi's")
  }
];

export default function Clothing() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const { addToCart } = useCart();

  const searchQuery = searchParams.get('search') || "";

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleBrandSelect = (brandId: string) => {
    setSelectedBrand(brandId);
  };

  const activeSearchQuery = localSearchQuery.toLowerCase().trim();

  // Helper function to match similar terms
  const matchesSimilarTerms = (text: string, searchQuery: string): boolean => {
    const lowerText = text.toLowerCase();
    const lowerQuery = searchQuery.toLowerCase();
    
    // Direct match
    if (lowerText.includes(lowerQuery)) return true;
    
    // Similar word matching
    const similarWords: { [key: string]: string[] } = {
      'bag': ['backpack', 'tote', 'duffel', 'crossbody', 'shoulder'],
      'backpack': ['bag', 'rucksack'],
      'shoe': ['sneaker', 'trainer', 'footwear'],
      'sneaker': ['shoe', 'trainer'],
      'jacket': ['coat', 'blazer', 'hoodie'],
      'pant': ['trouser', 'jean', 'jogger', 'legging'],
      'jean': ['denim', 'pant'],
      'shirt': ['tee', 'top', 'blouse']
    };
    
    // Check if search query matches any similar words
    for (const [key, synonyms] of Object.entries(similarWords)) {
      if (lowerQuery.includes(key)) {
        if (synonyms.some(syn => lowerText.includes(syn))) {
          return true;
        }
      }
    }
    
    return false;
  };

  const filteredProducts = allProducts.filter(product => {
    const matchesBrand = !selectedBrand || 
      product.brand.toLowerCase().replace("'", "").replace("'", "") === selectedBrand.toLowerCase().replace("'", "").replace("'", "");
    
    const matchesSearch = !activeSearchQuery || 
      matchesSimilarTerms(product.name, activeSearchQuery) ||
      matchesSimilarTerms(product.brand, activeSearchQuery) ||
      (product.description && matchesSimilarTerms(product.description, activeSearchQuery));
    
    return matchesBrand && matchesSearch;
  });

  const handleAddToCart = (productId: string, size?: string, color?: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: `${productId}-${Date.now()}`, // Unique ID for cart item
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        type: "purchase",
        size,
        color
      });
      toast.success(`${product.name} added to cart for purchase!`);
    }
    setSelectedProduct(null);
  };

  const handleReserveForTrial = (productId: string, size?: string, color?: string) => {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: `${productId}-trial-${Date.now()}`, // Unique ID for trial item
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        type: "trial",
        size,
        color
      });
      toast.success(`${product.name} reserved for trial (2 hours)!`);
    }
    setSelectedProduct(null);
  };

  const selectedProductData = selectedProduct 
    ? allProducts.find(p => p.id === selectedProduct) 
    : null;

  if (selectedBrand) {
    const brand = clothingBrands.find(b => b.id === selectedBrand);
    
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
                onReserveForTrial={handleReserveForTrial}
                onViewDetails={() => setSelectedProduct(product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-surface">
        <div className="container mx-auto px-6 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search clothing items, brands..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg"
              />
            </div>
          </div>

          {/* Search Results or Brand List */}
          {activeSearchQuery ? (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Search Results for "{localSearchQuery}"
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={handleAddToCart}
                      onReserveForTrial={handleReserveForTrial}
                      onViewDetails={() => setSelectedProduct(product.id)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground text-lg">No products found matching your search.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <BrandSection
              title="Clothing Stores"
              brands={clothingBrands}
              onBrandSelect={handleBrandSelect}
            />
          )}
        </div>
      </div>
      
      <ProductDetailModal
        product={selectedProductData}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onReserveForTrial={handleReserveForTrial}
      />
    </>
  );
}