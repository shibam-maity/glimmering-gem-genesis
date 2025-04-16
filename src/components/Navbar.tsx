
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingCart, Menu, Search, User, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border/40 sticky top-0 z-50">
      <div className="container mx-auto py-4 px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-playfair font-bold text-gold-dark">ELEGOLD</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">
              Home
            </Link>
            <Link to="/collections" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">
              Collections
            </Link>
            <Link to="/new-arrivals" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">
              New Arrivals
            </Link>
            <Link to="/about" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">
              About Us
            </Link>
            <Link to="/contact" className="text-foreground hover:text-gold-dark text-sm font-medium font-poppins">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-gold-dark text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                0
              </span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 space-y-3 flex flex-col">
            <Link 
              to="/" 
              className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/collections" 
              className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/new-arrivals" 
              className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-gold-dark text-sm font-medium py-2 border-b border-border/30 font-poppins"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center space-x-4 py-2">
              <Button variant="ghost" size="icon">
                <Search size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <User size={20} />
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
