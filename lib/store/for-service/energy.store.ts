"use client";

import { create } from "zustand";
import { EnergyLog } from "@/lib/types";
import { getEnergyLogs, getEnergyLog, createEnergyLog, updateEnergyLog, deleteEnergyLog } from "@/service/energylog.service";

interface EnergyState {
  energyLogs: EnergyLog[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchEnergyLogs: (params?: { start_date?: string; end_date?: string; skip?: number; limit?: number }) => Promise<void>;
  getEnergyLog: (id: string) => Promise<EnergyLog | null>;
  addEnergyLog: (log: { energy_level: string; logged_at: string; mood?: string; notes?: string; task_id?: string | null }) => Promise<EnergyLog | null>;
  updateEnergyLog: (id: string, updates: Partial<EnergyLog>) => Promise<EnergyLog | null>;
  deleteEnergyLog: (id: string) => Promise<boolean>;
}

export const useEnergyStore = create<EnergyState>((set) => ({
  energyLogs: [],
  loading: false,
  error: null,

  fetchEnergyLogs: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const logs = await getEnergyLogs(params);
      console.log({logs})
      // Ensure logged_at is Date object
      const processedLogs = logs.map((log: any) => ({
        ...log,
        logged_at: new Date(log.logged_at)
      }));
      set({ energyLogs: processedLogs });
    } catch (err: any) {
      if (err.response?.status === 404) {
        console.warn('[Energy Store] 404 on energy_logs endpoint - treating as empty logs (backend route missing)');
        set({ energyLogs: [] });
      } else {
        console.error('[Energy Store] Error:', err.message || err);
        set({ error: err.message || "Error loading energy logs" });
      }
    } finally {
      set({ loading: false });
    }
  },

  getEnergyLog: async (id: string): Promise<EnergyLog | null> => {
    try {
      const log = await getEnergyLog(id);
      return {
        ...log,
        logged_at: new Date(log.logged_at)
      };
    } catch (err) {
      console.error('[Energy Store] Error getting energy log:', err);
      return null;
    }
  },

  addEnergyLog: async (log) => {
    set({ error: null });
    try {
      const logData = {
        ...log,
        task_id: log.task_id || undefined
      };
      const createdLog = await createEnergyLog(logData);
      const processedLog = {
        ...createdLog,
        logged_at: new Date(createdLog.logged_at)
      };
      set((state) => ({
        energyLogs: [processedLog, ...state.energyLogs].sort((a, b) => b.logged_at.getTime() - a.logged_at.getTime())
      }));
      return processedLog;
    } catch (err: any) {
      console.error('[Energy Store] Error adding energy log:', err);
      set({ error: err.message || "Failed to add energy log" });
      return null;
    }
  },

  updateEnergyLog: async (id: string, updates: Partial<EnergyLog>) => {
    set({ error: null });
    try {
      const updatedLog = await updateEnergyLog(id, updates);
      const processedLog = {
        ...updatedLog,
        logged_at: new Date(updatedLog.logged_at)
      };
      set((state) => ({
        energyLogs: state.energyLogs.map(log =>
          log.id === id ? processedLog : log
        )
      }));
      return processedLog;
    } catch (err: any) {
      console.error('[Energy Store] Error updating energy log:', err);
      set({ error: err.message || "Failed to update energy log" });
      return null;
    }
  },

  deleteEnergyLog: async (id: string) => {
    set({ error: null });
    try {
      await deleteEnergyLog(id);
      set((state) => ({
        energyLogs: state.energyLogs.filter(log => log.id !== id)
      }));
      return true;
    } catch (err: any) {
      console.error('[Energy Store] Error deleting energy log:', err);
      set({ error: err.message || "Failed to delete energy log" });
      return false;
    }
  },
}));