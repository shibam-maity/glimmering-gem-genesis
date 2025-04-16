
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample product data
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

// Categories for filtering
const categories = ["All", "Necklaces", "Earrings", "Rings", "Bracelets"];

// Filter options
const materialOptions = ["14k Gold", "18k Gold", "24k Gold", "Gold Vermeil", "Gold Plated"];
const stoneOptions = ["Diamond", "Ruby", "Sapphire", "Emerald", "None"];

const Collections = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  
  // Filter products based on category, search query, and price range
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
    setActiveCategory("All");
    setSearchQuery("");
    setPriceRange([0, 2000]);
    setSortOption("featured");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Banner */}
        <div className="bg-secondary/50 py-16">
          <div className="container px-6 mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-playfair font-semibold mb-4">Our Collections</h1>
            <p className="text-muted-foreground font-poppins max-w-2xl mx-auto">
              Explore our carefully curated gold jewelry pieces, handcrafted with precision and designed for elegance
            </p>
          </div>
        </div>
        
        {/* Filter & Product Section */}
        <div className="container px-6 py-12 mx-auto">
          {/* Search and Filter Bar */}
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
              <div className="w-full md:w-auto flex items-center gap-2">
                <Label htmlFor="sort" className="text-sm whitespace-nowrap">Sort by:</Label>
                <select 
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                </select>
              </div>
              
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
            <div className="hidden md:block w-64 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-1.5">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start px-2",
                        activeCategory === category 
                          ? "bg-gold-light/10 text-gold-dark font-medium hover:bg-gold-light/20" 
                          : "hover:bg-muted"
                      )}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider 
                    defaultValue={[0, 2000]} 
                    max={2000} 
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-6"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">${priceRange[0]}</span>
                    <span className="text-sm">${priceRange[1]}+</span>
                  </div>
                </div>
              </div>
              
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between font-medium mb-3">
                  Material
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2">
                  {materialOptions.map((material) => (
                    <div key={material} className="flex items-center gap-2">
                      <Checkbox id={`material-${material}`} />
                      <Label htmlFor={`material-${material}`} className="text-sm">
                        {material}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex w-full items-center justify-between font-medium mb-3">
                  Stones
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2">
                  {stoneOptions.map((stone) => (
                    <div key={stone} className="flex items-center gap-2">
                      <Checkbox id={`stone-${stone}`} />
                      <Label htmlFor={`stone-${stone}`} className="text-sm">
                        {stone}
                      </Label>
                    </div>
                  ))}
                </CollapsibleContent>
              </Collapsible>
              
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="w-full mt-6"
              >
                Reset Filters
              </Button>
            </div>
            
            {/* Filters - Mobile */}
            {filterOpen && (
              <div className="md:hidden fixed inset-0 bg-background z-50 overflow-auto p-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-medium">Filters</h2>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setFilterOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Categories</h3>
                    <div className="space-y-1.5">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant="ghost"
                          className={cn(
                            "w-full justify-start px-2",
                            activeCategory === category 
                              ? "bg-gold-light/10 text-gold-dark font-medium hover:bg-gold-light/20" 
                              : "hover:bg-muted"
                          )}
                          onClick={() => {
                            setActiveCategory(category);
                            setFilterOpen(false);
                          }}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <div className="px-2">
                      <Slider 
                        defaultValue={[0, 2000]} 
                        max={2000} 
                        step={50}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="my-6"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">${priceRange[0]}</span>
                        <span className="text-sm">${priceRange[1]}+</span>
                      </div>
                    </div>
                  </div>
                  
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex w-full items-center justify-between font-medium mb-3">
                      Material
                      {true ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                      {materialOptions.map((material) => (
                        <div key={material} className="flex items-center gap-2">
                          <Checkbox id={`material-mobile-${material}`} />
                          <Label htmlFor={`material-mobile-${material}`} className="text-sm">
                            {material}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex w-full items-center justify-between font-medium mb-3">
                      Stones
                      {true ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-2">
                      {stoneOptions.map((stone) => (
                        <div key={stone} className="flex items-center gap-2">
                          <Checkbox id={`stone-mobile-${stone}`} />
                          <Label htmlFor={`stone-mobile-${stone}`} className="text-sm">
                            {stone}
                          </Label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                  
                  <div className="flex gap-4 mt-8">
                    <Button 
                      variant="outline" 
                      onClick={resetFilters}
                      className="flex-1"
                    >
                      Reset
                    </Button>
                    <Button 
                      onClick={() => setFilterOpen(false)}
                      className="flex-1 bg-gold hover:bg-gold-dark"
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products */}
            <div className="flex-1">
              {/* Active Filters */}
              {(activeCategory !== "All" || searchQuery || priceRange[0] > 0 || priceRange[1] < 2000) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {activeCategory !== "All" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setActiveCategory("All")}
                    >
                      {activeCategory}
                      <X className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  {searchQuery && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setSearchQuery("")}
                    >
                      Search: {searchQuery}
                      <X className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setPriceRange([0, 2000])}
                    >
                      Price: ${priceRange[0]} - ${priceRange[1]}
                      <X className="ml-1 h-3 w-3" />
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground"
                    onClick={resetFilters}
                  >
                    Clear all
                  </Button>
                </div>
              )}
              
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
