import { atom } from "jotai";
import _ from "lodash";

export type AppStateAtom = {
  page: "index" | "followed" | "search" | "playlist" | "latest" | "edit";
};

export const appStateAtom = atom<AppStateAtom>({ page: "index" });

if (process.env.NODE_ENV !== "production") {
  appStateAtom.debugLabel = "appStateAtom";

  // debugLabel is 'count' now
}
