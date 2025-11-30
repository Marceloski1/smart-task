"use client"
import { useEffect, useRef } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { useTaskStore } from "@/lib/store/for-service/task.store"
import { useCategoryStore } from "@/lib/store/for-service/categories.store"
import { useEnergyStore } from "@/lib/store/for-service/energy.store"
import { useMLTasksStore } from "@/lib/store/for-service/mltask.store"

export default function DashboardPage() {
  const hasLoaded = useRef(false);
  const fetchTasks = useTaskStore((state: any) => state.fetchTasks);
  const fetchCategories = useCategoryStore((state: any) => state.fetchCategories);
  const fetchEnergyLogs = useEnergyStore((state: any) => state.fetchEnergyLogs);
  const fetchPrioritizedTasks = useMLTasksStore((state: any) => state.fetchPrioritizedTasks);

  useEffect(() => {
    if (hasLoaded.current) return;
    
    hasLoaded.current = true;
    fetchTasks();
    fetchCategories();
    fetchEnergyLogs();
    fetchPrioritizedTasks();
  }, []);

  return (
    <ProtectedLayout>
      <DashboardContent />
    </ProtectedLayout>
  )
}
