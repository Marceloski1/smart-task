"use client"

import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  Tag,
  BarChart3,
  AlertCircle,
  Gauge,
  CheckCircle2,
  ClipboardList,
  BatteryMedium,
} from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { Task } from "@/lib/types"

interface TaskDialogProps {
  open: boolean
  onClose: () => void
  task?: Task | null
}

export function TaskInformation({ open, onClose, task }: TaskDialogProps) {
  const t = useTranslation()

  if (!task) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex gap-2 items-center">
            <ClipboardList className="size-5" />
            {t.tasks?.taskInfo ?? "Task information"}
          </DialogTitle>
        </DialogHeader>

        {/* MAIN CONTAINER */}
        <div className="space-y-6 py-2">

          {/* BASIC DATA */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h2 className="font-semibold text-lg">General</h2>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Title</p>
                  <p className="font-semibold">{task.title}</p>
                </div>

                {task.description && (
                  <div className="space-y-1 md:col-span-2">
                    <p className="text-sm font-medium text-muted-foreground">Description</p>
                    <p>{task.description}</p>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p>{task.category_id ?? "No category"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-green-500" />
                    <p>{task.status}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PRIORITY */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <BarChart3 className="size-5" />
                Priority
              </h2>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Urgency</p>
                  <p className="capitalize">{task.urgency ?? "—"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Impact</p>
                  <p className="capitalize">{task.impact ?? "—"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Energy required</p>
                  <div className="flex items-center gap-2">
                    <BatteryMedium className="size-4" />
                    <p className="capitalize">{task.energy_required ?? "—"}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Priority score</p>
                  <p>{task.priority_score ?? "—"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Priority level</p>
                  <p className="capitalize">{task.priority_level ?? "—"}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Completion probability</p>
                  <p>
                    {task.completion_probability != null
                      ? `${task.completion_probability * 100}%`
                      : "—"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* TIME & DATES */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Clock className="size-5" />
                Time & Deadlines
              </h2>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estimated duration</p>
                  <p>{task.estimated_duration ? `${task.estimated_duration} min` : "—"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Actual duration</p>
                  <p>{task.actual_duration ? `${task.actual_duration} min` : "—"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Deadline</p>
                  <p>{task.deadline ? task.deadline.toLocaleString() : "No deadline"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* METADATA */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <Tag className="size-5" />
                Metadata
              </h2>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Created at</p>
                  <p>{task.created_at.toLocaleString()}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-muted-foreground">Updated at</p>
                  <p>{task.updated_at.toLocaleString()}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-muted-foreground">Completed at</p>
                  <p>{task.completed_at ? task.completed_at.toLocaleString() : "Not completed"}</p>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>
            {t.common.cancel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
