
import { create } from "zustand";
import { Store } from "./interface";

export const useStore = create<Store>((set) => ({
    user: [],
    addUser: (newUser) => set(({ user }) => ({
        user: [...user, newUser],
    })),
    removeUser: (userId) => set(({ user }) => ({
        user: user.filter(currentUser => currentUser.id !== userId),
    })),
}));

