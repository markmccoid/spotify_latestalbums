import { uniqBy } from "lodash";
import SpotifyWebApi from "spotify-web-api-node";

//* Get passed a playlist track object and
//* extract the artists from each track
//* Final steps is to only return a uniq list of artists
export async function extractArtists(
  tracks: SpotifyApi.PlaylistTrackObject[],
  spotifyApi: SpotifyWebApi,
  stateUpdater?: (val: string) => void
): Promise<SpotifyApi.ArtistObjectFull[]> {
  if (!stateUpdater) {
    stateUpdater = () => console.log("no Update");
  }
  //-- Loop through track list and extract artists
  //- NOTE: this will be the simplified object meaning no images
  //- next step gets full artist record
  const artistArray = tracks.reduce<SpotifyApi.ArtistObjectSimplified[]>(
    (final, currArtist) => {
      let tempArtistList: SpotifyApi.ArtistObjectSimplified[] = [];
      currArtist.track?.artists.forEach((artist) => {
        tempArtistList = [...tempArtistList, { ...artist }];
      });
      return [...final, ...tempArtistList];
    },
    []
  );

  //-- Make list unique by artist ID
  const uniqArtistList = uniqBy(artistArray, "id");
  let finalArtistList = [];
  let counter = 1;
  //-- Get full artist record for each artist in unique list
  for (const artist of uniqArtistList) {
    const data = await spotifyApi.getArtist(artist.id);
    finalArtistList.push(data?.body);
    stateUpdater(counter.toString());
    counter++;
  }

  return finalArtistList;
}
