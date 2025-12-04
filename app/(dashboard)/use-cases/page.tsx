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
import { useTranslation } from "@/lib/i18n"

export default function UseCasesPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [debugMode, setDebugMode] = useState<boolean>(false)
  const { processUseCase, loading, error, pdfUrl, clearPdf } = useUseCasesStore()
  const t = useTranslation()

  const handleFilesSelected = (files: File[]) => {
    setSelectedFile(files[0] || null)
  }

  const handleProcess = async () => {
    if (!selectedFile) return

    const formData = new FormData()
    formData.append("file", selectedFile)
    formData.append("debug", debugMode.toString())
    formData.append("format", "pdf")

    await processUseCase(formData)
  }

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a")
      link.href = pdfUrl
      link.download = "detected-actors-report.pdf"
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
              {/* Opcional: Toggle para modo debug */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="debug-mode"
                  checked={debugMode}
                  onChange={(e) => setDebugMode(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="debug-mode">
                  {t.useCases.debugMode}
                </Label>
              </div>

              <FileDropzone
                onFilesSelected={handleFilesSelected}
                accept="image/*"
                maxFiles={1}
              />

              {selectedFile && (
                <div className="text-sm text-muted-foreground">
                  {t.useCases.selectedFile}: {selectedFile.name}
                  <br />
                  <span className="text-xs">
                    {t.useCases.acceptedTypes}
                  </span>
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
                  <AlertDescription>
                    Error: {error}
                    <br />
                    <span className="text-xs">
                      {t.useCases.errorTips}
                    </span>
                  </AlertDescription>
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
                  <div className="text-sm text-green-600">
                    {t.useCases.successMessage}
                    <br />
                    <span className="text-xs text-muted-foreground">
                      {t.useCases.pdfIncludes}
                      <ul className="list-disc list-inside mt-1">
                        <li>{t.useCases.pdfIncludesList1}</li>
                        <li>{t.useCases.pdfIncludesList2}</li>
                        <li>{t.useCases.pdfIncludesList3}</li>
                        {debugMode && <li>{t.useCases.pdfIncludesList4}</li>}
                      </ul>
                    </span>
                  </div>
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
                  <p className="text-sm mt-2">
                    {t.useCases.emptyStateDetailed}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedLayout>
  )
}