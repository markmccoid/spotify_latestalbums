import Image from "next/image";
import { useEffect, useState } from "react";
import placehold from "../../public/images/headphones_placeholder.png";

import { useAtom } from "jotai";
import {
  addArtistToSelected,
  removeArtistFromSelected,
} from "../../atoms/selectedArtistsAtom";

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
  const [, removeArtist] = useAtom(removeArtistFromSelected);
  useEffect(() => {
    //-- Check if artist is in our selected list
    if (selectedArtists.some((el) => el.id === artistObj.id)) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [selectedArtists]);

  return (
    <div
      onClick={() =>
        isSelected
          ? removeArtist(artistObj.id)
          : setArtists({
              id: artistObj.id,
              name: artistObj.name,
              imageURL: artistObj.images[0],
            })
      }
      className={`mr-3 flex w-[400px] cursor-pointer flex-row items-end justify-between rounded-2xl 
      py-3 px-2
      ${
        isSelected &&
        "border-2 border-orange-500 bg-highlight_bg transition duration-700"
      }
      ${
        !isSelected &&
        "border-2 border-highlight_bg bg-mm_light transition duration-700"
      }`}
    >
      <div
        className="group relative h-[100px] w-[100px] flex-shrink-0 cursor-pointer
        overflow-hidden rounded-xl border border-black"
      >
        <a href={artistObj.external_urls.spotify} target="_blank">
          <Image src={image} layout="fill" objectFit="cover" />
        </a>
      </div>

      <div className="flex h-full w-full flex-col justify-between py-2">
        <div
          className={`mx-5 rounded-md px-2 text-2xl font-bold 
        ${isSelected && "text-white transition duration-700"}
        ${!isSelected && "text-black transition duration-700"}
        `}
        >
          {artistObj.name}
        </div>
        {/* <button
          className={`mx-5 w-max rounded-2xl border border-white bg-blue-600 p-1 px-5
          text-xl ${
            isSelected &&
            "bg-red-800 text-white transition duration-500 ease-out hover:scale-105 hover:text-gray-300"
          }
          ${
            !isSelected &&
            "text-white transition duration-500 ease-out hover:scale-105"
          }`}
          onClick={() =>
            isSelected
              ? removeArtist(artistObj.id)
              : setArtists({
                  id: artistObj.id,
                  name: artistObj.name,
                  imageURL: artistObj.images[0],
                })
          }
        >
          {`${isSelected ? "Remove Artist" : "Add Artist"}`}
        </button> */}
      </div>
    </div>
  );
};

export default ArtistItem;
