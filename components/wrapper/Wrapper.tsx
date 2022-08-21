import * as React from "react";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import NavBar from "./NavBar";
import PlaylistView from "../../components/playlistinfo/PlaylistsSidebarView";

import SelectedArtistsContainer from "../selectedArtists/SelectedArtistsContainer";

const Wrapper = ({ children }) => {
  const { data: session, status } = useSession();
  // console.log("session", session?.user.username, status);
  if (status === "unauthenticated") {
    console.log("UNAUTHED in HOME");
  }

  return (
    <div className="mx-5 flex h-full flex-row space-x-0 sm:flex-col md:flex-row md:space-x-2">
      <Head>
        <title>Spotify New Releases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <div className="flex h-full flex-grow flex-col">
        <NavBar />
        {children}
      </div>
      <div className="h-[40%] w-min flex-grow border border-yellow-900 md:h-auto md:w-96 xl:w-[420px]">
        <SelectedArtistsContainer />
      </div> */}
      <nav className="flex w-[25%] flex-shrink-0 flex-col overflow-hidden xl:w-[250px]">
        <NavBar />
        <div className="overflow-y-scroll border border-orange-500 scrollbar-hide">
          <PlaylistView />
        </div>
      </nav>
      {/* main content */}
      <main className="flex flex-grow">{children}</main>
    </div>
  );
};

export default Wrapper;
