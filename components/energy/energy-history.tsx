"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { format } from "date-fns"
import { Calendar } from "lucide-react"

export function EnergyHistory() {
  const { energyLogs } = useStore()

  const sortedLogs = [...energyLogs].sort((a, b) => b.logged_at.getTime() - a.logged_at.getTime())

  const getEnergyColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20"
      case "medium":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20"
      case "low":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Energy History</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedLogs.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No energy logs yet. Start tracking your energy levels!
          </p>
        ) : (
          <div className="space-y-3">
            {sortedLogs.slice(0, 10).map((log, index) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col gap-2 rounded-lg border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={getEnergyColor(log.energy_level)}>
                    {log.energy_level} energy
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(log.logged_at, "MMM d, yyyy - h:mm a")}
                  </span>
                </div>
                {log.mood && <p className="text-sm font-medium text-foreground">Mood: {log.mood}</p>}
                {log.notes && <p className="text-sm text-muted-foreground leading-relaxed">{log.notes}</p>}
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
