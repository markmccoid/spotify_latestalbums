import Head from "next/head";
import Wrapper from "../../components/wrapper/Wrapper";
import PlaylistResults from "../../components/playlistinfo/PlaylistResults";

const PlaylistsViewer = () => {
  return (
    <Wrapper>
      <Head>
        <title>Playlists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full flex-grow flex-row overflow-y-hidden border">
        <PlaylistResults />
      </div>
    </Wrapper>
  );
};

export default PlaylistsViewer;
