"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CheckSquare, Battery, Sparkles, X , Clipboard} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"

export function AppSidebar() {
  const { sidebarOpen, setSidebarOpen } = useStore()
  const pathname = usePathname()
  const t = useTranslation()

  const navigation = [
    { name: t.nav.dashboard, href: "/dashboard", icon: LayoutDashboard },
    { name: t.nav.tasks, href: "/tasks", icon: CheckSquare },
    { name: t.nav.energy, href: "/energy", icon: Battery },
    { name: t.nav.recommendations, href: "/recommendations", icon: Sparkles },
    { name: t.nav.categories, href: "/categories", icon: Clipboard },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-card md:sticky md:top-16 md:h-[calc(100vh-4rem)]"
          >
            <div className="flex h-16 items-center justify-between border-b border-border px-4 sm:hidden">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={() => 
                setSidebarOpen(false) }>
                <X className="h-5 w-5" />
                <span className="sr-only">Close sidebar</span>
              </Button>
            </div>

            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    //onClick={() => setSidebarOpen(false)} 
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="border-t border-border p-4">
              <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">AI-Powered</p>
                <p className="mt-1">SmartTask uses intelligent algorithms to help you prioritize tasks</p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
