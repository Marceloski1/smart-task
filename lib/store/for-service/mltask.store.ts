"use client";

import { create } from "zustand";
import type { Task } from "@/lib/types";
import { getPrioritizedTasks, sendMLFeedback } from "@/service/mltask.service";

interface MLTask extends Task {
  priority_score: number;
  recommendation_date?: Date;
  was_completed?: boolean;
}

interface MLTasksState {
  mlTasks: MLTask[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchPrioritizedTasks: (skip?: number, limit?: number) => Promise<void>;
  sendFeedback: (taskId: string, feedback: any) => Promise<void>;
}

export const useMLTasksStore = create<MLTasksState>((set, get) => ({
  mlTasks: [],
  loading: false,
  error: null,

  fetchPrioritizedTasks: async (skip = 0, limit = 100) => {
    set({ loading: true, error: null });
    try {
      const tasks = await getPrioritizedTasks(skip, limit);
      // Transformar los datos para que sean compatibles con la interfaz existente
      const mlTasksWithRecommendation = tasks.map((task: any) => ({
        ...task,
        priority_score: task.priority_score || 0.8, // Valor por defecto si no viene
        recommendation_date: new Date(),
        was_completed: false
      }));
      set({ mlTasks: mlTasksWithRecommendation });
    } catch (err: any) {
      console.error(err);
      set({ error: err.message || "Error loading prioritized tasks" });
    } finally {
      set({ loading: false });
    }
  },

  sendFeedback: async (taskId: string, data: any) => {
    try {
      await sendMLFeedback(taskId, data);
    } catch (err) {
      console.error(err);
    }
  },
}));