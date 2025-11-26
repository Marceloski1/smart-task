"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useAuthStore } from "@/lib/store/for-service/auth.store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n"


export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const t = useTranslation()

  const router = useRouter()

  const login = useAuthStore((state) => state.login)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  if (!username || !password) {
    setError(t.auth.fillAllFields)
    return
  }

  try {
    await login(username, password)
    router.push("/dashboard")
  } catch (err: any) {
    const message = err?.message || t.auth.loginFailed
    setError(String(message))
  }
}


  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-balance">{t.auth.welcomeBack} SmartTask</CardTitle>
          <CardDescription className="text-pretty">{t.auth.manageTasksIntelligently}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
              >
                {error}
              </motion.div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="demo@smarttask.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
               
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.auth.password}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t.auth.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="rounded-md bg-muted p-3 text-sm text-muted-foreground m-2">
              <p className="font-medium text-foreground">Demo credentials:</p>
              <p>Email: demo@smarttask.com</p>
              <p>Password: demo</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              {t.auth.login}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}
