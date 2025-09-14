import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Memories from '@/components/Memories';
import Playlist from '@/components/Playlist';
import Gallery from '@/components/Gallery';
import Wishes from '@/components/Wishes';
import FloatingPhotos from '@/components/FloatingPhotos';
import LoveRain from '@/components/LoveRain';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <LoveRain />
      <FloatingPhotos />
      <Navigation />
      
      <main>
        <Hero />
        <Timeline />
        <Memories />
        <Playlist />
        <Gallery />
        <Wishes />
      </main>

      {/* Enhanced Footer */}
      <footer className="py-16 text-center bg-gradient-to-r from-muted/10 via-muted/20 to-muted/10 border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="modern-card inline-block p-8">
            <div className="ornament mb-6">❦</div>
            <h3 className="text-3xl font-bold text-primary mb-4">
              Mohamed & Sarah
            </h3>
            <p className="text-xl text-muted-foreground mb-6">
              October 3rd, 2025
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Thank you for being part of our love story
            </p>
            <div className="flex justify-center space-x-4 text-2xl">
              <span>💕</span>
              <span>💖</span>
              <span>💝</span>
            </div>
            <div className="ornament mt-6">❦</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
