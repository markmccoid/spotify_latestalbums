import { useAtom } from "jotai";
import { useEffect } from "react";
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

  const { artistAlbumsData, isLoading, isError, refetch } = useArtistData(selectedArtists);

  // Scroll to top function
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [mapArtist]);

  const getHeaders = () => {
    let headers = [];
    for (const artistName of artistAlbumsData?.keys() || []) {
      headers.push(
        <h1
          key={artistName}
          className={`button mr-2 mb-2 cursor-pointer text-2xl ${
            mapArtist === artistName && "border-2 border-orange-500"
          }`}
          onClick={() => {
            if (mapArtist !== artistName) {
              setMapArtist(artistName.toString());
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
      <button
        className="absolute bottom-0 right-10 rounded-lg border border-white bg-slate-500 py-2 px-1 hover:scale-105 hover:bg-black"
        onClick={scrollToTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
          />
        </svg>
      </button>
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
