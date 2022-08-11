import { atom } from "jotai";

export const artistSearchResults = atom<SpotifyApi.ArtistObjectFull[]>([]);

if (process.env.NODE_ENV !== "production") {
  artistSearchResults.debugLabel = "artistSearchResults";
  // debugLabel is 'count' now
}
