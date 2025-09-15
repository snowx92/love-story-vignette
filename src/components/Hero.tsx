import { Heart, Calendar, Sparkles, Star, BookOpen, Feather, MapPin } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Vintage Background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
        </div>
        
        {/* Aged Paper Texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/90 via-amber-50/95 to-orange-100/90"></div>
        
        {/* Paper Grain Effect */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, #D2691E 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Floating Vintage Elements */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float opacity-15"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 4}s`
              }}
            >
              {i % 4 === 0 ? (
                <Heart className="h-3 w-3 text-amber-700" />
              ) : i % 4 === 1 ? (
                <Star className="h-2 w-2 text-amber-600" />
              ) : i % 4 === 2 ? (
                <Feather className="h-4 w-4 text-amber-800" />
              ) : (
                <div className="text-amber-700">❦</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Full Width Book */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-2 sm:px-4 py-4 sm:py-8">
        {/* Open Book Container */}
        <div className="relative w-full max-w-7xl h-[90vh] sm:h-[85vh] bg-white rounded-lg shadow-2xl overflow-hidden border-4 sm:border-8 border-amber-900/30">
          
          {/* Book Spine in the Middle - Hidden on Mobile */}
          <div className="absolute left-1/2 top-0 bottom-0 w-4 sm:w-8 bg-gradient-to-r from-amber-900/60 via-amber-800/40 to-amber-900/60 transform -translate-x-1/2 z-20 border-x-2 border-amber-900/50 hidden sm:block"></div>
          
          {/* Mobile Single Page Layout */}
          <div className="block sm:hidden w-full h-full bg-gradient-to-br from-amber-50 to-yellow-100 p-3">
            {/* Mobile Content */}
            <div className="relative z-10 h-full flex flex-col justify-between items-center text-center py-2">
              
              {/* Top Ornament */}
              <div className="flex justify-center items-center">
                <div className="text-xl text-amber-800">❦</div>
                <div className="mx-2 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent w-8"></div>
                <BookOpen className="h-4 w-4 text-amber-700 animate-pulse" />
                <div className="mx-2 h-px bg-gradient-to-l from-transparent via-amber-600 to-transparent w-8"></div>
                <div className="text-xl text-amber-800">❦</div>
              </div>

              {/* Invitation Header */}
              <div className="text-center">
                <h2 className="text-base text-amber-900 mb-1" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  You are cordially invited
                </h2>
                <h3 className="text-sm text-amber-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  to celebrate the engagement of
                </h3>
              </div>

              {/* Both Names */}
              <div className="text-center">
                <h1 className="text-3xl text-amber-900 leading-tight mb-2" style={{ 
                  fontFamily: 'Dancing Script, cursive',
                  textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)'
                }}>
                  Mohamed
                </h1>
                
                {/* Heart Divider */}
                <div className="flex items-center justify-center my-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-amber-700 flex-1 max-w-8"></div>
                  <div className="mx-2 relative">
                    <Heart className="h-4 w-4 text-red-600 fill-current animate-pulse" />
                  </div>
                  <div className="h-px bg-gradient-to-l from-transparent via-amber-600 to-amber-700 flex-1 max-w-8"></div>
                </div>
                
                <h1 className="text-3xl text-amber-900 leading-tight" style={{ 
                  fontFamily: 'Dancing Script, cursive',
                  textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)'
                }}>
                  Sarah
                </h1>
              </div>

              {/* Date and Location Section */}
              <div className="w-full max-w-xs space-y-3">
                {/* Date Section */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg p-3 border border-amber-200 shadow-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="h-3 w-3 text-amber-700 mr-1" />
                    <h3 className="text-sm text-amber-900" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Save the Date
                    </h3>
                    <Calendar className="h-3 w-3 text-amber-700 ml-1" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-amber-900 mb-1" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      October 3rd, 2025
                    </p>
                    <p className="text-sm font-bold text-amber-800 mb-1" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      7:00 PM
                    </p>
                    <p className="text-xs text-amber-700" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      A day to remember forever
                    </p>
                  </div>
                </div>

                {/* Location Section */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg p-3 border border-amber-200 shadow-lg">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="h-3 w-3 text-amber-700 mr-1" />
                    <h3 className="text-sm text-amber-900" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Venue
                    </h3>
                    <MapPin className="h-3 w-3 text-amber-700 ml-1" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-amber-900 mb-1" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Sarah's Home
                    </p>
                    <p className="text-xs text-amber-700 mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Obour City, Cairo
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/tpe3o7Zmd28cD9ev7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-xs transition-all duration-300 hover:scale-105 shadow-lg"
                      style={{ fontFamily: 'Dancing Script, cursive' }}
                    >
                      <MapPin className="h-3 w-3 mr-1" />
                      View on Map
                    </a>
                  </div>
                </div>
              </div>

              {/* Romantic Quote */}
              <div className="text-center">
                <p className="text-sm text-amber-800 italic" style={{ 
                  fontFamily: 'Dancing Script, cursive' 
                }}>
                  "Two hearts, one soul, forever entwined"
                </p>
                <p className="text-xs text-amber-700 mt-1" style={{ 
                  fontFamily: 'Dancing Script, cursive' 
                }}>
                  Your presence would make our joy complete
                </p>
              </div>

              {/* Bottom Ornament */}
              <div className="flex justify-center items-center">
                <div className="text-xl text-amber-800">❦</div>
                <div className="mx-2 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent w-8"></div>
                <Sparkles className="h-3 w-3 text-amber-700 animate-pulse" />
                <div className="mx-2 h-px bg-gradient-to-l from-transparent via-amber-600 to-transparent w-8"></div>
                <div className="text-xl text-amber-800">❦</div>
              </div>
            </div>
          </div>
          
          {/* Desktop Two-Page Layout */}
          <div className="hidden sm:block">
            {/* Left Page */}
            <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-br from-amber-50 to-yellow-100 p-8 md:p-12 lg:p-16">
              {/* Left Page Border */}
              <div className="absolute inset-4 border-4 border-amber-800/20 rounded-lg">
                <div className="absolute inset-2 border-2 border-amber-700/15 rounded-md"></div>
              </div>
              
              {/* Left Page Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                {/* Top Ornament */}
                <div className="flex justify-center items-center mb-8">
                  <div className="text-3xl text-amber-800">❦</div>
                  <div className="mx-4 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent w-16"></div>
                  <BookOpen className="h-6 w-6 text-amber-700 animate-pulse" />
                  <div className="mx-4 h-px bg-gradient-to-l from-transparent via-amber-600 to-transparent w-16"></div>
                  <div className="text-3xl text-amber-800">❦</div>
                </div>

                {/* Invitation Header */}
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-amber-900 mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    You are cordially invited
                  </h2>
                  <h3 className="text-lg md:text-xl lg:text-2xl text-amber-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                    to celebrate the engagement of
                  </h3>
                </div>

                {/* Both Names Together */}
                <div className="mb-8">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl text-amber-900 leading-tight" style={{ 
                    fontFamily: 'Dancing Script, cursive',
                    textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)'
                  }}>
                    Mohamed
                  </h1>
                  
                  {/* Heart Divider */}
                  <div className="flex items-center justify-center my-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-amber-700 flex-1 max-w-16"></div>
                    <div className="mx-4 relative">
                      <Heart className="h-6 w-6 text-red-600 fill-current animate-pulse" />
                      <div className="absolute inset-0 h-6 w-6 text-pink-400 fill-current animate-ping opacity-50">
                        <Heart className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-l from-transparent via-amber-600 to-amber-700 flex-1 max-w-16"></div>
                  </div>
                  
                  <h1 className="text-3xl md:text-5xl lg:text-6xl text-amber-900 leading-tight" style={{ 
                    fontFamily: 'Dancing Script, cursive',
                    textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)'
                  }}>
                    Sarah
                  </h1>
                </div>

                {/* Romantic Quote */}
                <div className="mb-8">
                  <p className="text-lg md:text-xl lg:text-2xl text-amber-800 italic" style={{ 
                    fontFamily: 'Dancing Script, cursive' 
                  }}>
                    "In your eyes, I found my home,
                  </p>
                  <p className="text-lg md:text-xl lg:text-2xl text-amber-800 italic mt-2" style={{ 
                    fontFamily: 'Dancing Script, cursive' 
                  }}>
                    in your heart, I found my love"
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="flex justify-center items-center space-x-4">
                  <Sparkles className="h-5 w-5 text-amber-700 animate-pulse" />
                  <div className="text-2xl text-amber-800">✧</div>
                  <Sparkles className="h-5 w-5 text-amber-700 animate-pulse" />
                </div>
                
                {/* Vintage Stains */}
                <div className="absolute top-8 right-8 w-12 h-12 bg-amber-300/20 rounded-full blur-sm"></div>
                <div className="absolute bottom-12 left-8 w-8 h-8 bg-yellow-400/15 rounded-full blur-sm"></div>
              </div>
            </div>

            {/* Right Page */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-bl from-amber-50 to-yellow-100 p-8 md:p-12 lg:p-16">
              {/* Right Page Border */}
              <div className="absolute inset-4 border-4 border-amber-800/20 rounded-lg">
                <div className="absolute inset-2 border-2 border-amber-700/15 rounded-md"></div>
              </div>
              
              {/* Right Page Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                {/* Top Ornament */}
                <div className="flex items-center justify-center mb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-amber-700 flex-1 max-w-20"></div>
                  <div className="mx-6 relative">
                    <Heart className="h-8 w-8 text-red-600 fill-current animate-pulse" />
                    <div className="absolute inset-0 h-8 w-8 text-pink-400 fill-current animate-ping opacity-50">
                      <Heart className="h-8 w-8" />
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-l from-transparent via-amber-600 to-amber-700 flex-1 max-w-20"></div>
                </div>

                {/* Date Section */}
                <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg p-6 lg:p-8 border-2 border-amber-200 shadow-lg mb-8 w-full max-w-sm">
                  <div className="flex items-center justify-center mb-4">
                    <Calendar className="h-5 w-5 text-amber-700 mr-2" />
                    <h3 className="text-lg md:text-xl lg:text-2xl text-amber-900" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Save the Date
                    </h3>
                    <Calendar className="h-5 w-5 text-amber-700 ml-2" />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      October 3rd
                    </p>
                    <p className="text-xl md:text-2xl lg:text-3xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      2025
                    </p>
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-amber-800 mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      7:00 PM
                    </p>
                    <p className="text-base md:text-lg text-amber-700" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      A day to remember forever
                    </p>
                  </div>
                </div>

                {/* Location Section */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg p-6 lg:p-8 border-2 border-amber-200 shadow-lg mb-8 w-full max-w-sm">
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 text-amber-700 mr-2" />
                    <h3 className="text-lg md:text-xl lg:text-2xl text-amber-900" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Venue
                    </h3>
                    <MapPin className="h-5 w-5 text-amber-700 ml-2" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg md:text-xl lg:text-2xl font-bold text-amber-900 mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Sarah's Home
                    </p>
                    <p className="text-sm md:text-base text-amber-700 mb-3" style={{ fontFamily: 'Dancing Script, cursive' }}>
                      Obour City, Cairo
                    </p>
                    <a 
                      href="https://maps.app.goo.gl/tpe3o7Zmd28cD9ev7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                      style={{ fontFamily: 'Dancing Script, cursive' }}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </a>
                  </div>
                </div>

                {/* Romantic Message */}
                <div className="mb-8">
                  <p className="text-lg md:text-xl text-amber-800" style={{ 
                    fontFamily: 'Dancing Script, cursive' 
                  }}>
                    "Two hearts, one soul,
                  </p>
                  <p className="text-lg md:text-xl text-amber-800 mt-1" style={{ 
                    fontFamily: 'Dancing Script, cursive' 
                  }}>
                    forever entwined"
                  </p>
                  <p className="text-base md:text-lg text-amber-700 mt-4" style={{ 
                    fontFamily: 'Dancing Script, cursive' 
                  }}>
                    Your presence would make
                  </p>
                  <p className="text-base md:text-lg text-amber-700" style={{ 
                    fontFamily: 'Dancing Script, cursive' 
                  }}>
                    our joy complete
                  </p>
                </div>

                {/* Bottom Ornament */}
                <div className="flex justify-center items-center">
                  <div className="text-2xl text-amber-800">❦</div>
                  <div className="mx-4 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent w-12"></div>
                  <Sparkles className="h-5 w-5 text-amber-700 animate-pulse" />
                  <div className="mx-4 h-px bg-gradient-to-l from-transparent via-amber-600 to-transparent w-12"></div>
                  <div className="text-2xl text-amber-800">❦</div>
                </div>
                
                {/* Vintage Stains */}
                <div className="absolute top-12 left-8 w-10 h-10 bg-orange-300/25 rounded-full blur-sm"></div>
                <div className="absolute bottom-16 right-12 w-6 h-6 bg-amber-400/20 rounded-full blur-sm"></div>
              </div>
            </div>
          </div>

          {/* Book Shadow Effect */}
          <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;