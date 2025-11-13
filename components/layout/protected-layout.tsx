"use client"

import type React from "react"

import { useStore } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AppHeader } from "./app-header"
import { AppSidebar } from "./app-sidebar"

export function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
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
