export interface AuthFields {
    email: string;
    password: string
}

export interface Avatar {
    id: number;
    image_high_url: string;
    image_medium_url: string;
    image_low_url: string;
}
export interface Role {
    value: number;
    label: string;
}
export interface UserInfo {
    id: number | string;
    avatar: Avatar | null;
    name: string;
    last_name: string;
    email: string;
    role: Role;
    last_login: string;
    staff_role: Role;
}
export interface User {
    id: number | string;
    name: string;
    email: string;
    is_active: boolean;
    avatar: string | null;
    type: string;
    created: string;
    modified: string;
    role: string;
}

export interface Tokens {
    refresh: string;
    access: string;
}

export interface UserData {
    user: User;
    tokens: Tokens;
}

export interface State {
    fields: AuthFields;
    isLoading: boolean;
    user: UserData;
}

export interface Store {
    user: UserData[],
    userInfo: UserInfo[],
    addUserInfo: (userInfo: UserInfo) => void
    addUser: (user: UserData) => void;
    removeUser: (userId: number | string) => void;
}