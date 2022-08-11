import SpotifyWebApi from "spotify-web-api-node";

// Define needed scopes and create the LOGIN_URL for authentication
const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
  "streaming",
  "user-library-read",
  "user-top-read",
  "user-follow-read",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

// Create the spotifyApi Object to be used throughout the application
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

// Export
export default spotifyApi;

export { LOGIN_URL };
