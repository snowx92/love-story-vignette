import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Memories from '@/components/Memories';
import Playlist from '@/components/Playlist';
import Gallery from '@/components/Gallery';
import Wishes from '@/components/Wishes';
import FloatingPhotos from '@/components/FloatingPhotos';

const Index = () => {
  return (
    <div className="relative min-h-screen">
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

      {/* Footer */}
      <footer className="py-12 text-center bg-muted/20 border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <div className="ornament mb-4">❦</div>
          <h3 className="text-2xl font-bold text-primary mb-2">
            Mohamed & Sarah
          </h3>
          <p className="text-muted-foreground mb-4">
            October 3rd, 2025
          </p>
          <p className="text-sm text-muted-foreground">
            Thank you for being part of our love story
          </p>
          <div className="ornament mt-4">❦</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
