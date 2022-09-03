import Head from "next/head";
import { useSession, signOut } from "next-auth/react";
import NavBar from "./NavBar";
import PlaylistView from "../../components/playlistinfo/PlaylistsSidebarView";
import { useAtom } from "jotai";
import { appStateAtom } from "../../atoms/appStateAtom";
import SelectedArtistsContainer from "../selectedArtists/SelectedArtistsContainer";
import PlaylistResults from "../playlistinfo/PlaylistResults";
import ArtistSearch from "../searchArtists/ArtistSearch";
import FollowedArtists from "../followedArtists/FollowedArtists";
import LatestAlbums from "../latestAlbums/LatestAlbums";
import EditArtists from "../editArtists/EditArtists";

const AppStates: Record<string, () => JSX.Element> = {
  followed: FollowedArtists,
  search: ArtistSearch,
  latest: LatestAlbums,
  edit: EditArtists,
  playlist: () => (
    <div className="flex w-full flex-grow flex-row overflow-y-hidden border">
      <PlaylistResults />
    </div>
  ),
};

const Wrapper = () => {
  const { data: session, status } = useSession();
  const [appState] = useAtom(appStateAtom);

  // console.log("session", session?.user.username, status);
  if (status === "unauthenticated") {
    console.log("UNAUTHED in HOME");
  }

  let CurrPage = () => <div></div>;
  // if (appState.page === "playlist") {
  //   CurrPage = () => (
  //     <div className="flex w-full flex-grow flex-row overflow-y-hidden border">
  //       <PlaylistResults />
  //     </div>
  //   );
  // }
  // if (appState.page === "followed") {
  //   CurrPage = () => <FollowedArtists />;
  // }
  // if (appState.page === "search") {
  //   CurrPage = () => <ArtistSearch />;
  // }
  // if (appState.page === "latest") {
  //   CurrPage = () => <LatestAlbums />;
  // }
  // if (appState.page === "edit") {
  //   CurrPage = () => <EditArtists />;
  // }

  const CurrentAppState = AppStates[appState.page] ?? CurrPage;

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
      <main className="flex flex-grow">
        {appState.page ? <CurrentAppState /> : <div></div>}
      </main>
    </div>
  );
};

export default Wrapper;
