
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Sample new arrivals products
const newArrivalsProducts = [
  {
    id: "prod-1",
    name: "Diamond Studded Gold Bangle",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
    isNew: true,
  },
  {
    id: "prod-5",
    name: "Gemstone Pendant Gold Necklace",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1589207212797-cfd578c00985?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
    isNew: true,
  },
  {
    id: "prod-9",
    name: "Minimalist Gold Studs",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1630019852942-f87fa946dc68?auto=format&fit=crop&q=80&w=600",
    category: "Earrings",
    isNew: true,
  },
  {
    id: "prod-12",
    name: "Diamond Accent Gold Ring",
    price: 1699.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
    isNew: true,
  },
  {
    id: "prod-13",
    name: "Gold Pearl Drop Earrings",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
    category: "Earrings",
    isNew: true,
  },
  {
    id: "prod-14",
    name: "Statement Gold Collar Necklace",
    price: 1599.99,
    image: "https://images.unsplash.com/photo-1611107419458-58073d16c399?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
    isNew: true,
  }
];

const NewArrivals = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <div className="bg-secondary/50 py-16">
          <div className="container px-6 mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-playfair font-semibold mb-4">New Arrivals</h1>
            <p className="text-muted-foreground font-poppins max-w-2xl mx-auto">
              Discover our latest gold jewelry pieces, each crafted with precision and designed to make a statement
            </p>
          </div>
        </div>
        
        {/* Products Section */}
        <div className="container px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivalsProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-lg font-playfair mb-2">Stay Updated</p>
            <p className="text-muted-foreground font-poppins mb-4 max-w-xl mx-auto">
              Join our newsletter to be the first to know about our newest creations and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button className="bg-gold hover:bg-gold-dark text-white h-10 px-4 py-2 rounded-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewArrivals;
