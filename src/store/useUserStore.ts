import { create } from "zustand";
import { User } from "types/users";

interface UserState {
  token: string;
  userId: number;
  user: User;
  setToken: (newToken: string) => void;
  setUserId: (newUserId: number) => void;
  setUser: (newUser: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  token: "",
  setToken: (newToken) => set({ token: newToken }),
  user: {
    userId: 0,
    name: "",
    profileImage: "",
    country: "",
    preferredLanguage: "",
    major: "",
    interests: [],
  },
  userId: 0,
  setUserId: (newUserId) => set({ userId: newUserId }),
  setUser: (newUser) => set({ user: newUser }),
}));

export default useUserStore;
