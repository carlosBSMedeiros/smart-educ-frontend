import axios from "axios"; 
import { getToken } from "../services/Autenticacao.service";
// export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? "http://localhost:8080";
export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? "https://tcc-api-prototipo.herokuapp.com";


const http = axios.create({
    baseURL: BASE_URL
})

http.interceptors.request.use((config) => {
    const token = getToken()
    if (token && config && config.headers){
      config.headers.Token = token     
    }
    return config
  })

export default http
