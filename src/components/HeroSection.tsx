
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-luxury-cream overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          // Replaced image URL
          src="https://images.unsplash.com/photo-1611652022419-a741c5e36642?auto=format&fit=crop&w=1920&q=80"
          alt="Woman wearing gold jewelry"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/10"></div> {/* Adjusted overlay for better text contrast */}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-6 py-24 md:py-32 lg:py-40">
        <div className="max-w-xl">
          <span className="inline-block font-poppins text-white/80 text-sm tracking-wider uppercase mb-2 animate-fade-in-up animation-delay-100">
            Timeless Elegance
          </span>
          {/* Added animation classes */}
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4 animate-fade-in-up animation-delay-300">
            Exquisite Gold Jewelry Collection
          </h1>
          {/* Added animation classes */}
          <p className="font-poppins text-white/90 text-base md:text-lg mb-8 max-w-md animate-fade-in-up animation-delay-500">
            Discover our handcrafted pieces that blend traditional craftsmanship with contemporary design.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-700">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-dark text-black"
              asChild
            >
              <Link to="/collections">
                Explore Collection
                <ChevronRight size={16} />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-black hover:bg-white/10"
              asChild
            >
              <Link to="/new-arrivals">
                New Arrivals
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
