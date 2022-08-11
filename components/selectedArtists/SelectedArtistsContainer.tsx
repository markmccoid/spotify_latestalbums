import { useAtom } from "jotai";
import {
  removeArtistFromSelected,
  selectedArtistsAtom,
} from "../../atoms/selectedArtistsAtom";
import { GoTrashcan } from "react-icons/go";

export const SelectedArtistsContainer = () => {
  // const [selectedArtists] = useAtom(selectedArtistsAtom);
  const [selectedArtists, removeArtist] = useAtom(removeArtistFromSelected);
  const noArtistsSelected = selectedArtists.length === 0 || !selectedArtists;

  return (
    <div className="flex flex-col">
      <h1 className="flex w-full justify-center bg-slate-600 p-2 text-3xl">
        Selected Artists
      </h1>
      {noArtistsSelected && (
        <div className="p-2 text-2xl">Select an Artist</div>
      )}
      <div className="space-y-4 p-2 text-2xl">
        {selectedArtists.map((artist) => {
          return (
            <div className="flex flex-row justify-between pr-4">
              <div>{artist.name}</div>
              <button
                onClick={() => removeArtist(artist.id)}
                className="rounded-lg border bg-gray-200 px-1 text-red-600 hover:bg-red-600 hover:text-white"
              >
                <GoTrashcan size={20} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedArtistsContainer;
