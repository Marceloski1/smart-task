/*'use client'
import api
 from "@/api/axios/axios-global";
 
export async function loginRequest(data: { username: string; password: string }) {

  // Crear FormData en lugar de enviar JSON
  const formData = new URLSearchParams()
  formData.append("username", data.username)
  formData.append("password", data.password)
  
  const res = await api.post("/auth/login", formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded" , 
    }
  })
  
  const {access_token , token_type} = res.data
 
 localStorage.setItem("access_token", access_token);

  return access_token
  
}
*/

"use client";

import api from "@/api/axios/axios-global";

export const AuthService = {
  register: async (data: { name: string; email: string; password: string; }) => {
    const formData = new FormData();
    formData.append("name" , data.name)
    formData.append("email", data.email);
    formData.append("password", data.password);
    


    const res = await api.post("/auth/register", formData);
    return res.data;
  },

  loginRequest: async (email:string, password:string) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const res = await api.post("/auth/login", formData , {
      headers: {
      "Content-Type": "application/x-www-form-urlencoded" , 
    }
    });

    // guardar token en localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", res.data.access_token);
    }

    return res.data;
  },

  me: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};
