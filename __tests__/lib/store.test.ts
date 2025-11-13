import { renderHook, act } from "@testing-library/react"
import { useStore } from "@/lib/store"
import type { Task } from "@/lib/types"

describe("Zustand Store", () => {
  beforeEach(() => {
    // Reset store state before each test
    useStore.setState({
      tasks: [],
      selectedTask: null,
    })
  })

  it("adds a task", () => {
    const { result } = renderHook(() => useStore())

    const newTask: Task = {
      id: "test-1",
      user_id: "user-1",
      category_id: null,
      title: "New Task",
      description: "Task description",
      urgency: "medium",
      impact: "medium",
      estimated_duration: 30,
      deadline: null,
      priority_score: 50,
      priority_level: "medium",
      completion_probability: 0.8,
      status: "pending",
      energy_required: "medium",
      created_at: new Date(),
      updated_at: new Date(),
      completed_at: null,
      actual_duration: undefined,
    }

    act(() => {
      result.current.addTask(newTask)
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0]).toEqual(newTask)
  })

  it("updates a task", () => {
    const { result } = renderHook(() => useStore())

    const task: Task = {
      id: "test-1",
      user_id: "user-1",
      category_id: null,
      title: "Original Title",
      description: "Original description",
      urgency: "medium",
      impact: "medium",
      estimated_duration: 30,
      deadline: null,
      priority_score: 50,
      priority_level: "medium",
      completion_probability: 0.8,
      status: "pending",
      energy_required: "medium",
      created_at: new Date(),
      updated_at: new Date(),
      completed_at: null,
      actual_duration: undefined,
    }

    act(() => {
      result.current.addTask(task)
      result.current.updateTask("test-1", { title: "Updated Title", status: "completed" })
    })

    expect(result.current.tasks[0].title).toBe("Updated Title")
    expect(result.current.tasks[0].status).toBe("completed")
  })

  it("deletes a task", () => {
    const { result } = renderHook(() => useStore())

    const task: Task = {
      id: "test-1",
      user_id: "user-1",
      category_id: null,
      title: "Task to delete",
      description: "",
      urgency: "medium",
      impact: "medium",
      estimated_duration: 30,
      deadline: null,
      priority_score: 50,
      priority_level: "medium",
      completion_probability: 0.8,
      status: "pending",
      energy_required: "medium",
      created_at: new Date(),
      updated_at: new Date(),
      completed_at: null,
      actual_duration: undefined,
    }

    act(() => {
      result.current.addTask(task)
      result.current.deleteTask("test-1")
    })

    expect(result.current.tasks).toHaveLength(0)
  })

  it("toggles theme", () => {
    const { result } = renderHook(() => useStore())

    expect(result.current.theme).toBe("light")

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe("dark")

    act(() => {
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe("light")
  })

  it("handles user login and logout", () => {
    const { result } = renderHook(() => useStore())

    act(() => {
      result.current.login("demo@smarttask.com", "demo")
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user).toBeTruthy()

    act(() => {
      result.current.logout()
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user).toBeNull()
  })
})
