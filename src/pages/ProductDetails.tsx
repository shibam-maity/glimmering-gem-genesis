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

// Sample product data - Assuming prices are now base numbers (e.g., 129999 for ₹1,29,999)
// NOTE: You'll need to update these sample prices to reflect INR values.
const products = [
  {
    id: "prod-1",
    name: "Diamond Studded Gold Bangle",
    price: 129999, // Example: 1,29,999 INR
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
    isNew: true,
    description: "This elegant 18k gold bangle features brilliant-cut diamonds totaling 0.75 carats set in a delicate pattern around the entire piece. The perfect statement piece for any occasion.",
    details: {
      material: "18k Gold",
      weight: "15g",
      dimensions: "Diameter: 2.5 inches",
      stones: "Diamond, 0.75 carats total",
      origin: "India"
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
    price: 79999, // Example: 79,999 INR
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=600",
    category: "Earrings",
    isBestseller: true,
    description: "These 14k gold twisted hoop earrings add a modern touch to a classic design. Light-catching and comfortable for all-day wear.",
    details: {
      material: "14k Gold",
      weight: "8g (pair)",
      dimensions: "Diameter: 1.2 inches",
      stones: "None",
      origin: "India"
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
    price: 89999, // Example: 89,999 INR
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
    description: "A delicate 18k gold chain necklace that elegantly adorns your neckline. Perfect for layering or wearing as a subtle statement piece.",
    details: {
      material: "18k Gold",
      weight: "6g",
      dimensions: "Length: 18 inches",
      stones: "None",
      origin: "India"
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
    price: 149999, // Example: 1,49,999 INR
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
    isBestseller: true,
    description: "A timeless 14k gold wedding band with a comfortable fit and classic design. Made to symbolize eternal love and commitment.",
    details: {
      material: "14k Gold",
      weight: "7g",
      dimensions: "Width: 5mm",
      stones: "None",
      origin: "India"
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

// Helper function to format price (add if not already imported/defined globally)
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

// Find some similar products (ensure prices are updated here too)
const similarProducts = products.slice(0, 4).map(p => ({ ...p, price: p.price })); // Example - make sure to update prices in real data

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  // Find the product, default to first if not found (consider a 404 page later)
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
      image: product.additionalImages[selectedImage] || product.image, // Use selected image
      category: product.category
    }, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
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
            <Link to={`/collections/${product.category.toLowerCase()}`} className="text-muted-foreground hover:text-foreground transition-colors">
              {product.category}
            </Link>
            <span className="mx-2 text-muted-foreground">/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-secondary/30 shadow-md">
              <img 
                src={product.additionalImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover object-center transition-opacity duration-300"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.additionalImages.map((image, index) => (
                <button 
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-gold' : 'border-transparent opacity-70 hover:opacity-100'}`}
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

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && (
                  <Badge className="bg-gold-dark text-white hover:bg-gold-dark">New</Badge>
                )}
                {product.isBestseller && (
                  <Badge className="bg-luxury-burgundy text-white hover:bg-luxury-burgundy">Bestseller</Badge>
                )}
                 <Badge variant="outline">{product.category}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-playfair font-medium mb-2">{product.name}</h1>
               {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-muted-foreground"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
               {/* Price */}
              <p className="text-2xl md:text-3xl font-playfair text-gold-dark mb-4">{formatPrice(product.price)}</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground font-poppins leading-relaxed">{product.description}</p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              <span className={`h-2 w-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}></span>
              <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}</span>
            </div>

             {/* Quantity Selector */}
            <div className="pt-2">
              <p className="text-sm font-medium mb-2">Quantity</p>
              <div className="flex items-center">
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-r-none border-r-0"
                >
                  <Minus size={16} />
                </Button>
                <div className="h-10 w-14 flex items-center justify-center border-y border-input font-medium">
                  {quantity}
                </div>
                <Button 
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="h-10 w-10 rounded-l-none border-l-0"
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-gold hover:bg-gold-dark text-white flex-1"
                size="lg"
                onClick={addToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag size={18} className="mr-2" />
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
              <WishlistButton 
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.additionalImages[selectedImage] || product.image,
                  category: product.category
                }}
                variant="outline"
                size="lg"
                className="flex-1 border-gold text-gold hover:bg-gold-light/10"
              />
            </div>

            {/* Service Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t mt-6">
              <div className="flex items-center gap-3">
                <Truck size={20} className="text-gold-dark flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">Free India Shipping</p>
                  <p className="text-xs text-muted-foreground">On orders over {formatPrice(5000)}</p> {/* Example Threshold */}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw size={20} className="text-gold-dark flex-shrink-0" />
                 <div>
                  <p className="text-sm font-medium">Easy Returns</p>
                  <p className="text-xs text-muted-foreground">30-day return policy</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} className="text-gold-dark flex-shrink-0" />
                 <div>
                  <p className="text-sm font-medium">Authenticity Guaranteed</p>
                  <p className="text-xs text-muted-foreground">BIS Hallmarked Gold</p>
                 </div>
              </div>
              <div className="flex items-center gap-3">
                 <Share2 size={20} className="text-gold-dark flex-shrink-0" />
                 <div>
                  <p className="text-sm font-medium">Share</p>
                  <p className="text-xs text-muted-foreground">Share this beautiful piece</p> {/* TODO: Implement Share */}                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Details, Care, Shipping */}
        <div className="mt-16">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 border-b rounded-none h-auto p-0 bg-transparent gap-4">
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
            <TabsContent value="details" className="pt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                <div>
                  <h3 className="text-lg font-playfair font-medium mb-4">Product Specifications</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Material</span>
                      <span className="font-medium text-foreground">{product.details.material}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-medium text-foreground">{product.details.weight}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-medium text-foreground">{product.details.dimensions}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Stones</span>
                      <span className="font-medium text-foreground">{product.details.stones}</span>
                    </li>
                    <li className="flex justify-between py-2 border-b">
                      <span className="text-muted-foreground">Country of Origin</span>
                      <span className="font-medium text-foreground">{product.details.origin}</span>
                    </li>
                  </ul>
                </div>
                <div className="font-poppins">
                  <h3 className="text-lg font-playfair font-medium mb-4">About this Product</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Each of our pieces is meticulously crafted by master artisans with decades of experience. We use only the finest materials, ensuring each piece meets our rigorous quality standards. This {product.name.toLowerCase()} exemplifies our commitment to excellence and timeless design.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4 text-sm">
                    All Maity Jewels jewelry comes in our signature packaging, making it perfect for gifting or treating yourself to something special.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="care" className="pt-8 font-poppins">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font-playfair font-medium mb-4">Jewelry Care Instructions</h3>
                <p className="text-muted-foreground mb-6 text-sm">
                  To ensure your Maity Jewels piece maintains its beauty for years to come, please follow these care instructions:
                </p>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-semibold">1</div>
                    <p><span className="font-medium text-foreground">Avoid Chemicals:</span> Remove your jewelry when using household cleaners, perfumes, or lotions as these can damage the metal and diminish its luster.</p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-semibold">2</div>
                    <p><span className="font-medium text-foreground">Proper Storage:</span> Store your jewelry in the provided box or a fabric-lined jewelry box to prevent scratches and tangling.</p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-semibold">3</div>
                    <p><span className="font-medium text-foreground">Regular Cleaning:</span> Gently clean with a soft, lint-free cloth to restore shine. For more thorough cleaning, use warm water with mild soap and a soft brush if needed.</p>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark font-semibold">4</div>
                    <p><span className="font-medium text-foreground">Professional Maintenance:</span> Have your gold jewelry professionally checked and cleaned annually, especially pieces with stones.</p>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-6 text-sm">
                  <strong>Specific instructions for this piece:</strong> {product.care}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-8 font-poppins">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-lg font-playfair font-medium mb-4">Shipping Information</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark">
                      <Truck size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Standard Shipping (India)</p>
                      <p className="text-muted-foreground">Free on orders over {formatPrice(5000)}. Delivery within 3-7 business days.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark">
                       <Truck size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Express Shipping (India)</p>
                      <p className="text-muted-foreground">{formatPrice(250)}. Delivery within 1-3 business days.</p> {/* Example Price */}
                    </div>
                  </li>
                   {/* Add International Shipping if applicable */}
                </ul>

                <h3 className="text-lg font-playfair font-medium mt-8 mb-4">Return Policy</h3>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark">
                      <RefreshCw size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">30-Day Returns</p>
                      <p className="text-muted-foreground">We offer a 30-day return policy on all unworn items in their original condition and packaging.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-light/30 flex items-center justify-center text-gold-dark">
                      <RefreshCw size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Easy Process</p>
                      <p className="text-muted-foreground">To initiate a return, please contact our customer service team via email or phone.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Similar Products Section */}
        <div className="mt-24">
          <h2 className="text-2xl md:text-3xl font-playfair font-semibold mb-8 text-center">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Pass updated product data if necessary */}
            {similarProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
