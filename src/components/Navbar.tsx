
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { 
    ShoppingCart, Menu, Search, User, X, Heart, LogOut, Loader2 
} from "lucide-react"; // Added LogOut, Loader2
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { supabase } from "@/lib/supabaseClient"; // Import supabase for logout
import { toast } from "sonner"; // Import toast for logout message
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import Dropdown components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { itemCount, setIsOpen: setCartOpen } = useCart();
  const { itemCount: wishlistItemCount } = useWishlist();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth(); // Get user and auth state

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/collections?q=${encodeURIComponent(localSearchQuery.trim())}`);
      setLocalSearchQuery("");
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    setIsLoggingOut(false);
    if (error) {
      console.error("Error logging out:", error);
      toast.error(error.message || "Logout failed");
    } else {
      toast.success("Logged out successfully");
      // Optionally navigate to home or login page after logout
      navigate('/'); 
      setIsMenuOpen(false); // Close mobile menu if open
    }
  };

  // Get user initials for Avatar fallback
  const getUserInitials = (name?: string | null): string => {
    if (!name) return "";
    const nameParts = name.split(' ');
    if (nameParts.length === 1) return nameParts[0][0]?.toUpperCase() || "";
    return (nameParts[0][0]?.toUpperCase() || "") + (nameParts[nameParts.length - 1][0]?.toUpperCase() || "");
  };

  const userName = user?.user_metadata?.full_name || user?.email;
  const userInitials = getUserInitials(userName);

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
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={20} />
            </Button>

            {/* User/Login/Loading Icon */}
            {isAuthLoading ? (
              <Button variant="ghost" size="icon" className="hidden md:flex" disabled>
                <Loader2 className="h-5 w-5 animate-spin" />
              </Button>
            ) : isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hidden md:flex rounded-full">
                     <Avatar className="h-7 w-7">
                      {/* Add AvatarImage src={user?.user_metadata?.avatar_url} if available */}
                      <AvatarFallback className="text-xs bg-gold-light text-gold-dark font-semibold">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel className="font-normal">
                     <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                           {userName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                           {user?.email}
                        </p>
                     </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link to="/account"> {/* TODO: Create Account page */} 
                         Account
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders"> {/* TODO: Create Orders page */} 
                       Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} disabled={isLoggingOut} className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
                    {isLoggingOut ? (
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                         <LogOut className="mr-2 h-4 w-4" />
                    )}
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
                <Link to="/login"><User size={20} /></Link>
              </Button>
            )}

            {/* Wishlist Icon - Conditionally render based on auth? */} 
            {isAuthenticated && (
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
            )}
            
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
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => { setIsMenuOpen(!isMenuOpen); setIsSearchOpen(false); }}>
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
          <nav className="pt-4 pb-2 space-y-1 flex flex-col">
            <Link to="/" className="text-foreground hover:text-gold-dark text-sm font-medium py-2.5 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/collections" className="text-foreground hover:text-gold-dark text-sm font-medium py-2.5 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>Collections</Link>
            <Link to="/new-arrivals" className="text-foreground hover:text-gold-dark text-sm font-medium py-2.5 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
            <Link to="/about" className="text-foreground hover:text-gold-dark text-sm font-medium py-2.5 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="text-foreground hover:text-gold-dark text-sm font-medium py-2.5 border-b border-border/30 font-poppins" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            
            {/* Mobile Auth Links */}
            {isAuthLoading ? (
              <div className="flex items-center py-2.5 border-b border-border/30 text-muted-foreground">
                  <Loader2 size={16} className="mr-2 animate-spin" /> Loading...
              </div>
            ) : isAuthenticated ? (
              <>
                <Link to="/wishlist" className="text-foreground hover:text-gold-dark text-sm font-medium py-2.5 border-b border-border/30 font-poppins flex items-center" onClick={() => setIsMenuOpen(false)}>
                  <Heart size={16} className="mr-2"/> Wishlist {wishlistItemCount > 0 && `(${wishlistItemCount})`}
                </Link>
                <Link to="/account" className="text-foreground hover:text-gold-dark text-sm font-medium py-2.5 border-b border-border/30 font-poppins flex items-center" onClick={() => setIsMenuOpen(false)}>
                    <User size={16} className="mr-2" /> Account
                </Link>
                <button 
                    onClick={handleLogout} 
                    disabled={isLoggingOut}
                    className="text-red-600 hover:text-red-700 text-sm font-medium py-2.5 font-poppins flex items-center w-full disabled:opacity-50"
                >
                    {isLoggingOut ? <Loader2 size={16} className="mr-2 animate-spin" /> : <LogOut size={16} className="mr-2" />} 
                    Log Out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-foreground hover:text-gold-dark text-sm font-medium py-2.5 border-b border-border/30 font-poppins flex items-center" onClick={() => setIsMenuOpen(false)}>
                <User size={16} className="mr-2" /> Login / Sign Up
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
