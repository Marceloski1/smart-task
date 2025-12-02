"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTaskStore } from "@/lib/store/for-service/task.store";
import { useMLTasksStore } from "@/lib/store/for-service/mltask.store";
import { RecommendationCard } from "@/components/recommendations/recommendation-card"
import { Sparkles, CheckCircle2, X } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { useEffect, useState } from "react";

interface TaskRecommendation {
  id: string;
  task_id: string;
  status: "pending" | "accepted" | "rejected";
  confidence_score: number;
  recommendation_date: Date;
  recommendation_reason: string;
  was_completed: boolean;
}

export function AIRecommendation() {
  const fetchPrioritizedTasks = useMLTasksStore(
    (state) => state.fetchPrioritizedTasks
  );
  const mlTasks = useMLTasksStore((state) => state.mlTasks);
  const sendFeedback = useMLTasksStore((state) => state.sendFeedback);

  const tasks = useTaskStore((state) => state.tasks);
  const fetchTasks = useTaskStore((state) => state.fetchTasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  // Estado local para manejar las recomendaciones
  const [recommendations, setRecommendations] = useState<TaskRecommendation[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  // Transformar mlTasks a recommendations cuando se cargan los datos
  useEffect(() => {
    if (mlTasks.length > 0) {
      const newRecommendations = mlTasks.map((task, index) => ({
        id: `rec-${task.id}`,
        task_id: task.id,
        status: index === 0 ? ("pending" as const) : ("accepted" as const),
        confidence_score: task.priority_score,
        recommendation_date: task.recommendation_date || new Date(),
        recommendation_reason: generateRecommendationReason(task),
        was_completed: task.was_completed || false,
      }));
      setRecommendations(newRecommendations);
    }
  }, [mlTasks]);

  const generateRecommendationReason = (task: any): string => {
    const t = useTranslation();
    const reasons = t.recommendations.recommendationReasons;
    return reasons[Math.floor(Math.random() * reasons.length)];
  };

  const pendingRecommendation = recommendations.find(
    (r) => r.status === "pending"
  );
  const recommendedTask = pendingRecommendation
    ? tasks.find((t) => t.id === pendingRecommendation.task_id)
    : null;

  const handleAccept = async () => {
    if (pendingRecommendation && recommendedTask) {
      setLoading(true);
      try {
        // 1. Actualizar estado de la tarea a "completed"
        await updateTaskStatus(pendingRecommendation.task_id, "completed");

        // 2. Enviar feedback positivo al modelo ML
        await sendFeedback(pendingRecommendation.task_id, {
          feedback_type: "completion",
          was_useful: true,
          actual_completion_time: recommendedTask.estimated_duration || 60,
        });

        // 3. Actualizar estado local
        setRecommendations((prev) =>
          prev.map((rec) =>
            rec.id === pendingRecommendation.id
              ? { ...rec, status: "accepted", was_completed: true }
              : rec
          )
        );

        // 4. Recargar datos
        await fetchPrioritizedTasks();
        await fetchTasks();
      } catch (err) {
        console.error("Error al aceptar recomendación:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleReject = async () => {
    if (pendingRecommendation) {
      setLoading(true);
      try {
        // 1. Actualizar estado de la tarea a "completed"
        await updateTaskStatus(pendingRecommendation.task_id, "completed");

        // 2. Enviar feedback negativo al modelo ML
        await sendFeedback(pendingRecommendation.task_id, {
          feedback_type: "rejection",
          was_useful: false,
          actual_priority: "high", // Según el script, se envía "high" cuando se rechaza
        });

        // 3. Actualizar estado local
        setRecommendations((prev) =>
          prev.map((rec) =>
            rec.id === pendingRecommendation.id
              ? { ...rec, status: "rejected" }
              : rec
          )
        );

        // 4. Recargar datos
        await fetchPrioritizedTasks();
        await fetchTasks();
      } catch (err) {
        console.error("Error al rechazar recomendación:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      {pendingRecommendation && recommendedTask && (
        <RecommendationCard
          recommendation={pendingRecommendation}
          task={recommendedTask}
          onAccept={handleAccept}
          onReject={handleReject}
          loading={loading}
        />
      )}
    </motion.div>
  );
}
