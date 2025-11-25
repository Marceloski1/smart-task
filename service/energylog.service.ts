"use client";

import api from "@/api/axios/axios-global";

// ✅ Obtener logs de energía con filtros
export async function getEnergyLogs(params?: {
  start_date?: string;
  end_date?: string;
  task_id?: string;
  skip?: number;
  limit?: number;
}) {
  const res = await api.get("/energy_logs/", {
    params,
  });
  return res.data;
}

// ✅ Obtener log por ID
export async function getEnergyLog(id: string) {
  const res = await api.get(`/energy_logs/${id}`);
  return res.data;
}

// ✅ Crear log de energía
export async function createEnergyLog(data: {
  energy_level: string;
  logged_at: string;
  task_id?: string;
}) {
  const res = await api.post("/energy_logs", data);
  return res.data;
}

// ✅ Actualizar log
export async function updateEnergyLog(id: string, data: any) {
  const res = await api.put(`/energy_logs/${id}`, data);
  return res.data;
}

// ✅ Eliminar log
export async function deleteEnergyLog(id: string) {
  const res = await api.delete(`/energy_logs/${id}`);
  return res.data;
}
