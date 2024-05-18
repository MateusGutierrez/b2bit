import { TLoginFormValue } from "@/schemas";

export interface iUserContext{
    loginSubmit: (data: TLoginFormValue) => Promise<void>;
    logoutUser: () => void;
    getUserInfo: (token: string) => void;
  }
  export interface iProviderPros{
    children: React.ReactNode
  }
  