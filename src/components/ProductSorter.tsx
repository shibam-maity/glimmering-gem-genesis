
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProductSorterProps {
  value: string;
  onChange: (value: string) => void;
}

const ProductSorter = ({ value, onChange }: ProductSorterProps) => {
  return (
    <div className="w-full md:w-auto flex items-center gap-2">
      <Label htmlFor="sort" className="text-sm whitespace-nowrap">Sort by:</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="sort" className="w-[180px]">
          <SelectValue placeholder="Featured" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="featured">Featured</SelectItem>
          <SelectItem value="price-low-high">Price: Low to High</SelectItem>
          <SelectItem value="price-high-low">Price: High to Low</SelectItem>
          <SelectItem value="name-a-z">Name: A to Z</SelectItem>
          <SelectItem value="name-z-a">Name: Z to A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductSorter;
