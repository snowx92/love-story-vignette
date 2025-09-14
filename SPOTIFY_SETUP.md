# Spotify Integration Setup

Your Playlist component is now integrated with Spotify! Here's how to set it up:

## 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the app details:
   - **App name**: Your app name (e.g., "Love Story Vignette")
   - **App description**: Brief description
   - **Website**: Your website URL (can be localhost for development)
   - **Redirect URI**: `http://localhost:5173/callback` (for development)
5. Click "Save"

## 2. Get Your Credentials

1. In your app dashboard, click on your app
2. Copy the **Client ID**
3. Click "Show Client Secret" and copy it (you'll need this for backend integration)

## 3. Configure Environment Variables

1. Copy `env.example` to `.env`:

   ```bash
   cp env.example .env
   ```

2. Edit `.env` and add your Spotify credentials:

   ```
   VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
   VITE_SPOTIFY_REDIRECT_URI=http://localhost:5173/callback
   ```

## 4. Features

### What's Working

- ✅ **Direct Playlist Links** - Paste any Spotify playlist URL
- ✅ Connect to Spotify (optional)
- ✅ View your playlists
- ✅ Display real track information
- ✅ Show album artwork
- ✅ Link to Spotify tracks
- ✅ Fallback to static playlist when not connected

### What You Can Do

#### **Easy Way (Requires Spotify App Setup):**

- Create a Spotify app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
- Get your **Client ID** and **Client Secret**
- Add them to your `.env` file:

  ```
  VITE_SPOTIFY_CLIENT_ID=your_client_id_here
  VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
  ```

- Copy any Spotify playlist link (e.g., `https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M`)
- Paste it into the input field
- Click "Load" to display the playlist
- Works with any public Spotify playlist!

#### **Full Integration (Optional):**

- Click "Connect with Spotify" to authenticate
- Select any of your playlists from the dropdown
- View real track information with album artwork
- Click "Open in Spotify" to play tracks in Spotify
- The component gracefully falls back to the original static playlist when not connected

## 5. Production Setup

For production, you'll need to:

1. Add your production domain to the Spotify app's redirect URIs
2. Set up a backend to handle the OAuth flow securely
3. Update the redirect URI in your environment variables

## 6. Backend Integration (Optional)

For a complete implementation, you should set up a backend to:

- Handle the OAuth code exchange securely
- Store and refresh access tokens
- Make API calls from the server side

The current implementation works for development and demonstration purposes.

## Troubleshooting

- **"Invalid redirect URI"**: Make sure the redirect URI in your Spotify app matches exactly what's in your `.env` file
- **"Invalid client"**: Check that your Client ID is correct
- **CORS errors**: These are normal in development - the component handles them gracefully

Enjoy your Spotify-integrated love story playlist! 🎵💕
