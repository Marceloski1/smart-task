"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Task, TaskStatus, PriorityLevel } from "@/lib/types"
import { useStore } from "@/lib/store"
import { format } from "date-fns"
import { useTranslation, getTranslatedValue, useLanguage } from "@/lib/i18n"

interface TaskDialogProps {
  open: boolean
  onClose: () => void
  task?: Task | null
}

export function TaskDialog({ open, onClose, task }: TaskDialogProps) {
  const { addTask, updateTask, user, categories } = useStore()
  const t = useTranslation()
  const language = useLanguage()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    urgency: "medium" as "low" | "medium" | "high",
    impact: "medium" as "low" | "medium" | "high",
    estimated_duration: "",
    deadline: "",
    energy_required: "medium" as "low" | "medium" | "high",
    status: "pending" as TaskStatus,
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        category_id: task.category_id || "",
        urgency: task.urgency || "medium",
        impact: task.impact || "medium",
        estimated_duration: task.estimated_duration?.toString() || "",
        deadline: task.deadline ? format(task.deadline, "yyyy-MM-dd") : "",
        energy_required: task.energy_required || "medium",
        status: task.status,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        category_id: "",
        urgency: "medium",
        impact: "medium",
        estimated_duration: "",
        deadline: "",
        energy_required: "medium",
        status: "pending",
      })
    }
  }, [task, open])

  const calculatePriority = (): { score: number; level: PriorityLevel } => {
    const urgencyWeight = formData.urgency === "high" ? 40 : formData.urgency === "medium" ? 25 : 10
    const impactWeight = formData.impact === "high" ? 40 : formData.impact === "medium" ? 25 : 10
    const deadlineWeight = formData.deadline ? 20 : 0

    const score = urgencyWeight + impactWeight + deadlineWeight
    const level: PriorityLevel = score >= 70 ? "high" : score >= 40 ? "medium" : "low"

    return { score, level }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !user) return

    const { score, level } = calculatePriority()

    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      category_id: formData.category_id || null,
      urgency: formData.urgency,
      impact: formData.impact,
      estimated_duration: formData.estimated_duration ? Number.parseInt(formData.estimated_duration) : undefined,
      deadline: formData.deadline ? new Date(formData.deadline) : null,
      energy_required: formData.energy_required,
      priority_score: score,
      priority_level: level,
      completion_probability: 0.8,
      status: formData.status,
    }

    if (task) {
      updateTask(task.id, taskData)
    } else {
      const newTask: Task = {
        ...taskData,
        id: crypto.randomUUID(),
        user_id: user.id,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
        actual_duration: undefined,
      }
      addTask(newTask)
    }

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? t.tasks.editTask : t.tasks.createTask}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t.tasks.taskTitle} *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t.tasks.taskTitlePlaceholder}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t.tasks.description}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t.tasks.descriptionPlaceholder}
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="category">{t.tasks.category}</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder={t.tasks.selectCategory} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">{t.tasks.status}</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as TaskStatus })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">{getTranslatedValue("pending", language)}</SelectItem>
                    <SelectItem value="in_progress">{getTranslatedValue("in_progress", language)}</SelectItem>
                    <SelectItem value="completed">{getTranslatedValue("completed", language)}</SelectItem>
                    <SelectItem value="postponed">{getTranslatedValue("postponed", language)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="urgency">{t.tasks.urgency}</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value as "low" | "medium" | "high" })}
                >
                  <SelectTrigger id="urgency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{getTranslatedValue("low", language)}</SelectItem>
                    <SelectItem value="medium">{getTranslatedValue("medium", language)}</SelectItem>
                    <SelectItem value="high">{getTranslatedValue("high", language)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="impact">{t.tasks.impact}</Label>
                <Select
                  value={formData.impact}
                  onValueChange={(value) => setFormData({ ...formData, impact: value as "low" | "medium" | "high" })}
                >
                  <SelectTrigger id="impact">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{getTranslatedValue("low", language)}</SelectItem>
                    <SelectItem value="medium">{getTranslatedValue("medium", language)}</SelectItem>
                    <SelectItem value="high">{getTranslatedValue("high", language)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="energy">{t.tasks.energyRequired}</Label>
                <Select
                  value={formData.energy_required}
                  onValueChange={(value) =>
                    setFormData({ ...formData, energy_required: value as "low" | "medium" | "high" })
                  }
                >
                  <SelectTrigger id="energy">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{getTranslatedValue("low", language)}</SelectItem>
                    <SelectItem value="medium">{getTranslatedValue("medium", language)}</SelectItem>
                    <SelectItem value="high">{getTranslatedValue("high", language)}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="duration">{t.tasks.estimatedDuration}</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.estimated_duration}
                  onChange={(e) => setFormData({ ...formData, estimated_duration: e.target.value })}
                  placeholder={t.tasks.durationPlaceholder}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">{t.tasks.deadline}</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
            </div>

            <div className="rounded-lg bg-muted p-3 text-sm">
              <p className="font-medium text-foreground">{t.tasks.aiPriorityCalculation}</p>
              <p className="mt-1 text-muted-foreground leading-relaxed">{t.tasks.aiPriorityDesc}</p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t.common.cancel}
            </Button>
            <Button type="submit">{task ? t.common.save : t.common.create}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
