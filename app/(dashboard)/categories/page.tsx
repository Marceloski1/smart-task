"use client"
import CategoriesForm from "@/components/categories/category-dialog"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import {Category} from "./../../../lib/types"
import {AnimatePresence, motion} from "framer-motion"
import CategoryCard from "@/components/categories/category-card"
import CategoryDialog from "@/components/categories/category-dialog"
import { useCategoryStore } from "@/lib/store/category-store"
import { useTranslation } from "@/lib/i18n"

export default function CategoriesPage() {
  //const [categories , setCategories] = useState<Category[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const {fetchCategories , categories} = useCategoryStore()
  const t = useTranslation() ; 

  useEffect(() => {
     fetchCategories()
  },[])

   const handleEdit = (category: Category) => {
      setEditingCategory(category)
      setDialogOpen(true)
    }

     const handleCreate = () => {
    setEditingCategory(null)
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingCategory(null)
  }
  
    return (
     <ProtectedLayout>
       <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-balance">{t.category.pageTitle}</h1>
            <p className="mt-2 text-muted-foreground text-pretty">{t.category.pageDescription}</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            {t.category.buttonCreate}
          </Button>
        </div>

        <div>
          {categories.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center"
            >
              <p className="text-lg font-medium text-muted-foreground">{t.category.emptyStateTitle}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.category.buttonCreate}</p>
              <Button onClick={handleCreate} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                {t.category.buttonCreate}
              </Button>
            </motion.div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {categories.map((categorie) => (
                  <CategoryCard key={categorie.id} category={categorie} onEdit={handleEdit} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        <CategoryDialog open={dialogOpen} onClose={handleCloseDialog} category={editingCategory} />
      </div>
    </ProtectedLayout>
  )
}



