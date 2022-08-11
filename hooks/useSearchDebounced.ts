import { useSpotify } from "./useSpotify";
import debounce from "lodash/debounce";
import { useCallback, useEffect, useReducer, useState } from "react";

import { useAtom } from "jotai";
import { artistSearchResults } from "./../atoms/searchResultAtom";

type SearchTypes = "artist" | "album" | "track" | "playlist";
type HookParams = {
  searchQuery: string;
  searchTypes: SearchTypes[];
  debounceTime?: number;
  resultLimit?: number; // default is 20
  offset?: number;
};

//---Reducer types
type State = {
  artists: SpotifyApi.ArtistObjectFull[];
  albums: SpotifyApi.AlbumObjectSimplified[];
  playlists: SpotifyApi.PlaylistObjectSimplified[];
  tracks: SpotifyApi.TrackObjectFull[];
};

type Action =
  | {
      type: "artist" | "album" | "playlist" | "track";
      resultBody: {
        artists: SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull>;
        albums: SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified>;
        playlists: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>;
        tracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull>;
      };
    }
  | { type: "clear" };

const resultReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "artist":
      return { ...state, artists: action.resultBody.artists.items };
    case "album":
      return { ...state, albums: action.resultBody.albums.items };
    case "playlist":
      return { ...state, playlists: action.resultBody.playlists.items };
    case "track":
      return { ...state, tracks: action.resultBody.tracks.items };
    case "clear":
      return initialState;
    default:
      return state;
  }
};

const initialState = {
  artists: [],
  albums: [],
  playlists: [],
  tracks: [],
};
/**
 * useSearchDebounced Hook
 * -- Performs Spotify Search one or more types can be passed
 * -- artist, album, playlist or track
 *
 *
 */
export const useSearchDebounced = ({
  searchQuery,
  searchTypes = ["artist"],
  debounceTime = 300,
  resultLimit = 20,
  offset = 0,
}: HookParams) => {
  const spotifyApi = useSpotify();
  // const setArtistResultState = useSetRecoilState(artistSearchResults);
  const [, setArtistResultState] = useAtom(artistSearchResults);
  const [resultState, dispatch] = useReducer(resultReducer, initialState);
  // -- State of load variables
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | undefined>(undefined);

  // -- Search Spotify Function
  const searchSpotify = async (search: string) => {
    try {
      if (search) {
        const searchResults = await spotifyApi.search(search, searchTypes, {
          limit: resultLimit,
          offset: offset,
        });
        //! storing in Atom this is not the way, but testing
        searchTypes.includes("artist") &&
          setArtistResultState(
            searchResults.body.artists?.items as SpotifyApi.ArtistObjectFull[]
          );
        searchTypes.forEach((type) => {
          dispatch({ type, resultBody: searchResults.body });
        });
      }
    } catch (error) {
      setSearchError(`Spotify Search Error: ${error}`);
      console.log("Error in Spotify Search", error);
    }
  };

  // -- Create debounced function
  const searchDebounced = useCallback(
    debounce((search: string) => searchSpotify(search), debounceTime),
    []
  );

  //------------------------
  //- Main useEffect Driver
  //------------------------
  useEffect(() => {
    console.log(
      "search debounced useeffect",
      searchQuery.trim().length === 0,
      !searchQuery
    );
    setIsLoading(true);
    if (!searchQuery || searchQuery.trim().length === 0) {
      //Clear search results as searchQuery is empty or just spaces
      dispatch({ type: "clear" });
      //! Recoil clearing of atom
      setArtistResultState([]);
    } else {
      if (spotifyApi.getAccessToken()) {
        searchDebounced(searchQuery.trim());
      }
    }
    setIsLoading(false);
    // Cancel debounce if unmounted
    return () => searchDebounced.cancel();
  }, [searchQuery]);

  return { ...resultState, isLoading, searchError };
};
