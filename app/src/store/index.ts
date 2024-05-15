
import { create } from "zustand";
import { Store, UserData, UserInfo } from "./interface";


export const useStore = create<Store>((set) => ({
    user: [],
    userInfo: [],
    addUserInfo: (info: UserInfo) => set((state) => ({
        userInfo: [... state.userInfo, info]
    })),
    addUser: (newUser: UserData) => set((state) => ({
        user: [...state.user, newUser],
    })),
    removeUser: (userId: number | string) => set((state) => ({
        user: state.user.filter(currentUser => userId !== currentUser.user.id),
        userInfo: state.userInfo.filter(currentUser => userId !== currentUser.id)
    })),
}));

