import { useAtom } from "jotai";
import {
  removeArtistFromSelected,
  clearSelectedArtists,
} from "../../atoms/selectedArtistsAtom";

const EditArtists = () => {
  const [selectedArtists, removeArtist] = useAtom(removeArtistFromSelected);
  const [, clearSelected] = useAtom(clearSelectedArtists);
  return (
    <div>
      <h1>EditArtists</h1>
      <button onClick={clearSelected}>Clear All</button>
      {selectedArtists.map((artist) => (
        <div>
          <div>{artist.name}</div>
          <button onClick={() => removeArtist(artist.id)}>Remove Artist</button>
        </div>
      ))}
    </div>
  );
};

export default EditArtists;
