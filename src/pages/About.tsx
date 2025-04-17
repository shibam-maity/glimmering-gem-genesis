
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming Avatar component exists

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-4 text-gold-dark">About Maity Jewels</h1>
          <p className="text-lg text-muted-foreground font-poppins">
            Where timeless elegance meets modern craftsmanship.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 mb-12 md:mb-16">
          {/* Placeholder for Founder/Inspiration Image */}
          <div className="text-center flex-shrink-0">
             <Avatar className="w-32 h-32 md:w-40 md:h-40 mx-auto border-4 border-gold-light shadow-lg">
              {/* TODO: Replace with actual image URL if available */}
              <AvatarImage src="/public/image.png" alt="Founder/Inspiration" /> 
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
            {/* Optional: Add caption here if needed */}
          </div>
          
          <div className="text-foreground font-poppins space-y-4 text-center md:text-left">
            <p>
              Welcome to <strong>Maity Jewels</strong>, where timeless elegance meets modern craftsmanship.
            </p>
            <p>
              Founded by <strong>Shibam Maity</strong>, with inspiration drawn from the values and vision of his father <strong>Manik Maity</strong>, our brand is more than just jewelry — it’s a celebration of heritage, beauty, and individuality.
            </p>
            <p>
              Each piece in our collection is thoughtfully designed to tell a story — blending traditional artistry with contemporary flair. Whether it's the shimmer of a delicate pendant or the bold brilliance of a handcrafted ring, every jewel reflects passion, precision, and perfection.
            </p>
            <p>
              At <strong>Maity Jewels</strong>, we believe jewelry is not just an accessory — it’s a memory, a moment, a personal statement. We are committed to using premium materials, ethical sourcing, and sustainable practices to ensure every customer shines with confidence and pride.
            </p>
            <p className="font-semibold text-gold-dark text-lg">
              Join us in celebrating elegance that lasts a lifetime.
            </p>
          </div>
        </div>

        {/* Optional: Add more sections like Our Values, Craftsmanship, etc. */}
        
      </main>
      <Footer />
    </div>
  );
};

export default About;
