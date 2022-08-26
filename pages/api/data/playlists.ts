import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import spotifyApi from "../../../lib/spotify";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // If actually using this, would need to check if accessToken expired
  // and redirect to login
  spotifyApi.setAccessToken(token.accessToken);
  const data = await spotifyApi.getUserPlaylists({ limit: 2 });
  const playlistsArr = data?.body?.items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.images[0],
      tracks: item.tracks,
    };
  });
  res.status(200).json(playlistsArr);
}
