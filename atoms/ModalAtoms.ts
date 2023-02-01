// import { DocumentData } from 'firebase/firestore'
import { atom } from "recoil";
import { Movie } from "types";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const modalState = atom({
  key: "modalState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// export const movieState = atom<Movie | DocumentData | null>({
export const movieState = atom<Movie | null>({
  key: "movieState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
