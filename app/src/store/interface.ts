export interface AuthFields {
    email: string;
    password: string
}

export interface User {
    id: number;
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
    user: User[],
    addUser: (user: User) => void;
    removeUser: (userId: number) => void;
}