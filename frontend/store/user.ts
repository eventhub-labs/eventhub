import { create } from "zustand";

export interface IUser {
  accessToken: string;
  email: string;
  username: string;
  name: string;
  surname: string;
  imgUrl: string;
}

export type TStatus = "unauthorized" | "fetching" | "authorized";

interface UserState {
  user: IUser | null;
  status: TStatus;
  setStatus: (status: TStatus) => void;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  setProfileImg: (imgUrl: string) => void;
}

export const useUser = create<UserState>((set) => ({
  user: null,
  status: "unauthorized",
  setStatus: (status) => {
    set(() => {
      return { status };
    });
  },
  setUser: (user) =>
    set(() => {
      return { user };
    }),
  setProfileImg: (imgUrl) => {
    set((state) => {
      return {
        user: {
          ...state.user!,
          imgSrc: imgUrl,
        },
      };
    });
  },
  clearUser: () => {
    set(() => {
      return { user: null };
    });
  },
}));
