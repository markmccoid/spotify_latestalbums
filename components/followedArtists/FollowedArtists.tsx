import { useSpotify } from "../../hooks/useSpotify";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ArtistItem from "../shared/ArtistItem";

const FollowedArtists = () => {
  const [afterArtist, setAfterArtist] = useState<string | undefined>(undefined);
  // Used to stored an array of "prev" artist ids.  It actually is just each "afterArtist"
  // state as user click through screen of artists
  const [previousArtist, setPreviousArtist] = useState<string[]>([]);
  const spotifyApi = useSpotify();
  const queryFollowedArtists = (afterArtist: string | undefined) => {
    return spotifyApi.getFollowedArtists({ after: afterArtist, limit: 50 });
  };

  const { data, isLoading, isError } = useQuery(["followedArtists", afterArtist], () =>
    queryFollowedArtists(afterArtist)
  );

  if (isLoading) {
    return (
      <div className="flex">
        <div className="h-5 w-5 animate-bounce rounded-full border-2 border-black bg-white" />
        Loading...
      </div>
    );
  }
  // data?.body.artists;
  console.log("Prev/Next", previousArtist, afterArtist);
  //-- NEXT and PREV State Setters ------//
  const setNextState = () => {
    let updatedPrevArtist: string[] = [];
    if (afterArtist) {
      updatedPrevArtist = [...previousArtist, afterArtist];
    }
    setPreviousArtist(updatedPrevArtist);

    setAfterArtist(data?.body?.artists.items[data?.body?.artists.items.length - 1].id);
  };
  //-- PREV State Setting
  const setPreviousState = () => {
    const prevArray = previousArtist;
    setAfterArtist(prevArray.pop());
    setPreviousArtist(prevArray);
  };
  //-- ---------------------------------- --//
  // If Next is populated then there are more followed artists to get
  const isMoreArtists = !!data?.body?.artists.next;
  return (
    <div className="overflow-hidden overflow-y-scroll scrollbar-hide">
      <h1 className="text-xl font-bold">Followed Artists</h1>
      <div className="flex flex-row flex-wrap">
        {data?.body?.artists.items.map((artist) => {
          return (
            <div className="mb-3 flex flex-col" key={artist.id}>
              <ArtistItem key={artist.id} artistObj={artist} />
            </div>
            // <div key={artist.id}>
            //   {artist.name} - {artist.id}
            // </div>
          );
        })}
      </div>
      <div className="flex  flex-row space-x-2">
        {!!afterArtist && (
          <button className="button flex-grow p-2 text-2xl" onClick={setPreviousState}>
            Prev
          </button>
        )}
        {isMoreArtists && (
          <button className="button flex-grow p-2 px-4 text-2xl" onClick={setNextState}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default FollowedArtists;
