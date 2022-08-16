import { useAtom } from "jotai";
import { selectedPlaylistAtom } from "../../atoms/selectedPlaylistAtom";
import { usePlaylistArtistData } from "../../hooks/usePlaylistTrackData";
import ArtistResults from "../searchArtists/ArtistResults";

type Props = {
  playlistId: string | undefined;
};
const PlaylistResults = () => {
  const [selectedPlaylist] = useAtom(selectedPlaylistAtom);

  const {
    artistData,
    artistDataLoading,
    artistDataError,
    trackDataLoading,
    trackDataError,
    progress,
  } = usePlaylistArtistData(selectedPlaylist?.id); //selectedPlaylist?.id);

  return (
    <div className="flex flex-grow flex-col">
      <div className="w-max rounded-xl border border-blue-600 bg-blue-600 p-3">
        <h1 className="text-3xl">
          Artists in Playlist{" "}
          <span className="text-slate-800">{selectedPlaylist?.name}</span>
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

export default PlaylistResults;
