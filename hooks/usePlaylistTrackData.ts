import { useState } from "react";
import { useSpotify } from "./useSpotify";
import { useQuery } from "@tanstack/react-query";
import SpotifyWebApi from "spotify-web-api-node";
import { extractArtists } from "../utils/spotifyData";

//-- Playlist track query function
type PlaylistReturnType = {
  tracks: SpotifyApi.PlaylistTrackObject[];
  playlistInfo: {
    name?: string;
    image?: SpotifyApi.ImageObject;
  };
};
const getPlaylistTracks =
  (spotifyApi: SpotifyWebApi) => async (playlistId: string | undefined) => {
    if (!playlistId) return [];
    const data = await spotifyApi.getPlaylist(playlistId);
    // const tracks = data?.body?.tracks.items;
    // const playlistInfo = {
    //   name: data?.body?.name,
    //   image: data?.body?.images[0],
    // };

    // return extractArtists(data?.body?.tracks.items, spotifyApi);
    return data?.body?.tracks.items;
  };

//-- Get unique artists query function
const getUniqArtists =
  (spotifyApi: SpotifyWebApi, stateUpdater) =>
  async (artists: SpotifyApi.PlaylistTrackObject[] | undefined) => {
    if (artists) {
      return extractArtists(artists, spotifyApi, stateUpdater);
    }
    return;
  };

/**
 * Accepts a playlistId, then extracts all of the tracks and
 * finds all artists associated with the tracks
 * Final result is a deduped list of Artists Objects
 * The query for the playlist data and artist data takes place
 * in two separate calls so loading and error indicators are
 * returned for both.  Assumption is that Track data loads first
 * and then Artist data.
 * When artist data loads, we also return a progress indicator which is
 * a count (in string form) of which recording being processed.
 * @param playlistId
 * @returns
 */
export const usePlaylistArtistData = (playlistId: string | undefined) => {
  const [progress, setProgress] = useState("");
  const spotifyApi = useSpotify();
  const queryPlaylistTracks = getPlaylistTracks(spotifyApi);
  const queryUniqArtists = getUniqArtists(spotifyApi, setProgress);

  //* Get tracks in the playlist
  const {
    data: trackData,
    isLoading: trackDataLoading,
    isError: trackDataError,
  } = useQuery(
    ["queryPlaylistTracks", playlistId],
    () => queryPlaylistTracks(playlistId),
    { cacheTime: 10000 }
  );

  //* Get unique artists from playlist tracks
  const {
    data: artistData,
    isLoading: artistDataLoading,
    isError: artistDataError,
  } = useQuery(
    ["queryUniqArtists", trackData],
    () => queryUniqArtists(trackData),
    {
      enabled: !!trackData,
    }
  );

  return {
    artistData,
    artistDataLoading,
    artistDataError,
    trackDataLoading,
    trackDataError,
    progress,
  };
};
