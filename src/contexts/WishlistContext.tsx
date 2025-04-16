
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  
  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error);
      }
    }
  }, []);
  
  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items));
  }, [items]);
  
  const addItem = (item: WishlistItem) => {
    setItems(prevItems => {
      // Check if item already exists in wishlist
      if (prevItems.some(i => i.id === item.id)) {
        toast.info(`${item.name} is already in your wishlist`);
        return prevItems;
      } else {
        toast.success(`Added ${item.name} to your wishlist`);
        return [...prevItems, item];
      }
    });
  };
  
  const removeItem = (id: string) => {
    setItems(prevItems => {
      const item = prevItems.find(i => i.id === id);
      if (item) {
        toast.success(`Removed ${item.name} from your wishlist`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };
  
  const isInWishlist = (id: string) => {
    return items.some(item => item.id === id);
  };
  
  const clearWishlist = () => {
    setItems([]);
    toast.success("Wishlist cleared");
  };
  
  return (
    <WishlistContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
