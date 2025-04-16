
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const EmptyState = ({
  title,
  description,
  buttonText = "Back to Home",
  buttonLink = "/"
}: EmptyStateProps) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 text-center">
      <h2 className="font-playfair text-2xl md:text-3xl font-semibold mb-3">{title}</h2>
      <p className="text-muted-foreground font-poppins mb-6 max-w-md">{description}</p>
      
      <Button asChild>
        <Link to={buttonLink}>{buttonText}</Link>
      </Button>
    </div>
  );
};

export default EmptyState;
