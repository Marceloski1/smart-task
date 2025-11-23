"use client";

import api from "@/api/axios/axios-global";

export const UserService = {
  getUsers: async (skip = 0, limit = 100) => {
    const res = await api.get(`/users?skip=${skip}&limit=${limit}`);
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/users/${id}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post(`/users`, data);
    return res.data;
  },

  update: async (id, data) => {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  },
};
