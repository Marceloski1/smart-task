"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Brain, Zap, Target } from "lucide-react"

export function AIExplanation() {
  const factors = [
    {
      icon: Target,
      title: "Priority Score",
      description: "Tasks with higher urgency and impact are prioritized",
    },
    {
      icon: Zap,
      title: "Energy Match",
      description: "Tasks are matched to your current energy levels",
    },
    {
      icon: Brain,
      title: "Completion History",
      description: "Your past completion patterns influence recommendations",
    },
    {
      icon: Lightbulb,
      title: "Deadline Proximity",
      description: "Upcoming deadlines are factored into the decision",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>How AI Recommendations Work</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          SmartTask uses intelligent algorithms to analyze multiple factors and recommend the best task for you each
          day.
        </p>
        <div className="space-y-3">
          {factors.map((factor) => (
            <div key={factor.title} className="flex gap-3 rounded-lg border border-border bg-card p-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <factor.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{factor.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
