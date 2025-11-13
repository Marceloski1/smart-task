"use client"

import { ProtectedLayout } from "@/components/layout/protected-layout"
import { RecommendationCard } from "@/components/recommendations/recommendation-card"
import { RecommendationHistory } from "@/components/recommendations/recommendation-history"
import { RecommendationStats } from "@/components/recommendations/recommendation-stats"
import { AIExplanation } from "@/components/recommendations/ai-explanation"
import { useStore } from "@/lib/store"
import { mockDailyRecommendation } from "@/lib/mock-data"

export default function RecommendationsPage() {
  const { dailyRecommendation, tasks, updateRecommendation, updateTask } = useStore()

  const currentRecommendation = dailyRecommendation || mockDailyRecommendation

  const recommendedTask = tasks.find((t) => t.id === currentRecommendation.task_id)

  const handleAccept = () => {
    updateRecommendation({ status: "accepted" })
    if (recommendedTask) {
      updateTask(recommendedTask.id, { status: "in_progress" })
    }
  }

  const handleReject = () => {
    updateRecommendation({ status: "rejected" })
  }

  // Mock history data
  const historyItems = [
    {
      id: "1",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      taskTitle: "Complete project proposal",
      status: "accepted",
      confidence: 0.92,
      wasCompleted: true,
    },
    {
      id: "2",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      taskTitle: "Review team code",
      status: "accepted",
      confidence: 0.88,
      wasCompleted: true,
    },
    {
      id: "3",
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      taskTitle: "Update documentation",
      status: "rejected",
      confidence: 0.75,
    },
  ]

  const totalRecommendations = historyItems.length + 1
  const acceptedCount = historyItems.filter((i) => i.status === "accepted").length
  const rejectedCount = historyItems.filter((i) => i.status === "rejected").length
  const completedCount = historyItems.filter((i) => i.wasCompleted).length
  const completionRate = acceptedCount > 0 ? (completedCount / acceptedCount) * 100 : 0

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
          {recommendedTask && (
            <RecommendationCard
              recommendation={currentRecommendation}
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
