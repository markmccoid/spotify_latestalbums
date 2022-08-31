import { useSpotify } from "./useSpotify";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import { SelectedArtistAtom } from "../atoms/selectedArtistsAtom";

type Artists = {
  id: string;
  name: string;
  spotifyArtistURL: string;
};

export type ArtistAlbums = {
  albumId: string;
  albumType: "album" | "single" | "appears_on" | "compilation";
  spotifyAlbumURL: string;
  image: SpotifyApi.ImageObject;
  name: string;
  release_date: string;
  total_tracks: number;
  uri: string;
  artists: Artists[];
};

function getArtists(artistArr: SpotifyApi.ArtistObjectSimplified[]) {
  return artistArr.map((artist) => {
    return {
      id: artist.id,
      name: artist.name,
      spotifyArtistURL: artist.external_urls.spotify,
    };
  });
}

const getAlbumsQuery =
  (spotifyApi: SpotifyWebApi) =>
  async (selectedArtistId: string | undefined) => {
    // we should never get here with nothing defined, but if so, just return
    if (!selectedArtistId) return undefined;

    //-- Get full artist record for passed artist
    const albumData = await spotifyApi.getArtistAlbums(selectedArtistId, {
      // other groups "single,appears_on,compilation
      include_groups: "album",
    });
    const singleData = await spotifyApi.getArtistAlbums(selectedArtistId, {
      // other groups "single,appears_on,compilation
      include_groups: "single",
    });
    const albumItems = albumData?.body?.items;
    let artistAlbums: ArtistAlbums[] = [];
    // compile the album data into the artistAlbums array
    for (const album of albumItems) {
      artistAlbums.push({
        albumId: album.id,
        albumType: "album", //album.type,
        spotifyAlbumURL: album.external_urls.spotify,
        image: album.images[0],
        name: album.name,
        release_date: album.release_date,
        total_tracks: album.total_tracks,
        uri: album.uri,
        artists: getArtists(album.artists),
      });
    }

    // compile the single data into the artistAlbums array
    const singleItems = singleData?.body?.items;
    for (const single of singleItems) {
      artistAlbums.push({
        albumId: single.id,
        albumType: "single", //single.type,
        spotifyAlbumURL: single.external_urls.spotify,
        image: single.images[0],
        name: single.name,
        release_date: single.release_date,
        total_tracks: single.total_tracks,
        uri: single.uri,
        artists: getArtists(single.artists),
      });
    }

    return artistAlbums;
  };

const useSingleArtistAlbums = (selectedArtistId: string | undefined) => {
  const spotifyApi = useSpotify();
  const getAlbums = useCallback(getAlbumsQuery(spotifyApi), []);
  const { data, isLoading, isError, fetchStatus, refetch } = useQuery(
    ["artistAlbums", selectedArtistId],
    () => getAlbums(selectedArtistId),
    { enabled: !!selectedArtistId }
  );

  const artistAlbumsData = data;
  // console.log("ARTIST USE", artistAlbumsData);
  return { artistAlbumsData, isLoading, fetchStatus, isError, refetch };
};

export default useSingleArtistAlbums;
