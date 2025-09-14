import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react';
import { useState } from 'react';

const Playlist = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playlist = [
    { title: "Perfect", artist: "Ed Sheeran", duration: "4:23" },
    { title: "All of Me", artist: "John Legend", duration: "4:05" },
    { title: "A Thousand Years", artist: "Christina Perri", duration: "4:45" },
    { title: "At Last", artist: "Etta James", duration: "3:01" },
    { title: "Can't Help Myself", artist: "The Four Tops", duration: "2:54" },
    { title: "La Vie En Rose", artist: "Édith Piaf", duration: "3:28" },
    { title: "Moon River", artist: "Audrey Hepburn", duration: "2:41" },
  ];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev + 1) % playlist.length);
  };

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  return (
    <section id="playlist" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="ornament mb-4">❦</div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Love Playlist
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Songs that tell the story of our hearts
          </p>
          <div className="ornament mt-4">❦</div>
        </div>

        <div className="modern-card">
          {/* Current Playing */}
          <div className="text-center mb-8">
            <div className="w-56 h-56 mx-auto mb-6 vintage-photo">
              <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center relative overflow-hidden">
                <Music className="h-20 w-20 text-primary-foreground z-10" />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">
              {playlist[currentTrack].title}
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              {playlist[currentTrack].artist}
            </p>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-6 mb-6">
              <button
                onClick={handlePrevious}
                className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <SkipBack className="h-6 w-6 text-secondary-foreground" />
              </button>
              
              <button
                onClick={handlePlayPause}
                className="p-4 rounded-full bg-primary hover:bg-primary/90 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-primary-foreground" />
                ) : (
                  <Play className="h-8 w-8 text-primary-foreground ml-1" />
                )}
              </button>
              
              <button
                onClick={handleNext}
                className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <SkipForward className="h-6 w-6 text-secondary-foreground" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-4 mb-8">
              <span className="text-sm text-muted-foreground">0:00</span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: isPlaying ? '45%' : '0%' }}
                ></div>
              </div>
              <span className="text-sm text-muted-foreground">
                {playlist[currentTrack].duration}
              </span>
            </div>

            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Volume2 className="h-5 w-5" />
              <div className="w-20 h-1 bg-muted rounded-full">
                <div className="w-3/4 h-full bg-primary rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Playlist */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-foreground mb-4">Full Playlist</h4>
            {playlist.map((song, index) => (
              <div
                key={index}
                onClick={() => setCurrentTrack(index)}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentTrack
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {index === currentTrack && isPlaying ? (
                      <Pause className="h-4 w-4 text-primary" />
                    ) : (
                      <Play className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{song.title}</p>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playlist;