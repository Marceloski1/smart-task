"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import type { Task } from "@/lib/types"
import { format } from "date-fns"
import { Clock, Edit, Trash2, CheckCircle2, PlayCircle , FileWarning } from "lucide-react"
import { useCategoryStore } from "@/lib/store/for-service/categories.store"
import { useTranslation, getTranslatedValue, useLanguage } from "@/lib/i18n"
import { TaskService } from "@/service/task.service"
import { useTaskStore } from "@/lib/store/for-service/task.store"
import { useState, useEffect } from "react"
import { TaskInformation } from "./task-information"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const t = useTranslation()
  const language = useLanguage()
  const {deleteTask , updateTask} = useTaskStore()
  const [dialogOpen, setDialogOpen] = useState(false)
  const {updateTaskStatus} = useTaskStore()

  const getPriorityColor = (level?: string) => {
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
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "in_progress":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
      case "pending":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const handleStatusChange = async () => {
    if (task.status === "pending") {
      await updateTaskStatus(task.id, "in_progress" )
    } else if (task.status === "in_progress") {
      await updateTaskStatus(task.id, "completed") //, completed_at: new Date() 
    }
  }

    const handleCloseDialog = () => {
    setDialogOpen(false)
    }

    const handleOpenDialog = () => {
      setDialogOpen(true) ; 
    }

  const handleDelete = () => {
    if (confirm(t.tasks.deleteConfirm)) {
      deleteTask(task.id)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 space-y-1">
                <h3 className="font-semibold leading-relaxed"
                onClick={() => handleOpenDialog()}
                >{task.title}</h3>
                {task.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed"
                  onClick={() => handleOpenDialog()}
                  >{task.description}</p>
                )}
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={() => onEdit(task)} className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">{t.tasks.editTask}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className="h-8 w-8 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">{t.tasks.deleteTask}</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className={getStatusColor(task.status)}>
                {getTranslatedValue(task.status, language)}
              </Badge>
              {task.priority_level && (
                <Badge variant="outline" className={getPriorityColor(task.priority_level)}>
                  {getTranslatedValue(task.priority_level, language)}
                </Badge>
              )}

              {!task.category_id && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <FileWarning className="h-5 w-5 text-amber-300" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t.tasks.noCategory}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                {task.deadline && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(task.deadline, "MMM d, yyyy")}
                  </span>
                )}
                {task.estimated_duration && <span>{task.estimated_duration} min</span>}
              </div>
              {task.priority_score && (
                <span className="font-medium">
                  {t.tasks.score}: {task.priority_score}
                </span>
              )}
            </div>

            {task.status !== "completed" && (
              <Button onClick={handleStatusChange} size="sm" variant="outline" className="w-full bg-transparent">
                {task.status === "pending" ? (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    {t.tasks.startTask}
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4"  />
                    {t.tasks.completeTask}
                  </>
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
      <TaskInformation open={dialogOpen} onClose={handleCloseDialog} task={task}/>
    </motion.div>
  )
}
