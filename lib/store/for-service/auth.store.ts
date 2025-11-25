"use client";

import { create } from "zustand";
import type { User } from "@/lib/types";
import { AuthService } from "@/service/auth.service";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<User | null>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      await AuthService.loginRequest(email, password);
      const user = await get().fetchUser();
      if (user) {
        set({ user });
      }
    } catch (err: any) {
      console.error(err);
      set({ error: err.message || "Login failed" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      // Optionally call API logout if exists
      localStorage.removeItem("access_token");
      set({ user: null, error: null });
    } catch (err) {
      console.error(err);
    }
  },

  fetchUser: async () => {
    try {
      const user = await AuthService.me();
      set({ user });
      return user;
    } catch (err: any) {
      console.error(err);
      set({ error: err.message || "Failed to fetch user" });
      return null;
    }
  },
}));