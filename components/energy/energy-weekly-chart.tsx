"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEnergyStore } from "@/lib/store/for-service/energy.store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { format, startOfWeek, addDays } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { BarChart3 } from "lucide-react";
import { useTranslation, useLanguage } from "@/lib/i18n";

export function EnergyWeeklyChart() {
  const { energyLogs } = useEnergyStore();
  const t = useTranslation();
  const language = useLanguage();
  const locales = { en: enUS, es: es };

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const chartData = weekDays.map((day) => {
    const dayLogs = energyLogs.filter(
      (log) => format(log.logged_at, "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
    );

    const avgEnergy =
      dayLogs.length > 0
        ? dayLogs.reduce((sum, log) => {
            const value =
              log.energy_level === "high"
                ? 3
                : log.energy_level === "medium"
                ? 2
                : 1;
            return sum + value;
          }, 0) / dayLogs.length
        : 0;

    return {
      // Localized day name (Mon, Tue / Lun, Mar)
      day: format(day, "EEE", { locale: locales[language] }),
      energy: avgEnergy,
      hasData: dayLogs.length > 0,
    };
  });

  const getBarColor = (value: number) => {
    if (value >= 2.5) return "hsl(var(--chart-3))";
    if (value >= 1.5) return "hsl(var(--chart-1))";
    return "hsl(var(--chart-2))";
  };

  const getLabelForValue = (value: number) => {
      if (value === 3) return t.tasks.high;
      if (value === 2) return t.energy.medShort;
      if (value === 1) return t.tasks.low;
      return "";
  }

  const getTooltipLabel = (value: number) => {
    if (value === 0) return t.energy.noData;
    if (value >= 2.5) return t.tasks.high;
    if (value >= 1.5) return t.tasks.medium;
    return t.tasks.low;
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
            {t.energy.weeklyOverview}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="day"
          className="text-xs text-muted-foreground capitalize"
          tick={{ fill: "currentColor" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
        <YAxis
          domain={[0, 3]}
          ticks={[0, 1, 2, 3]}
          tickFormatter={(value) => getLabelForValue(value)}
          className="text-xs text-muted-foreground"
          tick={{ fill: "currentColor" }}
          axisLine={{ stroke: "hsl(var(--border))" }}
          tickLine={{ stroke: "hsl(var(--border))" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
            color: "hsl(var(--foreground))",
          }}
          labelStyle={{ color: "hsl(var(--foreground))", textTransform: "capitalize" }}
          itemStyle={{ color: "hsl(var(--foreground))" }}
          formatter={(value: number) => [
            getTooltipLabel(value),
            t.energy.energyLabel,
          ]}
        />
        <Bar dataKey="energy" radius={[8, 8, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={getBarColor(entry.energy)} 
              opacity={entry.hasData ? 1 : 0.3}
              className="fill-primary"
            />
          ))}
        </Bar>
      </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}