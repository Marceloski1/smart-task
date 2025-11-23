"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/energy_logs",
  headers: {
    "Content-Type": "application/json",
  },
});

function authHeader() {
  const token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${token}` };
}

// ✅ Obtener logs de energía con filtros
export async function getEnergyLogs(params?: {
  start_date?: string;
  end_date?: string;
  task_id?: string;
  skip?: number;
  limit?: number;
}) {
  const res = await api.get("/", {
    params,
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Obtener log por ID
export async function getEnergyLog(id: string) {
  const res = await api.get(`/${id}`, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Crear log de energía
export async function createEnergyLog(data: {
  energy_level: number;
  logged_at: string;
  task_id?: string;
}) {
  const res = await api.post("/", data, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Actualizar log
export async function updateEnergyLog(id: string, data: any) {
  const res = await api.put(`/${id}`, data, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Eliminar log
export async function deleteEnergyLog(id: string) {
  const res = await api.delete(`/${id}`, {
    headers: authHeader(),
  });
  return res.data;
}
