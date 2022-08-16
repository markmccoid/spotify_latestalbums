import { useSpotify } from "../../hooks/useSpotify";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import PlaylistSidebarItem from "./PlaylistsSidebarItem";
import { Tooltip } from "../Tooltip";

const LIMIT = 20;

const Playlists = () => {
  const spotifyApi = useSpotify();
  const fetchPL = ({ pageParam = 0 }) => {
    return spotifyApi.getUserPlaylists({ offset: pageParam, limit: LIMIT });
  };
  // const { isLoading, isError, data } = useQuery(["playlists"], fetchPL, {
  //   staleTime: 10000, // only eligible to refetch after 10 seconds
  // });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["playlists"], fetchPL, {
    getNextPageParam: (lastPage, pages) => {
      // Check to see if have loaded all pages
      // The lastPage will hold the last queries offset, so the next
      // refetch will be starting at the last offset PLUS the LIMIT #.
      const allLoaded = lastPage.body.offset + LIMIT > lastPage.body.total;
      // Returning undefined keeps refetch from happening.
      if (allLoaded) {
        return undefined;
      }
      return lastPage.body.offset + LIMIT;
    },
  });

  // const pl = data?.body?.items;
  const pl = data?.pages;
  // console.log("pl", data);
  if (isFetching && !data) {
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
        {pl?.map((pages) => {
          return pages?.body?.items.map((playlist) => {
            return (
              <PlaylistSidebarItem key={playlist.id} playlist={playlist} />
            );
          });
        })}
        {hasNextPage && (
          <Tooltip message="This is a test">
            <button
              className="mb-2 w-full border border-white bg-slate-700 py-2 text-center text-2xl text-white"
              onClick={() => fetchNextPage()}
            >
              Load More
            </button>
          </Tooltip>
        )}
      </ul>
    </div>
  );
};

export default Playlists;
