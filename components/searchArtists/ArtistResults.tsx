import Image from "next/image";

import ArtistItem from "../shared/ArtistItem";

type Props = {
  artists: SpotifyApi.ArtistObjectFull[];
};
const ArtistResults = ({ artists }: Props) => {
  return (
    <div className="ml-2 flex flex-col space-y-5 overflow-hidden overflow-y-scroll py-5 scrollbar-hide">
      {/* <div
      className="flex flex-col items-start space-y-6
                  overflow-hidden overflow-y-scroll p-4 py-4 scrollbar-hide"
    > */}
      {artists.map((artistObj) => (
        <ArtistItem key={artistObj.id} artistObj={artistObj} />
      ))}
    </div>
  );
};

export default ArtistResults;
