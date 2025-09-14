import { Heart, Calendar, Sparkles, Star } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <Star className="h-2 w-2 text-primary/30" />
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        <div className="love-letter transform hover:scale-105 transition-all duration-1000">
          {/* Decorative Elements */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <div className="ornament">❦</div>
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
          
          {/* Names with Enhanced Typography */}
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-bold text-primary mb-2 tracking-wide">
              <span className="inline-block hover:scale-110 transition-transform duration-500">M</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-75">o</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-150">h</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-225">a</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-300">m</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-375">e</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-450">d</span>
            </h1>
            
            {/* Animated Heart Divider */}
            <div className="flex items-center justify-center space-x-6 my-8">
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent flex-1 max-w-32"></div>
              <div className="relative">
                <Heart className="h-12 w-12 text-primary fill-current animate-pulse" />
                <div className="absolute inset-0 h-12 w-12 text-secondary fill-current animate-ping opacity-75">
                  <Heart className="h-12 w-12" />
                </div>
              </div>
              <div className="h-px bg-gradient-to-l from-transparent via-primary to-transparent flex-1 max-w-32"></div>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-bold text-primary mb-8 tracking-wide">
              <span className="inline-block hover:scale-110 transition-transform duration-500">S</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-75">a</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-150">r</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-225">a</span>
              <span className="inline-block hover:scale-110 transition-transform duration-500 delay-300">h</span>
            </h1>
          </div>

          {/* Enhanced Quote */}
          <div className="space-y-6 text-xl md:text-3xl text-foreground mb-12">
            <p className="italic font-light tracking-wide">
              "Two souls, one heart, endless love"
            </p>
            
            {/* Date Section with Animation */}
            <div className="modern-card inline-block px-8 py-6 mx-auto">
              <div className="flex items-center justify-center space-x-4">
                <Calendar className="h-8 w-8 text-primary animate-bounce" />
                <div className="text-center">
                  <span className="text-3xl md:text-4xl font-bold text-primary block">
                    October 3rd, 2025
                  </span>
                  <span className="text-lg text-muted-foreground">
                    Our Engagement Day
                  </span>
                </div>
                <Calendar className="h-8 w-8 text-primary animate-bounce" />
              </div>
            </div>
            
            <p className="text-xl text-muted-foreground mt-8 tracking-wide">
              Join us in celebrating this beautiful beginning
            </p>
          </div>

          {/* Decorative Bottom */}
          <div className="flex justify-center items-center space-x-4">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <div className="ornament">❦</div>
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center space-y-2 animate-bounce">
          <div className="w-8 h-12 border-3 border-primary rounded-full flex justify-center p-2">
            <div className="w-2 h-4 bg-primary rounded-full animate-pulse"></div>
          </div>
          <span className="text-sm text-primary font-medium tracking-wide">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;