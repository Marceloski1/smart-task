"use client";

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/ml_tasks",
  headers: {
    "Content-Type": "application/json",
  },
});

function authHeader() {
  const token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${token}` };
}

// ✅ Obtener tareas priorizadas por el modelo ML
export async function getPrioritizedTasks(skip = 0, limit = 100) {
  const res = await api.get("/prioritized", {
    params: { skip, limit },
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Entrenar modelo con una tarea
export async function trainModel(taskId: string) {
  const res = await api.post(`/${taskId}/train`, null, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Obtener horario recomendado
export async function getRecommendedTime(taskId: string) {
  const res = await api.get(`/${taskId}/recommended-time`, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Enviar feedback al modelo ML
export async function sendMLFeedback(taskId: string, data: {
  feedback_type: string;
  was_useful: boolean;
  actual_priority?: string;
  actual_completion_time?: number;
}) {
  const res = await api.post(`/${taskId}/feedback`, null, {
    params: data,
    headers: authHeader(),
  });
  return res.data;
}
