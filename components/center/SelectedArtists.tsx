import { useAtom } from "jotai";
import { useRecoilValue } from "recoil";
import { selectedArtistsAtom } from "../../atoms/selectedArtistsAtom";
import { selectDistinctArtists } from "../../atoms/selectedArtistsAtom";

const SelectedArtists = () => {
  // const selectedArtists = useRecoilValue(selectDistinctArtists);
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  return (
    <div className="">
      <h1 className="mb-2 border-b-2 border-white text-center text-3xl">
        SelectedArtists
      </h1>
      <div className="items-left flex flex-col">
        {selectedArtists.map((artist) => {
          return (
            <div className="px-2">
              {/* <div>{artist.id}</div> */}
              <div>{artist.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectedArtists;
