'use client'
import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchCategories() {
  const token = localStorage.getItem("access_token");
  const res = await api.get("/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}


// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL + "/categories",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

function authHeader() {
  const token = localStorage.getItem("access_token");
  return { Authorization: `Bearer ${token}` };
}

// ✅ Obtener categorías
export async function getCategories(skip = 0, limit = 100) {
  const res = await api.get("/", {
    params: { skip, limit },
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Obtener categoría por ID
export async function getCategory(id: string) {
  const res = await api.get(`/${id}`, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Crear nueva categoría
export async function createCategory(data: {
  name: string;
  description?: string;
}) {
  const res = await api.post("/", data, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Actualizar categoría
export async function updateCategory(id: string, data: any) {
  const res = await api.put(`/${id}`, data, {
    headers: authHeader(),
  });
  return res.data;
}

// ✅ Eliminar categoría
export async function deleteCategory(id: string) {
  const res = await api.delete(`/${id}`, {
    headers: authHeader(),
  });
  return res.data;
}
