
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  materials: string[];
  onMaterialsChange: (materials: string[]) => void;
  materialOptions: string[];
  stones: string[];
  onStonesChange: (stones: string[]) => void;
  stoneOptions: string[];
  onReset: () => void;
}

const MobileFilterDrawer = ({
  open,
  onOpenChange,
  categories,
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  materials,
  onMaterialsChange,
  materialOptions,
  stones,
  onStonesChange,
  stoneOptions,
  onReset
}: MobileFilterDrawerProps) => {
  const handleMaterialChange = (material: string, checked: boolean) => {
    if (checked) {
      onMaterialsChange([...materials, material]);
    } else {
      onMaterialsChange(materials.filter(m => m !== material));
    }
  };

  const handleStoneChange = (stone: string, checked: boolean) => {
    if (checked) {
      onStonesChange([...stones, stone]);
    } else {
      onStonesChange(stones.filter(s => s !== stone));
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] overflow-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        
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
                  onClick={() => onCategoryChange(category)}
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
                onValueChange={onPriceRangeChange}
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
                  <Checkbox 
                    id={`material-mobile-${material}`} 
                    checked={materials.includes(material)}
                    onCheckedChange={(checked) => 
                      handleMaterialChange(material, checked as boolean)
                    }
                  />
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
                  <Checkbox 
                    id={`stone-mobile-${stone}`} 
                    checked={stones.includes(stone)}
                    onCheckedChange={(checked) => 
                      handleStoneChange(stone, checked as boolean)
                    }
                  />
                  <Label htmlFor={`stone-mobile-${stone}`} className="text-sm">
                    {stone}
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        <SheetFooter className="flex gap-4 mt-8">
          <Button 
            variant="outline" 
            onClick={onReset}
            className="flex-1"
          >
            Reset
          </Button>
          <Button 
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-gold hover:bg-gold-dark"
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterDrawer;
