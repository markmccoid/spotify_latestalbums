import Image from "next/image";
import { useEffect, useState } from "react";
import placehold from "../../public/images/headphones_placeholder.png";

import { useAtom } from "jotai";
import { addArtistToSelected } from "../../atoms/selectedArtistsAtom";

type Props = {
  artistObj: SpotifyApi.ArtistObjectFull;
};

const ArtistItem = ({ artistObj }: Props) => {
  // console.log("ARTIST", artistObj.name, artistObj.images);
  // const image = placehold;
  const [isSelected, setIsSelected] = useState(false);
  const image =
    !artistObj?.images || artistObj.images.length === 0
      ? placehold
      : artistObj?.images[0].url;
  //  const setArtists = useSetRecoilState(selectedArtistsAtom);
  const [selectedArtists, setArtists] = useAtom(addArtistToSelected);
  useEffect(() => {
    if (selectedArtists.some((el) => el.id === artistObj.id)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedArtists]);
  return (
    <div
      className={`flex w-full flex-row items-center justify-start space-x-6 space-y-1 
      ${isSelected && "border border-red-900"}`}
    >
      <div
        className="group relative h-[100px] w-[100px] cursor-pointer overflow-hidden
          rounded-xl "
      >
        <Image src={image} layout="fill" objectFit="cover" />
      </div>

      <div className=" w-max rounded-md border border-gray-700 bg-gray-500 px-2 text-2xl  text-white">
        {artistObj.name}
      </div>

      <button
        className={`  border border-white bg-gray-600 
        p-1 ${isSelected && "text-gray-400"}
        ${
          !isSelected &&
          "text-white transition duration-200 ease-out hover:scale-105"
        }`}
        disabled={isSelected}
        onClick={() =>
          setArtists({
            id: artistObj.id,
            name: artistObj.name,
            imageURL: artistObj.images[0],
          })
        }
      >
        Add Artist {artistObj.name}
      </button>
    </div>
  );
};

export default ArtistItem;
