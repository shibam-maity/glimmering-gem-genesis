
import { Link } from "react-router-dom";

interface CategoryProps {
  name: string;
  image: string;
  link: string;
}

const categories: CategoryProps[] = [
  {
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
    link: "/collections/necklaces",
  },
  {
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?auto=format&fit=crop&q=80&w=600",
    link: "/collections/earrings",
  },
  {
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
    link: "/collections/rings",
  },
  {
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=600",
    link: "/collections/bracelets",
  },
];

const Category = ({ name, image, link }: CategoryProps) => {
  return (
    <Link to={link} className="group block relative overflow-hidden rounded-lg">
      <div className="aspect-square md:aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <h3 className="text-xl md:text-2xl font-playfair font-medium text-white mb-1">{name}</h3>
        <span className="inline-block text-sm text-white/80 font-poppins group-hover:text-gold-light transition-colors">
          Explore Collection
        </span>
      </div>
    </Link>
  );
};

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-3">Our Collections</h2>
          <p className="text-muted-foreground font-poppins max-w-xl mx-auto">
            Explore our carefully curated collections of exquisite gold jewelry
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Category key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
