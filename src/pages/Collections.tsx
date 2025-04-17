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

// Extended Sample product data (INR prices are examples, replace with real data)
const products = [
  // Bracelets
  {
    id: "prod-1",
    name: "Diamond Studded Gold Bangle",
    price: 129999, // INR Example
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
    isNew: true,
  },
  {
    id: "prod-8",
    name: "Charm Gold Bracelet",
    price: 109999, // INR Example
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
  },
  {
    id: "prod-11",
    name: "Twisted Gold Bangle",
    price: 89999, // INR Example
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
    category: "Bracelets",
  },
  {
    id: "prod-13",
    name: "Minimalist Chain Bracelet",
    price: 45999, // INR Example
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Bracelets",
  },
  {
    id: "prod-14",
    name: "Gold Cuff Bracelet",
    price: 95000, // INR Example
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Bracelets",
    isBestseller: true,
  },
  // Earrings
  {
    id: "prod-2",
    name: "Twisted Gold Hoop Earrings",
    price: 79999, // INR Example
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=600",
    category: "Earrings",
    isBestseller: true,
  },
  {
    id: "prod-9",
    name: "Minimalist Gold Studs",
    price: 59999, // INR Example
    image: "https://images.unsplash.com/photo-1630019852942-f87fa946dc68?auto=format&fit=crop&q=80&w=600",
    category: "Earrings",
  },
  {
    id: "prod-15",
    name: "Pearl Drop Gold Earrings",
    price: 68000, // INR Example
    image: "https://images.unsplash.com/photo-1629224316710-a41f974b75e1?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Earrings",
    isNew: true,
  },
  {
    id: "prod-16",
    name: "Geometric Gold Dangle Earrings",
    price: 75000, // INR Example
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Earrings",
  },
  // Necklaces
  {
    id: "prod-3",
    name: "Delicate Gold Chain Necklace",
    price: 89999, // INR Example
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
  },
  {
    id: "prod-5",
    name: "Gemstone Pendant Gold Necklace",
    price: 189999, // INR Example
    image: "https://images.unsplash.com/photo-1589207212797-cfd578c00985?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
    isNew: true,
  },
  {
    id: "prod-6",
    name: "Gold Statement Choker",
    price: 129999, // INR Example
    image: "https://images.unsplash.com/photo-1611107419458-58073d16c399?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Necklaces",
  },
  {
    id: "prod-10",
    name: "Gold Layered Necklace",
    price: 119999, // INR Example
    image: "https://images.unsplash.com/photo-1611107419458-58073d16c399?auto=format&fit=crop&q=80&w=600",
    category: "Necklaces",
  },
  {
    id: "prod-17",
    name: "Engraved Gold Bar Necklace",
    price: 95000, // INR Example
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Necklaces",
  },
  {
    id: "prod-18",
    name: "Sunburst Pendant Necklace",
    price: 105000, // INR Example
    image: "https://images.unsplash.com/photo-1589207212797-cfd578c00985?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Necklaces",
    isBestseller: true,
  },
  // Rings
  {
    id: "prod-4",
    name: "Classic Gold Wedding Band",
    price: 149999, // INR Example
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
    isBestseller: true,
  },
  {
    id: "prod-7",
    name: "Interwoven Gold Ring",
    price: 99999, // INR Example
    image: "https://images.unsplash.com/photo-1603561604478-f8a4b426ede7?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
  },
  {
    id: "prod-12",
    name: "Diamond Accent Gold Ring",
    price: 169999, // INR Example
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    category: "Rings",
    isNew: true,
  },
  {
    id: "prod-19",
    name: "Emerald Cut Solitaire Ring",
    price: 250000, // INR Example
    image: "https://images.unsplash.com/photo-1603561604478-f8a4b426ede7?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Rings",
  },
  {
    id: "prod-20",
    name: "Stackable Gold Band Set",
    price: 115000, // INR Example
    image: "https://images.unsplash.com/photo-1586104195538-050b9f9b589c?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Rings",
  },
  {
    id: "prod-21",
    name: "Signet Ring in 18k Gold",
    price: 85000, // INR Example
    image: "https://images.unsplash.com/photo-1587056894209-169c287ddf0a?auto=format&fit=crop&q=80&w=600", // Placeholder
    category: "Rings",
    isNew: true,
  }
];

// Filter options
const materialOptions = ["14k Gold", "18k Gold", "22k Gold", "24k Gold", "Gold Vermeil", "Gold Plated"]; // Added 22k Gold
const stoneOptions = ["Diamond", "Ruby", "Sapphire", "Emerald", "Pearl", "None"]; // Added Pearl
const categories = ["All", "Necklaces", "Earrings", "Rings", "Bracelets"];

