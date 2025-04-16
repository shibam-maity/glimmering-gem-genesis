
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ProductFiltersProps {
  activeCategory: string;
  onClearCategory: () => void;
  searchQuery: string;
  onClearSearch: () => void;
  priceRange: number[];
  onClearPriceRange: () => void;
  materials: string[];
  onRemoveMaterial: (material: string) => void;
  stones: string[];
  onRemoveStone: (stone: string) => void;
  onResetAll: () => void;
}

const ProductFilters = ({
  activeCategory,
  onClearCategory,
  searchQuery,
  onClearSearch,
  priceRange,
  onClearPriceRange,
  materials,
  onRemoveMaterial,
  stones,
  onRemoveStone,
  onResetAll
}: ProductFiltersProps) => {
  const hasActiveFilters = activeCategory !== "All" || 
                          searchQuery || 
                          priceRange[0] > 0 || 
                          priceRange[1] < 2000 ||
                          materials.length > 0 ||
                          stones.length > 0;
  
  if (!hasActiveFilters) return null;
  
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {activeCategory !== "All" && (
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={onClearCategory}
        >
          Category: {activeCategory}
          <X className="ml-1 h-3 w-3" />
        </Button>
      )}
      
      {searchQuery && (
        <Button
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={onClearSearch}
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
          onClick={onClearPriceRange}
        >
          Price: ${priceRange[0]} - ${priceRange[1]}
          <X className="ml-1 h-3 w-3" />
        </Button>
      )}
      
      {materials.map(material => (
        <Button
          key={material}
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => onRemoveMaterial(material)}
        >
          Material: {material}
          <X className="ml-1 h-3 w-3" />
        </Button>
      ))}
      
      {stones.map(stone => (
        <Button
          key={stone}
          variant="outline"
          size="sm"
          className="h-7 text-xs"
          onClick={() => onRemoveStone(stone)}
        >
          Stone: {stone}
          <X className="ml-1 h-3 w-3" />
        </Button>
      ))}
      
      <Button
        variant="ghost"
        size="sm"
        className="h-7 text-xs text-muted-foreground"
        onClick={onResetAll}
      >
        Clear all
      </Button>
    </div>
  );
};

export default ProductFilters;
