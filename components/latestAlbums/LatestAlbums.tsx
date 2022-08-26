import { useAtom } from "jotai";
import { useState } from "react";
import { selectedArtistsAtom } from "../../atoms/selectedArtistsAtom";

import useArtistData from "../../hooks/useArtistData";
import AlbumView from "./AlbumView";

const LatestAlbums = () => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  const [expandedArtist, setExpandedArtist] = useState<Record<string, boolean>>({});

  const toggleArtist = (artistName: string) => {
    setExpandedArtist({ ...expandedArtist, [artistName]: !expandedArtist[artistName] });
  };

  console.log(expandedArtist);
  // const [search, setSearch] = useState("");
  // const { isLoading, artists, albums } = useSearchDebounced({
  //   searchQuery: search,
  //   searchTypes: ["artist"],
  //   resultLimit: 10,
  // });
  const { artistAlbumsData, isLoading, isError, refetch } = useArtistData(selectedArtists);
  // console.log("artists", selectedArtists);
  return (
    <div className="flex-grow overflow-hidden overflow-y-scroll border border-red-900 scrollbar-hide">
      {isLoading && <div>Loading...</div>}
      {/* <div className="flex flex-col"> */}
      {artistAlbumsData?.map((data) => {
        console.log("in datamap", data.artistName, expandedArtist[data.artistName]);
        return (
          <div key={data.artistId}>
            <h1 className="text-2xl" onClick={() => toggleArtist(data.artistName)}>
              {data.artistName}
            </h1>
            <div
              className={`${
                expandedArtist[data.artistName] ? "block" : "hidden"
              } flex flex-row flex-wrap`}
            >
              {data.artistMusic.map((el) => {
                return <AlbumView artistMusic={el} key={el.albumId} />;
              })}
            </div>
          </div>
        );
      })}
      {/* </div> */}
    </div>
  );
};

export default LatestAlbums;
