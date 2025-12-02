"use client"

import { ProtectedLayout } from "@/components/layout/protected-layout"
import { RecommendationCard } from "@/components/recommendations/recommendation-card"
import { RecommendationHistory } from "@/components/recommendations/recommendation-history"
import { RecommendationStats } from "@/components/recommendations/recommendation-stats"
import { AIExplanation } from "@/components/recommendations/ai-explanation"
import { useEffect, useState } from "react"
import { useTaskStore } from "@/lib/store/for-service/task.store"
import { useMLTasksStore } from "@/lib/store/for-service/mltask.store"
import { useTranslation } from "@/lib/i18n"

// Interfaz local para manejar el estado de recomendación
interface TaskRecommendation {
  id: string;
  task_id: string;
  status: "pending" | "accepted" | "rejected";
  confidence_score: number;
  recommendation_date: Date;
  recommendation_reason: string;
  was_completed: boolean;
}

export default function RecommendationsPage() {
  const fetchPrioritizedTasks = useMLTasksStore((state) => state.fetchPrioritizedTasks)
  const mlTasks = useMLTasksStore((state) => state.mlTasks)
  const sendFeedback = useMLTasksStore((state) => state.sendFeedback)
  const t = useTranslation() ; 
  const tasks = useTaskStore((state) => state.tasks)
  const fetchTasks = useTaskStore((state) => state.fetchTasks)
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus)

  // Estado local para manejar las recomendaciones
  const [recommendations, setRecommendations] = useState<TaskRecommendation[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPrioritizedTasks()
    fetchTasks()
  }, [fetchPrioritizedTasks, fetchTasks])

  // Transformar mlTasks a recommendations cuando se cargan los datos
  useEffect(() => {
    if (mlTasks.length > 0) {
      const newRecommendations = mlTasks.map((task, index) => ({
        id: `rec-${task.id}`,
        task_id: task.id,
        status: index === 0 ? "pending" as const : "accepted" as const,
        confidence_score: task.priority_score,
        recommendation_date: task.recommendation_date || new Date(),
        recommendation_reason: generateRecommendationReason(task),
        was_completed: task.was_completed || false
      }))
      setRecommendations(newRecommendations)
    }
  }, [mlTasks])

  const generateRecommendationReason = (task: any): string => {
    const reasons = t.recommendations.recommendationReasons
    return reasons[Math.floor(Math.random() * reasons.length)]
  }

  const pendingRecommendation = recommendations.find((r) => r.status === "pending")
  const recommendedTask = pendingRecommendation ? tasks.find((t) => t.id === pendingRecommendation.task_id) : null

  const handleAccept = async () => {
    if (pendingRecommendation && recommendedTask) {
      setLoading(true)
      try {
        // 1. Actualizar estado de la tarea a "completed"
        await updateTaskStatus(pendingRecommendation.task_id, "completed")
        
        // 2. Enviar feedback positivo al modelo ML
        await sendFeedback(pendingRecommendation.task_id, {
          feedback_type: "completion",
          was_useful: true,
          actual_completion_time: recommendedTask.estimated_duration || 60
        })
        
        // 3. Actualizar estado local
        setRecommendations(prev => 
          prev.map(rec => 
            rec.id === pendingRecommendation.id 
              ? { ...rec, status: "accepted", was_completed: true } 
              : rec
          )
        )

        // 4. Recargar datos
        await fetchPrioritizedTasks()
        await fetchTasks()
        
      } catch (err) {
        console.error("Error al aceptar recomendación:", err)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleReject = async () => {
    if (pendingRecommendation) {
      setLoading(true)
      try {
        // 1. Actualizar estado de la tarea a "completed" 
        await updateTaskStatus(pendingRecommendation.task_id, "completed")

        // 2. Enviar feedback negativo al modelo ML 
        await sendFeedback(pendingRecommendation.task_id, {
          feedback_type: "rejection",
          was_useful: false,
          actual_priority: "high" // Según el script, se envía "high" cuando se rechaza
        })
        
        // 3. Actualizar estado local
        setRecommendations(prev => 
          prev.map(rec => 
            rec.id === pendingRecommendation.id 
              ? { ...rec, status: "rejected" } 
              : rec
          )
        )

        // 4. Recargar datos
        await fetchPrioritizedTasks()
        await fetchTasks()
        
      } catch (err) {
        console.error("Error al rechazar recomendación:", err)
      } finally {
        setLoading(false)
      }
    }
  }

  const rawHistoryItems = recommendations.filter((r) => r.status !== "pending")

  const totalRecommendations = recommendations.length
  const acceptedCount = rawHistoryItems.filter((i) => i.status === "accepted").length
  const rejectedCount = rawHistoryItems.filter((i) => i.status === "rejected").length
  const completedCount = rawHistoryItems.filter((i) => i.was_completed).length
  const completionRate = acceptedCount > 0 ? (completedCount / acceptedCount) * 100 : 0

  const historyItems = rawHistoryItems.map((r) => {
    const task = tasks.find((t) => t.id === r.task_id)
    return {
      id: r.id,
      date: r.recommendation_date,
      taskTitle: task?.title ?? "Unknown Task",
      status: r.status,
      confidence: r.confidence_score,
      wasCompleted: r.was_completed,
    }
  })

  return (
    <ProtectedLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">{t.recommendations.title}</h1>
          <p className="mt-2 text-muted-foreground text-pretty">{t.recommendations.subtitle}</p>
        </div>

        <RecommendationStats
          totalRecommendations={totalRecommendations}
          acceptedCount={acceptedCount}
          rejectedCount={rejectedCount}
          completionRate={completionRate}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {pendingRecommendation && recommendedTask && (
            <RecommendationCard
              recommendation={pendingRecommendation}
              task={recommendedTask}
              onAccept={handleAccept}
              onReject={handleReject}
              loading={loading}
            />
          )}
          <AIExplanation />
        </div>

        <RecommendationHistory items={historyItems} />
      </div>
    </ProtectedLayout>
  )
}