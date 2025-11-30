"use client";

import { create } from "zustand";
import { processUseCase } from "@/service/use-cases.service";

interface UseCasesState {
  loading: boolean;
  error: string | null;
  pdfBlob: Blob | null;
  pdfUrl: string | null;

  // Actions
  processUseCase: (formData: FormData) => Promise<void>;
  clearPdf: () => void;
}

export const useUseCasesStore = create<UseCasesState>((set, get) => ({
  loading: false,
  error: null,
  pdfBlob: null,
  pdfUrl: null,

  processUseCase: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      const pdfBlob = await processUseCase(formData);
      const pdfUrl = URL.createObjectURL(pdfBlob);
      set({ pdfBlob, pdfUrl });
    } catch (err: any) {
      console.error(err);
      set({ error: err.message || "Error processing use case" });
    } finally {
      set({ loading: false });
    }
  },

  clearPdf: () => {
    const { pdfUrl } = get();
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
    }
    set({ pdfBlob: null, pdfUrl: null, error: null });
  },
}));