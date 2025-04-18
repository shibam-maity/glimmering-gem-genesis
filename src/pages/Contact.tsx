import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic (e.g., email API, backend endpoint)
    console.log("Contact form submitted:", { name, email, subject, message });
    toast.success("Thank you for your message! We'll get back to you soon.");
    // Clear the form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-6 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-playfair font-semibold mb-4 text-gold-dark">Get In Touch</h1>
          <p className="text-lg text-muted-foreground font-poppins">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Form */}
          <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm border border-border">
            <h2 className="text-2xl font-playfair font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your Name" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your.email@example.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="Inquiry about..." 
                  required 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Your message here..." 
                  rows={5} 
                  required 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-white">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-playfair font-semibold mb-3">Contact Information</h3>
              <p className="text-muted-foreground mb-5 font-poppins">
                Reach out to us directly through the channels below.
              </p>
              <div className="space-y-4 font-poppins">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    {/* Updated Email Here */}
                    <a href="mailto:shibammaitymaity@gmail.com" className="text-muted-foreground hover:text-gold break-all">
                      shibammaitymaity@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    {/* Only showing the primary number here, add second if needed */}
                    <a href="tel:8179362596" className="text-muted-foreground hover:text-gold">
                      8179362596
                    </a>
                    {/* Optional: Add second number 
                    <br /> 
                    <a href="tel:8179094596" className="text-muted-foreground hover:text-gold">
                      8179094596
                    </a> 
                    */}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-muted-foreground">
                      {/* TODO: Replace with actual address if available */}
                      123 Jewelry Lane, Sparkle City, SC 12345 
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional: Add Map or Operating Hours */}
            {/* <div>
              <h3 className="text-xl font-playfair font-semibold mb-3">Our Location</h3>
              <div className="aspect-video bg-muted rounded-md"> Map Placeholder </div>
            </div> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
