"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { format, startOfWeek, addDays } from "date-fns"
import { BarChart3 } from "lucide-react"

export function EnergyWeeklyChart() {
  const { energyLogs } = useStore()

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const chartData = weekDays.map((day) => {
    const dayLogs = energyLogs.filter((log) => format(log.logged_at, "yyyy-MM-dd") === format(day, "yyyy-MM-dd"))

    const avgEnergy =
      dayLogs.length > 0
        ? dayLogs.reduce((sum, log) => {
            const value = log.energy_level === "high" ? 3 : log.energy_level === "medium" ? 2 : 1
            return sum + value
          }, 0) / dayLogs.length
        : 0

    return {
      day: format(day, "EEE"),
      energy: avgEnergy,
      hasData: dayLogs.length > 0,
    }
  })

  const getBarColor = (value: number) => {
    if (value >= 2.5) return "hsl(var(--chart-3))"
    if (value >= 1.5) return "hsl(var(--chart-1))"
    return "hsl(var(--chart-2))"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Weekly Energy Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="day" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis
                  domain={[0, 3]}
                  ticks={[0, 1, 2, 3]}
                  tickFormatter={(value) => (value === 3 ? "High" : value === 2 ? "Med" : value === 1 ? "Low" : "")}
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  formatter={(value: number) => [
                    value === 0 ? "No data" : value >= 2.5 ? "High" : value >= 1.5 ? "Medium" : "Low",
                    "Energy",
                  ]}
                />
                <Bar dataKey="energy" radius={[8, 8, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.energy)} opacity={entry.hasData ? 1 : 0.3} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
