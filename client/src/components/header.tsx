import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3l14 9-14 9V3z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-foreground">{t('appName')}</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("music")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="nav-music"
              >
                {t('music')}
              </button>
              <button
                onClick={() => scrollToSection("meditation")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="nav-meditation"
              >
                {t('meditation')}
              </button>
              <button
                onClick={() => scrollToSection("action")}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-testid="nav-action"
              >
                {t('action')}
              </button>
            </nav>
            <LanguageSelector />
          </div>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                data-testid="mobile-menu-trigger"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[240px]">
              <nav className="flex flex-col space-y-4 mt-8">
                <button
                  onClick={() => scrollToSection("music")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-left"
                  data-testid="mobile-nav-music"
                >
                  {t('music')}
                </button>
                <button
                  onClick={() => scrollToSection("meditation")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-left"
                  data-testid="mobile-nav-meditation"
                >
                  {t('meditation')}
                </button>
                <button
                  onClick={() => scrollToSection("action")}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-left"
                  data-testid="mobile-nav-action"
                >
                  {t('action')}
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
