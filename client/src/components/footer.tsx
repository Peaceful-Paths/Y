import { Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
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
              <h4 className="text-xl font-semibold text-card-foreground">Peaceful Paths</h4>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Discover your path to inner peace through curated music, meditation practices, and meaningful actions that create positive change.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors duration-200"
                data-testid="social-twitter"
              >
                <Twitter className="w-5 h-5 text-muted-foreground" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors duration-200"
                data-testid="social-instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-muted/80 transition-colors duration-200"
                data-testid="social-youtube"
              >
                <Youtube className="w-5 h-5 text-muted-foreground" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-medium text-card-foreground mb-4">Explore</h5>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-testid="footer-music-link"
                >
                  Music Collections
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('meditation')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-testid="footer-meditation-link"
                >
                  Meditation Library
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('action')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  data-testid="footer-action-link"
                >
                  Peaceful Actions
                </button>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-community-link">
                  Community
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-medium text-card-foreground mb-4">Support</h5>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-help-link">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-contact-link">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-privacy-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-200" data-testid="footer-terms-link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Peaceful Paths. Made with love for mindful living.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200" data-testid="footer-accessibility-link">
              Accessibility
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-200" data-testid="footer-credits-link">
              Credits
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
