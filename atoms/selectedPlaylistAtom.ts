import { atom } from "jotai";

export type SelectedPlaylistType =
  | {
      id: string;
      name: string;
      imageURL: string;
    }
  | undefined;

export const selectedPlaylistAtom = atom<SelectedPlaylistType>(undefined);
export const setSelectedPlaylistAtom = atom(null, (get, set, update: SelectedPlaylistType) => {
  set(selectedPlaylistAtom, update);
});
export const clearSelectedPlaylistAtom = atom(null, (get, set) => {
  set(selectedPlaylistAtom, undefined);
});

// const writeOnlyAtom = atom(
//   null, // it's a convention to pass `null` for the first argument
//   (get, set, update) => {
//     // `update` is any single value we receive for updating this atom
//     set(priceAtom, get(priceAtom) - update.discount);
//   }
// );

if (process.env.NODE_ENV !== "production") {
  selectedPlaylistAtom.debugLabel = "selectedPlaylist";
  setSelectedPlaylistAtom.debugLabel = "setSelectedPlaylist";
  // debugLabel is 'count' now
}
