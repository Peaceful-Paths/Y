import { useQuery } from "@tanstack/react-query";
import { Music, Brain, Heart, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import type { MusicCollection, MeditationPractice, PeacefulAction } from "@shared/schema";

export default function FeaturedContent() {
  const { t } = useLanguage();
  const { data: featuredMusic, isLoading: musicLoading } = useQuery<MusicCollection[]>({
    queryKey: ["/api/music/featured"],
  });

  const { data: featuredMeditation, isLoading: meditationLoading } = useQuery<MeditationPractice[]>({
    queryKey: ["/api/meditation/featured"],
  });

  const { data: featuredActions, isLoading: actionsLoading } = useQuery<PeacefulAction[]>({
    queryKey: ["/api/actions/featured"],
  });

  if (musicLoading || meditationLoading || actionsLoading) {
    return (
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-medium text-foreground mb-4">{t('featuredTitle')}</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('featuredSubtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const music = featuredMusic?.[0];
  const meditation = featuredMeditation?.[0];
  const action = featuredActions?.[0];

  return (
    <section className="py-16 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-medium text-foreground mb-4">Today's Peaceful Picks</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked content to guide your journey toward serenity and mindfulness.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Music */}
          {music && (
            <Card className="overflow-hidden card-hover border shadow-lg" data-testid="featured-music">
              <img 
                src={music.imageUrl} 
                alt={music.title}
                className="w-full h-48 object-cover" 
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-primary/10 text-primary border-none">
                    <Music className="w-4 h-4 mr-1" />
                    {t('featuredMusic')}
                  </Badge>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="text-xl font-medium text-card-foreground mb-2">{music.title}</h4>
                <p className="text-muted-foreground mb-4">{music.description}</p>
                <Button 
                  className="w-full" 
                  onClick={() => window.open(music.soundcloudUrl, '_blank')}
                  data-testid="listen-now-button"
                >
                  {t('listenNow')}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Featured Meditation */}
          {meditation && (
            <Card className="overflow-hidden card-hover border shadow-lg" data-testid="featured-meditation">
              <img 
                src={meditation.imageUrl} 
                alt={meditation.title}
                className="w-full h-48 object-cover" 
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="bg-accent/70 text-accent-foreground border-none">
                    <Brain className="w-4 h-4 mr-1" />
                    {t('featuredPractice')}
                  </Badge>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="text-xl font-medium text-card-foreground mb-2">{meditation.title}</h4>
                <p className="text-muted-foreground mb-4">{meditation.description}</p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={() => window.open(meditation.resourceUrl, '_blank')}
                  data-testid="start-practice-button"
                >
                  {t('startPractice')}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Featured Action */}
          {action && (
            <Card className="overflow-hidden card-hover border shadow-lg" data-testid="featured-action">
              <img 
                src={action.imageUrl} 
                alt={action.title}
                className="w-full h-48 object-cover" 
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline" className="bg-secondary/70 text-secondary-foreground border-none">
                    <Heart className="w-4 h-4 mr-1" />
                    {t('featuredAction')}
                  </Badge>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
                <h4 className="text-xl font-medium text-card-foreground mb-2">{action.title}</h4>
                <p className="text-muted-foreground mb-4">{action.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 border-none"
                  onClick={() => window.open(action.actionUrl, '_blank')}
                  data-testid="get-involved-button"
                >
                  {t('getInvolved')}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
