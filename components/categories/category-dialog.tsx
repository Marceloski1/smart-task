"use client"

import { Category, CategoryCreate } from "@/lib/types"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import {updateCategory , createCategory} from "./../../service/category.service"
import { useCategoryStore } from "@/lib/store/category-store"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "../ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useTranslation } from "@/lib/i18n"

interface CategoryDialogProps {
  open: boolean
  onClose: () => void
  category?: Category | null
}

export default function CategoryDialog({ open, onClose, category }: CategoryDialogProps) {
   
  const {updateCategory , createCategory} = useCategoryStore() ; 
  const t = useTranslation() ; 
  const [formData, setFormData] = useState({
      name: "",
      description: "",
    })
  
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    
        if (!formData.name.trim()) return
    
        const categoryData:CategoryCreate = {
          name: formData.name.trim(),
          description: formData.description.trim() || undefined 
        }

        if (category) {
          updateCategory(category.id, categoryData)
        } else {
           createCategory(categoryData)
        }
    
        onClose()
      }

    useEffect(() => {
        if (category) {
          setFormData({
            name: category.name,
            description: category.description || "",
          })
        } else {
          setFormData({
            name: "",
            description: "",
          })
        }
      }, [category, open])
    

  return (
     <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto z-100">
        <DialogHeader>
          <DialogTitle>{category ? t.category.categoryTitleEdit : t.category.categoryTitleCreate}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">{t.category.labelTitle} *</Label>
              <Input
                id="title"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.category.inputLabelTitlePlaceholder}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t.category.labelDescription} {t.category.optionalText}</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t.category.inputLabelDescriptionPlaceholder}
                rows={3}
              />
            </div>
         </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t.category.buttonCancel}
            </Button>
            <Button type="submit">{category ? t.category.buttonSave : t.category.buttonCreate}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
