import { createContext, useState } from "react";
import { TLoginFormValue } from "../schemas/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {  UserData } from "@/store/interface";
import { Api } from "@/services/api";


// interface iUser{
//   email: string;
//   name: string;
//   id: number;
// }
interface iUserContext{
  loginSubmit: (data: TLoginFormValue) => Promise<void>
  logoutUser: () => void
//   setMesage: React.Dispatch<React.SetStateAction<boolean>>;
//   mesage: boolean;
}

// interface IUserLoginResponse{
//   accessToken: string;
//   user: iUser;
// }

interface iProviderPros{
  children: React.ReactNode
}

export const UserContext = createContext({} as iUserContext)

export const UserProvider = ({children}: iProviderPros) => {
  const [message, setMessage] = useState(true)
  const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("@TOKEN")
//     const id = localStorage.getItem("@USERID")
//     setMesage(true)
//     const userAutoLogin = () => {
//       if(!token){
//         navigate("/")
//       }
//       setTimeout(()=>{
//         navigate("/dashboard")
//         setMesage(false)
//       }, 2500)
      
//     }
//     userAutoLogin()
    
//   }, [])

  const loginSubmit = async (data: TLoginFormValue) => {
    setMessage(true)
    try {
      const response = await Api.post<UserData>("auth/login", data)
      console.log(message)
    //   localStorage.setItem("@TOKEN", response.data.tokens.access);
    //   localStorage.setItem("@USERID", JSON.stringify(response.data.user.id));
      console.log(response)
      toast.success("Login realizado com sucesso!", { autoClose: 2500 });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (error) {
      toast.error("Erro ao efetuar o login!", { autoClose: 2500 });
      localStorage.removeItem("@TOKEN");
      localStorage.removeItem("@USERID");
    }finally{
      setMessage(false)
    }
  }


  const logoutUser = () =>{
    localStorage.clear()
    navigate("/")
    toast.success("Voce fez logout", {autoClose:2500})
  }
  
    return (
      <UserContext.Provider value={{ loginSubmit, logoutUser }}>
        {children}
      </UserContext.Provider>
    )
  }