import { useAtom } from "jotai";
import { RefObject, useRef, useState } from "react";
import { selectedArtistsAtom } from "../../atoms/selectedArtistsAtom";

import useArtistData from "../../hooks/useArtistData";
import AlbumView from "./AlbumView";

const LatestAlbums = () => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  const [expandedArtist, setExpandedArtist] = useState<Record<string, boolean>>({});
  const [mapArtist, setMapArtist] = useState("");
  const topRef = useRef<HTMLDivElement>();
  const toggleArtist = (artistName: string) => {
    setExpandedArtist({ ...expandedArtist, [artistName]: !expandedArtist[artistName] });
  };

  // console.log(expandedArtist);
  // const [search, setSearch] = useState("");
  // const { isLoading, artists, albums } = useSearchDebounced({
  //   searchQuery: search,
  //   searchTypes: ["artist"],
  //   resultLimit: 10,
  // });
  const { artistAlbumsData, isLoading, isError, refetch } = useArtistData(selectedArtists);

  // Scroll to top function
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getHeaders = () => {
    let headers = [];
    for (const artistName of artistAlbumsData?.keys() || []) {
      headers.push(
        <h1
          className={`button mr-2 mb-2 cursor-pointer text-2xl ${
            mapArtist === artistName && "border-2 border-orange-500"
          }`}
          onClick={() => {
            if (mapArtist !== artistName) {
              setMapArtist(artistName);
              scrollToTop();
            }
          }}
        >
          {artistName}
        </h1>
      );
    }
    return headers;
  };

  const artistsAlbums = () => {
    return artistAlbumsData?.get(mapArtist) || [];
  };

  return (
    <div className="flex flex-grow flex-col overflow-hidden pt-4 pl-4 ">
      {isLoading && <div>Loading...</div>}
      {/* <div ref={topRef} /> */}
      <div className="flex flex-row flex-wrap justify-start">{!isLoading && getHeaders()}</div>
      <div
        ref={topRef}
        className="flow-row flex flex-wrap overflow-hidden overflow-y-scroll scrollbar-hide"
      >
        {artistsAlbums().map((el) => {
          return <AlbumView artistMusic={el} key={el.albumId} />;
        })}
      </div>
      <button onClick={scrollToTop}>{mapArtist}</button>
      {/* {artistAlbumsData?.map((data) => {
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
      })} */}
    </div>
  );
};

export default LatestAlbums;
