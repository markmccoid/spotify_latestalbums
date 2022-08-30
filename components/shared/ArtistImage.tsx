import Image, { StaticImageData } from "next/image";
import placehold from "../../public/images/headphones_placeholder.png";

type Props = {
  images: SpotifyApi.ImageObject[] | SpotifyApi.ImageObject;
  spotifyUrl?: string;
};

const ArtistImage = ({ images = [], spotifyUrl }: Props) => {
  //-- images is either a string or a single url object
  let artistImage: string | StaticImageData = "";
  if (Array.isArray(images)) {
    artistImage = images?.length === 0 ? placehold : images[0].url;
  } else {
    artistImage = images.url;
  }

  //-- JSX for the image
  const imageJSX = (
    <div
      className="group relative h-[100px] w-[100px] flex-shrink-0
overflow-hidden rounded-xl border border-black"
    >
      <Image src={artistImage} layout="fill" objectFit="cover" />
    </div>
  );

  // If a spotifyUrl is passed wrap image with an anchor link
  return spotifyUrl ? (
    <a href={spotifyUrl} target="_blank">
      {imageJSX}
    </a>
  ) : (
    <div>{imageJSX}</div>
  );
};

export default ArtistImage;
