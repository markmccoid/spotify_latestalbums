import { ArtistMusic } from "../../hooks/useArtistData";
type Props = {
  artistMusic: ArtistMusic;
};
const AlbumView = ({ artistMusic }: Props) => {
  return (
    <div>
      <a href={artistMusic.spotifyAlbumURL} target="_blank">
        {artistMusic.release_date} -- {artistMusic.name} -- {artistMusic.albumType}
      </a>
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
