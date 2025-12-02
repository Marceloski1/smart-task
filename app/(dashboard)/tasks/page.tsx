"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { TaskFilters } from "@/components/tasks/task-filters"
import { TaskCard } from "@/components/tasks/task-card"
import { TaskDialog } from "@/components/tasks/task-dialog"
import { Button } from "@/components/ui/button"
import type { Task, TaskStatus, PriorityLevel } from "@/lib/types"
import { Plus } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useTaskStore } from "@/lib/store/for-service/task.store"

export default function TasksPage() {
  const tasks = useTaskStore((state) => state.tasks)
  const fetchTasks = useTaskStore((state) => state.fetchTasks)
  const t = useTranslation()

  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | "all">("pending")
  const [selectedPriority, setSelectedPriority] = useState<PriorityLevel | "all">("all")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = selectedStatus === "all" || task.status === selectedStatus
    const priorityMatch = selectedPriority === "all" || task.priority_level === selectedPriority
    return statusMatch && priorityMatch
  })

  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setDialogOpen(true)
  }

  const handleCreate = () => {
    setEditingTask(null)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingTask(null)
  }

  useEffect(() => {
    const fetch = async () => {
       await fetchTasks() ; 
    } 
    fetch()
  }, [])

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">{t.tasks.title}</h1>
            <p className="mt-2 text-muted-foreground text-pretty">{t.dashboard.manageTasksAndProgress}</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            {t.tasks.newTask}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-6">
            <TaskFilters
              selectedStatus={selectedStatus}
              selectedPriority={selectedPriority}
              onStatusChange={setSelectedStatus}
              onPriorityChange={setSelectedPriority}
              taskCounts={taskCounts}
            />
          </aside>

          <div>
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center"
              >
                <p className="text-lg font-medium text-muted-foreground">{t.tasks.noTasksFound}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t.tasks.createTaskToStart}</p>
                <Button onClick={handleCreate} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  {t.tasks.createTask}
                </Button>
              </motion.div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={handleEdit} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <TaskDialog open={dialogOpen} onClose={handleCloseDialog} task={editingTask} />
      </div>
    </ProtectedLayout>
  )
}
