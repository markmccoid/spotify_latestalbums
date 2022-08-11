import Image from "next/image";

import ArtistItem from "../center/ArtistItem";

type Props = {
  artists: SpotifyApi.ArtistObjectFull[];
};
const ArtistResults = ({ artists }: Props) => {
  return (
    <div
      className="flex flex-col items-start space-y-6
                  overflow-hidden overflow-y-scroll p-4 py-4 scrollbar-hide"
    >
      {artists.map((artistObj) => (
        <ArtistItem key={artistObj.id} artistObj={artistObj} />
      ))}
    </div>
  );
};

export default ArtistResults;
