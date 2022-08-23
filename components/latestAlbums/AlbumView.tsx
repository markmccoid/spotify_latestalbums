import Image from "next/image";
import { ArtistMusic } from "../../hooks/useArtistData";
type Props = {
  artistMusic: ArtistMusic;
};
const AlbumView = ({ artistMusic }: Props) => {
  return (
    <div className="w-min rounded-xl border border-orange-500 bg-orange-800 px-3 py-1">
      <div className="text-left text-2xl font-bold">
        {artistMusic.release_date}
      </div>
      <div
        className="group relative h-64 w-64 flex-shrink-0 cursor-pointer
        overflow-hidden rounded-xl border border-black"
      >
        <a href={artistMusic.spotifyAlbumURL} target="_blank">
          <Image
            className="rounded-xl"
            src={artistMusic?.image.url}
            layout="fill"
            objectFit="cover"
          />
        </a>
      </div>
      <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-bold">
        {artistMusic.name}
      </div>
      <ul>
        {artistMusic.artists?.map((artist) => {
          return (
            <li>
              <a href={artist.spotifyArtistURL} target="_blank">
                {artist.name}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AlbumView;
