"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  FileText, 
  BarChart3, 
  FileSpreadsheet, 
  UploadCloud, 
  X, 
  CheckCircle2 
} from "lucide-react"
import { useTranslation } from "@/lib/i18n" // Import the hook

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  maxFiles?: number
  className?: string
}

export function FileDropzone({ 
  onFilesSelected, 
  accept = "*", 
  maxFiles = 5,
  className 
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  
  // Initialize translations
  const t = useTranslation()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleNewFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleNewFiles(Array.from(e.target.files))
    }
  }

  const handleNewFiles = (newFiles: File[]) => {
    const updatedFiles = [...files, ...newFiles].slice(0, maxFiles)
    setFiles(updatedFiles)
    onFilesSelected(updatedFiles)
  }

  const removeFile = (indexToRemove: number) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove)
    setFiles(updatedFiles)
    onFilesSelected(updatedFiles)
  }

  // Helper to format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B"
    const k = 1024
    const sizes = ["B", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }

  return (
    <div className={`w-full space-y-6 ${className || ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-all cursor-pointer
            ${isDragging 
              ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
              : "border-border bg-card hover:bg-accent/50 hover:border-primary/50"
            }
          `}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept={accept}
            multiple={maxFiles > 1}
            className="hidden"
          />

          {/* Icon Stack Animation */}
          <div className="mb-6 relative h-20 w-24">
            {/* Background Icon 1 */}
            <motion.div 
              className="absolute right-2 top-0 text-muted-foreground/30"
              animate={{ rotate: isDragging ? 15 : 10, scale: isDragging ? 1.1 : 1 }}
            >
              <BarChart3 size={56} strokeWidth={1} />
            </motion.div>
            
            {/* Background Icon 2 */}
            <motion.div 
              className="absolute left-2 top-0 text-muted-foreground/40"
              animate={{ rotate: isDragging ? -15 : -10, scale: isDragging ? 1.1 : 1 }}
            >
              <FileSpreadsheet size={56} strokeWidth={1} />
            </motion.div>
            
            {/* Main Foreground Icon */}
            <motion.div 
              className="absolute left-1/2 top-4 -translate-x-1/2 rounded-lg bg-card p-3 shadow-xl border border-border text-primary z-10"
              animate={{ y: isDragging ? -15 : 0 }}
            >
              <UploadCloud size={32} strokeWidth={2} />
            </motion.div>
          </div>

          <div className="space-y-2">
            {/* Translated Title */}
            <h3 className="font-semibold text-lg text-foreground">
              {t.fileDropzone.title}
            </h3>
            {/* Translated Description */}
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              {t.fileDropzone.description}
            </p>
          </div>
          
          {/* Translated Button */}
          <button type="button" className="mt-6 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
            {t.fileDropzone.browseButton}
          </button>
        </div>
      </motion.div>

      {/* Selected Files List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between border-b border-border pb-2">
                {/* Translated Header */}
                <h4 className="text-sm font-medium text-muted-foreground">
                    {t.fileDropzone.attachedFiles} ({files.length})
                </h4>
            </div>
            
            <div className="grid gap-3">
                {files.map((file, index) => (
                <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    className="group flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-sm transition-colors hover:border-primary/30"
                >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                             <span>{formatSize(file.size)}</span>
                             <span className="h-1 w-1 rounded-full bg-muted-foreground/40"></span>
                             <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                               <CheckCircle2 size={10} /> 
                               {/* Translated Status */}
                               {t.fileDropzone.ready}
                             </span>
                          </div>
                      </div>
                    </div>
                    
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            removeFile(index)
                        }}
                        className="ml-2 rounded-full p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        aria-label={t.fileDropzone.removeFile} // Translated Aria Label
                    >
                      <X size={16} />
                    </button>
                </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}