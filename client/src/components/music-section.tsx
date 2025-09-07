import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Music, Play, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { MusicCollection } from "@shared/schema";

const categories = [
  { id: "all", label: "All" },
  { id: "ambient", label: "Ambient" },
  { id: "nature", label: "Nature Sounds" },
  { id: "instrumental", label: "Instrumental" },
  { id: "binaural", label: "Binaural Beats" },
];

export default function MusicSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: musicCollections, isLoading } = useQuery<MusicCollection[]>({
    queryKey: ["/api/music", selectedCategory === "all" ? undefined : selectedCategory],
  });

  return (
    <section id="music" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Music className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-4xl font-medium text-foreground mb-4">Peaceful Soundscapes</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Immerse yourself in carefully curated music collections that transport you to a place of calm and tranquility.
          </p>
        </div>

        {/* Music Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "secondary"}
              className={`px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              onClick={() => setSelectedCategory(category.id)}
              data-testid={`category-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Music Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-5">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {musicCollections?.map((collection) => (
              <Card 
                key={collection.id} 
                className="overflow-hidden card-hover border shadow-lg"
                data-testid={`music-card-${collection.id}`}
              >
                <img 
                  src={collection.imageUrl} 
                  alt={collection.title}
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-sm text-primary font-medium border-primary/20">
                      {collection.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{collection.duration}</span>
                  </div>
                  <h4 className="font-medium text-card-foreground mb-2">{collection.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{collection.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-muted rounded-full"></div>
                      <span className="text-sm text-muted-foreground">{collection.artist}</span>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 hover:bg-muted rounded-lg transition-colors duration-200"
                      onClick={() => window.open(collection.soundcloudUrl, '_blank')}
                      data-testid={`play-${collection.id}`}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button className="px-8 py-3 rounded-xl font-medium" data-testid="explore-more-music">
            Explore More Music
          </Button>
        </div>
      </div>
    </section>
  );
}
