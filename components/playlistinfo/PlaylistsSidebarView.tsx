import { useSpotify } from "../../hooks/useSpotify";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import PlaylistSidebarItem from "./PlaylistsSidebarItem";

const Playlists = () => {
  const spotifyApi = useSpotify();
  const fetchPL = () => {
    return spotifyApi.getUserPlaylists();
  };
  const { isLoading, isError, data } = useQuery(["playlists"], fetchPL, {
    staleTime: 10000, // only eligible to refetch after 10 seconds
  });
  const pl = data?.body?.items;

  if (isLoading) {
    // console.log("data loading stage", isLoading);
    return <div className="text-5xl">LOADING ... </div>;
  }

  return (
    <div
      className="w-[30%] overflow-hidden overflow-y-scroll
    border-r border-gray-600 scrollbar-hide"
    >
      <h1 className="bg-gray-600 text-center text-white">Playlists</h1>
      <ul className="list-none text-xs text-gray-500 lg:text-sm">
        {pl?.map((playlist) => {
          return <PlaylistSidebarItem key={playlist.id} playlist={playlist} />;
        })}
      </ul>
    </div>
  );
};

export default Playlists;
