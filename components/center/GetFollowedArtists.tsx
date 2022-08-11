import { useSpotify } from "../../hooks/useSpotify";
import { useQuery } from "@tanstack/react-query";

const GetFollowedArtists = () => {
  const spotifyApi = useSpotify();
  const queryFollowedArtists = () => {
    return spotifyApi.getFollowedArtists();
  };
  const { data, isLoading, isError } = useQuery(
    ["followedArtists"],
    queryFollowedArtists
  );

  if (isLoading) {
    return (
      <div className="flex">
        <div className="h-5 w-5 animate-bounce rounded-full border-2 border-black bg-white" />
        Loading...
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-xl font-bold">Followed Artists</h1>
      {data?.body?.artists.items.map((artist) => {
        return <div key={artist.id}>{artist.name}</div>;
      })}
    </div>
  );
};

export default GetFollowedArtists;
