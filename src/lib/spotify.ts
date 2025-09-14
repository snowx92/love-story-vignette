import SpotifyWebApi from 'spotify-web-api-js';

// Initialize Spotify Web API
const spotifyApi = new SpotifyWebApi();

// Spotify configuration
export const SPOTIFY_CONFIG = {
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID || '',
  redirectUri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'http://localhost:5173/callback',
  scopes: [
    'user-read-private',
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing'
  ]
};

// Types for Spotify data
export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{
    id: string;
    name: string;
  }>;
  duration_ms: number;
  preview_url: string | null;
  album: {
    id: string;
    name: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyPlaylist {
  id: string;
  name: string;
  description: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  tracks: {
    items: Array<{
      track: SpotifyTrack;
    }>;
  };
}

// Authentication functions
export const getAuthUrl = (): string => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.clientId,
    response_type: 'code',
    redirect_uri: SPOTIFY_CONFIG.redirectUri,
    scope: SPOTIFY_CONFIG.scopes.join(' '),
    show_dialog: 'true'
  });
  
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const setAccessToken = (token: string) => {
  spotifyApi.setAccessToken(token);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem('spotify_access_token');
};

export const setTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem('spotify_access_token', accessToken);
  if (refreshToken) {
    localStorage.setItem('spotify_refresh_token', refreshToken);
  }
  setAccessToken(accessToken);
};

export const clearTokens = () => {
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
  spotifyApi.setAccessToken('');
};

// API functions
export const getPlaylist = async (playlistId: string): Promise<SpotifyPlaylist> => {
  try {
    const playlist = await spotifyApi.getPlaylist(playlistId);
    return playlist as SpotifyPlaylist;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw error;
  }
};

export const getUserPlaylists = async (): Promise<SpotifyPlaylist[]> => {
  try {
    const playlists = await spotifyApi.getUserPlaylists();
    return playlists.items as SpotifyPlaylist[];
  } catch (error) {
    console.error('Error fetching user playlists:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await spotifyApi.getMe();
  } catch (error) {
    console.error('Error fetching current user:', error);
    throw error;
  }
};

// Utility functions
export const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Extract playlist ID from Spotify URL
export const extractPlaylistId = (url: string): string | null => {
  const patterns = [
    /spotify:playlist:([a-zA-Z0-9]+)/,
    /open\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/,
    /play\.spotify\.com\/playlist\/([a-zA-Z0-9]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
};

// Get public playlist using Spotify Web API with client credentials
export const getPublicPlaylist = async (playlistId: string): Promise<SpotifyPlaylist> => {
  try {
    const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      throw new Error('Spotify Client ID and Client Secret must be configured');
    }

    // Get access token using client credentials flow
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json();
      throw new Error(`Failed to get access token: ${errorData.error_description || errorData.error}`);
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Fetch the playlist with the access token
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch playlist: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }
    
    const playlist = await response.json();
    return playlist as SpotifyPlaylist;
  } catch (error) {
    console.error('Error fetching public playlist:', error);
    throw error;
  }
};

export const getAlbumArtwork = (track: SpotifyTrack, size: 'small' | 'medium' | 'large' = 'medium'): string => {
  if (!track.album.images.length) return '';
  
  const sizeMap = {
    small: 64,
    medium: 300,
    large: 640
  };
  
  const targetSize = sizeMap[size];
  const image = track.album.images.find(img => img.height >= targetSize) || track.album.images[0];
  
  return image.url;
};

export default spotifyApi;
