
import { create } from "zustand";
import { Store, UserInfo } from "./interface";


export const useStore = create<Store>((set) => ({
    userInfo: [],
    addUserInfo: (info: UserInfo) => set(() => ({
        userInfo: [info]
    })),
}));


