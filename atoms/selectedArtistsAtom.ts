import { atom } from "jotai";
import _ from "lodash";

export type SelectedArtistAtom = {
  id: string;
  name: string;
  imageURL: SpotifyApi.ImageObject;
};

export const selectedArtistsAtom = atom<SelectedArtistAtom[]>([]);

type AddArtistResult = "Success" | "Duplicate" | undefined;

export const addArtistToSelected = atom(
  (get) => get(selectedArtistsAtom),
  (get, set, newArtist: SelectedArtistAtom) => {
    // `update` is any single value we receive for updating this atom
    const currArtists = get(selectedArtistsAtom);
    if (!currArtists.some((el) => el.id === newArtist.id)) {
      const updatedArtists = [...get(selectedArtistsAtom), newArtist];
      set(selectedArtistsAtom, updatedArtists);
    }
  }
);

export const removeArtistFromSelected = atom(
  (get) => get(selectedArtistsAtom),
  (get, set, artistId: string) => {
    // `update` is any single value we receive for updating this atom
    const currArtists = get(selectedArtistsAtom);
    currArtists.filter((el) => el.id !== artistId);
    set(
      selectedArtistsAtom,
      currArtists.filter((el) => el.id !== artistId)
    );
  }
);

export const clearSelectedArtists = atom(
  (get) => get(selectedArtistsAtom),
  (get, set) => {
    set(selectedArtistsAtom, []);
  }
);

if (process.env.NODE_ENV !== "production") {
  selectedArtistsAtom.debugLabel = "selectedArtistsAtom";
  addArtistToSelected.debugLabel = "addArtistToSelected";
  // debugLabel is 'count' now
}
