import { create } from "zustand";

interface JwtState {
    token_type:string , 
    //isAutenticate:boolean , 
    setAccessToken:(access_token:any) => void , 
    getAccessToken:() => any ,
}

export const useJwtStore = create<JwtState>((set , get) => ({
    token_type:"" , 
    
    setAccessToken:(access_token:any) => {
 localStorage.setItem("access_token", access_token);

    } , 
    getAccessToken:() => {
        if (typeof window !== "undefined") {
          return localStorage.getItem("access_token")
        }
        return null
    }
}))