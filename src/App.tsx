
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Collections from "./pages/Collections";
import NewArrivals from "./pages/NewArrivals";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./components/ShoppingCart";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Wishlist from "./pages/Wishlist";
import LoginPage from "./pages/LoginPage"; // Added import
import SignupPage from "./pages/SignupPage"; // Added import

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <WishlistProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:category" element={<Collections />} />
              <Route path="/new-arrivals" element={<NewArrivals />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              
              {/* Auth routes */}
              <Route path="/login" element={<LoginPage />} /> {/* Added route */}
              <Route path="/signup" element={<SignupPage />} /> {/* Added route */}
              
              {/* Placeholder routes for footer links */}
              <Route path="/bestsellers" element={<ComingSoon pageName="Bestsellers" />} />
              <Route path="/sale" element={<ComingSoon pageName="Special Offers" />} />
              <Route path="/blog" element={<ComingSoon pageName="Our Story" />} />
              <Route path="/careers" element={<ComingSoon pageName="Careers" />} />
              <Route path="/shipping" element={<ComingSoon pageName="Shipping & Returns" />} />
              <Route path="/faq" element={<ComingSoon pageName="FAQ" />} />
              <Route path="/care" element={<ComingSoon pageName="Jewelry Care" />} />
              <Route path="/size-guide" element={<ComingSoon pageName="Size Guide" />} />
              <Route path="/privacy" element={<ComingSoon pageName="Privacy Policy" />} />
              <Route path="/terms" element={<ComingSoon pageName="Terms of Service" />} />
              <Route path="/cookies" element={<ComingSoon pageName="Cookie Policy" />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ShoppingCart />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
