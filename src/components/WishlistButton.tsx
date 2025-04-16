
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  variant?: "icon" | "default";
  className?: string;
}

const WishlistButton = ({ 
  product, 
  variant = "icon",
  className
}: WishlistButtonProps) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  
  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };
  
  if (variant === "icon") {
    return (
      <Button 
        size="icon"
        variant={inWishlist ? "default" : "ghost"}
        onClick={handleToggleWishlist}
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center",
          inWishlist 
            ? "bg-gold text-white hover:bg-gold-dark" 
            : "bg-white text-foreground hover:bg-white/90",
          className
        )}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart 
          size={16} 
          className={inWishlist ? "fill-current" : ""} 
        />
      </Button>
    );
  }
  
  return (
    <Button 
      variant="outline" 
      className={cn(
        inWishlist 
          ? "bg-gold text-white hover:bg-gold-dark border-gold" 
          : "border-gold text-gold-dark hover:bg-gold-light/10",
        className
      )}
      onClick={handleToggleWishlist}
    >
      <Heart size={18} className={inWishlist ? "fill-current" : ""} />
      {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
    </Button>
  );
};

export default WishlistButton;
