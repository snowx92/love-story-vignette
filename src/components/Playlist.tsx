import {
  ExternalLink,
  Music,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSpotify } from "../hooks/useSpotify";
import { useSpotifyPlayer } from "../hooks/useSpotifyPlayer";
import {
  extractPlaylistId,
  formatDuration,
  getAlbumArtwork,
  getPublicPlaylist,
  SpotifyPlaylist,
  SpotifyTrack,
} from "../lib/spotify";

const Playlist = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");
  const [playlistUrl, setPlaylistUrl] = useState<string>(
    "https://open.spotify.com/playlist/4FDlvbv42qd1gOOSc4RXtl?si=tGiXCeN_TUOeE0MhYkpmNg&pi=CKxs6hVYTUONm"
  );
  const [isLoadingPlaylist, setIsLoadingPlaylist] = useState(false);
  const [publicPlaylist, setPublicPlaylist] = useState<SpotifyPlaylist | null>(
    null
  );
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [previewMessage, setPreviewMessage] = useState<string>("");
  const [enableSpotifyPlayer, setEnableSpotifyPlayer] = useState(false);

  const {
    isAuthenticated,
    isLoading,
    user,
    playlists,
    currentPlaylist,
    error,
    login,
    logout,
    loadPlaylist,
  } = useSpotify();

  // Get access token for Spotify Player
  const accessToken = localStorage.getItem("spotify_access_token");

  const {
    isReady: playerReady,
    isPlaying: playerIsPlaying,
    currentTrack: playerCurrentTrack,
    position: playerPosition,
    duration: playerDuration,
    volume: playerVolume,
    error: playerError,
    playTrack,
    pause: playerPause,
    resume: playerResume,
    setVolume: playerSetVolume,
    seek: playerSeek,
    nextTrack: playerNextTrack,
    previousTrack: playerPreviousTrack,
  } = useSpotifyPlayer(accessToken);

  // No fallback playlist - only load from Spotify

  // Get current tracks (Spotify or fallback)
  const tracks =
    currentPlaylist?.tracks?.items
      ?.map((item) => item.track)
      .filter((track) => track) || [];

  // Get public playlist tracks
  const publicTracks =
    publicPlaylist?.tracks?.items
      ?.map((item) => item.track)
      .filter((track) => track) || [];

  const displayTracks: SpotifyTrack[] =
    publicTracks.length > 0 ? publicTracks : tracks.length > 0 ? tracks : [];

  // Auto-load the default playlist on component mount
  useEffect(() => {
    const loadDefaultPlaylist = async () => {
      if (playlistUrl && !publicPlaylist) {
        const playlistId = extractPlaylistId(playlistUrl);
        if (playlistId) {
          setIsLoadingPlaylist(true);
          try {
            const playlist = await getPublicPlaylist(playlistId);
            setPublicPlaylist(playlist);
          } catch (error) {
            console.error("Error loading default playlist:", error);
            // Show a helpful message about setup
            alert(
              "To load Spotify playlists, you need to set up a Spotify app with Client ID and Client Secret. See SPOTIFY_SETUP.md for instructions."
            );
          } finally {
            setIsLoadingPlaylist(false);
          }
        }
      }
    };

    loadDefaultPlaylist();
  }, [playlistUrl, publicPlaylist]);

  const handlePlayPause = async () => {
    if (enableSpotifyPlayer && playerReady) {
      if (playerIsPlaying) {
        await playerPause();
      } else {
        await playerResume();
      }
    } else {
      if (isPlaying) {
        audio?.pause();
        setIsPlaying(false);
      } else {
        playCurrentTrack();
      }
    }
  };

  const playCurrentTrack = () => {
    const track = displayTracks[currentTrack];

    if (track && track.preview_url) {
      // Stop current audio if playing
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Create new audio element
      const newAudio = new Audio(track.preview_url);

      // Add event listeners before playing
      newAudio.oncanplay = () => {
        newAudio.play().catch((error) => {
          console.error("Audio play failed:", error);
          setIsPlaying(false);
          setAudio(null);
          setPreviewMessage(
            "Could not play preview. Enable Spotify Player for full songs!"
          );
          setTimeout(() => setPreviewMessage(""), 5000);
        });
      };

      newAudio.onended = () => {
        setIsPlaying(false);
        setAudio(null);
      };

      newAudio.onerror = (error) => {
        console.error("Audio error:", error);
        setIsPlaying(false);
        setAudio(null);
        setPreviewMessage(
          "Preview not available. Enable Spotify Player for full songs!"
        );
        setTimeout(() => setPreviewMessage(""), 5000);
      };

      setAudio(newAudio);
      setIsPlaying(true);
    } else {
      // Auto-open Spotify for tracks without previews
      if (track.external_urls?.spotify) {
        window.open(track.external_urls.spotify, "_blank");
        setPreviewMessage("🎵 Opening in Spotify for full song playback!");
        setTimeout(() => setPreviewMessage(""), 3000);
      } else {
        setPreviewMessage(
          "🎵 Preview not available. Connect with Spotify above for full songs!"
        );
        setTimeout(() => setPreviewMessage(""), 5000);
      }
    }
  };

  const handleNext = async () => {
    if (enableSpotifyPlayer && playerReady) {
      await playerNextTrack();
    } else {
      setCurrentTrack((prev) => (prev + 1) % displayTracks.length);
    }
  };

  const handlePrevious = async () => {
    if (enableSpotifyPlayer && playerReady) {
      await playerPreviousTrack();
    } else {
      setCurrentTrack(
        (prev) => (prev - 1 + displayTracks.length) % displayTracks.length
      );
    }
  };

  const handlePlaylistSelect = (playlistId: string) => {
    setSelectedPlaylistId(playlistId);
    loadPlaylist(playlistId);
    setCurrentTrack(0);
  };

  const handlePlaylistUrlSubmit = async () => {
    if (!playlistUrl.trim()) return;

    const playlistId = extractPlaylistId(playlistUrl);
    if (!playlistId) {
      alert(
        "Invalid Spotify playlist URL. Please check the link and try again."
      );
      return;
    }

    setIsLoadingPlaylist(true);
    try {
      const playlist = await getPublicPlaylist(playlistId);
      setPublicPlaylist(playlist);
      setCurrentTrack(0);
    } catch (error) {
      console.error("Error loading playlist:", error);
      alert(
        "Failed to load playlist. Make sure the playlist is public and the URL is correct."
      );
    } finally {
      setIsLoadingPlaylist(false);
    }
  };

  // Get current track info
  const getCurrentTrackInfo = () => {
    const track = displayTracks[currentTrack];
    if (track) {
      return {
        title: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        duration: formatDuration(track.duration_ms),
        artwork: getAlbumArtwork(track, "large"),
        spotifyUrl: track.external_urls.spotify,
      };
    }
    return {
      title: "Loading...",
      artist: "",
      duration: "0:00",
      artwork: "",
      spotifyUrl: "",
    };
  };

  const currentTrackInfo = getCurrentTrackInfo();

  return (
    <section id="playlist" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="ornament mb-4">❦</div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Our Love Playlist
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Songs that tell the story of our hearts
          </p>

          {/* Spotify Connect & Player */}
          <div className="mb-6 space-y-4">
            {!isAuthenticated ? (
              <div className="text-center">
                <button
                  onClick={login}
                  disabled={isLoading}
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors font-medium"
                >
                  <Music className="h-5 w-5" />
                  <span>
                    {isLoading
                      ? "Connecting..."
                      : "Connect with Spotify for Full Songs"}
                  </span>
                </button>
                <p className="text-sm text-muted-foreground mt-3">
                  🎵 Connect to play full songs, skip tracks, and control
                  playback
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4">
                  <p className="text-sm text-green-600 mb-2">
                    ✅ Connected as {user?.display_name || user?.id}
                  </p>
                  <button
                    onClick={() => setEnableSpotifyPlayer(!enableSpotifyPlayer)}
                    className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors ${
                      enableSpotifyPlayer
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-muted hover:bg-muted/80 text-foreground"
                    }`}
                  >
                    <Music className="h-5 w-5" />
                    <span>
                      {enableSpotifyPlayer
                        ? "Spotify Player Active"
                        : "Enable Spotify Player"}
                    </span>
                  </button>
                </div>
                {enableSpotifyPlayer && (
                  <p className="text-sm text-muted-foreground">
                    {playerReady
                      ? "✅ Player Ready - Full songs available!"
                      : "⏳ Loading Spotify Player..."}
                  </p>
                )}
                <button
                  onClick={logout}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors mt-2"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
              {error}
            </div>
          )}

          <div className="ornament mt-4">❦</div>
        </div>

        <div className="modern-card">
          {/* Current Playing */}
          <div className="text-center mb-8">
            <div className="w-56 h-56 mx-auto mb-6 vintage-photo">
              {currentTrackInfo.artwork ? (
                <img
                  src={currentTrackInfo.artwork}
                  alt={`${currentTrackInfo.title} album artwork`}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <Music className="h-20 w-20 text-primary-foreground z-10" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                </div>
              )}
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-2">
              {currentTrackInfo.title}
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              {currentTrackInfo.artist}
            </p>

            {/* Preview Message */}
            {previewMessage && (
              <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
                <div className="flex items-center space-x-2">
                  <Music className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">{previewMessage}</span>
                </div>
              </div>
            )}

            {/* Spotify Link */}
            {currentTrackInfo.spotifyUrl && (
              <div className="mb-6">
                <a
                  href={currentTrackInfo.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Open in Spotify</span>
                </a>
              </div>
            )}

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
                {(enableSpotifyPlayer ? playerIsPlaying : isPlaying) ? (
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
                  style={{ width: isPlaying ? "45%" : "0%" }}
                ></div>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentTrackInfo.duration}
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
            <div className="text-center mb-6">
              <h4 className="text-2xl font-bold text-primary mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {publicPlaylist
                  ? publicPlaylist.name
                  : currentPlaylist
                  ? currentPlaylist.name
                  : "Full Playlist"}
              </h4>
              {!enableSpotifyPlayer && (
                <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full inline-block">
                  💡 Enable Spotify Player for full songs
                </div>
              )}
            </div>
            <div
              className="max-h-80 overflow-y-scroll space-y-3"
              style={{
                scrollbarWidth: "auto",
                scrollbarColor: "#6b7280 #f3f4f6",
              }}
            >
              {displayTracks.map((track, index) => {
                const trackInfo = {
                  title: track.name,
                  artist: track.artists.map((a) => a.name).join(", "),
                  duration: formatDuration(track.duration_ms),
                  artwork: getAlbumArtwork(track, "small"),
                };

                return (
                  <div
                    key={index}
                    onClick={async () => {
                      setCurrentTrack(index);
                      const track = displayTracks[index];

                      if (enableSpotifyPlayer && playerReady && track) {
                        // Use Spotify Player for full songs
                        const trackUri = `spotify:track:${track.id}`;
                        await playTrack(trackUri);
                      } else {
                        // Fallback to preview audio
                        if (audio) {
                          audio.pause();
                          audio.currentTime = 0;
                        }

                        setTimeout(() => {
                          if (track && track.preview_url) {
                            const newAudio = new Audio(track.preview_url);

                            newAudio.oncanplay = () => {
                              newAudio.play().catch((error) => {
                                console.error("Audio play failed:", error);
                                setIsPlaying(false);
                                setAudio(null);
                                setPreviewMessage(
                                  "Could not play preview. Enable Spotify Player for full songs!"
                                );
                                setTimeout(() => setPreviewMessage(""), 5000);
                              });
                            };

                            newAudio.onended = () => {
                              setIsPlaying(false);
                              setAudio(null);
                            };

                            newAudio.onerror = (error) => {
                              console.error("Audio error:", error);
                              setIsPlaying(false);
                              setAudio(null);
                              setPreviewMessage(
                                "Preview not available. Enable Spotify Player for full songs!"
                              );
                              setTimeout(() => setPreviewMessage(""), 5000);
                            };

                            setAudio(newAudio);
                            setIsPlaying(true);
                          } else {
                            // Auto-open Spotify for tracks without previews
                            if (track.external_urls?.spotify) {
                              window.open(
                                track.external_urls.spotify,
                                "_blank"
                              );
                              setPreviewMessage(
                                "🎵 Opening in Spotify for full song playback!"
                              );
                              setTimeout(() => setPreviewMessage(""), 3000);
                            } else {
                              setPreviewMessage(
                                "🎵 Preview not available. Connect with Spotify above for full songs!"
                              );
                              setTimeout(() => setPreviewMessage(""), 5000);
                            }
                          }
                        }, 100);
                      }
                    }}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      index === currentTrack
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {index === currentTrack &&
                        (enableSpotifyPlayer ? playerIsPlaying : isPlaying) ? (
                          <Pause className="h-4 w-4 text-primary" />
                        ) : (
                          <Play className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      {trackInfo.artwork && (
                        <img
                          src={trackInfo.artwork}
                          alt={`${trackInfo.title} artwork`}
                          className="w-10 h-10 rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          {trackInfo.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {trackInfo.artist}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {trackInfo.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playlist;
