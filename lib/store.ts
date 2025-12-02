import { create } from "zustand"
import type { User, Task, Category, EnergyLog, DailyRecommendation } from "./types"
import type { Language } from "./i18n"

interface AppState {
  // User state
  user: User | null
  isAuthenticated: boolean

  // Tasks state
  tasks: Task[]
  selectedTask: Task | null

  // Categories state
  categories: Category[]

  // Energy logs state
  energyLogs: EnergyLog[]

  // Recommendations state
  dailyRecommendation: DailyRecommendation | null

  // UI state
  theme: "light" | "dark"
  sidebarOpen: boolean
  language: Language

  // Actions
  setUser: (user: User | null) => void
  login: (email: string, password: string) => void
  logout: () => void

  addTask: (task: Task) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  setSelectedTask: (task: Task | null) => void

  addCategory: (category: Category) => void
  updateCategory: (id: string, updates: Partial<Category>) => void
  deleteCategory: (id: string) => void

  addEnergyLog: (log: EnergyLog) => void

  updateRecommendation: (updates: Partial<DailyRecommendation>) => void

  toggleTheme: () => void
  setSidebarOpen: (open: boolean) => void
  setLanguage: (language: Language) => void
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  tasks: [],
  selectedTask: null,
  categories: [],
  energyLogs: [],
  dailyRecommendation: null,
  theme: "light",
  sidebarOpen: false,
  language: "en",

  // User actions
  setUser: (user) => set({ user, isAuthenticated: !!user }),

  login: (email, password) => {
    // Removed - use auth.store
  },

  logout: () => set({ user: null, isAuthenticated: false }),

  // Task actions
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, ...updates, updated_at: new Date() } : task)),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
      selectedTask: state.selectedTask?.id === id ? null : state.selectedTask,
    })),

  setSelectedTask: (task) => set({ selectedTask: task }),

  // Category actions
  addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),

  updateCategory: (id, updates) =>
    set((state) => ({
      categories: state.categories.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat)),
    })),

  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((cat) => cat.id !== id),
    })),

  // Energy log actions
  addEnergyLog: (log) => set((state) => ({ energyLogs: [...state.energyLogs, log] })),

  // Recommendation actions
  updateRecommendation: (updates) =>
    set((state) => ({
      dailyRecommendation: state.dailyRecommendation ? { ...state.dailyRecommendation, ...updates } : null,
    })),

  // UI actions
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light"
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme === "dark")
      }
      return { theme: newTheme }
    }),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  setLanguage: (language) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("smarttask-language", language)
      document.documentElement.lang = language
    }
    set({ language })
  },
}))

if (typeof window !== "undefined") {
  const savedLanguage = localStorage.getItem("smarttask-language") as Language | null
  if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
    useStore.setState({ language: savedLanguage })
    document.documentElement.lang = savedLanguage
  }
}
