import { SelectedArtistAtom } from "../../atoms/selectedArtistsAtom";
import ArtistImage from "../shared/ArtistImage";

type Props = {
  artistObj: SelectedArtistAtom;
  removeArtist: (id: string) => void;
};
const EditArtistContainer = ({ artistObj, removeArtist }: Props) => {
  console.log("in edit container");
  return (
    <div
      className="mr-3 flex w-[400px] cursor-pointer flex-row space-x-4 rounded-2xl 
border-2 border-highlight_bg bg-mm_light py-3 px-2 transition duration-700"
    >
      <ArtistImage images={artistObj.imageURL} />
      <div className="text-2xl font-bold text-black">{artistObj.name}</div>
      <button onClick={() => removeArtist(artistObj.id)}>Remove Artist</button>
    </div>
  );
};

export default EditArtistContainer;
