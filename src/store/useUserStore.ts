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
  token: sessionStorage.getItem("token") || "",
  userId: Number(sessionStorage.getItem("userId")) || 0,
  user: JSON.parse(sessionStorage.getItem("user") || "{}") || {
    userId: 0,
    name: "",
    profileImage: "",
    country: "",
    preferredLanguage: "",
    major: "",
    interests: [],
  },
  setToken: (newToken) => {
    set({ token: newToken });
    sessionStorage.setItem("token", newToken); // sessionStorage에 저장
  },
  setUserId: (newUserId) => {
    set({ userId: newUserId });
    sessionStorage.setItem("userId", String(newUserId)); // sessionStorage에 저장
  },
  setUser: (newUser) => {
    set({ user: newUser });
    sessionStorage.setItem("user", JSON.stringify(newUser)); // sessionStorage에 저장
  },
}));

export default useUserStore;
