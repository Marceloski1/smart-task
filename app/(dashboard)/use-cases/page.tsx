"use client"

import { useState } from "react"
import { ProtectedLayout } from "@/components/layout/protected-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileStack, Download, AlertCircle } from "lucide-react"
import { FileDropzone } from "@/components/use-cases/file-dropzone"
import { useUseCasesStore } from "@/lib/store/for-service/use-cases.store"
import { useTranslation } from "@/lib/i18n" // Import the hook

export default function UseCasesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [placeholderData, setPlaceholderData] = useState<string>("")
  const { processUseCase, loading, error, pdfUrl, clearPdf } = useUseCasesStore()
  const t = useTranslation() // Initialize translations

  const handleFilesSelected = (files: File[]) => {
    setSelectedFile(files[0] || null)
  }

  const handleProcess = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("image", selectedFile)
    if (placeholderData.trim()) {
      formData.append("description", placeholderData.trim())
    }

    await processUseCase(formData)
  }

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = "use-case-report.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <ProtectedLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8 pt-6">

        {/* Page Header */}
        <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight">{t.useCases.title}</h2>
            <p className="text-muted-foreground">
                {t.useCases.subtitle}
            </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

            {/* Upload Form */}
            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileStack className="h-5 w-5 text-primary" />
                        {t.useCases.uploadTitle}
                    </CardTitle>
                    <CardDescription>
                        {t.useCases.uploadDesc}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="description">{t.useCases.descriptionLabel}</Label>
                        <Input
                          id="description"
                          placeholder={t.useCases.descriptionPlaceholder}
                          value={placeholderData}
                          onChange={(e) => setPlaceholderData(e.target.value)}
                        />
                    </div>

                    <FileDropzone
                      onFilesSelected={handleFilesSelected}
                      accept="image/*"
                      maxFiles={1}
                    />

                    {selectedFile && (
                      <div className="text-sm text-muted-foreground">
                        {t.useCases.selectedFile}: {selectedFile.name}
                      </div>
                    )}

                    <Button
                      onClick={handleProcess}
                      disabled={loading || !selectedFile}
                      className="w-full"
                    >
                      {loading ? t.useCases.processing : t.useCases.generatePdf}
                    </Button>

                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                </CardContent>
            </Card>

            {/* PDF Display */}
            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle>{t.useCases.generatedTitle}</CardTitle>
                    <CardDescription>
                        {t.useCases.generatedDesc}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {pdfUrl ? (
                      <div className="space-y-4">
                        <div className="text-sm text-green-600">{t.useCases.successMessage}</div>
                        <Button onClick={handleDownload} className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          {t.useCases.downloadButton}
                        </Button>
                        <Button onClick={clearPdf} variant="outline" className="w-full">
                          {t.useCases.clearButton}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-muted-foreground text-center py-8">
                        {t.useCases.emptyState}
                      </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </div>
    </ProtectedLayout>
  )
}