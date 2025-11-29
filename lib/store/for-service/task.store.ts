"use client";

import { create } from "zustand";
import { Task , TaskCreate, TaskStatus } from "@/lib/types";
import { TaskService } from "@/service/task.service";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchTasks: (params?: { skip?: number; limit?: number; status?: string }) => Promise<void>;
  getTask: (id: string) => Promise<Task | null>;
  createTask: (data: TaskCreate) => Promise<Task | null>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<Task | null>;
  updateTask: (id: string, data: Partial<Task>) => Promise<Task | null>;
  deleteTask: (id: string) => Promise<boolean>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const tasks = await TaskService.fetchTasks()
      set({ tasks });
    } catch (err: any) {
      console.error(err);
      set({ error: err.message || "Error loading tasks" });
    } finally {
      set({ loading: false });
    }
  },

  getTask: async (id: string) => {
    try {
      return await TaskService.getById(id)
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  createTask: async (data: TaskCreate) => {
    try {
      const newTask = await TaskService.create(data);

      // Añadir al store
      set({ tasks: [...get().tasks, newTask] });
      return newTask;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    try {
      const updated = await TaskService.update(id, data);

      set({
        tasks: get().tasks.map((t) => (t.id === id ? updated : t)),
      });

      return updated;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  updateTaskStatus: async (id: string, status: TaskStatus) => {
    try {
      const updated = await TaskService.updateStatus(id, status);
      set({
        tasks: get().tasks.map((t) => (t.id === id ? { ...t, status } : t)),
      });
      return updated;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  deleteTask: async (id: string) => {
    try {
      await TaskService.delete(id);

      set({
        tasks: get().tasks.filter((task) => task.id !== id),
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
}));
