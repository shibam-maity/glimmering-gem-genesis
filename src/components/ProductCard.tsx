
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useState } from "react";
import WishlistButton from "./WishlistButton";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
  isBestseller = false
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  
  // Fallback image in case the original one fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600";
  
  const handleImageError = () => {
    console.log(`Image failed to load: ${image}`);
    setImageError(true);
  };

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      image: imageError ? fallbackImage : image,
      category
    });
  };

  return (
    <div className="group relative">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-md bg-secondary/50 mb-3">
        <img
          src={imageError ? fallbackImage : image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          onError={handleImageError}
        />
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10"></div>
        
        {/* Quick Actions */}
        <div className="absolute bottom-4 left-0 w-full px-4 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex justify-between">
            <Button 
              size="sm" 
              className="bg-white text-foreground hover:bg-white/90"
              asChild
            >
              <Link to={`/product/${id}`}>Quick View</Link>
            </Button>
            <WishlistButton
              product={{ id, name, price, image: imageError ? fallbackImage : image, category }}
            />
          </div>
        </div>

        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-gold-dark text-white text-xs font-medium px-2 py-1 rounded">
              New
            </span>
          )}
          {isBestseller && (
            <span className="bg-luxury-burgundy text-white text-xs font-medium px-2 py-1 rounded">
              Bestseller
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <Link to={`/product/${id}`}>
        <h3 className="text-sm font-medium font-poppins text-foreground group-hover:text-gold-dark truncate">
          {name}
        </h3>
      </Link>
      <p className="text-xs text-muted-foreground font-poppins mb-1.5">{category}</p>
      <p className="font-medium font-poppins text-gold-dark">${price.toFixed(2)}</p>
      
      {/* Add to cart button */}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleAddToCart}
        className="mt-2 w-full border border-gold text-gold-dark hover:bg-gold hover:text-white"
      >
        <ShoppingBag size={14} />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
