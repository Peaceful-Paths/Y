import { useState } from "react";
import { Search, Music, Brain, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&h=1200" 
          alt="Peaceful forest with morning sunlight" 
          className="w-full h-full object-cover opacity-20" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto fade-in">
          <h2 className="text-4xl lg:text-6xl font-light text-foreground mb-6 leading-tight">
            Find Your Path to 
            <span className="text-primary font-medium"> Inner Peace</span>
          </h2>
          <p className="text-xl lg:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Discover curated music, meditation resources, and meaningful actions that nurture tranquility and mindful living.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for peaceful content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 pr-14 bg-card border border-border rounded-2xl text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent shadow-lg"
                data-testid="search-input"
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-xl"
                data-testid="search-button"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-accent text-accent-foreground px-4 py-2 rounded-full">
              <Music className="w-4 h-4 mr-2" />
              Ambient Sounds
            </Badge>
            <Badge variant="secondary" className="bg-accent text-accent-foreground px-4 py-2 rounded-full">
              <Brain className="w-4 h-4 mr-2" />
              Guided Meditation
            </Badge>
            <Badge variant="secondary" className="bg-accent text-accent-foreground px-4 py-2 rounded-full">
              <Heart className="w-4 h-4 mr-2" />
              Mindful Actions
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 floating-animation opacity-30">
        <div className="w-20 h-20 bg-primary/20 rounded-full"></div>
      </div>
      <div className="absolute bottom-20 right-10 floating-animation opacity-20" style={{ animationDelay: "2s" }}>
        <div className="w-16 h-16 bg-accent/30 rounded-full"></div>
      </div>
    </section>
  );
}
