'use client'

import { Task, TaskCreate, TaskStatus } from "@/lib/types";
import api from "@/api/axios/axios-global";

export const TaskService = {
 fetchTasks: async (params = { skip: 0, limit: 100 }) => {
    const res = await api.get("/tasks/", {
      params,
    });
 
    return res.data;
  } ,

  getById: async (taskId: string) => {
    const res = await api.get(`/tasks/${taskId}`);
    return res.data;
  },

  create: async (taskData:TaskCreate) => {
    const res = await api.post("/tasks/", taskData);
   return res.data;
  },

  update: async (taskId: string, taskData: Partial<Task>) => {
    console.log(taskData)
    const res = await api.put(`/tasks/${taskId}`, taskData);
    return res.data;
  },

  updateStatus: async (taskId: string, status: TaskStatus) => {
    const res = await api.patch(`/tasks/${taskId}/status?status=${status}`);
    return res.data;
  },

  updateState:async (task_id: string, taskData: Partial<Task>) => {
    const task = { 
      title: taskData.title , 
      description:taskData.description , 
      urgency: taskData.urgency , 
      impact: taskData.impact , 
      estimated_duration:taskData.estimated_duration ,
      deadline: taskData.deadline , 
      category_id:taskData.category_id ,
      energy_required:taskData.energy_required 
    }
    const res = await api.put(`/tasks/${task_id}`, task);
    return res.data;
  },


  delete: async (taskId: string) => {
    const res = await api.delete(`/tasks/${taskId}`);
    return res.data;
  },
};


