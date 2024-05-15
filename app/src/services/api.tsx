import axios, {AxiosInstance}  from 'axios';


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
    return Promise.reject(error);
  }
);

export default Api