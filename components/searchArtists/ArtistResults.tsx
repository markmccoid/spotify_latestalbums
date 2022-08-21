import Image from "next/image";

import ArtistItem from "../shared/ArtistItem";

type Props = {
  artists: SpotifyApi.ArtistObjectFull[];
};
const ArtistResults = ({ artists }: Props) => {
  return (
    <div className="ml-2 flex flex-row flex-wrap overflow-hidden overflow-y-scroll scrollbar-hide">
      {/* <div className="ml-2 flex flex-row flex-wrap space-y-5 overflow-hidden overflow-y-scroll py-5 scrollbar-hide"> */}

      {artists.map((artistObj) => (
        <ArtistItem key={artistObj.id} artistObj={artistObj} />
      ))}
    </div>
  );
};

export default ArtistResults;
