
import { useRef } from "react";
import { Link } from "react-router-dom";
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { useOnClickOutside } from "@/hooks/use-click-outside";

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const ShoppingCart = () => {
  const { items, itemCount, total, removeItem, updateQuantity, clearCart, isOpen, setIsOpen } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(cartRef, () => setIsOpen(false));

  const handleCheckout = () => {
    toast.info("Checkout functionality coming soon!");
    // In a real app, this would navigate to a checkout page
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        ref={cartRef}
        className="absolute right-0 top-0 h-full w-full sm:w-96 bg-background shadow-xl flex flex-col transform transition-transform duration-300"
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-lg font-medium">Your Cart ({itemCount})</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Content */}
        <div className="flex-grow overflow-auto px-4 py-2">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">Your cart is empty</p>
              <p className="text-muted-foreground mb-6">Add some beautiful pieces to your cart</p>
              <Button
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link to="/collections">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y">
              {items.map(item => (
                <li key={item.id} className="py-4 flex gap-3">
                  {/* Product Image */}
                  <div className="h-20 w-20 rounded-md overflow-hidden bg-secondary/30 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.id}`}
                      className="text-sm font-medium hover:text-gold-dark line-clamp-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    {/* Updated Item Price */}
                    <p className="text-sm font-medium text-gold-dark mt-1">{formatPrice(item.price)}</p>

                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-r-none"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="h-7 w-10 flex items-center justify-center border-y border-input text-xs">
                        {item.quantity}
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-l-none"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 ml-2"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cart Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex items-center justify-between font-medium">
              <span>Subtotal</span>
              {/* Updated Total Price */}
              <span>{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping and taxes calculated at checkout
            </p>
            <Button
              className="w-full bg-gold hover:bg-gold-dark text-white"
              onClick={handleCheckout}
            >
              Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Continue Shopping
            </Button>
            <Button
              variant="ghost"
              className="w-full text-sm text-muted-foreground"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
