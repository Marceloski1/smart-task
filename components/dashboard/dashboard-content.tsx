"use client"

import { StatsCards } from "./stats-cards"
import { PriorityTasks } from "./priority-tasks"
import { EnergyChart } from "./energy-chart"
import { AIRecommendation } from "./ai-recommendation"
import { useTranslation } from "@/lib/i18n"

export function DashboardContent() {
  const t = useTranslation()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">{t.nav.dashboard}</h1>
        <p className="mt-2 text-muted-foreground text-pretty">
          {t.dashboard.welcome}! {t.dashboard.overview}
        </p>
      </div>

      <StatsCards />

      <AIRecommendation />

      <div className="grid gap-6 lg:grid-cols-2">
        <PriorityTasks />
        <EnergyChart />
      </div>
    </div>
  )
}
