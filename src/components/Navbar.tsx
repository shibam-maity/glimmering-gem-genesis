
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { Button } from "./ui/button";
import { Input } from "./ui/input"; // Added Input
import { ShoppingCart, Menu, Search, User, X, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils"; // Added cn for utility

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for mobile search toggle
  const [localSearchQuery, setLocalSearchQuery] = useState(""); // Local search state
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();
  const navigate = useNavigate(); // Hook for navigation

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault(); // Prevent default form submission if used
    if (localSearchQuery.trim()) {
      navigate(`/collections?q=${encodeURIComponent(localSearchQuery.trim())}`);
      setLocalSearchQuery(""); // Clear input after navigation
      setIsSearchOpen(false); // Close mobile search if open
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };

  return (
    <header className="bg-background border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto py-4 px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <h1 className="text-2xl font-playfair font-bold text-gold-dark">Maity Jewels</h1>
          </Link>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex items-center justify-center flex-grow gap-6">
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">Home</Link>
              <Link to="/collections" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">Collections</Link>
              <Link to="/new-arrivals" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">New Arrivals</Link>
              <Link to="/about" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">About Us</Link>
              <Link to="/contact" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">Contact</Link>
            </nav>
            {/* Desktop Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative ml-6 w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search Maity Jewels..."
                className="pl-9 text-sm h-9"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
              />
            </form>
          </div>


          {/* Right Icons */}
          <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
             {/* Search Icon (Mobile Toggle) */}
             <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search size={20} />
            </Button>

            {/* User Icon */}
            <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
              <Link to="/login"><User size={20} /></Link>
            </Button>
            {/* Wishlist Icon */}
            <Button variant="ghost" size="icon" className="hidden md:flex relative" asChild>
              <Link to="/wishlist">
                <Heart size={20} />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-dark text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                    {wishlistItemCount}
                  </span>
                )}
                </Link>
            </Button>
            {/* Cart Icon */}
            <Button variant="ghost" size="icon" className="relative" onClick={() => setCartOpen(true)}>
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold-dark text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setIsSearchOpen(false); // Close search if opening menu
                }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

         {/* Mobile Search Input Area */}
         <div className={cn("md:hidden pt-4", isSearchOpen ? "block" : "hidden")}>
            <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                type="search"
                placeholder="Search Maity Jewels..."
                className="pl-9 text-sm h-9 w-full"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                />
            </form>
         </div>


        {/* Mobile Navigation Menu */}
        <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
          <nav className="pt-4 pb-2 space-y-3 flex flex-col">
            <Link to="/" className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/collections" className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>Collections</Link>
            <Link to="/new-arrivals" className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
            <Link to="/about" className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/wishlist" className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins flex items-center" onClick={() => setIsMenuOpen(false)}>
              <Heart size={16} className="mr-2"/> Wishlist {wishlistItemCount > 0 && `(${wishlistItemCount})`}
            </Link>
             {/* Mobile User Link */}
             <Link to="/login" className="text-foreground hover:text-gold-dark text-sm font-medium py-2 font-poppins flex items-center" onClick={() => setIsMenuOpen(false)}>
                <User size={16} className="mr-2" /> Account
             </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
