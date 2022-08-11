import NextAuth,  from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  // We need to make sure the spotifyApi has the current access token and refresh token
  // That info is needed for the spotifyApi.refreshAccessToken() function to run
  // It returns an object with a body property on it.  This body is the new token
  // so, we rename it to refreshedToken.
  // Lastly, if no error, we must return the token.
  console.log("Refreshing Token...");
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);
    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpired: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (err) {
    console.log("Error Refreshing token", err);
    return { ...token, error: `refreshTokenError` };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // console.log("JWT", token, Date.now(), !!account, !!user);
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpired: account.expires_at * 1000, //handle expires times in milliseconds
        };
      }
      // Return previous token if current token has not expired
      if (Date.now() < token.accessTokenExpired) {
        return token;
      }

      // Access token expired, refresh
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      session.user.expireDate = new Date(token.accessTokenExpired);

      return session;
    },
  },
});
