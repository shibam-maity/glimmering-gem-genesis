
import { Star } from "lucide-react";

interface TestimonialProps {
  name: string;
  location: string;
  quote: string;
  rating: number;
  image?: string;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    quote: "The craftsmanship of my gold necklace is exceptional. The attention to detail and the quality exceeded my expectations. A timeless piece I'll cherish forever.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    quote: "I purchased a pair of earrings for my wife's anniversary. The elegant packaging and the stunning design made it a perfect gift. She absolutely loves them!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
  },
  {
    name: "Priya Patel",
    location: "London, UK",
    quote: "The gold bracelet I ordered is simply beautiful. The online pictures don't do justice to how it shines in person. Customer service was excellent too.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
  },
];

const TestimonialCard = ({ name, location, quote, rating, image }: TestimonialProps) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm border border-border/30 flex flex-col h-full">
      {/* Stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < rating ? "fill-gold text-gold" : "text-muted"}
          />
        ))}
      </div>
      
      {/* Quote */}
      <p className="font-poppins text-muted-foreground mb-6 flex-grow">"{quote}"</p>
      
      {/* Customer */}
      <div className="flex items-center">
        {image && (
          <div className="mr-4">
            <img
              src={image}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
        )}
        <div>
          <h4 className="font-playfair font-medium text-foreground">{name}</h4>
          <p className="text-sm text-muted-foreground font-poppins">{location}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-3">What Our Customers Say</h2>
          <p className="text-muted-foreground font-poppins max-w-xl mx-auto">
            Read testimonials from our valued clients about their experiences with our jewelry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