const Collections = () => {
  const { category } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // State for filters and search
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  // *** Adjust initial price range based on new INR prices ***
  const [priceRange, setPriceRange] = useState([0, 300000]); // Example Range
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
    } else {
      // If no category in URL, ensure it's set to All
      setActiveCategory("All");
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

    // *** Adjust default price check based on new INR range ***
    if (priceRange[0] > 0 || priceRange[1] < 300000) { // Example Range Max
      searchParams.set("price", `${priceRange[0]},${priceRange[1]}`);
    } else {
      searchParams.delete("price");
    }

    if (materials.length > 0) searchParams.set("materials", materials.join(","));
    else searchParams.delete("materials");

    if (stones.length > 0) searchParams.set("stones", stones.join(","));
    else searchParams.delete("stones");

    // Get path without search params
    let path = location.pathname;
    // Ensure path corresponds to active category
    if (activeCategory === "All" && path !== '/collections') {
        path = '/collections';
    } else if (activeCategory !== "All" && path !== `/collections/${activeCategory.toLowerCase()}`) {
        path = `/collections/${activeCategory.toLowerCase()}`;
    }

    const newUrl = searchParams.toString() ? `${path}?${searchParams}` : path;

    // Replace history state without causing page refresh
    if (`${path}?${searchParams}` !== `${location.pathname}${location.search}`) {
      navigate(newUrl, { replace: true });
    }
  }, [activeCategory, searchQuery, priceRange, materials, stones, sortOption, location.pathname, location.search, navigate]);

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
      const priceParam = searchParams.get("price") || `0,${300000}`; // Example Range Max
      const [min, max] = priceParam.split(",").map(Number);
      // Ensure correct order when loading from URL too
      setPriceRange([Math.min(min, max), Math.max(min, max)]);
    } else {
        // Reset if param removed
        setPriceRange([0, 300000]); // Example Range Max
    }

    if (searchParams.has("materials")) {
      const materialsParam = searchParams.get("materials") || "";
      setMaterials(materialsParam ? materialsParam.split(",") : []);
    } else {
        setMaterials([]);
    }

    if (searchParams.has("stones")) {
      const stonesParam = searchParams.get("stones") || "";
      setStones(stonesParam ? stonesParam.split(",") : []);
    } else {
        setStones([]);
    }
  }, [location.search]);

  // Filter products based on all criteria
  const filteredProducts = products
    .filter(product => activeCategory === "All" || product.category === activeCategory)
    .filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
      // Add more fields to search if needed (e.g., description)
    )
    .filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .filter(product =>
        materials.length === 0 || materials.some(m => product.name.includes(m)) // Very basic check, needs real data structure
    )
    .filter(product =>
        stones.length === 0 || stones.some(s => product.name.includes(s)) // Very basic check, needs real data structure
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
      case "newest": // Add sorting by 'new'
         // Need a date field or rely on order/isNew for basic sort
         return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: // "featured" or unknown
        // Implement featured logic if needed (e.g., based on isBestseller)
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    }
  });

  const resetFilters = () => {
    const currentBasePath = category ? `/collections/${category}` : '/collections';
    setActiveCategory(category ? (category.charAt(0).toUpperCase() + category.slice(1)) : "All");
    setSearchQuery("");
    setPriceRange([0, 300000]); // Example Range Max
    setMaterials([]);
    setStones([]);
    setSortOption("featured");
    navigate(currentBasePath, { replace: true });
  };

  const handleCategoryChange = (newCategory: string) => {
    setActiveCategory(newCategory);
    // Keep current search params but change the path
    const searchParams = new URLSearchParams(location.search);
    const path = newCategory === "All" ? "/collections" : `/collections/${newCategory.toLowerCase()}`;
    navigate(`${path}?${searchParams.toString()}`, { replace: true });
  };

  // Price change handler remains the same
  const handlePriceChange = (newRange: number[]) => {
    if (newRange.length === 2) {
      setPriceRange([Math.min(newRange[0], newRange[1]), Math.max(newRange[0], newRange[1])]);
    } else {
      console.warn("Unexpected value from price slider:", newRange);
      setPriceRange(newRange);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-gold-light/10 to-transparent py-16 md:py-20">
          <div className="container px-6 mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-playfair font-semibold mb-4 text-gold-dark">
              {activeCategory === "All" ? "Our Collections" : activeCategory}
            </h1>
            <p className="text-muted-foreground font-poppins max-w-2xl mx-auto">
              Explore our carefully curated gold jewelry pieces, handcrafted with precision and designed for elegance.
            </p>
          </div>
        </div>

        {/* Filter & Product Section */}
        <div className="container px-6 py-12 mx-auto">
          {/* Search and Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            {/* Search Input - Remains the same */}
             <div className="w-full md:w-1/3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
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
              onPriceRangeChange={handlePriceChange}
              materials={materials}
              onMaterialsChange={setMaterials}
              materialOptions={materialOptions}
              stones={stones}
              onStonesChange={setStones}
              stoneOptions={stoneOptions}
              onReset={resetFilters}
              // *** Pass updated max price to slider ***
              maxPrice={300000} // Example Range Max
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
              onPriceRangeChange={handlePriceChange}
              materials={materials}
              onMaterialsChange={setMaterials}
              materialOptions={materialOptions}
              stones={stones}
              onStonesChange={setStones}
              stoneOptions={stoneOptions}
              onReset={resetFilters}
               // *** Pass updated max price to slider ***
              maxPrice={300000} // Example Range Max
            />

            {/* Products */}
            <div className="flex-1">
              {/* Active Filters Display */}
              <ProductFilters
                activeCategory={activeCategory}
                onClearCategory={() => handleCategoryChange("All")}
                searchQuery={searchQuery}
                onClearSearch={() => setSearchQuery("")}
                priceRange={priceRange}
                maxPrice={300000} // Example Range Max
                onClearPriceRange={() => setPriceRange([0, 300000])} // Example Range Max
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
              <div className="mb-6 pt-4 border-t">
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
                <div className="text-center py-16 border rounded-lg bg-secondary/20">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria.</p>
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
