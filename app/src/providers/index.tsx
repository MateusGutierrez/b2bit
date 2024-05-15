import { createContext, useEffect, useState } from "react";
import { TLoginFormValue } from "../schemas/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {  UserData } from "@/store/interface";
import   Api   from "@/services/api";
import { useStore } from "@/store";
import {head} from 'lodash'

interface iUserContext{
  loginSubmit: (data: TLoginFormValue) => Promise<void>;
  logoutUser: () => void;
  getUserInfo: (token: string) => void;
  message: boolean;
  setMessage: React.Dispatch<React.SetStateAction<boolean>>;
}
interface iProviderPros{
  children: React.ReactNode
}

export const UserContext = createContext({} as iUserContext)

export const UserProvider = ({children}: iProviderPros) => {
  const [message, setMessage] = useState(true)
  const navigate = useNavigate();
  const {
    user, 
    addUser, 
    removeUser, 
    addUserInfo
  } = useStore((
    { 
      user, 
      addUser, 
      removeUser,
      addUserInfo
    }) => ({user, addUser, removeUser,addUserInfo}))

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
      const access_token = localStorage.getItem("@token_access")
      if(access_token){
        getUserInfo(access_token)
        navigate('/profile')
      }else{
        navigate('/')
      }
    }catch(error){
      console.log(error)
    }finally{
      setMessage(false)
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
      addUser(response.data);
      getUserInfo(tokens.access)
      toast.success('Login realizado com sucesso!', { autoClose: 2500 });
      localStorage.setItem("@token_access", tokens.access)
      localStorage.setItem("@token_refresh", tokens.refresh)
      if(!user.is_active){
        toast.error('Esta conta não está ativa!', { autoClose: 2500 });
      }
      setTimeout(() => {
        navigate('/profile');
      }, 2500);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.detail, { autoClose: 2500 });
    }
  };
  
  const logoutUser = () =>{
    const userId = head(user)?.user.id
    if(userId) removeUser(userId)
    localStorage.clear()
    navigate("/")
    toast.success("Saiu", {autoClose:2500})
  }
  
  useEffect(() => {
    loadUser()
  },[])

    return (
      <UserContext.Provider 
        value={
          { 
            loginSubmit, 
            logoutUser, 
            getUserInfo,
            message,
            setMessage
          }
        }
      >
        {children}
      </UserContext.Provider>
    )
  }