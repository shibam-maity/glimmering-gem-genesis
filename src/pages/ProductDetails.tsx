import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Truck, 
  RefreshCw, 
  ShieldCheck,
  ArrowLeft, 
  Share2,
  Plus,
  Minus,
  ShoppingBag
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/contexts/CartContext";
import WishlistButton from "@/components/WishlistButton";

const products = [
  {
    id: "prod-1",
    name: "Diamond Studded Gold Bangle",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
    isNew: true,
    description: "This elegant 18k gold bangle features brilliant-cut diamonds totaling 0.75 carats set in a delicate pattern around the entire piece. The perfect statement piece for any occasion.",
    details: {
      material: "18k Gold",
      weight: "15g",
      dimensions: "Diameter: 2.5 inches",
      stones: "Diamond, 0.75 carats total",
      origin: "Italy"
    },
    care: "Clean with a soft cloth. Avoid contact with harsh chemicals. Store in a jewelry box.",
    additionalImages: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1630019852942-f87fa946dc68?auto=format&fit=crop&q=80&w=600"
    ],
    stock: 5,
    rating: 4.8,
    reviews: 24
  },
  {
    id: "prod-2",
    name: "Twisted Gold Hoop Earrings",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=600",
    category: "Earrings",
    isBestseller: true,
    description: "These 14k gold twisted hoop earrings add a modern touch to a classic design. Light-catching and comfortable for all-day wear.",
    details: {
      material: "14k Gold",
      weight: "8g (pair)",
      dimensions: "Diameter: 1.2 inches",
      stones: "None",
      origin: "France"
    },
    care: "Clean with a soft cloth. Avoid contact with harsh chemicals. Store in a jewelry box.",
    additionalImages: [
      "https://images.unsplash.com/photo-1630019851294-cc0fbea40f76?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1629224316710-a41f974b75e1?auto=format&fit=crop&q=80&w=600"
    ],
    stock: 12,
    rating: 4.9,
    reviews: 36
  },
  {
    id: "prod-3",
    name: "Delicate Gold Chain Necklace",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
    description: "A delicate 18k gold chain necklace that elegantly adorns your neckline. Perfect for layering or wearing as a subtle statement piece.",
    details: {
      material: "18k Gold",
      weight: "6g",
      dimensions: "Length: 18 inches",
      stones: "None",
      origin: "Switzerland"
    },
    care: "Clean with a soft cloth. Avoid contact with harsh chemicals. Store in a jewelry box.",
    additionalImages: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1599643478560-364e3a945e2f?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1611107419458-58073d16c399?auto=format&fit=crop&q=80&w=600"
    ],
    stock: 8,
    rating: 4.7,
    reviews: 19
  },
  {
    id: "prod-4",
    name: "Classic Gold Wedding Band",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
    isBestseller: true,
    description: "A timeless 14k gold wedding band with a comfortable fit and classic design. Made to symbolize eternal love and commitment.",
    details: {
      material: "14k Gold",
      weight: "7g",
      dimensions: "Width: 5mm",
      stones: "None",
      origin: "USA"
    },
    care: "Clean with a soft cloth. Avoid contact with harsh chemicals. Store in a jewelry box.",
    additionalImages: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1586104195538-050b9f9b589c?auto=format&fit=crop&q=80&w=600",
      "https://images.unsplash.com/photo-1587056894209-169c287ddf0a?auto=format&fit=crop&q=80&w=600"
    ],
    stock: 15,
    rating: 5.0,
    reviews: 42
  }
];

