"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { TaskStatus, PriorityLevel } from "@/lib/types"
import { Filter } from "lucide-react"
import { useTranslation, getTranslatedValue, useLanguage } from "@/lib/i18n"

interface TaskFiltersProps {
  selectedStatus: TaskStatus | "all"
  selectedPriority: PriorityLevel | "all"
  onStatusChange: (status: TaskStatus | "all") => void
  onPriorityChange: (priority: PriorityLevel | "all") => void
  taskCounts: {
    all: number
    pending: number
    in_progress: number
    completed: number
  }
}

export function TaskFilters({
  selectedStatus,
  selectedPriority,
  onStatusChange,
  onPriorityChange,
  taskCounts,
}: TaskFiltersProps) {
  const t = useTranslation()
  const language = useLanguage()

  const statuses: Array<{ value: TaskStatus | "all"; label: string }> = [
    { value: "all", label: t.common.all },
    { value: "pending", label: getTranslatedValue("pending", language) },
    { value: "in_progress", label: getTranslatedValue("in_progress", language) },
    { value: "completed", label: getTranslatedValue("completed", language) },
  ]

  const priorities: Array<{ value: PriorityLevel | "all"; label: string }> = [
    { value: "all", label: t.common.all },
    { value: "high", label: getTranslatedValue("high", language) },
    { value: "medium", label: getTranslatedValue("medium", language) },
    { value: "low", label: getTranslatedValue("low", language) },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">{t.tasks.status}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {statuses.map((status) => (
          <Button
            key={status.value}
            variant={selectedStatus === status.value ? "default" : "outline"}
            size="sm"
            onClick={() => onStatusChange(status.value)}
            className="gap-2"
          >
            {status.label}
            <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
              {status.value === "all" ? taskCounts.all : taskCounts[status.value as keyof typeof taskCounts] || 0}
            </Badge>
          </Button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-medium">{t.tasks.priority}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {priorities.map((priority) => (
          <Button
            key={priority.value}
            variant={selectedPriority === priority.value ? "default" : "outline"}
            size="sm"
            onClick={() => onPriorityChange(priority.value)}
          >
            {priority.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
