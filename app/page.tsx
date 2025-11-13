"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

export default function HomePage() {
  const router = useRouter()
  const isAuthenticated = useStore((state) => state.isAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">SmartTask</h1>
        <p className="mt-2 text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}
