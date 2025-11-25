"use client"
import { useEffect } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { useTaskStore } from "@/lib/store/for-service/task.store"
import { useCategoryStore } from "@/lib/store/for-service/categories.store"
import { useEnergyStore } from "@/lib/store/for-service/energy.store"
import { useRecommendationStore } from "@/lib/store/for-service/recommendation.store"

export default function DashboardPage() {
  const fetchTasks = useTaskStore((state: any) => state.fetchTasks);
  const fetchCategories = useCategoryStore((state: any) => state.fetchCategories);
  const fetchEnergyLogs = useEnergyStore((state: any) => state.fetchEnergyLogs);
  const fetchRecommendations = useRecommendationStore((state: any) => state.fetchRecommendations);

  useEffect(() => {
    fetchTasks();
    fetchCategories();
    fetchEnergyLogs();
    fetchRecommendations();
  }, [fetchTasks, fetchCategories, fetchEnergyLogs, fetchRecommendations]);

  return (
    <ProtectedLayout>
      <DashboardContent />
    </ProtectedLayout>
  )
}
