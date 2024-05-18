import { createContext, useEffect } from "react";
import { iProviderPros, iUserContext } from "./interface";
import { TLoginFormValue } from "../schemas/index";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store";
import { UserData } from "@/store/interface";
import   Api   from "@/services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const getUserAccessTokenInLocalStorage = () => localStorage.getItem("@token_access")
const clearLocalStorage = () => localStorage.clear()

export const UserContext = createContext({} as iUserContext)

export const UserProvider = ({children}: iProviderPros) => {
  const navigate = useNavigate();
  const { addUserInfo } = useStore(({ addUserInfo  }) => ({ addUserInfo }))

  const getUserInfo = async (token: string) => {
    try {
      const response = await Api.get('auth/profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json;version=v1_web',
          "Content-Type": 'application/json'
        }
      }
    );
      addUserInfo(response.data)
    } catch (error) {
      console.log(error)
      toast.error('Sessão expirada!', { autoClose: 2500 });
    }
  }
  const loadUser = async () => {
    try {
      const access_token = localStorage.getItem("@token_access");
      if(access_token){
        getUserInfo(access_token)
        navigate('/profile')
      }else{
        navigate('/')
      }
    }catch(error){
      console.log(error)
    }
  }
  const loginSubmit = async (data: TLoginFormValue) => {
    try {
      const response = await Api.post<UserData>('auth/login/', data , {
        headers: {
          Accept: 'application/json;version=v1_web',
          "Content-Type": 'application/json'
        }
      });
      const {user, tokens} = response.data
      getUserInfo(tokens.access)
      toast.success('Login realizado com sucesso!', { autoClose: 2500 });
      localStorage.setItem("@token_access", tokens.access)
      localStorage.setItem("@token_refresh", tokens.refresh)
      if(!user.is_active){
        toast.error('Esta conta não está ativa!', { autoClose: 2500 });
        localStorage.clear()
        setTimeout(() => {
          navigate('/');
        }, 2500);
      }
      setTimeout(() => {
        navigate('/profile');
      }, 2500);
    } catch (error) {
      console.log(error)
    }
  };
  
  const logoutUser = () => {
    localStorage.clear()
    navigate("/")
    toast.success("Saiu", {autoClose:2500})
  }

  useEffect(() => {
    loadUser()
  },[])

    return (
      <UserContext.Provider 
        value={{ loginSubmit, logoutUser, getUserInfo }}
      >
        {children}
      </UserContext.Provider>
    )
  }