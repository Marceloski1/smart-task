"use client"

import type React from "react"
import { useState, useEffect } from "react"

import { useAuthStore } from "@/lib/store/for-service/auth.store"
import { useJwtStore } from "@/lib/store/for-service/jwt-store"
import { useRouter } from "next/navigation"
import { AppHeader } from "./app-header"
import { AppSidebar } from "./app-sidebar"

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const getAccessToken = useJwtStore((state) => state.getAccessToken)
  const user = useAuthStore((state: any) => state.user)
  const fetchUser = useAuthStore((state: any) => state.fetchUser)
  const logout = useAuthStore((state: any) => state.logout)

  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      const token = getAccessToken()

      if (!token) {
        router.push("/login")
        return
      }

      // If we have a token but no user data, try to fetch user
      if (!user) {
        try {
          await fetchUser()
        } catch (error) {
          console.error("Failed to fetch user:", error)
          await logout()
          router.push("/login")
          return
        }
      }

      setIsVerifying(false)
    }

    verifyAuth()
  }, [getAccessToken, user, fetchUser, logout, router])

  // Only render if we have both token and user
  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
