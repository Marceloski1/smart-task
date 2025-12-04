"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Calendar, TrendingUp } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

interface RecommendationHistoryItem {
  id: string
  date: Date
  taskTitle: string
  status: string
  confidence: number
  wasCompleted?: boolean
}

interface RecommendationHistoryProps {
  items: RecommendationHistoryItem[]
}

export function RecommendationHistory({ items }: RecommendationHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      case "postponed":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20"
    }
  }

  const {recommendations:t} = useTranslation() ;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {t.pendingRecoments}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">{t.noHistoryYet}</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-medium leading-relaxed">{item.taskTitle}</h4>
                  <Badge variant="outline" className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {item.date && format(new Date(item.date), "MMM dd, yyyy")}
                  </span>
                  <span className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {Math.round(item.confidence)}% {t.confidence}
                  </span>
                  {item.wasCompleted !== undefined && (
                    <span className={item.wasCompleted ? "text-green-600 dark:text-green-400" : ""}>
                      {item.wasCompleted ? t.completed : t.notCompleted}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
