import { useState } from "react";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Welcome to Peaceful Paths!",
        description: "You've successfully subscribed to our mindful updates.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary/5 to-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-3xl lg:text-4xl font-medium text-foreground mb-4">Stay Connected to Peace</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Receive gentle reminders, new peaceful content, and mindful inspiration delivered thoughtfully to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-card border border-border rounded-xl text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                data-testid="newsletter-email-input"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl font-medium whitespace-nowrap"
                data-testid="newsletter-submit-button"
              >
                {isSubmitting ? "Joining..." : "Join Us"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Mindful updates, no spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
