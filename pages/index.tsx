import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import PlaylistResults from "../components/playlistinfo/PlaylistResults";

import Wrapper from "../components/wrapper/Wrapper";
import ArtistSearch from "../components/searchArtists/ArtistSearch";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  // console.log("session", session?.user.username, status);
  if (status === "unauthenticated") {
    console.log("UNAUTHED in HOME");
  }

  return <Wrapper />;
  // return (
  //   <div className="mx-20 flex h-full flex-col space-x-0 sm:flex-col md:flex-row md:space-x-2">
  //     <Head>
  //       <title>Spotify New Releases</title>
  //       <link rel="icon" href="/favicon.ico" />
  //     </Head>
  //     <div className="flex-grow border border-red-900">
  //       <NavBar />
  //       <ResultsContainer />
  //     </div>
  //     <div className="h-[40%] w-auto border border-yellow-900 md:h-auto md:w-96 xl:w-[420px]">
  //       <SelectedArtistsContainer />
  //     </div>
  //   </div>
  // );
};

export default Home;
