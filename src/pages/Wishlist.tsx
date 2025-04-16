
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag, Trash2, Heart, ArrowLeft } from "lucide-react";

const Wishlist = () => {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem(item);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-grow container px-4 py-10 mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-playfair">My Wishlist</h1>
          {items.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearWishlist}
              className="text-muted-foreground"
            >
              <Trash2 size={16} className="mr-1" />
              Clear All
            </Button>
          )}
        </div>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Heart size={48} className="text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Add items to your wishlist to keep track of your favorite pieces
            </p>
            <Button asChild>
              <Link to="/collections">Browse Collections</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map(item => (
              <div key={item.id} className="border rounded-md p-4 group relative">
                <Link to={`/product/${item.id}`} className="block aspect-square overflow-hidden rounded-md bg-secondary/50 mb-3">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-sm font-medium truncate mb-1">{item.name}</h3>
                </Link>
                <p className="text-xs text-muted-foreground mb-1">{item.category}</p>
                <p className="font-medium text-gold-dark mb-3">${item.price.toFixed(2)}</p>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    className="flex-1 bg-gold hover:bg-gold-dark text-white"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingBag size={14} className="mr-1" />
                    Add to Cart
                  </Button>
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => removeItem(item.id)}
                    className="border-rose-500 text-rose-500 hover:bg-rose-50"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Button
          variant="ghost"
          className="mt-12"
          asChild
        >
          <Link to="/collections">
            <ArrowLeft size={16} className="mr-2" />
            Continue Shopping
          </Link>
        </Button>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
