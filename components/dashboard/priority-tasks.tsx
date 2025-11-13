"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { format } from "date-fns"
import { Clock, AlertCircle } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function PriorityTasks() {
  const { tasks } = useStore()
  const t = useTranslation()

  const highPriorityTasks = tasks
    .filter((t) => t.priority_level === "high" && t.status !== "completed")
    .sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0))
    .slice(0, 5)

  const getPriorityColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      case "medium":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
      case "low":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      case "pending":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in_progress":
        return t.tasks.inProgress
      case "pending":
        return t.tasks.pending
      case "completed":
        return t.tasks.completed
      default:
        return status
    }
  }

  const getPriorityLabel = (level: string) => {
    switch (level) {
      case "high":
        return t.tasks.high
      case "medium":
        return t.tasks.medium
      case "low":
        return t.tasks.low
      default:
        return level
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            {t.dashboard.priorityTasks}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {highPriorityTasks.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">{t.dashboard.noTasks}</p>
          ) : (
            <div className="space-y-4">
              {highPriorityTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium leading-relaxed">{task.title}</h4>
                    <Badge variant="outline" className={getPriorityColor(task.priority_level || "")}>
                      {getPriorityLabel(task.priority_level || "")}
                    </Badge>
                  </div>
                  {task.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{task.description}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="outline" className={getStatusColor(task.status)}>
                      {getStatusLabel(task.status)}
                    </Badge>
                    {task.deadline && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(task.deadline, "MMM d, yyyy")}
                      </span>
                    )}
                    {task.priority_score && <span className="font-medium">Score: {task.priority_score}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
