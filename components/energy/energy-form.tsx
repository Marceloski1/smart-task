"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEnergyStore } from "@/lib/store/for-service/energy.store";
import { useAuthStore } from "@/lib/store/for-service/auth.store";
import type { EnergyLevel, EnergyLog } from "@/lib/types";
import {
  type Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
} from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function EnergyForm() {
  const energyStore = useEnergyStore();
  const authStore = useAuthStore();
  const addEnergyLog = energyStore.addEnergyLog;
  const user = authStore.user;
  const t = useTranslation();

  const [selectedLevel, setSelectedLevel] = useState<EnergyLevel>("medium");
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const energyLevels: Array<{
    value: EnergyLevel;
    label: string;
    icon: typeof Battery;
    color: string;
    bgColor: string;
  }> = [
    {
      value: "low",
      label: t.energy.lowEnergy,
      icon: BatteryLow,
      color: "text-red-600 dark:text-red-400",
      bgColor:
        "bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30",
    },
    {
      value: "medium",
      label: t.energy.mediumEnergy,
      icon: BatteryMedium,
      color: "text-amber-600 dark:text-amber-400",
      bgColor:
        "bg-amber-100 dark:bg-amber-900/20 hover:bg-amber-200 dark:hover:bg-amber-900/30",
    },
    {
      value: "high",
      label: t.energy.highEnergy,
      icon: BatteryFull,
      color: "text-green-600 dark:text-green-400",
      bgColor:
        "bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to submit energy logs");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const logData = {
        energy_level: selectedLevel,
        logged_at: new Date().toISOString(),
        notes: notes.trim() || undefined,
        task_id: null,
      };

      const result = await addEnergyLog(logData);

      if (result) {
        setSuccess(true);
        setNotes("");
        setSelectedLevel("medium");
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(t.sidebar.failedToSave);
      }
    } catch (err: any) {
      console.error("Error submitting energy log:", err);
      setError(err.message || t.sidebar.genericError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-balance">
          {t.energy.title}
        </h1>
        <p className="mt-2 text-muted-foreground text-pretty">
          {t.energy.subtitle}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t.energy.logEnergyLevel}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label>{t.energy.howAreYouFeeling}</Label>
                <div className="grid gap-3 md:grid-cols-3">
                  {energyLevels.map((level) => (
                    <motion.button
                      key={level.value}
                      type="button"
                      onClick={() => setSelectedLevel(level.value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                        selectedLevel === level.value
                          ? "border-primary shadow-sm"
                          : "border-transparent"
                      } ${level.bgColor}`}
                    >
                      <level.icon className={`h-8 w-8 ${level.color}`} />
                      <span className="text-sm font-medium">{level.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">{t.energy.notes}</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.energy.notesPlaceholder}
                  maxLength={500}
                  rows={2}
                />
              </div>

              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="rounded-lg bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400"
                >
                  {t.energy.logSuccess}
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="rounded-lg bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
                style={{
                  position: "relative",
                  zIndex: 9000, // Ensure it's on top
                }}
              >
                {loading ? "Saving..." : t.energy.logEnergyLevel}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
