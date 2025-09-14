import { Heart, Calendar } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="love-letter">
          <div className="flex justify-center mb-6">
            <div className="ornament">❦</div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
            Mohamed
          </h1>
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="h-px bg-primary flex-1 max-w-20"></div>
            <Heart className="h-8 w-8 text-primary fill-current" />
            <div className="h-px bg-primary flex-1 max-w-20"></div>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-8">
            Sarah
          </h1>

          <div className="space-y-4 text-xl md:text-2xl text-foreground">
            <p className="italic">
              "Two hearts becoming one"
            </p>
            
            <div className="flex items-center justify-center space-x-2 mt-8">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-2xl font-semibold text-primary">
                October 3rd, 2025
              </span>
            </div>
            
            <p className="text-lg text-muted-foreground mt-4">
              Join us in celebrating our engagement
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <div className="ornament">❦</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;