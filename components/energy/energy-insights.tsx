"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { TrendingUp, TrendingDown, Minus, Lightbulb } from "lucide-react"

export function EnergyInsights() {
  const { energyLogs } = useStore()

  const recentLogs = energyLogs.slice(-14)

  const energyToNumber = (level: string) => {
    return level === "high" ? 3 : level === "medium" ? 2 : 1
  }

  const avgEnergy =
    recentLogs.length > 0
      ? recentLogs.reduce((sum, log) => sum + energyToNumber(log.energy_level), 0) / recentLogs.length
      : 0

  const lastWeekLogs = recentLogs.slice(-7)
  const previousWeekLogs = recentLogs.slice(-14, -7)

  const lastWeekAvg =
    lastWeekLogs.length > 0
      ? lastWeekLogs.reduce((sum, log) => sum + energyToNumber(log.energy_level), 0) / lastWeekLogs.length
      : 0

  const previousWeekAvg =
    previousWeekLogs.length > 0
      ? previousWeekLogs.reduce((sum, log) => sum + energyToNumber(log.energy_level), 0) / previousWeekLogs.length
      : 0

  const trend = lastWeekAvg > previousWeekAvg ? "up" : lastWeekAvg < previousWeekAvg ? "down" : "stable"

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
      case "down":
        return <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-400" />
      default:
        return <Minus className="h-5 w-5 text-amber-600 dark:text-amber-400" />
    }
  }

  const getTrendMessage = () => {
    switch (trend) {
      case "up":
        return "Your energy levels are improving! Keep up the great work."
      case "down":
        return "Your energy seems lower recently. Consider taking breaks and prioritizing rest."
      default:
        return "Your energy levels are stable. Maintain your current routine."
    }
  }

  const getRecommendation = () => {
    if (avgEnergy >= 2.5) {
      return "You have high energy! This is a great time to tackle challenging tasks."
    } else if (avgEnergy >= 1.5) {
      return "Your energy is moderate. Focus on medium-priority tasks and take regular breaks."
    } else {
      return "Your energy is low. Prioritize rest and focus only on essential tasks."
    }
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Weekly Trend</span>
            {getTrendIcon()}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{getTrendMessage()}</p>
        </div>

        <div className="rounded-lg bg-muted/50 p-4">
          <p className="text-sm font-medium text-foreground">Recommendation</p>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{getRecommendation()}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 rounded-lg border border-border bg-card p-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{avgEnergy.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Avg Energy</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{recentLogs.length}</p>
            <p className="text-xs text-muted-foreground">Total Logs</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{recentLogs.filter((l) => l.energy_level === "high").length}</p>
            <p className="text-xs text-muted-foreground">High Days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
