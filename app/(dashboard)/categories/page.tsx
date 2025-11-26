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

export default function CategoriesPage() {
  //const [categories , setCategories] = useState<Category[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const {fetchCategories , categories} = useCategoryStore()

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
            <h1 className="text-3xl font-bold tracking-tight text-balance">{"Categories"}</h1>
            <p className="mt-2 text-muted-foreground text-pretty">{"Manage all your categories for clasify your tasks"}</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            {"Create  a new categorie"}
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        

          <div>
            {categories.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center"
              >
                <p className="text-lg font-medium text-muted-foreground">{"You don´t have categories"}</p>
                <p className="mt-2 text-sm text-muted-foreground">{"Create a category"}</p>
                <Button onClick={handleCreate} className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  {"Create a category"}
                </Button>
              </motion.div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {categories.map((categorie) => (
                    <CategoryCard key={categorie.id} category={categorie} onEdit={handleEdit} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        <CategoryDialog open={dialogOpen} onClose={handleCloseDialog} category={editingCategory} />
      </div>
    </ProtectedLayout>
  )
}



