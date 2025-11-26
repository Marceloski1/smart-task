"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { AuthService } from "@/service/auth.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n"
import { useAuthStore } from "@/lib/store/for-service/auth.store" 

export function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const t = useTranslation()
  const router = useRouter()
  const { register } = useAuthStore() ;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!name || !email || !password || !confirmPassword) {
      setError(t.auth.fillAllFields)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError(t.auth.passwordTooShort)
      return
    }
    
    try {
      
    const user = await register(name , email , password) ;
      
      setSuccess(true)
        router.push("/login")
      
    } catch (err: any) {
      const message = err?.message || t.auth.registerFailed
      setError(String(message))
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-balance">{t.auth.getStarted} SmartTask</CardTitle>
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
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="rounded-lg bg-primary/10 p-3 text-sm text-primary"
              >
                {t.auth.registerSuccess}
              </motion.div>
            )}
            <div className="space-y-2">
              <Label htmlFor="name">{t.auth.name}</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t.auth.email}</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <div className="space-y-2 mb-2">
              <Label htmlFor="confirm-password">{t.auth.confirmPassword}</Label>
              <Input
                id="confirm-password"
                type="password"
                placeholder={t.auth.confirmPassword}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={success}>
              {success ? `${t.common.loading}` : t.auth.register}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}
