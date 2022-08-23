import { useAtom } from "jotai";
import { useState } from "react";
import { selectedArtistsAtom } from "../../atoms/selectedArtistsAtom";

import useArtistData from "../../hooks/useArtistData";
import AlbumView from "./AlbumView";

const LatestAlbums = () => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  // const [search, setSearch] = useState("");
  // const { isLoading, artists, albums } = useSearchDebounced({
  //   searchQuery: search,
  //   searchTypes: ["artist"],
  //   resultLimit: 10,
  // });
  const { artistAlbumsData, isLoading, isError, refetch } =
    useArtistData(selectedArtists);
  // console.log("artists", selectedArtists);
  return (
    <div className="overflow-hidden overflow-y-scroll scrollbar-hide">
      {isLoading && <div>Loading...</div>}
      <div className="flex flex-grow">
        {artistAlbumsData?.map((data) => {
          return (
            <div className="space-x-2 space-y-2">
              <h1 className="text-2xl">{data.artistName}</h1>
              {data.artistMusic.map((el) => {
                return <AlbumView artistMusic={el} key={el.albumId} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestAlbums;
