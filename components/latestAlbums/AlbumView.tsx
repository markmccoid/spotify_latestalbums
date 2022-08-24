import Image from "next/image";
import { HtmlHTMLAttributes, ReactHTMLElement } from "react";
import { ArtistMusic } from "../../hooks/useArtistData";
type Props = {
  artistMusic: ArtistMusic;
};
const AlbumView = ({ artistMusic }: Props) => {
  return (
    <div className="w-min rounded-xl border border-orange-500 bg-orange-800 px-3 py-1">
      <div className="text-left text-2xl font-bold">{artistMusic.release_date}</div>
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
      <div className="w-64 overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-bold">
        {artistMusic.name}
      </div>
      <div className="w-64 overflow-hidden overflow-ellipsis whitespace-nowrap text-xl font-bold">
        {artistMusic.artists?.reduce<HTMLAttributes<HTMLDivElement>>(
          (final, artist) => [
            ...final,
            <a href={artist.spotifyArtistURL} target="_blank">
              {`${final.length > 0 ? " - " : ""}${artist.name}`}
            </a>,
          ],
          []
        )}
      </div>
    </div>
  );
};

export default AlbumView;