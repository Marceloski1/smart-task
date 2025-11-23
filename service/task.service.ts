'use client'

import { TaskCreate } from "@/lib/types";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔑 Función para obtener token al momento
function authHeader() {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No access token found in localStorage");
  return { Authorization: `Bearer ${token}` };
}

///New information 

export const TaskService = {
 fetchTasks: async () => {
    const  skip = 0, limit = 100 , status = 200 

    const res = await api.get("/tasks", {
      params: { skip, limit, status },
      headers: authHeader(),
    });

    return res.data;
  } , 

  getById: async (taskId) => {
    const res = await api.get(`/tasks/${taskId}` , {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  create: async (taskData:TaskCreate) => {
    const res = await api.post("/tasks", taskData , 
        { headers:  authHeader() }
    );
   return res.data;
    console.log(taskData)
  },

  update: async (taskId, taskData) => {
    const res = await api.put(`/tasks/${taskId}`, taskData , 
       {
      headers: { Authorization: `Bearer ${token}` }
    }
    );
    return res.data;
  },

  delete: async (taskId) => {
    const res = await api.delete(`/tasks/${taskId}` , 
       {
      headers: { Authorization: `Bearer ${token}` }
    }
    );
    return res.data;
  },
};


