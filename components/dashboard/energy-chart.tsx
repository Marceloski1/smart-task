"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEnergyStore } from "@/lib/store/for-service/energy.store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { Battery } from "lucide-react";
import { useTranslation, useLanguage } from "@/lib/i18n";

export function EnergyChart() {
  const energyLogs = useEnergyStore((state) => state.energyLogs);
  const t = useTranslation();
  const language = useLanguage();
  const locales = { en: enUS, es: es };

  const chartData = energyLogs.slice(-14).map((log) => ({
    // Localized date
    date: format(log.logged_at, "MMM d", { locale: locales[language] }),
    energy:
      log.energy_level === "high" ? 3 : log.energy_level === "medium" ? 2 : 1,
    level: log.energy_level,
  }));

  const getLabelForValue = (value: number) => {
      if (value === 3) return t.tasks.high;
      if (value === 2) return t.tasks.medium;
      if (value === 1) return t.tasks.low;
      return "";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="h-5 w-5 text-primary" />
            {t.energy.last14Days}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="date"
                  className="text-xs text-muted-foreground capitalize"
                  tick={{ fill: "currentColor" }}
                  axisLine={{ stroke: "hsl(var(--border))" }}
                  tickLine={{ stroke: "hsl(var(--border))" }}
                />
                <YAxis
                  domain={[0, 3]}
                  ticks={[1, 2, 3]}
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
                    getLabelForValue(value),
                    t.energy.energyLabel,
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="energy"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{
                    fill: "hsl(var(--primary))",
                    r: 4,
                    className: "fill-primary",
                  }}
                  activeDot={{
                    r: 6,
                    fill: "hsl(var(--primary))",
                    stroke: "hsl(var(--primary))",
                    className: "fill-primary stroke-primary",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}