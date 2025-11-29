"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { DailyRecommendation, Task } from "@/lib/types";
import { Sparkles, CheckCircle2, X } from "lucide-react";
import { format } from "date-fns";

interface RecommendationCardProps {
  recommendation: {
    id: string;
    status: "pending" | "accepted" | "rejected";
    confidence_score: number;
    recommendation_date: Date;
    recommendation_reason: string;
  };
  task: Task;
  onAccept: () => void;
  onReject: () => void;
  loading?: boolean;
}

export function RecommendationCard({
  recommendation,
  task,
  onAccept,
  onReject,
  loading = false,
}: RecommendationCardProps) {
  const confidencePercentage = Math.round(
    recommendation.confidence_score * 100
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20";
      case "postponed":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20";
      default:
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Daily Recommendation
            </CardTitle>
            <Badge
              variant="outline"
              className={getStatusColor(recommendation.status)}
            >
              {recommendation.status}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {recommendation.recommendation_date
              ? format(
                  new Date(recommendation.recommendation_date),
                  "MMM dd, yyyy"
                )
              : "Sin fecha"}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <h4 className="text-lg font-semibold leading-relaxed">
                {task.title}
              </h4>
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary border-primary/20 shrink-0"
              >
                {confidencePercentage}% match
              </Badge>
            </div>
            {task.description && (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {task.description}
              </p>
            )}
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm font-medium text-foreground">
              Why this task?
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {recommendation.recommendation_reason}
            </p>
          </div>

          {recommendation.status === "pending" && (
          <div className="flex gap-2">
            <Button 
              onClick={onAccept} 
              className="flex-1"
              disabled={loading}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : "Accept"}
            </Button>
            <Button
              onClick={onReject}
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={loading}
            >
              <X className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : "Reject"}
            </Button>
          </div>
        )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
