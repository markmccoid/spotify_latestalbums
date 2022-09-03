import { useAtom } from "jotai";
import {
  removeArtistFromSelected,
  clearSelectedArtists,
} from "../../atoms/selectedArtistsAtom";
import ArtistImage from "../shared/ArtistImage";
import EditArtistContainer from "./EditArtistContainer";

const EditArtists = () => {
  const [selectedArtists, removeArtist] = useAtom(removeArtistFromSelected);
  const [, clearSelected] = useAtom(clearSelectedArtists);

  return (
    <div className="flex flex-grow flex-col overflow-hidden">
      <h1 className="text-2xl font-bold">EditArtists</h1>
      <button onClick={clearSelected}>Clear All</button>
      <div className="flex flex-wrap overflow-y-scroll scrollbar-hide">
        {selectedArtists.map((artist) => (
          <div key={artist.id}>
            <EditArtistContainer
              artistObj={artist}
              removeArtist={removeArtist}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditArtists;
