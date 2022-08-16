import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import { GoSignOut } from "react-icons/go";
import { useRouter } from "next/router";

const NavBar = () => {
  const { data: session, status } = useSession();
  const route = useRouter();

  return (
    <div className="flex w-auto items-center justify-center space-x-5 border border-yellow-500 p-4 py-6 md:space-y-2 lg:space-y-0">
      <Link href="/artist-search">
        <a
          className={`${
            route.pathname.includes("artist-search")
              ? "button-selected"
              : "button"
          } whitespace-nowrap`}
        >
          Search Artists
        </a>
      </Link>
      <Link href="/followed-artists">
        <a
          className={`${
            route.pathname.includes("followed-artists")
              ? "button-selected"
              : "button"
          } whitespace-nowrap`}
        >
          Followed
        </a>
      </Link>
      <Link href="/playlists">
        <a
          className={`${
            route.pathname.includes("playlists") ? "button-selected" : "button"
          } whitespace-nowrap`}
        >
          Search Playlist
        </a>
      </Link>
      <Link href="/latest-albums">
        <a
          className={`${
            route.pathname.includes("latest-albums")
              ? "button-selected"
              : "button"
          } whitespace-nowrap`}
        >
          Lastest Albums
        </a>
      </Link>
      <button
        className="button flex  space-x-2 rounded-md text-white"
        onClick={status === "authenticated" ? () => signOut() : () => signIn()}
      >
        <div className="pt-1">
          <GoSignOut />
        </div>
        <div className="">
          {status === "authenticated" ? "Sign Out" : "Sign In"}
        </div>
      </button>
    </div>
  );
};

export default NavBar;
