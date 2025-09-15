import { useEffect, useState, useRef } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

const AutoplayMusic = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPlayPrompt, setShowPlayPrompt] = useState(true);
  const [audioReady, setAudioReady] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Simplified audio loading - just try the basic path and handle errors gracefully
    const audio = new Audio();
    
    // Set up error handling first
    audio.addEventListener('error', (e) => {
      console.log('Audio file not available - continuing without music');
      setLoadError(true);
      setAudioReady(false);
      setShowPlayPrompt(false); // Don't show prompt if audio fails
      setHasInteracted(true); // Skip audio interaction
    });

    audio.addEventListener('canplaythrough', () => {
      setAudioReady(true);
      setLoadError(false);
    });

    audio.addEventListener('loadstart', () => {
      setLoadError(false);
    });
    
    audio.addEventListener('play', () => {
      setIsPlaying(true);
    });
    
    audio.addEventListener('pause', () => {
      setIsPlaying(false);
    });
    
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
    });
    
    // Try to load the audio file
    audio.src = '/song.mp3';
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = 'metadata';
    
    audioRef.current = audio;

    // For mobile devices, always skip audio and go straight to content
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (isMobile) {
      setShowPlayPrompt(false);
      setHasInteracted(true);
      setLoadError(true); // Treat as no audio on mobile
    }

    return () => {
      if (audio) {
        audio.removeEventListener('canplaythrough', () => {});
        audio.removeEventListener('error', () => {});
        audio.removeEventListener('loadstart', () => {});
        audio.removeEventListener('play', () => {});
        audio.removeEventListener('pause', () => {});
        audio.removeEventListener('ended', () => {});
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  const startMusicManually = async () => {
    if (audioRef.current && !loadError) {
      try {
        audioRef.current.currentTime = 0;
        await audioRef.current.play();
        setHasInteracted(true);
        setShowPlayPrompt(false);
      } catch (error) {
        console.log('Could not start music:', error);
        setLoadError(true);
        setShowPlayPrompt(false);
        setHasInteracted(true);
      }
    } else {
      // No audio available, just continue
      setShowPlayPrompt(false);
      setHasInteracted(true);
    }
  };

  // If there's a load error, don't show the prompt at all - just skip audio
  if (loadError) {
    return null; // Don't render anything if audio failed
  }

  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          // Reset to beginning if it's the first play
          if (!hasInteracted) {
            audioRef.current.currentTime = 0;
          }
          await audioRef.current.play();
          if (!hasInteracted) {
            setHasInteracted(true);
            setShowPlayPrompt(false);
          }
        }
      } catch (error) {
        console.log('Error controlling audio:', error);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Show prominent play button if autoplay was blocked or if there's no audio file
  if (showPlayPrompt && !hasInteracted) {
    return (
      <>
        {/* Floating play prompt */}
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-white/95 backdrop-blur-sm border-2 border-primary rounded-xl shadow-2xl p-6 text-center animate-pulse">
            <Music className="h-12 w-12 text-primary mx-auto mb-4 animate-bounce" />
            <h3 className="text-xl font-bold text-primary mb-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
              🎵 Play Our Love Song
            </h3>
            <p className="text-muted-foreground mb-4" style={{ fontFamily: 'Dancing Script, cursive' }}>
              {loadError ? 'Audio file not available in production, but you can still enjoy our beautiful love story!' : 'Click to start the romantic background music'}
            </p>
            <button
              onClick={loadError ? () => {setShowPlayPrompt(false); setHasInteracted(true);} : startMusicManually}
              className="bg-primary text-white px-6 py-3 rounded-full flex items-center space-x-2 mx-auto hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {loadError ? (
                <>
                  <Music className="h-5 w-5" />
                  <span style={{ fontFamily: 'Dancing Script, cursive' }}>Continue to Our Story</span>
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  <span style={{ fontFamily: 'Dancing Script, cursive' }}>Start Music</span>
                </>
              )}
            </button>
            {loadError && (
              <p className="text-amber-600 text-sm mt-2" style={{ fontFamily: 'Dancing Script, cursive' }}>
                � The love story continues even without music
              </p>
            )}
          </div>
        </div>

        {/* Overlay to darken background */}
        <div className="fixed inset-0 bg-black/20 z-40"></div>
      </>
    );
  }

  // Don't render floating controls if audio failed to load
  if (loadError) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white/90 backdrop-blur-sm border-2 border-primary/20 rounded-full shadow-lg p-3">
        <div className="flex items-center space-x-2">
          {/* Music note icon with animation */}
          <div className="relative">
            <Music className={`h-5 w-5 text-primary ${isPlaying ? 'animate-pulse' : ''}`} />
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            )}
          </div>

          {/* Play/Pause button */}
          <button
            onClick={togglePlayPause}
            className="p-2 hover:bg-primary/10 rounded-full transition-colors"
            title={isPlaying ? 'Pause music' : 'Play music'}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-primary" />
            ) : (
              <Play className="h-4 w-4 text-primary" />
            )}
          </button>

          {/* Mute button */}
          <button
            onClick={toggleMute}
            className="p-1 hover:bg-primary/10 rounded-full transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="h-3 w-3 text-muted-foreground" />
            ) : (
              <Volume2 className="h-3 w-3 text-primary" />
            )}
          </button>
        </div>

        {/* Song title */}
        <div className="text-xs text-center mt-1 text-primary/80" style={{ fontFamily: 'Dancing Script, cursive' }}>
          Our Love Song
        </div>
      </div>
    </div>
  );
};

export default AutoplayMusic;
