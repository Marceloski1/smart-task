"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/recommendations",
  headers: {
    "Content-Type": "application/json",
  },
});

function authHeader() {
  const token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${token}` };
}

// ✅ Obtener recomendaciones con filtros opcionales
export async function getRecommendations(params?: {
  start_date?: string;
  end_date?: string;
  status?: string;
  skip?: number;
  limit?: number;
}) {
  const res = await api.get("/", {
    params,
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Obtener recomendación por ID
export async function getRecommendation(id: string) {
  const res = await api.get(`/${id}`, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Crear recomendación
export async function createRecommendation(data: {
  task_id: string;
  recommendation_date: string;
  status: string;
}) {
  const res = await api.post("/", data, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Actualizar recomendación
export async function updateRecommendation(id: string, data: any) {
  const res = await api.put(`/${id}`, data, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Actualizar estado
export async function updateRecommendationStatus(id: string, status: string) {
  const res = await api.put(`/${id}/status`, null, {
    params: { status },
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Eliminar recomendación
export async function deleteRecommendation(id: string) {
  const res = await api.delete(`/${id}`, {
    headers: authHeader(),
  });
  return res.data;
}
