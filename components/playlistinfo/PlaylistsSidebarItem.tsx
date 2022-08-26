import { useAtom } from "jotai";
import Link from "next/link";
import { useMemo } from "react";
import {
  selectedPlaylistAtom,
  SelectedPlaylistType,
  setSelectedPlaylistAtom,
} from "../../atoms/selectedPlaylistAtom";
import { appStateAtom } from "../../atoms/appStateAtom";

const PlaylistSidebarItem = ({
  playlist,
}: {
  playlist: SpotifyApi.PlaylistObjectSimplified;
}) => {
  // Get atom setter
  const [, setPlaylist] = useAtom(setSelectedPlaylistAtom);
  const [, setAppState] = useAtom(appStateAtom);

  // construct obj for atom setter
  const playlistObj: SelectedPlaylistType = {
    id: playlist.id,
    name: playlist.name,
    imageURL: playlist?.images[0]?.url,
  };
  return (
    <li
      className={`cursor-pointer border-b border-gray-600 py-1
     pl-3 pr-1 text-lg text-btn_txt hover:bg-[#4d267f] hover:text-white
     `}
    >
      {/* <Link href={`/playlist/${playlist.id}`}>
        <a className="block overflow-x-hidden whitespace-nowrap">
          {playlist.name}
        </a>
      </Link> */}
      {/* <Link
        href={{
          pathname: `/`,
          query: {
            playlistId: `${playlist.id}`,
            playlistName: `${playlist.name}`,
          },
        }}
      >
         <a className="block">{playlist.name}</a>
      </Link> */}

      <div
        onClick={() => {
          setPlaylist(playlistObj);
          setAppState({ page: "playlist" });
        }}
      >
        <Link href={`/playlists`}>
          <a className="block overflow-hidden overflow-ellipsis whitespace-nowrap ">
            {playlist.name}
          </a>
        </Link>
      </div>
      {/* <Link href={`/playlists?playlistId=${playlistObj.id}`}>
        <a className="block overflow-hidden overflow-ellipsis whitespace-nowrap ">
          {playlist.name}
        </a>
      </Link> */}
    </li>
  );
};

export default PlaylistSidebarItem;
