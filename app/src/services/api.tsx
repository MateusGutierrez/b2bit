import axios from "axios";

export const Api = axios.create({
  baseURL: "https://api.homologation.cliqdrive.com.br",
  timeout: 8000,
});