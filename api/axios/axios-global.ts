
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  //withCredentials: true, //  IMPORTANTE para enviar cookies HttpOnly
  //En este caso no deberia ser necesario porque tienes el interceptor para obtener el 
  // access_token y poder enviarlo con la request. Revisarlo si te sirve de algo
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir token desde localStorage en caso de existir
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
