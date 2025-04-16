
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const StorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1589207212797-cfd578c00985?auto=format&fit=crop&q=80&w=800"
                alt="Jewelry craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden md:block lg:w-64 lg:h-64 w-48 h-48 bg-gold-light/20 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 hidden md:block lg:w-32 lg:h-32 w-24 h-24 bg-gold-light/15 rounded-full -z-10"></div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center max-w-lg mx-auto lg:mx-0">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-4">Crafted with Passion & Precision</h2>
            
            <p className="text-muted-foreground font-poppins mb-4">
              At ELEGOLD, we believe that jewelry is more than an accessory—it's an expression of individual style and a marker of life's precious moments.
            </p>
            
            <p className="text-muted-foreground font-poppins mb-6">
              Each piece in our collection is meticulously handcrafted by our skilled artisans, who combine traditional techniques with contemporary design sensibilities. Using only the finest 18-24k gold and ethically sourced gemstones, we create heirloom-quality pieces that stand the test of time.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="border-l-2 border-gold pl-4">
                <h4 className="font-playfair font-medium text-lg">Premium Materials</h4>
                <p className="text-sm text-muted-foreground font-poppins">Only finest 18-24k gold and ethically sourced gemstones</p>
              </div>
              <div className="border-l-2 border-gold pl-4">
                <h4 className="font-playfair font-medium text-lg">Expert Craftsmanship</h4>
                <p className="text-sm text-muted-foreground font-poppins">Meticulously handcrafted by skilled artisans</p>
              </div>
            </div>

            <Button 
              className="w-fit bg-gold hover:bg-gold-dark"
              asChild
            >
              <Link to="/about">
                Discover Our Story
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
