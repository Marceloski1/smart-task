"use client";

import { create } from "zustand";
import { Category, CategoryCreate } from "@/lib/types";
import { CategoryService } from "@/service/category.service";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchCategories: () => Promise<void>;
  getCategory: (id: string) => Promise<Category | null>;
  createCategory: (data: CategoryCreate) => Promise<Category | null>;
  updateCategory: (id: string, data: Partial<CategoryCreate>) => Promise<Category | null>;
  deleteCategory: (id: string) => Promise<boolean>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true, error: null });
    try {
      const categories = await CategoryService.fetchCategories();
      set({ categories });
    } catch (err: any) {
      console.error(err);
      set({ error: err.message || "Error loading categories" });
    } finally {
      set({ loading: false });
    }
  },

  getCategory: async (id: string) => {
    try {
      return await CategoryService.getById(id);
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  createCategory: async (data: CategoryCreate) => {
    try {
      const newCategory = await CategoryService.create(data);

      // Add to store
      set({ categories: [...get().categories, newCategory] });
      return newCategory;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  updateCategory: async (id: string, data: Partial<CategoryCreate>) => {
    try {
      const updated = await CategoryService.update(id, data);

      set({
        categories: get().categories.map((cat) => (cat.id === id ? updated : cat)),
      });

      return updated;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  deleteCategory: async (id: string) => {
    try {
      await CategoryService.delete(id);

      set({
        categories: get().categories.filter((category) => category.id !== id),
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  },
}));