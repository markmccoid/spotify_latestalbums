import Head from "next/head";
import Wrapper from "../../components/wrapper/Wrapper";
import PlaylistView from "../../components/playlistinfo/PlaylistsSidebarView";
import PlaylistResults from "../../components/playlistinfo/PlaylistResults";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { clearSelectedPlaylistAtom } from "../../atoms/selectedPlaylistAtom";

const PlaylistsViewer = () => {
  const [, clearSelectedPlaylist] = useAtom(clearSelectedPlaylistAtom);
  // on mount empty out the selected playlist atom
  useEffect(() => {
    clearSelectedPlaylist("");
  }, []);
  return (
    <Wrapper>
      <Head>
        <title>Playlists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative flex flex-row overflow-y-hidden">
        <PlaylistView />
        <PlaylistResults />
      </div>
    </Wrapper>
  );
};

export default PlaylistsViewer;
