import { IResponseUser } from "@/types";
import { create } from "zustand";

interface UserState {
  user: Omit<IResponseUser, "refreshToken"> | null;
  setUser: (user: IResponseUser | Omit<IResponseUser, "refreshToken">) => void;
  clearUser: () => void;
  setProfileImg: (imgSrc: string) => void;
}

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) =>
    set(() => {
      return { user };
    }),
  setProfileImg: (imgSrc) => {
    set((state) => {
      return {
        user: {
          ...state.user!,
          imgSrc: imgSrc,
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
