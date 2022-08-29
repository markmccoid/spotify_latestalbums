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

export type ArtistMusic = {
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
type Artist = {
  artistId: string;
  artistName: string;
  artistImage: string;
  artistMusic: ArtistMusic[];
};

type ArtistMap = Map<string, ArtistMusic[]>;

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
  (spotifyApi: SpotifyWebApi) => async (selectedArtists: SelectedArtistAtom[]) => {
    //-- Make list unique by artist ID
    // console.log("in getAlbumsQuery");
    let finalAlbumsList = [];
    const finalMapList: ArtistMap = new Map();
    let counter = 1;
    //-- Get full artist record for each artist in unique list
    for (const artist of selectedArtists) {
      const artistId = artist.id;

      const albumData = await spotifyApi.getArtistAlbums(artistId, {
        // other groups "single,appears_on,compilation
        //
        include_groups: "album",
      });
      const singleData = await spotifyApi.getArtistAlbums(artistId, {
        // other groups "single,appears_on,compilation
        //
        include_groups: "single",
      });
      const albumItems = albumData?.body?.items;
      let artistMusic: ArtistMusic[] = [];
      // compile the album data into the artisMusic array
      for (const album of albumItems) {
        artistMusic.push({
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

      // compile the single data into the artisMusic array
      const singleItems = singleData?.body?.items;
      for (const single of singleItems) {
        artistMusic.push({
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

      const queryArtist = {
        artistId: artist.id,
        artistName: artist.name,
        artistImage: artist.imageURL,
        artistMusic,
      };
      //
      // console.log("DATA", queryArtist);
      finalAlbumsList.push(queryArtist);
      finalMapList.set(artist.name, artistMusic);
      // stateUpdater(counter.toString());
      counter++;
    }

    return finalMapList;
    return finalAlbumsList;
  };

const useArtistData = (selectedArtists: SelectedArtistAtom[]) => {
  const spotifyApi = useSpotify();
  const getAlbums = useCallback(getAlbumsQuery(spotifyApi), []);
  const { data, isLoading, isError, refetch } = useQuery(
    ["artistAlbums", selectedArtists],
    () => getAlbums(selectedArtists)
  );

  const artistAlbumsData = data;
  // console.log("ARTIST USE", artistAlbumsData);
  return { artistAlbumsData, isLoading, isError, refetch };
};

export default useArtistData;
