import { useCallback, useEffect, useState } from 'react';
import {
    clearTokens,
    getAccessToken,
    getCurrentUser,
    getPlaylist,
    getUserPlaylists,
    SpotifyPlaylist
} from '../lib/spotify';

interface UseSpotifyReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  playlists: SpotifyPlaylist[];
  currentPlaylist: SpotifyPlaylist | null;
  error: string | null;
  login: () => void;
  logout: () => void;
  loadPlaylist: (playlistId: string) => Promise<void>;
  loadUserPlaylists: () => Promise<void>;
}

export const useSpotify = (): UseSpotifyReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<SpotifyPlaylist | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      if (token) {
        try {
          const userData = await getCurrentUser();
          setUser(userData);
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Token validation failed:', err);
          clearTokens();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const handleCallback = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      const error = urlParams.get('error');

      if (error) {
        setError('Authentication failed: ' + error);
        setIsLoading(false);
        return;
      }

      if (code) {
        // In a real app, you'd exchange the code for tokens on your backend
        // For now, we'll assume the token is already set
        const token = getAccessToken();
        if (token) {
          setIsAuthenticated(true);
          loadUserData();
        }
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    handleCallback();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      await loadUserPlaylists();
    } catch (err) {
      setError('Failed to load user data');
      console.error(err);
    }
  };

  const login = useCallback(() => {
    const authUrl = `https://accounts.spotify.com/authorize?${new URLSearchParams({
      client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
      response_type: 'code',
      redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'http://localhost:5173/callback',
      scope: 'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-playback-state user-modify-playback-state user-read-currently-playing',
      show_dialog: 'true'
    }).toString()}`;
    
    window.location.href = authUrl;
  }, []);

  const logout = useCallback(() => {
    clearTokens();
    setIsAuthenticated(false);
    setUser(null);
    setPlaylists([]);
    setCurrentPlaylist(null);
    setError(null);
  }, []);

  const loadUserPlaylists = useCallback(async () => {
    try {
      setIsLoading(true);
      const userPlaylists = await getUserPlaylists();
      setPlaylists(userPlaylists);
    } catch (err) {
      setError('Failed to load playlists');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadPlaylist = useCallback(async (playlistId: string) => {
    try {
      setIsLoading(true);
      const playlist = await getPlaylist(playlistId);
      setCurrentPlaylist(playlist);
    } catch (err) {
      setError('Failed to load playlist');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isAuthenticated,
    isLoading,
    user,
    playlists,
    currentPlaylist,
    error,
    login,
    logout,
    loadPlaylist,
    loadUserPlaylists
  };
};
