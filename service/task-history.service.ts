"use client";

import api from "@/api/axios/axios-global";

export const TaskHistoryService = {
  getByTask: async (taskId, params = {}) => {
    const { skip = 0, limit = 100 } = params;
    const res = await api.get(`/task-history/task/${taskId}`, {
      params: { skip, limit },
    });
    return res.data;
  },

  getUserHistory: async (params = {}) => {
    const { skip = 0, limit = 100 } = params;
    const res = await api.get(`/task-history/user/`, {
      params: { skip, limit },
    });
    return res.data;
  },

  getById: async (historyId) => {
    const res = await api.get(`/task-history/${historyId}`);
    return res.data;
  },
};
