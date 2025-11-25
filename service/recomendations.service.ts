"use client";

import api from "@/api/axios/axios-global";

// ✅ Obtener recomendaciones con filtros opcionales
export async function getRecommendations(params?: {
  start_date?: string;
  end_date?: string;
  status?: string;
  skip?: number;
  limit?: number;
}) {
  const res = await api.get("/recommendations", {
    params,
  });
  return res.data;
}

// ✅ Obtener recomendación por ID
export async function getRecommendation(id: string) {
  const res = await api.get(`/recommendations/${id}`);
  return res.data;
}

// ✅ Crear recomendación
export async function createRecommendation(data: {
  task_id: string;
  recommendation_date: string;
  status: string;
}) {
  const res = await api.post("/recommendations", data);
  return res.data;
}

// ✅ Actualizar recomendación
export async function updateRecommendation(id: string, data: any) {
  const res = await api.put(`/recommendations/${id}`, data);
  return res.data;
}

// ✅ Actualizar estado
export async function updateRecommendationStatus(id: string, status: string) {
  const res = await api.put(`/recommendations/${id}/status`, null, {
    params: { status },
  });
  return res.data;
}

// ✅ Eliminar recomendación
export async function deleteRecommendation(id: string) {
  const res = await api.delete(`/recommendations/${id}`);
  return res.data;
}
