import Head from "next/head";
import Wrapper from "../../components/wrapper/Wrapper";
import PlaylistView from "../../components/playlistinfo/PlaylistsSidebarView";
import { useAtom } from "jotai";
import { selectedPlaylistAtom } from "../../atoms/selectedPlaylistAtom";
import PlaylistResults from "../../components/playlistinfo/PlaylistResults";

const Playlists = () => {
  // const [aselectedPlaylist] = useAtom(selectedPlaylistAtom);
  return (
    <Wrapper>
      <Head>
        <title>Playlists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row overflow-hidden">
        <PlaylistView />
        <PlaylistResults />
      </div>
    </Wrapper>
  );
};

export default Playlists;
