import { useEffect, useState } from "react";
import { useSpotify } from "../../hooks/useSpotify";
import { extractArtists } from "../../utils/spotifyData";
import { useQuery } from "@tanstack/react-query";
import ArtistResults from "../searchArtists/ArtistResults";
import SpotifyWebApi from "spotify-web-api-node";
import { usePlaylistArtistData } from "../../hooks/usePlaylistTrackData";

type Props = {
  playlistId: string;
  playlistName: string;
};

const PlaylistArtists = ({ playlistId, playlistName }: Props) => {
  const spotifyApi = useSpotify();
  const {
    artistData,
    artistDataLoading,
    artistDataError,
    trackDataLoading,
    trackDataError,
    progress,
  } = usePlaylistArtistData(playlistId);

  return (
    <div>
      <div className="w-max rounded-xl border border-blue-600 bg-blue-600 p-3">
        <h1 className="text-3xl">
          Artists in Playlist{" "}
          <span className="text-slate-800">{playlistName}</span>
        </h1>
      </div>

      {!artistDataLoading && artistData && (
        <ArtistResults artists={artistData} />
      )}
      {trackDataLoading && (
        <div className="text-3xl">Loading Playlist data...</div>
      )}
      {artistDataLoading && !trackDataLoading && (
        <div>
          <div className="text-3xl">Loading Artist data... {progress}</div>
        </div>
      )}
    </div>
  );
};

export default PlaylistArtists;
