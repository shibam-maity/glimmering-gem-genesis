
import { Button } from "./ui/button";

const Newsletter = () => {
  return (
    <section className="py-16 bg-luxury-cream">
      <div className="container px-6 mx-auto">
        <div className="relative overflow-hidden rounded-xl bg-gold-dark p-8 md:p-12">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0"
            >
              <defs>
                <pattern
                  id="pattern"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                  patternTransform="rotate(45)"
                >
                  <rect width="6" height="6" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>

          <div className="relative z-10 md:w-3/4 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-4 text-white">
              Join Our Exclusive Community
            </h2>
            
            <p className="text-white/80 font-poppins mb-8 max-w-xl mx-auto">
              Subscribe to receive exclusive offers, early access to new collections, and jewelry care tips directly to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-white/50 font-poppins"
              />
              <Button className="bg-white text-gold-dark hover:bg-white/90 font-medium">
                Subscribe
              </Button>
            </div>
            
            <p className="text-white/60 text-xs mt-4 font-poppins">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