const similarProducts = products.slice(0, 4);

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  const product = products.find(p => p.id === id) || products[0];

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Sorry, only ${product.stock} items available`);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category
    }, quantity);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container px-4 py-10 mx-auto">
        <div className="mb-6">
          <nav className="flex text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <Link to="/collections" className="text-muted-foreground hover:text-foreground transition-colors">
              {product.category}
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-secondary/30">
              <img 
                src={product.additionalImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.additionalImages.map((image, index) => (
                <button 
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-gold' : 'opacity-70'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && (
                  <Badge className="bg-gold-dark text-white hover:bg-gold-dark">New</Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-luxury-burgundy text-white hover:bg-luxury-burgundy">Bestseller</Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-playfair font-medium">{product.name}</h1>
            </div>

            <div className="flex flex-wrap items-center justify-between">
              <p className="text-2xl md:text-3xl font-playfair text-gold-dark">${product.price.toFixed(2)}</p>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.floor(product.rating) ? "#D4AF37" : "none"} 
                      className={i < Math.floor(product.rating) ? "text-gold" : "text-muted-foreground"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            <p className="text-muted-foreground font-poppins">{product.description}</p>

            <div className="flex items-center gap-2 text-sm">
              <span className={`h-3 w-3 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}></span>
              <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}</span>
            </div>

            <div className="pt-4">
              <p className="text-sm font-medium mb-2">Quantity</p>
              <div className="flex items-center">
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-r-none"
                >
                  <Minus size={16} />
                </Button>
                <div className="h-10 w-14 flex items-center justify-center border-y border-input">
                  {quantity}
                </div>
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10 rounded-l-none"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-gold hover:bg-gold-dark text-white flex-1"
                size="lg"
                onClick={addToCart}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </Button>
              <WishlistButton 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category
                }}
                variant="default"
                className="flex-1"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-gold-dark" />
                <span className="text-sm">Free shipping over $200</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={18} className="text-gold-dark" />
                <span className="text-sm">30-day returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-gold-dark" />
                <span className="text-sm">Authenticity guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Share2 size={18} className="text-gold-dark" />
                <span className="text-sm">Share this item</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b rounded-none justify-start h-auto p-0 bg-transparent gap-8">
              <TabsTrigger 
                value="details" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-foreground text-muted-foreground pb-2 pt-0 px-1"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="care" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-foreground text-muted-foreground pb-2 pt-0 px-1"
              >
                Care Instructions
              </TabsTrigger>
              <TabsTrigger 
                value="shipping" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:text-foreground text-muted-foreground pb-2 pt-0 px-1"
              >
                Shipping & Returns
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-playfair font-medium mb-4">Product Specifications</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Material</span>
                      <span className="font-medium">{product.details.material}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-medium">{product.details.weight}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-medium">{product.details.dimensions}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Stones</span>
                      <span className="font-medium">{product.details.stones}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Country of Origin</span>
                      <span className="font-medium">{product.details.origin}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-playfair font-medium mb-4">About this Product</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Each of our pieces is meticulously crafted by master artisans with decades of experience. We use only the finest materials, ensuring each piece meets our rigorous quality standards. This {product.name.toLowerCase()} exemplifies our commitment to excellence and timeless design.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    All ELEGOLD jewelry comes in our signature packaging, making it perfect for gifting or treating yourself to something special.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="care" className="pt-6">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font-playfair font-medium mb-4">Jewelry Care Instructions</h3>
                <p className="text-muted-foreground mb-4">
                  To ensure your ELEGOLD jewelry maintains its beauty for years to come, please follow these care instructions:
                </p>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-medium">1</div>
                    <p><span className="font-medium">Avoid Chemicals:</span> Remove your jewelry when using household cleaners, perfumes, or lotions as these can damage the metal and diminish its luster.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-medium">2</div>
                    <p><span className="font-medium">Proper Storage:</span> Store your jewelry in the provided box or a fabric-lined jewelry box to prevent scratches.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-medium">3</div>
                    <p><span className="font-medium">Regular Cleaning:</span> Gently clean with a soft, lint-free cloth to restore shine. For more thorough cleaning, use warm water with mild soap.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-medium">4</div>
                    <p><span className="font-medium">Professional Maintenance:</span> Have your gold jewelry professionally cleaned once a year to maintain its appearance.</p>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  {product.care}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font-playfair font-medium mb-4">Shipping Information</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-medium">
                      <Truck size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Standard Shipping</p>
                      <p className="text-muted-foreground">Free on orders over $200. Delivery within 3-5 business days.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-medium">
                      <Truck size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Express Shipping</p>
                      <p className="text-muted-foreground">$15. Delivery within 1-2 business days.</p>
                    </div>
                  </li>
                </ul>

                <h3 className="text-lg font-playfair font-medium mt-8 mb-4">Return Policy</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-medium">
                      <RefreshCw size={14} />
                    </div>
                    <div>
                      <p className="font-medium">30-Day Returns</p>
                      <p className="text-muted-foreground">We offer a 30-day return policy on all unworn items in their original condition and packaging.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-medium">
                      <RefreshCw size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Process</p>
                      <p className="text-muted-foreground">To initiate a return, please contact our customer service team. Return shipping is free for exchanges.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-24">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
