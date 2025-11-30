"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/lib/i18n"
import { CheckCircle2, XCircle, Clock, TrendingUp } from "lucide-react"

interface RecommendationStatsProps {
  totalRecommendations: number
  acceptedCount: number
  rejectedCount: number
  completionRate: number
}

export function RecommendationStats({
  totalRecommendations,
  acceptedCount,
  rejectedCount,
  completionRate,
}: RecommendationStatsProps) {
  const {recommendations:t} = useTranslation()
  const stats = [
    {
      label: t.total,
      value: totalRecommendations,
      icon: TrendingUp,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      label: t.accept,
      value: acceptedCount,
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: t.rejected,
      value: rejectedCount,
      icon: XCircle,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/20",
    },
    {
      label: t.completionRate,
      value: `${Math.round(completionRate)}%`,
      icon: Clock,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`rounded-full p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
