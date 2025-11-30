"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEnergyStore } from "@/lib/store/for-service/energy.store"
import { format } from "date-fns"
import { es, enUS } from "date-fns/locale" // Import locales
import { Calendar } from "lucide-react"
import { useTranslation, useLanguage, getTranslatedValue } from "@/lib/i18n"

export function EnergyHistory() {
  const { energyLogs } = useEnergyStore()
  const t = useTranslation()
  const language = useLanguage()

  const sortedLogs = [...energyLogs].sort((a, b) => b.logged_at.getTime() - a.logged_at.getTime())
  
  // Date locale map
  const locales = { en: enUS, es: es }

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
        <CardTitle>{t.energy.energyHistory}</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedLogs.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            {t.energy.noLogsYet}
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
                    {/* Translating "High" + "Energy" */}
                    {getTranslatedValue(log.energy_level, language)} {t.energy.energyLabel.toLowerCase()}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(log.logged_at, "MMM d, yyyy - h:mm a", { locale: locales[language] })}
                  </span>
                </div>
                {log.mood && (
                    <p className="text-sm font-medium text-foreground">
                        {t.energy.mood}: {log.mood}
                    </p>
                )}
                {log.notes && <p className="text-sm text-muted-foreground leading-relaxed">{log.notes}</p>}
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}