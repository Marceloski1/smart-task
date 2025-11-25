"use client";

import { create } from "zustand";
import type { DailyRecommendation } from "@/lib/types";
import { getRecommendations, getRecommendation, createRecommendation, updateRecommendation, deleteRecommendation } from "@/service/recomendations.service";

interface RecommendationState {
  recommendations: DailyRecommendation[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchRecommendations: (params?: { start_date?: string; end_date?: string; status?: string; skip?: number; limit?: number }) => Promise<void>;
  getRecommendation: (id: string) => Promise<DailyRecommendation | null>;
  createRecommendation: (data: any) => Promise<DailyRecommendation | null>;
  updateRecommendation: (id: string, data: any) => Promise<DailyRecommendation | null>;
  deleteRecommendation: (id: string) => Promise<boolean>;
}

export const useRecommendationStore = create<RecommendationState>((set, get) => ({
  recommendations: [],
  loading: false,
  error: null,

  fetchRecommendations: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const recommendations = await getRecommendations(params);
      set({ recommendations });
    } catch (err: any) {
      console.error(err);
      set({ error: err.message || "Error loading recommendations" });
    } finally {
      set({ loading: false });
    }
  },

  getRecommendation: async (id: string) => {
    try {
      const recommendation = await getRecommendation(id);
      return recommendation;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  createRecommendation: async (data: any) => {
    try {
      const newRecommendation = await createRecommendation(data);
      set({ recommendations: [...get().recommendations, newRecommendation] });
      return newRecommendation;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  updateRecommendation: async (id: string, data: any) => {
    try {
      const updated = await updateRecommendation(id, data);
      set({
        recommendations: get().recommendations.map((r) => (r.id === id ? updated : r)),
      });
      return updated;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  deleteRecommendation: async (id: string) => {
    try {
      await deleteRecommendation(id);
      set({
        recommendations: get().recommendations.filter((recommendation) => recommendation.id !== id),
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
}));