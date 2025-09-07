import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import FeaturedContent from "@/components/featured-content";
import MusicSection from "@/components/music-section";
import MeditationSection from "@/components/meditation-section";
import ActionSection from "@/components/action-section";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedContent />
      <MusicSection />
      <MeditationSection />
      <ActionSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
