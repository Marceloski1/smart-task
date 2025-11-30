import { create } from 'zustand'
import { fetchCategories , getCategories , getCategory , createCategory , updateCategory as updateCategoryService, deleteCategory as deleteCategoryService } from '@/service/category.service'
import  api   from '@/api/axios/axios-global'
import { Category, CategoryCreate } from '../types'

interface CategoryState {
  categories: Category[]
  loading:boolean ; 
  error:string|null ; 
  fetchCategories: (skip?: number, limit?: number) => Promise<void>
  createCategory: (payload: CategoryCreate) => Promise<Category | null>
  getCategoryById: (id: string) => Promise<Category | null>
  setCategory: (category: Category) => void
  updateCategory:(id: string, data: any) => Promise<Category | null>;
  deleteCategory:(id:string) => Promise<boolean> 
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  setCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),

  fetchCategories: async (skip = 0, limit = 100) => {
    try {
      const res = await getCategories(skip, limit)
      const categories = Array.isArray(res) ? res : res?.categories ?? []
      set({ categories })
      return categories
    } catch (err) {
      console.error('fetchCategories error', err)
      return []
    }
  },

  createCategory: async (payload) => {
    try {
      const res = await createCategory(payload)
      const category = res?.data ?? res
      if (category) {
        set((state) => ({ categories: [category, ...state.categories] }))
      }
      return category
    } catch (err) {
      console.error('createCategory error', err)
      return null
    }
  },
  updateCategory:async (id, data) => {
   set({error:null})
    try{
      const res = await updateCategoryService(id ,data)
      const category = {
        ...res
      }
      set((state) => ({
        categories: state.categories.map((c) => (
          c.id == id ? category : c
        ))
      }))
      return res ;
   }catch (err) {
      console.error('createCategory error', err)
      return null
    }
  } ,
  getCategoryById: async (id) => {
    try {
      const res = await getCategory(id)
      return res?.data ?? res
    } catch (err) {
      console.error('getCategoryById error', err)
      return null
    }
  },
   deleteCategory: async (id: string) => {
      set({ error: null });
      try {
        await deleteCategoryService(id);
        set((state) => ({
          categories: state.categories.filter(c => c.id != id)
        }));
        return true;
      } catch (err: any) {
        console.error('[Category Store] Error deleting category:', err);
        set({ error: err.message || "Failed to delete category" });
        return false;
      }
    },
}))