import axios, {AxiosInstance}  from 'axios';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Api: AxiosInstance = axios.create({
  baseURL: "https://api.homologation.cliqdrive.com.br/",
  timeout: 8000,
});

Api.interceptors.response.use(
  async (res) => {
    const token = localStorage.getItem('@token_access');
    res.headers.Authorization = `Bearer ${token}`;
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear()
      console.log('Logout erro 401', error.response);
      toast.warning('E-mail e/ou senha incorretos', { autoClose: 2500 });
      setTimeout(() => {
        window.location.href = '/'
      }, 3000);
    }
    if (error.response?.status === 500) {
      toast.error('Internal Server Error', { autoClose: 2500 });
    }
    return Promise.reject(error);
  }
);

export default Api