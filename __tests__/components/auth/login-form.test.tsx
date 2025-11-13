import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { LoginForm } from "@/components/auth/login-form"
import { useStore } from "@/lib/store"
import jest from "jest" // Import jest to declare the variable

// Mock Zustand store
jest.mock("@/lib/store")

describe("LoginForm", () => {
  const mockLogin = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useStore as unknown as jest.Mock).mockReturnValue({
      login: mockLogin,
    })
  })

  it("renders login form correctly", () => {
    render(<LoginForm />)

    expect(screen.getByText("Welcome back")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Password")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument()
  })

  it("shows error when fields are empty", async () => {
    render(<LoginForm />)

    const submitButton = screen.getByRole("button", { name: /sign in/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText("Please fill in all fields")).toBeInTheDocument()
    })
  })

  it("calls login with correct credentials", async () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "demo@smarttask.com" } })
    fireEvent.change(passwordInput, { target: { value: "demo" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("demo@smarttask.com", "demo")
    })
  })

  it("shows error with invalid credentials", async () => {
    render(<LoginForm />)

    const emailInput = screen.getByLabelText("Email")
    const passwordInput = screen.getByLabelText("Password")
    const submitButton = screen.getByRole("button", { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: "wrong@email.com" } })
    fireEvent.change(passwordInput, { target: { value: "wrongpass" } })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })
})
