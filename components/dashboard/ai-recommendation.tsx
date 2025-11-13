"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { Sparkles, CheckCircle2, X } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export function AIRecommendation() {
  const { dailyRecommendation, tasks, updateRecommendation, updateTask } = useStore()
  const t = useTranslation()

  if (!dailyRecommendation || dailyRecommendation.status !== "pending") {
    return null
  }

  const recommendedTask = tasks.find((t) => t.id === dailyRecommendation.task_id)

  if (!recommendedTask) {
    return null
  }

  const handleAccept = () => {
    updateRecommendation({ status: "accepted" })
    updateTask(recommendedTask.id, { status: "in_progress" })
  }

  const handleReject = () => {
    updateRecommendation({ status: "rejected" })
  }

  const confidencePercentage = Math.round(dailyRecommendation.confidence_score * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {t.dashboard.dailyRecommendation}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-lg font-semibold leading-relaxed">{recommendedTask.title}</h4>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                {confidencePercentage}% {t.dashboard.confidence}
              </Badge>
            </div>
            {recommendedTask.description && (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{recommendedTask.description}</p>
            )}
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm font-medium text-foreground">{t.dashboard.aiSuggests}</p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {dailyRecommendation.recommendation_reason}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAccept} className="flex-1">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {t.recommendations.acceptRecommendation}
            </Button>
            <Button onClick={handleReject} variant="outline" className="flex-1 bg-transparent">
              <X className="mr-2 h-4 w-4" />
              {t.recommendations.skipRecommendation}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
