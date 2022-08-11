import { useEffect, useReducer } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";

import SpotifyLogo from "../public/images/Spotify_Logo.png";

const login = () => {
  const [isLoading, toggleIsLoading] = useReducer((prev) => !prev, false);
  const { data: session, status } = useSession();
  const { push } = useRouter();
  useEffect(() => {
    console.log(session);
    if (session) {
      push("/");
    }
  }, [session]);
  if (status === "loading") {
    return <div>........</div>;
  }

  return (
    <div className="flex flex-col w-full justify-center items-center my-auto h-screen space-y-5">
      <div className="w-48">
        <Image src={SpotifyLogo} alt="" />
      </div>
      <div className="flex flex-row justify-center">
        <button
          disabled={isLoading}
          className=" border-black p-2 bg-gray-300 rounded-md "
          onClick={() => signIn("spotify")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default login;
