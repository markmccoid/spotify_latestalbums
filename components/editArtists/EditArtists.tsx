import { useAtom } from "jotai";
import {
  removeArtistFromSelected,
  clearSelectedArtists,
} from "../../atoms/selectedArtistsAtom";
import ArtistImage from "../shared/ArtistImage";
import EditArtistContainer from "./editArtistContainer";

const EditArtists = () => {
  const [selectedArtists, removeArtist] = useAtom(removeArtistFromSelected);
  const [, clearSelected] = useAtom(clearSelectedArtists);

  return (
    <div>
      <h1>EditArtists</h1>
      <button onClick={clearSelected}>Clear All</button>
      {selectedArtists.map((artist) => (
        <div key={artist.id}>
          <EditArtistContainer artistObj={artist} removeArtist={removeArtist} />
        </div>
      ))}
    </div>
  );
};

export default EditArtists;
