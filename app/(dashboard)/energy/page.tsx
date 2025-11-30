"use client"

import { useEffect, useRef } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { EnergyForm } from "@/components/energy/energy-form"
import { EnergyHistory } from "@/components/energy/energy-history"
import { EnergyInsights } from "@/components/energy/energy-insights"
import { EnergyWeeklyChart } from "@/components/energy/energy-weekly-chart"
import { useEnergyStore } from "@/lib/store/for-service/energy.store"

export default function EnergyPage() {
  const hasLoaded = useRef(false);
  const fetchEnergyLogs = useEnergyStore((state) => state.fetchEnergyLogs)

  useEffect(() => {
    if (hasLoaded.current) return;
    
    hasLoaded.current = true;
    fetchEnergyLogs()
  }, [fetchEnergyLogs])
  return (
    <ProtectedLayout>
      <div className="space-y-6">
        {/* Content is rendered by client components with translations */}
        <EnergyForm />
        <div className="grid gap-6 lg:grid-cols-2">
          <EnergyInsights />
          <EnergyWeeklyChart />
        </div>
        <EnergyHistory />
      </div>
    </ProtectedLayout>
  )
}
