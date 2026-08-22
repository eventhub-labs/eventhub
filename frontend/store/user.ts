import { IResponseUser } from "@/types";
import { create } from "zustand";

interface UserState {
  user: Omit<IResponseUser, "refreshToken"> | null;
  setUser: (user: IResponseUser) => void;
  clearUser: () => void;
}

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) =>
    set(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { refreshToken, ...userWithoutRefreshToken } = user;
      return { user: userWithoutRefreshToken };
    }),
  clearUser: () => {
    set(() => {
      return { user: null };
    });
  },
}));
