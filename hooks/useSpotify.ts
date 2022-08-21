import { useEffect } from "react";
import spotifyApi from "../lib/spotify";
import { signIn, useSession } from "next-auth/react";

export const useSpotify = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    // console.log(
    //   "in useSpotify useEffect",
    //   session?.expires,
    //   session?.user?.accessToken
    // );
    if (session) {
      if (session.error === "refreshTokenError") {
        signIn();
      }
      if (session?.user?.accessToken) {
        spotifyApi.setAccessToken(session.user.accessToken);
      } else {
        console.log("TOKEN ISSUE", session?.user);
      }
    }
  }, [session, status]);

  return spotifyApi;
};
