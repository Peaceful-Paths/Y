import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Brain, Wind, Target, Heart, BookOpen, Calendar, Users, Clock, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import type { MeditationPractice } from "@shared/schema";

const practiceTypes = [
  { id: "breathing", label: "Breathing Exercises", icon: Wind, count: 12 },
  { id: "focused", label: "Focused Meditation", icon: Target, count: 8 },
  { id: "loving-kindness", label: "Loving Kindness", icon: Heart, count: 6 },
];

export default function MeditationSection() {
  const [progress] = useState(0); // TODO: Implement progress tracking

  const { data: meditationPractices, isLoading } = useQuery<MeditationPractice[]>({
    queryKey: ["/api/meditation"],
  });

  const { data: featuredPractice } = useQuery<MeditationPractice[]>({
    queryKey: ["/api/meditation/featured"],
  });

  const todaysPractice = featuredPractice?.[0];

  return (
    <section id="meditation" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-2xl mb-6">
            <Brain className="w-8 h-8 text-accent-foreground" />
          </div>
          <h3 className="text-4xl font-medium text-foreground mb-4">Mindful Practices</h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover guided meditations, breathing exercises, and mindfulness techniques to cultivate inner peace.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Meditation Categories */}
          <div className="space-y-6">
            <h4 className="text-2xl font-medium text-foreground mb-6">Practice Types</h4>
            
            {practiceTypes.map((type) => (
              <Card 
                key={type.id} 
                className="p-6 card-hover border shadow-lg cursor-pointer"
                data-testid={`practice-type-${type.id}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <type.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-card-foreground mb-2">{type.label}</h5>
                    <p className="text-muted-foreground text-sm mb-3">
                      {type.id === "breathing" && "Simple yet powerful techniques to center your mind and calm your nervous system."}
                      {type.id === "focused" && "Develop concentration and clarity through guided focus practices."}
                      {type.id === "loving-kindness" && "Cultivate compassion for yourself and others through heart-centered practices."}
                    </p>
                    <div className="flex items-center text-sm text-primary">
                      <span>{type.count} practices</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Featured Meditation */}
          <div className="space-y-6">
            <h4 className="text-2xl font-medium text-foreground mb-6">Today's Practice</h4>
            
            {isLoading ? (
              <Card className="overflow-hidden border shadow-lg">
                <Skeleton className="w-full h-64" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-4" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-4 w-full mb-6" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ) : todaysPractice ? (
              <Card className="overflow-hidden border shadow-lg" data-testid="todays-practice">
                <img 
                  src={todaysPractice.imageUrl} 
                  alt={todaysPractice.title}
                  className="w-full h-64 object-cover" 
                />
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-accent/20 text-accent-foreground border-none">
                      <Clock className="w-4 h-4 mr-1" />
                      {todaysPractice.duration}
                    </Badge>
                    <span className="text-sm text-muted-foreground capitalize">{todaysPractice.difficulty} Friendly</span>
                  </div>
                  
                  <h5 className="text-xl font-medium text-card-foreground mb-3">{todaysPractice.title}</h5>
                  <p className="text-muted-foreground mb-6">{todaysPractice.description}</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-foreground font-medium">{progress} / {todaysPractice.duration}</span>
                    </div>
                    
                    <Progress value={progress} className="w-full" />
                    
                    <Button 
                      className="w-full bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center space-x-2"
                      onClick={() => window.open(todaysPractice.resourceUrl, '_blank')}
                      data-testid="begin-practice-button"
                    >
                      <Play className="w-5 h-5" />
                      <span>Begin Practice</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>

        {/* Meditation Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center card-hover border shadow-lg" data-testid="meditation-library">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h5 className="font-medium text-card-foreground mb-2">Meditation Library</h5>
            <p className="text-muted-foreground text-sm mb-4">Access hundreds of guided practices for every skill level and intention.</p>
            <Button variant="link" className="text-primary hover:text-primary/80 text-sm font-medium p-0" data-testid="browse-library">
              Browse Library →
            </Button>
          </Card>

          <Card className="p-6 text-center card-hover border shadow-lg" data-testid="daily-reminders">
            <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-accent-foreground" />
            </div>
            <h5 className="font-medium text-card-foreground mb-2">Daily Reminders</h5>
            <p className="text-muted-foreground text-sm mb-4">Set gentle notifications to maintain your practice with consistency.</p>
            <Button variant="link" className="text-accent-foreground hover:text-accent-foreground/80 text-sm font-medium p-0" data-testid="set-reminders">
              Set Reminders →
            </Button>
          </Card>

          <Card className="p-6 text-center card-hover border shadow-lg" data-testid="meditation-community">
            <div className="w-16 h-16 bg-secondary/70 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h5 className="font-medium text-card-foreground mb-2">Community</h5>
            <p className="text-muted-foreground text-sm mb-4">Connect with fellow practitioners and share your mindfulness journey.</p>
            <Button variant="link" className="text-secondary-foreground hover:text-secondary-foreground/80 text-sm font-medium p-0" data-testid="join-community">
              Join Community →
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
