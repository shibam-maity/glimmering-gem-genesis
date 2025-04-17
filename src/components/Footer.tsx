
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary pt-12 pb-6 border-t border-border/40">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-playfair font-bold text-gold-dark">Maity Jewels</h3>
            <p className="text-muted-foreground text-sm font-poppins">
              Handcrafted luxury gold jewelry that celebrates timeless elegance and modern design.
            </p>
            <div className="flex space-x-3">
              {/* Add actual links later */}
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white hover:bg-gray-100">
                  <Facebook size={16} className="text-gray-700" />
                </Button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white hover:bg-gray-100">
                  <Instagram size={16} className="text-gray-700" />
                </Button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-white hover:bg-gray-100">
                  <Twitter size={16} className="text-gray-700" />
                </Button>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm font-poppins">
              <li><Link to="/collections" className="text-muted-foreground hover:text-gold">Collections</Link></li>
              <li><Link to="/new-arrivals" className="text-muted-foreground hover:text-gold">New Arrivals</Link></li>
              <li><Link to="/collections/rings" className="text-muted-foreground hover:text-gold">Rings</Link></li>
              <li><Link to="/collections/necklaces" className="text-muted-foreground hover:text-gold">Necklaces</Link></li>
              <li><Link to="/collections/earrings" className="text-muted-foreground hover:text-gold">Earrings</Link></li>
              <li><Link to="/collections/bracelets" className="text-muted-foreground hover:text-gold">Bracelets</Link></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Our Company</h4>
            <ul className="space-y-2 text-sm font-poppins">
              <li><Link to="/about" className="text-muted-foreground hover:text-gold">About Us</Link></li>
              {/* Add links if these pages exist */}              
              {/* <li><Link to="/blog" className="text-muted-foreground hover:text-gold">Our Story</Link></li> */}
              {/* <li><Link to="/careers" className="text-muted-foreground hover:text-gold">Careers</Link></li> */}
              <li><Link to="/contact" className="text-muted-foreground hover:text-gold">Contact Us</Link></li>
            </ul>
          </div>

          {/* Customer Care & Contact */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm font-poppins">
              {/* Add links if these pages exist */}              
              {/* <li><Link to="/shipping" className="text-muted-foreground hover:text-gold">Shipping & Returns</Link></li> */}
              <li><Link to="/faq" className="text-muted-foreground hover:text-gold">FAQ</Link></li>
              {/* <li><Link to="/care" className="text-muted-foreground hover:text-gold">Jewelry Care</Link></li> */}
              {/* <li><Link to="/size-guide" className="text-muted-foreground hover:text-gold">Size Guide</Link></li> */}
            </ul>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm font-poppins text-muted-foreground">
                <Mail size={16} className="mr-2 flex-shrink-0" />
                 {/* Updated Email */}
                <a href="mailto:shibammaitymaity@gmail.com" className="hover:text-gold break-all">
                  shibammaitymaity@gmail.com
                </a>
              </div>
              <div className="flex items-center text-sm font-poppins text-muted-foreground">
                <Phone size={16} className="mr-2 flex-shrink-0" />
                {/* Updated Phone Numbers */}
                 <div>
                   <a href="tel:8179362596" className="hover:text-gold">8179362596</a>,
                   <a href="tel:8179094596" className="hover:text-gold ml-1">8179094596</a>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        {/* TODO: Add newsletter signup functionality */}
        <div className="border-t border-border/20 py-6 my-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="font-playfair text-lg font-semibold">Subscribe to Our Newsletter</h4>
              <p className="text-sm text-muted-foreground font-poppins">Stay updated with our latest collections and special offers.</p>
            </div>
            <form className="flex w-full md:w-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="border-r-0 rounded-r-none focus:ring-1 focus:ring-gold flex-grow md:w-64"
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="rounded-l-none bg-gold-dark hover:bg-gold text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright & Policy Links */}
        <div className="border-t border-border/20 pt-6 text-center">
          <p className="text-xs text-muted-foreground font-poppins">
            &copy; {new Date().getFullYear()} Maity Jewels. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground font-poppins">
             {/* Add links if these pages exist */} 
            {/* <Link to="/privacy" className="hover:text-gold">Privacy Policy</Link> */}
            {/* <Link to="/terms" className="hover:text-gold">Terms of Service</Link> */}
            {/* <Link to="/cookies" className="hover:text-gold">Cookie Policy</Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
