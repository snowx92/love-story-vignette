import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Timeline from '@/components/Timeline';
import Playlist from '@/components/Playlist';
import Gallery from '@/components/Gallery';
import Wishes from '@/components/Wishes';
import FloatingPhotos from '@/components/FloatingPhotos';
import LoveRain from '@/components/LoveRain';
import AutoplayMusic from '@/components/AutoplayMusic';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <LoveRain />
      <FloatingPhotos />
      <AutoplayMusic />
      <Navigation />
      
      <main>
        <Hero />
        <Timeline />
        <Playlist />
        <Gallery />
        <Wishes />
      </main>

      {/* Vintage Book Footer - Mobile Optimized */}
      <footer className="relative py-8 sm:py-20 bg-gradient-to-b from-amber-50 to-amber-100 border-t-2 sm:border-t-4 border-amber-200">
        {/* Book Pages Effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/30 to-transparent"></div>
          <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-amber-300/50"></div>
          <div className="absolute left-3 sm:left-6 top-0 bottom-0 w-0.5 sm:w-1 bg-amber-300/30"></div>
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 sm:w-1 bg-amber-300/20"></div>
        </div>

        <div className="relative w-full px-4 sm:px-8">
          {/* Book Cover Design */}
          <div className="bg-gradient-to-br from-amber-100 via-amber-50 to-cream-100 rounded-lg shadow-2xl border-2 sm:border-4 border-amber-300 p-6 sm:p-12 relative overflow-hidden w-full">
            {/* Decorative Corner Elements */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-lg sm:text-2xl text-amber-600">❦</div>
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-lg sm:text-2xl text-amber-600">❦</div>
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-lg sm:text-2xl text-amber-600">❦</div>
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-lg sm:text-2xl text-amber-600">❦</div>

            {/* Vintage Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-transparent to-amber-400"></div>
            </div>

            <div className="relative text-center">
              {/* Title Page Style */}
              <div className="mb-4 sm:mb-8">
                <div className="text-2xl sm:text-4xl text-amber-700 mb-1 sm:mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  ❦ The End ❦
                </div>
                <div className="w-16 sm:w-32 h-0.5 sm:h-1 bg-amber-400 mx-auto mb-3 sm:mb-6"></div>
              </div>

              {/* Names in Beautiful Script */}
              <h3 className="text-3xl sm:text-5xl font-bold text-amber-800 mb-3 sm:mb-6 leading-relaxed" style={{ fontFamily: 'Dancing Script, cursive' }}>
                Mohamed & Sarah
              </h3>

              {/* Handwritten Message */}
              <div className="bg-white/60 rounded-lg p-3 sm:p-6 mb-4 sm:mb-8 border border-amber-200 sm:border-2 shadow-inner">
                <p className="text-lg sm:text-2xl text-amber-900 mb-2 sm:mb-4 leading-relaxed" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  "Thank you for being part of our beautiful love story"
                </p>
                <p className="text-sm sm:text-lg text-amber-700 italic" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Your presence in our journey means the world to us
                </p>
              </div>

              {/* Special Date */}
              <div className="mb-4 sm:mb-8">
                <p className="text-lg sm:text-2xl text-amber-800 mb-1 sm:mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  Our Engagement Story
                </p>
                <p className="text-base sm:text-xl text-amber-600" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  October 3rd, 2025
                </p>
              </div>

              {/* Romantic Elements */}
              <div className="flex justify-center items-center space-x-4 sm:space-x-6 mb-3 sm:mb-6">
                <span className="text-2xl sm:text-3xl animate-pulse">🌹</span>
                <span className="text-xl sm:text-2xl text-amber-600">�</span>
                <span className="text-2xl sm:text-3xl animate-pulse">🌹</span>
              </div>

              {/* Final Blessing */}
              <div className="bg-amber-100/80 rounded-full px-4 sm:px-8 py-2 sm:py-4 inline-block border border-amber-300">
                <p className="text-sm sm:text-lg text-amber-800" style={{ fontFamily: 'Dancing Script, cursive' }}>
                  With love and gratitude �
                </p>
              </div>

              {/* Book Closing Ornament */}
              <div className="mt-4 sm:mt-8">
                <div className="text-2xl sm:text-3xl text-amber-600 mb-1 sm:mb-2">❦ ❦ ❦</div>
                <div className="w-24 sm:w-48 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
              </div>
            </div>

            {/* Vintage Book Spine Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-1 sm:w-2 bg-gradient-to-b from-amber-500 to-amber-700 shadow-inner"></div>
          </div>

          {/* Copyright/Credits in small vintage style */}
          <div className="text-center mt-4 sm:mt-8">
            <p className="text-xs sm:text-sm text-amber-600/80" style={{ fontFamily: 'Dancing Script, cursive' }}>
              Created with love for our engagement celebration ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
