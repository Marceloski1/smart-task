import { z } from "zod"

// Enums as Zod schemas
export const EnergyLevelSchema = z.enum(["low", "medium", "high"])
export const TaskStatusSchema = z.enum(["pending", "in_progress", "completed", "archived", "postponed"])
export const PriorityLevelSchema = z.enum(["low", "medium", "high"])
export const UrgencySchema = z.enum(["low", "medium", "high"])
export const ImpactSchema = z.enum(["low", "medium", "high"])
export const RecommendationStatusSchema = z.enum(["pending", "accepted", "rejected", "postponed"])

// User schema
export const UserPreferencesSchema = z.object({
  notifications: z.boolean().default(true),
  energy_tracking: z.boolean().default(false),
  default_view: z.enum(["priority", "deadline", "category"]).default("priority"),
})

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  preferences: UserPreferencesSchema,
  energy_level: EnergyLevelSchema.default("medium"),
  created_at: z.date(),
  updated_at: z.date(),
  last_login: z.date().nullable(),
  is_active: z.boolean().default(true),
})

// Category schema
export const CategorySchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .default("#007bff"),
  description: z.string().optional(),
  created_at: z.date(),
})

// Task schema
export const TaskSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  category_id: z.string().uuid().nullable(),
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  urgency: UrgencySchema.optional(),
  impact: ImpactSchema.optional(),
  estimated_duration: z.number().int().positive().optional(),
  deadline: z.string().datetime().nullable(),
  priority_score: z.number().int().min(1).max(100).optional(),
  priority_level: PriorityLevelSchema.optional(),
  completion_probability: z.number().min(0).max(1).optional(),
  status: TaskStatusSchema.default("pending"),
  energy_required: EnergyLevelSchema.optional(),
  created_at: z.date(),
  updated_at: z.date(),
  completed_at: z.date().nullable(),
  actual_duration: z.number().int().positive().optional(),
})

// Daily recommendation schema
export const DailyRecommendationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  task_id: z.string().uuid(),
  recommendation_reason: z.string(),
  confidence_score: z.number().min(0).max(1),
  status: RecommendationStatusSchema.default("pending"),
  was_completed: z.boolean().optional(),
  completed_on_time: z.boolean().optional(),
  recommendation_date: z.date(),
  created_at: z.date(),
})

// Energy log schema
export const EnergyLogSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  task_id: z.string().uuid().nullable(),
  energy_level: EnergyLevelSchema,
  mood: z.string().optional(),
  notes: z.string().optional(),
  logged_at: z.date(),
})

// Type exports
export type User = z.infer<typeof UserSchema>
export type UserPreferences = z.infer<typeof UserPreferencesSchema>
export type Category = z.infer<typeof CategorySchema>
export type Task = z.infer<typeof TaskSchema>
export type DailyRecommendation = z.infer<typeof DailyRecommendationSchema>
export type EnergyLog = z.infer<typeof EnergyLogSchema>
export type EnergyLevel = z.infer<typeof EnergyLevelSchema>
export type TaskStatus = z.infer<typeof TaskStatusSchema>
export type PriorityLevel = z.infer<typeof PriorityLevelSchema>
export type RecommendationStatus = z.infer<typeof RecommendationStatusSchema>

//Creates schemas 

// Category create schema
export const CategoryCreateSchema = z.object({
  //user_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
})

export type CategoryCreate = z.infer<typeof CategoryCreateSchema>

// Task create schema 
export const TaskCreateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  urgency: UrgencySchema.optional(),
  impact: ImpactSchema.optional(),
  estimated_duration: z.number().int().nonnegative().optional().default(0),
  // Accept ISO string or Date when creating; we'll accept string here
  deadline: z.string().datetime().optional().nullable(),
  category_id: z.string().uuid().optional().nullable(),
  energy_required: EnergyLevelSchema.optional(),
})

export type TaskCreate = z.infer<typeof TaskCreateSchema>
