
import { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

// Sample product data
const products = [
  {
    id: "prod-1",
    name: "Diamond Studded Gold Bangle",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
    isNew: true,
  },
  {
    id: "prod-2",
    name: "Twisted Gold Hoop Earrings",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=600",
    category: "Earrings",
    isBestseller: true,
  },
  {
    id: "prod-3",
    name: "Delicate Gold Chain Necklace",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
  },
  {
    id: "prod-4",
    name: "Classic Gold Wedding Band",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
    isBestseller: true,
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
    id: "prod-6",
    name: "Gold Statement Choker",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
  },
  {
    id: "prod-7",
    name: "Interwoven Gold Ring",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1603561604478-f8a4b426ede7?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
  },
  {
    id: "prod-8",
    name: "Charm Gold Bracelet",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
  },
];

// Categories for filtering
const categories = ["All", "Necklaces", "Earrings", "Rings", "Bracelets"];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All"
    ? products
    : products.filter(product => product.category === activeCategory);

  return (
    <section className="py-16 bg-secondary/50">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-3">Featured Products</h2>
          <p className="text-muted-foreground font-poppins max-w-xl mx-auto">
            Discover our most popular and exquisite handcrafted gold pieces
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={cn(
                  "rounded-full px-5 font-poppins",
                  activeCategory === category 
                    ? "bg-gold text-white hover:bg-gold-dark" 
                    : "hover:bg-muted"
                )}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-gold text-gold-dark hover:bg-gold-light/10"
            size="lg"
            asChild
          >
            <a href="/collections">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
