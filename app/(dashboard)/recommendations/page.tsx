"use client"

import { ProtectedLayout } from "@/components/layout/protected-layout"
import { RecommendationCard } from "@/components/recommendations/recommendation-card"
import { RecommendationHistory } from "@/components/recommendations/recommendation-history"
import { RecommendationStats } from "@/components/recommendations/recommendation-stats"
import { AIExplanation } from "@/components/recommendations/ai-explanation"
import { useEffect } from "react"
import { useTaskStore } from "@/lib/store/for-service/task.store"
import { useRecommendationStore } from "@/lib/store/for-service/recommendation.store"

export default function RecommendationsPage() {
  const fetchRecommendations = useRecommendationStore((state) => state.fetchRecommendations)
  const recommendations = useRecommendationStore((state) => state.recommendations)
  const updateRecommendation = useRecommendationStore((state) => state.updateRecommendation)
  const tasks = useTaskStore((state) => state.tasks)
  const fetchTasks = useTaskStore((state) => state.fetchTasks)
  const updateTask = useTaskStore((state) => state.updateTask)

  useEffect(() => {
    fetchRecommendations()
    fetchTasks()
  }, [fetchRecommendations, fetchTasks])

  const pendingRecommendation = recommendations.find((r) => r.status === "pending")

  const recommendedTask = pendingRecommendation ? tasks.find((t) => t.id === pendingRecommendation.task_id) : null

    // Add logs to check data
  useEffect(() => {
  }, [recommendations, pendingRecommendation, recommendedTask])
  
  const handleAccept = () => {
    if (pendingRecommendation && recommendedTask) {
      updateRecommendation(pendingRecommendation.id, { status: "accepted" })
      updateTask(recommendedTask.id, { status: "in_progress" })
    }
  }

  const handleReject = () => {
    if (pendingRecommendation) {
      updateRecommendation(pendingRecommendation.id, { status: "rejected" })
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
          <h1 className="text-3xl font-bold tracking-tight text-balance">AI Recommendations</h1>
          <p className="mt-2 text-muted-foreground text-pretty">Get personalized task recommendations powered by AI</p>
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
            />
          )}
          <AIExplanation />
        </div>

        <RecommendationHistory items={historyItems} />
      </div>
    </ProtectedLayout>
  )
}
