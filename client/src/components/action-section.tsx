import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HeartHandshake, Leaf, Users, Heart, GraduationCap, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { PeacefulAction } from "@shared/schema";

const actionCategories = [
  { id: "environmental", label: "Environmental", icon: Leaf, description: "Care for our planet" },
  { id: "community", label: "Community", icon: Users, description: "Strengthen local bonds" },
  { id: "wellness", label: "Wellness", icon: Heart, description: "Promote mental health" },
  { id: "education", label: "Education", icon: GraduationCap, description: "Share knowledge" },
];

export default function ActionSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const { data: peacefulActions, isLoading } = useQuery<PeacefulAction[]>({
    queryKey: ["/api/actions", selectedCategory],
  });

  return (
    <section id="action" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/50 rounded-2xl mb-6">
            <HeartHandshake className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h3 className="text-4xl font-medium text-foreground mb-4">Peaceful Actions</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Transform inner peace into outward action through meaningful initiatives that create positive change in your community and the world.
          </p>
        </div>

        {/* Action Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {actionCategories.map((category) => (
            <div 
              key={category.id}
              className="text-center group cursor-pointer"
              onClick={() => setSelectedCategory(selectedCategory === category.id ? undefined : category.id)}
              data-testid={`action-category-${category.id}`}
            >
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors duration-200 ${
                selectedCategory === category.id 
                  ? "bg-primary/20" 
                  : "bg-primary/10 group-hover:bg-primary/20"
              }`}>
                <category.icon className="w-10 h-10 text-primary" />
              </div>
              <h5 className="font-medium text-foreground mb-2">{category.label}</h5>
              <p className="text-sm text-muted-foreground">{category.description}</p>
            </div>
          ))}
        </div>

        {/* Featured Actions */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {peacefulActions?.map((action) => (
              <Card 
                key={action.id} 
                className="overflow-hidden card-hover border shadow-lg"
                data-testid={`action-card-${action.id}`}
              >
                <img 
                  src={action.imageUrl} 
                  alt={action.title}
                  className="w-full h-48 object-cover" 
                />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge className="bg-primary/10 text-primary border-none capitalize">
                      <Leaf className="w-4 h-4 mr-1" />
                      {action.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground capitalize">{action.frequency}</span>
                  </div>
                  <h4 className="text-xl font-medium text-card-foreground mb-3">{action.title}</h4>
                  <p className="text-muted-foreground mb-4">{action.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{action.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{action.participantCount} joined</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => window.open(action.actionUrl, '_blank')}
                    data-testid={`join-action-${action.id}`}
                  >
                    Join Initiative
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button className="mr-4" data-testid="view-all-actions">
            View All Actions
          </Button>
          <Button variant="outline" data-testid="submit-initiative">
            Submit Initiative
          </Button>
        </div>
      </div>
    </section>
  );
}
