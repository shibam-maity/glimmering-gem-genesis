import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./AuthContext"; // Import the actual useAuth hook

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
};

type CartContextType = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]); // Initialize empty, load in useEffect
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth(); // Use actual auth state

  // Load cart from localStorage on mount
  // We don't strictly need to check auth here, as adding items is guarded
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
        try {
            setItems(JSON.parse(savedCart));
        } catch (error) {
            console.error("Failed to parse cart from localStorage:", error);
            localStorage.removeItem("cartItems"); // Clear corrupted cart data
        }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);

  // Clear cart on logout
  useEffect(() => {
      if (!isAuthLoading && !isAuthenticated) {
          // If auth is loaded and user is not authenticated, clear the cart
          // Prevents showing cart items from a previous session after logout
          if (items.length > 0) {
             console.log("User logged out, clearing cart.");
             setItems([]);
          }
      }
  }, [isAuthenticated, isAuthLoading, items.length]); // Depend on auth state and items length


  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    // Use the real isAuthenticated value from useAuth
    if (!isAuthenticated) {
      toast.error("Please login or sign up to add items to your cart.");
      setIsOpen(false); 
      navigate("/login"); 
      return; 
    }

    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        const newQuantity = updatedItems[existingItemIndex].quantity + quantity;
        // TODO: Check against stock level here if available
        updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], quantity: newQuantity };
        toast.success(`${item.name} quantity updated in cart`);
        return updatedItems;
      } else {
        toast.success(`${item.name} added to cart`);
        return [...prevItems, { ...item, quantity }];
      }
    });
    setIsOpen(true); 
  };

  const removeItem = (id: string) => {
    setItems(prevItems => {
        const itemToRemove = prevItems.find(item => item.id === id);
        if (itemToRemove) {
            toast.info(`Removed ${itemToRemove.name} from cart`);
        }
        return prevItems.filter(item => item.id !== id)
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      // TODO: Check against stock level here if available
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    // We might only want logged-in users to clear the cart, 
    // but clearing an empty/non-existent cart is harmless.
    // If required, add: if (!isAuthenticated) return;
    setItems([]);
    toast.info("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
