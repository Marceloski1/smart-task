'use client'
import api from "@/api/axios/axios-global";

export async function fetchCategories() {
  const res = await api.get("/categories/");
  return res.data;
}

export async function getCategories(skip = 0, limit = 100) {
  const res = await api.get("/categories/", {
    params: { skip, limit },
  });
  return res.data;
}

export async function getCategory(id: string) {
  const res = await api.get(`/categories/${id}`);
  return res.data;
}

export async function createCategory(data: {
  name: string;
  description?: string;
}) {
  const res = await api.post("/categories/", data);
  return res.data;
}

export async function updateCategory(id: string, data: any) {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id: string) {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
}

export const CategoryService = {
  fetchCategories,
  getById: getCategory,
  create: createCategory,
  update: updateCategory,
  delete: deleteCategory,
};
