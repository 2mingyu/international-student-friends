import { create } from "zustand";
import { User } from "types/users";

interface UserState {
  user: User;
  setUser: (newUser: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: {
    userId: 0,
    name: "",
    profileImage: "",
    country: "",
    major: "",
    interests: [],
  },
  setUser: (newUser) => set({ user: newUser }),
}));

export default useUserStore;
