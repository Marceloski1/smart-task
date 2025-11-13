import { ProtectedLayout } from "@/components/layout/protected-layout"
import { EnergyForm } from "@/components/energy/energy-form"
import { EnergyHistory } from "@/components/energy/energy-history"
import { EnergyInsights } from "@/components/energy/energy-insights"
import { EnergyWeeklyChart } from "@/components/energy/energy-weekly-chart"

export default function EnergyPage() {
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
