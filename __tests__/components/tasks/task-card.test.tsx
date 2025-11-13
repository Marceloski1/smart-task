import { render, screen, fireEvent } from "@testing-library/react"
import { TaskCard } from "@/components/tasks/task-card"
import type { Task } from "@/lib/types"
import { useStore } from "@/lib/store"
import jest from "jest"

jest.mock("@/lib/store")

const mockTask: Task = {
  id: "test-task-1",
  user_id: "test-user",
  category_id: null,
  title: "Test Task",
  description: "Test description",
  urgency: "high",
  impact: "high",
  estimated_duration: 60,
  deadline: new Date("2024-12-31"),
  priority_score: 90,
  priority_level: "high",
  completion_probability: 0.85,
  status: "pending",
  energy_required: "high",
  created_at: new Date(),
  updated_at: new Date(),
  completed_at: null,
  actual_duration: undefined,
}

describe("TaskCard", () => {
  const mockUpdateTask = jest.fn()
  const mockDeleteTask = jest.fn()
  const mockOnEdit = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useStore as unknown as jest.Mock).mockReturnValue({
      updateTask: mockUpdateTask,
      deleteTask: mockDeleteTask,
      categories: [],
    })

    // Mock window.confirm
    global.confirm = jest.fn(() => true)
  })

  it("renders task information correctly", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)

    expect(screen.getByText("Test Task")).toBeInTheDocument()
    expect(screen.getByText("Test description")).toBeInTheDocument()
    expect(screen.getByText("high")).toBeInTheDocument()
    expect(screen.getByText("pending")).toBeInTheDocument()
  })

  it("calls onEdit when edit button is clicked", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)

    const editButton = screen.getByRole("button", { name: /edit task/i })
    fireEvent.click(editButton)

    expect(mockOnEdit).toHaveBeenCalledWith(mockTask)
  })

  it("updates status when start task button is clicked", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)

    const startButton = screen.getByRole("button", { name: /start task/i })
    fireEvent.click(startButton)

    expect(mockUpdateTask).toHaveBeenCalledWith(mockTask.id, { status: "in_progress" })
  })

  it("marks task as complete when mark complete button is clicked", () => {
    const inProgressTask = { ...mockTask, status: "in_progress" as const }
    render(<TaskCard task={inProgressTask} onEdit={mockOnEdit} />)

    const completeButton = screen.getByRole("button", { name: /mark complete/i })
    fireEvent.click(completeButton)

    expect(mockUpdateTask).toHaveBeenCalledWith(mockTask.id, expect.objectContaining({ status: "completed" }))
  })

  it("deletes task when delete button is clicked and confirmed", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />)

    const deleteButton = screen.getByRole("button", { name: /delete task/i })
    fireEvent.click(deleteButton)

    expect(global.confirm).toHaveBeenCalled()
    expect(mockDeleteTask).toHaveBeenCalledWith(mockTask.id)
  })
})
