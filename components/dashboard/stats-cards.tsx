"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Clock, TrendingUp, Zap } from "lucide-react"
import { useTaskStore } from "@/lib/store/for-service/task.store"
import { useEnergyStore } from "@/lib/store/for-service/energy.store"
import { useTranslation } from "@/lib/i18n"

export function StatsCards() {
  const tasks = useTaskStore((state) => state.tasks)
  const energyLogs = useEnergyStore((state) => state.energyLogs)
  const t = useTranslation()

  const completedTasks = tasks.filter((t) => t.status === "completed").length
  const pendingTasks = tasks.filter((t) => t.status === "pending").length
  const inProgressTasks = tasks.filter((t) => t.status === "in_progress").length

  const recentEnergy = energyLogs.slice(-7)
  const avgEnergy =
    recentEnergy.length > 0
      ? recentEnergy.reduce((sum, log) => {
          const energyValue = log.energy_level === "high" ? 3 : log.energy_level === "medium" ? 2 : 1
          return sum + energyValue
        }, 0) / recentEnergy.length
      : 0

  const stats = [
    {
      title: t.dashboard.completedTasks,
      value: completedTasks,
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: t.dashboard.activeTasks,
      value: inProgressTasks,
      icon: Clock,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: t.dashboard.totalTasks,
      value: tasks.length,
      icon: TrendingUp,
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/20",
    },
    {
      title: t.dashboard.avgEnergy,
      value: avgEnergy.toFixed(1),
      icon: Zap,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`rounded-full p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
