"use client";

// Cambia la importación de api a axios normal
import axios from "axios";

// Obtiene la URL base desde las variables de entorno
const API_BASE_URL = process.env.NEXT_PUBLIC_API_USE_CASES_URL || "";

// Process use case by uploading image and other data, receiving PDF response
export async function processUseCase(formData: FormData) {
  // Envía directamente a la API externa
  const res = await axios.post(`${API_BASE_URL}/detect-actors/`, formData, {
    responseType: "blob", // Espera un blob PDF
    headers: {
      "Content-Type": "multipart/form-data",
    },
    // Agrega parámetros según la documentación de la API
    params: {
      debug: false,
      format: "pdf"
    }
  });
  
  return res.data; // Retorna el blob PDF
}

// Si necesitas la versión simplificada
export async function processUseCaseSimple(formData: FormData) {
  const res = await axios.post(`${API_BASE_URL}/detect-actors-simple/`, formData, {
    responseType: "blob",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  
  return res.data;
}

// Ejemplo de uso sin subir imagen
export async function getExamplePDF() {
  const res = await axios.get(`${API_BASE_URL}/example-actors/`, {
    responseType: "blob",
  });
  
  return res.data;
}