
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EmptyState from "@/components/EmptyState";

interface ComingSoonProps {
  title?: string;
  description?: string;
  pageName?: string;
}

const ComingSoon = ({
  title = "Coming Soon",
  description = "This page is under construction. We're working hard to bring you an amazing experience.",
  pageName = ""
}: ComingSoonProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container px-6 mx-auto">
          <div className="py-8">
            <h1 className="font-playfair text-3xl font-semibold">{pageName}</h1>
          </div>
          <EmptyState 
            title={title}
            description={description}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComingSoon;
