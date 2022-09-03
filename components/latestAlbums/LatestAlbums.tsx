import { useAtom } from "jotai";
import { useEffect } from "react";
import { RefObject, useRef, useState } from "react";
import { selectedArtistsAtom } from "../../atoms/selectedArtistsAtom";

import useSingleArtistAlbums from "../../hooks/useSingleArtistAlbums";
import AlbumView from "./AlbumView";

const LatestAlbums = () => {
  const [selectedArtists] = useAtom(selectedArtistsAtom);
  const [expandedArtist, setExpandedArtist] = useState<string | undefined>(
    undefined
  );
  const topRef = useRef<HTMLDivElement>();

  const { artistAlbumsData, isLoading, fetchStatus, isError, refetch } =
    useSingleArtistAlbums(expandedArtist);

  // Scroll to top function
  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToTop();
  }, [expandedArtist]);

  const getHeaders = () => {
    return selectedArtists.map((artist) => (
      <h1
        key={artist.id}
        className={`button mr-2 mb-2 cursor-pointer text-2xl ${
          expandedArtist === artist.id && "border-2 border-orange-500"
        }`}
        onClick={() => {
          if (expandedArtist !== artist.id) {
            setExpandedArtist(artist.id);
          }
        }}
      >
        {artist.name}
      </h1>
    ));
  };

  return (
    <div className="flex flex-grow flex-col overflow-hidden pt-4 pl-4 ">
      {/* <div ref={topRef} /> */}
      <div className="flex flex-row flex-wrap justify-start">
        {getHeaders()}
      </div>
      <div
        ref={topRef}
        className="flow-row flex flex-wrap overflow-hidden overflow-y-scroll scrollbar-hide"
      >
        {artistAlbumsData?.map((el) => {
          return <AlbumView artistMusic={el} key={el.albumId} />;
        })}
      </div>
      {isLoading && fetchStatus !== "idle" && <div>Loading...</div>}
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
