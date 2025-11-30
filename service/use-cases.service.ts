"use client";

import api from "@/api/axios/axios-global";

// Process use case by uploading image and other data, receiving PDF response
export async function processUseCase(formData: FormData) {
  const res = await api.post("/use-cases", formData, {
    responseType: "blob", // Expecting PDF blob in response
  });
  return res.data; // Return the PDF blob
}