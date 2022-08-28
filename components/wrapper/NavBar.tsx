import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { appStateAtom } from "../../atoms/appStateAtom";

const NavBar = () => {
  const { data: session, status } = useSession();
  const route = useRouter();
  const [appState, setAppState] = useAtom(appStateAtom);

  // console.log("page", appState?.page);
  return (
    <div className="flex flex-col space-y-5 border border-orange-500 p-4 py-6">
      <button onClick={() => setAppState({ page: "search" })} className="button">
        Search
      </button>

      <button onClick={() => setAppState({ page: "followed" })} className="button">
        Followed Artists
      </button>

      <button onClick={() => setAppState({ page: "latest" })} className="button">
        Latest Albums
      </button>

      <button onClick={() => setAppState({ page: "edit" })} className="button">
        Edit Artist
      </button>
      {/* <Link href="/artist-search">
        <a
          className={`${
            route.pathname.includes("artist-search") ? "button-selected" : "button"
          } whitespace-nowrap`}
        >
          Search Artists
        </a>
      </Link>
      <Link href="/followed-artists">
        <a
          className={`${
            route.pathname.includes("followed-artists") ? "button-selected" : "button"
          } whitespace-nowrap`}
        >
          Followed
        </a>
      </Link>
      <Link href="/latest-albums">
        <a
          className={`${
            route.pathname.includes("latest-albums") ? "button-selected" : "button"
          } whitespace-nowrap`}
        >
          Lastest Albums
        </a>
      </Link> */}
      <button
        className="button flex  space-x-2 rounded-md text-white"
        onClick={status === "authenticated" ? () => signOut() : () => signIn()}
      >
        <div className="pt-1">
          <GoSignOut />
        </div>
        <div className="">{status === "authenticated" ? "Sign Out" : "Sign In"}</div>
      </button>
    </div>
  );
};

export default NavBar;
