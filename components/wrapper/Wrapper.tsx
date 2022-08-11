import * as React from "react";
import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import NavBar from "./NavBar";

import SelectedArtistsContainer from "../selectedArtists/SelectedArtistsContainer";

const Wrapper = ({ children }) => {
  const { data: session, status } = useSession();
  // console.log("session", session?.user.username, status);
  if (status === "unauthenticated") {
    console.log("UNAUTHED in HOME");
  }

  return (
    <div className="mx-20 flex h-full flex-col space-x-0 sm:flex-col md:flex-row md:space-x-2">
      <Head>
        <title>Spotify New Releases</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full flex-grow flex-col  border border-red-900">
        <NavBar />
        {/* <ResultsContainer /> */}
        {children}
      </div>
      <div className="h-[40%] w-min flex-grow border border-yellow-900 md:h-auto md:w-96 xl:w-[420px]">
        <SelectedArtistsContainer />
      </div>
    </div>
  );
};

export default Wrapper;
