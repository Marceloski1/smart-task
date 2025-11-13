import { TaskSchema, UserSchema, EnergyLogSchema } from "@/lib/types"

describe("Zod Schemas", () => {
  describe("TaskSchema", () => {
    it("validates a valid task", () => {
      const validTask = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        user_id: "123e4567-e89b-12d3-a456-426614174001",
        category_id: null,
        title: "Valid Task",
        description: "Task description",
        urgency: "high",
        impact: "high",
        estimated_duration: 60,
        deadline: new Date(),
        priority_score: 90,
        priority_level: "high",
        completion_probability: 0.85,
        status: "pending",
        energy_required: "high",
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
      }

      const result = TaskSchema.safeParse(validTask)
      expect(result.success).toBe(true)
    })

    it("rejects invalid priority_score", () => {
      const invalidTask = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        user_id: "123e4567-e89b-12d3-a456-426614174001",
        category_id: null,
        title: "Invalid Task",
        priority_score: 150, // Invalid: must be 1-100
        status: "pending",
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
      }

      const result = TaskSchema.safeParse(invalidTask)
      expect(result.success).toBe(false)
    })
  })

  describe("UserSchema", () => {
    it("validates a valid user", () => {
      const validUser = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        email: "test@example.com",
        name: "Test User",
        preferences: {
          notifications: true,
          energy_tracking: false,
          default_view: "priority",
        },
        energy_level: "medium",
        created_at: new Date(),
        updated_at: new Date(),
        last_login: new Date(),
        is_active: true,
      }

      const result = UserSchema.safeParse(validUser)
      expect(result.success).toBe(true)
    })

    it("rejects invalid email", () => {
      const invalidUser = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        email: "not-an-email",
        name: "Test User",
        preferences: {
          notifications: true,
          energy_tracking: false,
          default_view: "priority",
        },
        energy_level: "medium",
        created_at: new Date(),
        updated_at: new Date(),
        last_login: null,
        is_active: true,
      }

      const result = UserSchema.safeParse(invalidUser)
      expect(result.success).toBe(false)
    })
  })

  describe("EnergyLogSchema", () => {
    it("validates a valid energy log", () => {
      const validLog = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        user_id: "123e4567-e89b-12d3-a456-426614174001",
        task_id: null,
        energy_level: "high",
        mood: "Energetic",
        notes: "Feeling great today",
        logged_at: new Date(),
      }

      const result = EnergyLogSchema.safeParse(validLog)
      expect(result.success).toBe(true)
    })

    it("rejects invalid energy_level", () => {
      const invalidLog = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        user_id: "123e4567-e89b-12d3-a456-426614174001",
        task_id: null,
        energy_level: "super-high", // Invalid
        logged_at: new Date(),
      }

      const result = EnergyLogSchema.safeParse(invalidLog)
      expect(result.success).toBe(false)
    })
  })
})
