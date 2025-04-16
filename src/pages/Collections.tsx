import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductFilterSidebar from "@/components/ProductFilterSidebar";
import MobileFilterDrawer from "@/components/MobileFilterDrawer";
import ProductSorter from "@/components/ProductSorter";
import ProductFilters from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample product data - keeping this the same
const products = [
  {
    id: "prod-1",
    name: "Diamond Studded Gold Bangle",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
    isNew: true,
  },
  {
    id: "prod-2",
    name: "Twisted Gold Hoop Earrings",
    price: 799.99,
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=600",
    category: "Earrings",
    isBestseller: true,
  },
  {
    id: "prod-3",
    name: "Delicate Gold Chain Necklace",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
  },
  {
    id: "prod-4",
    name: "Classic Gold Wedding Band",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
    isBestseller: true,
  },
  {
    id: "prod-5",
    name: "Gemstone Pendant Gold Necklace",
    price: 1899.99,
    image: "https://images.unsplash.com/photo-1589207212797-cfd578c00985?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
    isNew: true,
  },
  {
    id: "prod-6",
    name: "Gold Statement Choker",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
  },
  {
    id: "prod-7",
    name: "Interwoven Gold Ring",
    price: 999.99,
    image: "https://images.unsplash.com/photo-1603561604478-f8a4b426ede7?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
  },
  {
    id: "prod-8",
    name: "Charm Gold Bracelet",
    price: 1099.99,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
  },
  {
    id: "prod-9",
    name: "Minimalist Gold Studs",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1630019852942-f87fa946dc68?auto=format&fit=crop&q=80&w=600",
    category: "Earrings",
  },
  {
    id: "prod-10",
    name: "Gold Layered Necklace",
    price: 1199.99,
    image: "https://images.unsplash.com/photo-1611107419458-58073d16c399?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
  },
  {
    id: "prod-11",
    name: "Twisted Gold Bangle",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
  },
  {
    id: "prod-12",
    name: "Diamond Accent Gold Ring",
    price: 1699.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
    isNew: true,
  },
];

// Filter options
const materialOptions = ["14k Gold", "18k Gold", "24k Gold", "Gold Vermeil", "Gold Plated"];
const stoneOptions = ["Diamond", "Ruby", "Sapphire", "Emerald", "None"];
const categories = ["All", "Necklaces", "Earrings", "Rings", "Bracelets"];

const Collections = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for filters and search
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [stones, setStones] = useState<string[]>([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  
  // Set initial category from URL param if present
  useEffect(() => {
    if (category) {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      if (categories.includes(formattedCategory)) {
        setActiveCategory(formattedCategory);
      }
    }
  }, [category]);
  
  // Update URL when filters change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Add params only if they're not default values
    if (sortOption !== "featured") searchParams.set("sort", sortOption);
    else searchParams.delete("sort");
    
    if (searchQuery) searchParams.set("q", searchQuery);
    else searchParams.delete("q");
    
    if (priceRange[0] > 0 || priceRange[1] < 2000) {
      searchParams.set("price", `${priceRange[0]},${priceRange[1]}`);
    } else {
      searchParams.delete("price");
    }
    
    if (materials.length > 0) searchParams.set("materials", materials.join(","));
    else searchParams.delete("materials");
    
    if (stones.length > 0) searchParams.set("stones", stones.join(","));
    else searchParams.delete("stones");
    
    // Get path without search params
    const path = location.pathname;
    const newUrl = materials.length || stones.length || searchQuery || 
                  sortOption !== "featured" || priceRange[0] > 0 || priceRange[1] < 2000 
                  ? `${path}?${searchParams}` : path;
    
    // Replace history state without causing page refresh
    navigate(newUrl, { replace: true });
  }, [activeCategory, searchQuery, priceRange, materials, stones, sortOption, location.pathname, navigate]);
  
  // Get params from URL when page loads
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    if (searchParams.has("sort")) {
      setSortOption(searchParams.get("sort") || "featured");
    }
    
    if (searchParams.has("q")) {
      setSearchQuery(searchParams.get("q") || "");
    }
    
    if (searchParams.has("price")) {
      const priceParam = searchParams.get("price") || "0,2000";
      const [min, max] = priceParam.split(",").map(Number);
      setPriceRange([min, max]);
    }
    
    if (searchParams.has("materials")) {
      const materialsParam = searchParams.get("materials") || "";
      setMaterials(materialsParam.split(","));
    }
    
    if (searchParams.has("stones")) {
      const stonesParam = searchParams.get("stones") || "";
      setStones(stonesParam.split(","));
    }
  }, [location.search]);
  
  // Filter products based on all criteria
  const filteredProducts = products
    .filter(product => activeCategory === "All" || product.category === activeCategory)
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  
  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      default: // "featured"
        return 0;
    }
  });

  const resetFilters = () => {
    setActiveCategory(category ? (category.charAt(0).toUpperCase() + category.slice(1)) : "All");
    setSearchQuery("");
    setPriceRange([0, 2000]);
    setMaterials([]);
    setStones([]);
    setSortOption("featured");
    navigate(location.pathname);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === "All") {
      // Remove category from URL path
      const pathParts = location.pathname.split('/');
      if (pathParts.length > 2) {
        navigate('/collections');
      }
    } else {
      // Add category to URL path
      navigate(`/collections/${category.toLowerCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <div className="bg-secondary/50 py-16">
          <div className="container px-6 mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-playfair font-semibold mb-4">
              {activeCategory === "All" ? "Our Collections" : activeCategory}
            </h1>
            <p className="text-muted-foreground font-poppins max-w-2xl mx-auto">
              Explore our carefully curated gold jewelry pieces, handcrafted with precision and designed for elegance
            </p>
          </div>
        </div>
        
        {/* Filter & Product Section */}
        <div className="container px-6 py-12 mx-auto">
          {/* Search and Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="w-full md:w-1/3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto">
              <ProductSorter 
                value={sortOption} 
                onChange={(value) => setSortOption(value)} 
              />
              
              <Button 
                variant="outline" 
                className="md:hidden"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <ProductFilterSidebar 
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              materials={materials}
              onMaterialsChange={setMaterials}
              materialOptions={materialOptions}
              stones={stones}
              onStonesChange={setStones}
              stoneOptions={stoneOptions}
              onReset={resetFilters}
            />
            
            {/* Filters - Mobile */}
            <MobileFilterDrawer
              open={filterOpen}
              onOpenChange={setFilterOpen}
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={(category) => {
                handleCategoryChange(category);
                setFilterOpen(false);
              }}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              materials={materials}
              onMaterialsChange={setMaterials}
              materialOptions={materialOptions}
              stones={stones}
              onStonesChange={setStones}
              stoneOptions={stoneOptions}
              onReset={resetFilters}
            />
            
            {/* Products */}
            <div className="flex-1">
              {/* Active Filters */}
              <ProductFilters
                activeCategory={activeCategory}
                onClearCategory={() => handleCategoryChange("All")}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
                priceRange={priceRange}
                onClearPriceRange={() => setPriceRange([0, 2000])}
                materials={materials}
                onRemoveMaterial={(material) => 
                  setMaterials(materials.filter(m => m !== material))
                }
                stones={stones}
                onRemoveStone={(stone) => 
                  setStones(stones.filter(s => s !== stone))
                }
                onResetAll={resetFilters}
              />
              
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                </p>
              </div>
              
              {/* Product Grid */}
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
                  <Button onClick={resetFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Collections;
