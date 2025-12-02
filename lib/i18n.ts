"use client";

import { useStore } from "./store";

export type Language = "en" | "es";

export const translations = {
  en: {
    // Common
    common: {
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      create: "Create",
      search: "Search",
      filter: "Filter",
      close: "Close",
      submit: "Submit",
      back: "Back",
      next: "Next",
      previous: "Previous",
      all: "All",
    },

    // Navigation
    nav: {
      dashboard: "Dashboard",
      tasks: "Tasks",
      energy: "Energy",
      recommendations: "Recommendations",
      categories: "Categories",
      settings: "Settings",
      profile: "Profile",
      logout: "Log out",
      summarizer: "Summarizer",
      useCases: "Use Cases",
    },

    // Auth
    auth: {
      login: "Log in",
      register: "Sign up",
      email: "Email",
      password: "Password",
      name: "Full Name",
      confirmPassword: "Confirm Password",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      hasAccount: "Already have an account?",
      signUpHere: "Sign up here",
      loginHere: "Log in here",
      loginSuccess: "Login successful!",
      registerSuccess: "Registration successful!",
      loginFailed: "Login failed",
      registerFailed: "Registration failed",
      fillAllFields: "Please fill in all fields",
      passwordsDoNotMatch: "Passwords do not match",
      passwordTooShort: "Password must be at least 6 characters",
      welcomeBack: "Welcome back to",
      getStarted: "Get started with",
      manageTasksIntelligently:
        "Manage your tasks intelligently with AI-powered recommendations",
    },

    // Dashboard
    dashboard: {
      welcome: "Welcome back",
      overview: "Overview",
      completedTasks: "Completed Tasks",
      activeTasks: "Active Tasks",
      totalTasks: "Total Tasks",
      avgEnergy: "Avg Energy",
      priorityTasks: "Priority Tasks",
      energyTrends: "Energy Trends",
      dailyRecommendation: "Daily Recommendation",
      viewAll: "View all",
      noTasks: "No priority tasks for today",
      aiSuggests: "AI suggests:",
      confidence: "Confidence",
      manageTasksAndProgress: "Manage your tasks and track progress",
      thisWeek: "This Week",
    },

    // Tasks
    tasks: {
      title: "Tasks",
      createTask: "Create Task",
      editTask: "Edit Task",
      newTask: "New Task",
      taskName: "Task name",
      description: "Description",
      category: "Category",
      priority: "Priority",
      status: "Status",
      deadline: "Deadline",
      estimatedTime: "Estimated time (min)",
      urgency: "Urgency",
      impact: "Impact",
      energyRequired: "Energy Required",
      high: "High",
      medium: "Medium",
      low: "Low",
      pending: "Pending",
      inProgress: "In Progress",
      completed: "Completed",
      postponed: "Postponed",
      all: "All",
      filterByStatus: "Filter by status",
      filterByPriority: "Filter by priority",
      startTask: "Start task",
      completeTask: "Mark Complete",
      deleteTask: "Delete task",
      deleteConfirm: "Are you sure you want to delete this task?",
      noTasksFound: "No tasks found",
      createTaskToStart: "Create a new task to get started",
      score: "Score",
      aiPriorityCalculation: "AI Priority Calculation",
      aiPriorityDesc:
        "Based on urgency, impact, and deadline, this task will be assigned a priority score automatically",
      taskTitlePlaceholder: "Enter task title",
      taskDescriptionPlaceholder: "Enter task description",
      timeInMinPlaceholder: "Time in minutes",
      categoryNamePlaceholder: "Enter category name",
      categoryDescriptionPlaceholder: "Enter category description",
      noCategory: "The task has no category assigned",
    },

    // Energy
    energy: {
      title: "Energy Tracking",
      subtitle:
        "Track your energy levels to receive better task recommendations",
      logEnergyLevel: "Log Your Energy Level",
      howAreYouFeeling: "How are you feeling right now?",
      lowEnergy: "Low Energy",
      mediumEnergy: "Medium Energy",
      highEnergy: "High Energy",
      currentMood: "Current Mood (optional)",
      moodPlaceholder: "e.g., Focused, Tired, Motivated...",
      notes: "Notes (optional)",
      notesPlaceholder: "Add any additional notes about your energy level...",
      logSuccess: "Energy level logged successfully!",
      aiInsights: "AI Insights",
      weeklyTrend: "Weekly Trend",
      trendUp: "Your energy levels are improving! Keep up the great work.",
      trendDown:
        "Your energy seems lower recently. Consider taking breaks and prioritizing rest.",
      trendStable:
        "Your energy levels are stable. Maintain your current routine.",
      recommendation: "Recommendation",
      recommendationHigh:
        "You have high energy! This is a great time to tackle challenging tasks.",
      recommendationMedium:
        "Your energy is moderate. Focus on medium-priority tasks and take regular breaks.",
      recommendationLow:
        "Your energy is low. Prioritize rest and focus only on essential tasks.",
      avgEnergy: "Avg Energy",
      totalLogs: "Total Logs",
      highDays: "High Days",
      energyHistory: "Energy History",
      noLogsYet: "No energy logs yet. Start tracking your energy levels!",
      mood: "Mood",
      thisWeek: "This Week",
      weeklyOverview: "Weekly Energy Overview",
      last14Days: "Energy Levels (Last 14 Days)",
      noData: "No data",
      energyLabel: "Energy",
      medShort: "Med",
    },

    // Recommendations
    recommendations: {
      title: "AI Recommendations",
      subtitle: "Get personalized task recommendations powered by AI",
      dailyRecommendation: "Daily Recommendation",
      confidence: "match",
      whyThisTask: "Why this task?",
      accept: "Aproved",
      reject: "Reject",
      pending: "Pending",
      accepted: "Aprove",
      rejected: "Rejected",
      postponed: "Postponed",
      yourStats: "Your Stats",
      total: "Pending",
      acceptanceRate: "Acceptance Rate",
      completionRate: "Aproved Rate",
      howItWorks: "How AI Recommendations Work",
      howItWorksDesc:
        "Our AI analyzes your task priorities, energy patterns, and historical performance to generate personalized daily recommendations.",
      keyFactors: "Key Factors",
      factor1: "Task priority and urgency",
      factor2: "Your current energy levels",
      factor3: "Time of day and patterns",
      factor4: "Historical task completion",
      recommendationHistory: "Possible Recommendations",
      noHistoryYet: "No pending recommendations yet",
      completed: "Completed",
      notCompleted: "Not completed",
      factors: {
        "priorityScoreTitle": "Priority Score",
        "priorityScoreDesc": "Tasks with higher urgency and impact are prioritized",
        "energyMatchTitle": "Energy Match",
        "energyMatchDesc": "Tasks are matched to your current energy levels",
        "completionHistoryTitle": "Completion History",
        "completionHistoryDesc": "Your past completion patterns influence recommendations",
        "deadlineProximityTitle": "Deadline Proximity",
        "deadlineProximityDesc": "Upcoming deadlines are factored into the decision"
      },
      pendingRecoments: "Recomendation Pending",
      recommendationReasons: [
        "This task matches your current energy level and upcoming deadlines.",
        "Based on your productivity history, this task is ideal for now.",
        "This task has high priority and aligns with your long-term goals.",
        "Considering your current workload, this task is the most suitable.",
        "The algorithm has identified this task as the best fit for your routine.",
      ],
      approvalNote: "By approving or rejecting a recommendation, the recommended task will be completed.",
    },

    // Settings
    settings: {
      title: "Settings",
      general: "General",
      appearance: "Appearance",
      notifications: "Notifications",
      account: "Account",
    },

    // Sidebar
    sidebar: {
      menu: "Menu",
      closeSidebar: "Close sidebar",
      toggleSidebar: "Toggle sidebar",
      aiPowered: "AI-Powered",
      aiPoweredDescription:
        "SmartTask uses intelligent algorithms to help you prioritize tasks",
      saving: "Saving...",
      failedToSave: "Failed to save the record",
      genericError: "An error occurred while saving",
      tools: "Tools",
    },

    // AI Explanation
    aiExplanation: {
      whyThisTask: "Why this task?",
      aiAlgorithms:
        "SmartTask uses intelligent algorithms to analyze multiple factors and recommend the best task for you each day.",
      keyFactors: "Key factors considered:",
    },

    // Theme
    theme: {
      light: "Light",
      dark: "Dark",
      toggleTheme: "Toggle theme",
    },

    // Language
    language: {
      title: "Language",
      english: "English",
      spanish: "Spanish",
      selectLanguage: "Select language",
    },

    category: {
      categoryTitleEdit: "Edit category",
      categoryTitleCreate: "Create category",
      labelTitle: "Title",
      labelDescription: "Description",
      optionalText: "(optional)",
      inputLabelTitlePlaceholder: "Task title",
      inputLabelDescriptionPlaceholder: "Task description",
      buttonCancel: "Cancel",
      buttonSave: "Save",
      buttonCreate: "Create",
      srOnlyEditCategory: "Edit category",
      srOnlyDeleteCategory: "Delete category",
      deleteConfirm: "Are you sure you want to delete this category?",
      deleteConfirmDescription: "This action cannot be undone. This will permanently delete the category and remove it from all associated tasks.",
      pageTitle: "Categories",
      pageDescription: "Manage all your categories for clasify your tasks",
      emptyStateTitle: "You don´t have categories",
    },

    summarizer: {
      summarizer: "Summarizer",
      placeholderSummarizer: "Enter the text you want to summarize...",
      buttonLoading: "Summarizing...",
      buttonSubmit: "Generate summary",
      generatedSummary: "Generated summary",
      keyPhrases: "Key phrases",
    },

    useCases: {
      title: "Use Cases",
      subtitle: "Process images to generate PDF reports for use cases.",
      uploadTitle: "Upload Image",
      uploadDesc: "Upload an image to generate a PDF report. Supported formats: JPG, PNG.",
      descriptionLabel: "Description (Optional)",
      descriptionPlaceholder: "Enter description...",
      selectedFile: "Selected",
      processing: "Processing...",
      generatePdf: "Generate PDF",
      generatedTitle: "Generated PDF",
      generatedDesc: "Download the processed PDF report.",
      successMessage: "PDF generated successfully!",
      downloadButton: "Download PDF",
      clearButton: "Clear",
      emptyState: "PDF will appear here after processing",
    },
    fileDropzone: {
      title: "Choose files or drag & drop",
      description: "Drag files here or click to browse your device",
      browseButton: "Browse Files",
      attachedFiles: "Attached Files",
      ready: "Ready",
      removeFile: "Remove file",
    },
  },

  es: {
    // Common
    common: {
      loading: "Cargando...",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      create: "Crear",
      search: "Buscar",
      filter: "Filtrar",
      close: "Cerrar",
      submit: "Enviar",
      back: "Atrás",
      next: "Siguiente",
      previous: "Anterior",
      all: "Todas",
    },

    // Navigation
    nav: {
      dashboard: "Tablero",
      tasks: "Tareas",
      energy: "Energía",
      recommendations: "Recomendaciones",
      categories: "Categorías",
      settings: "Configuración",
      profile: "Perfil",
      logout: "Cerrar sesión",
      summarizer: "Resumen",
      useCases: "Casos de Uso",
    },

    // Auth
    auth: {
      login: "Iniciar sesión",
      register: "Registrarse",
      email: "Correo electrónico",
      password: "Contraseña",
      name: "Nombre completo",
      confirmPassword: "Confirmar contraseña",
      forgotPassword: "¿Olvidaste tu contraseña?",
      noAccount: "¿No tienes una cuenta?",
      hasAccount: "¿Ya tienes una cuenta?",
      signUpHere: "Regístrate aquí",
      loginHere: "Inicia sesión aquí",
      loginSuccess: "Inicio de sesión exitoso",
      registerSuccess: "Registro exitoso",
      loginFailed: "Error al iniciar sesión",
      registerFailed: "Error al registrarse",
      fillAllFields: "Por favor complete todos los campos",
      passwordsDoNotMatch: "Las contraseñas no coinciden",
      passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
      welcomeBack: "Bienvenido de nuevo a",
      getStarted: "Comienza con",
      manageTasksIntelligently:
        "Gestiona tus tareas de forma inteligente con recomendaciones impulsadas por IA",
    },

    // Dashboard
    dashboard: {
      welcome: "Bienvenido de nuevo",
      overview: "Resumen",
      completedTasks: "Tareas Completadas",
      activeTasks: "Tareas Activas",
      totalTasks: "Total de Tareas",
      avgEnergy: "Energía Promedio",
      priorityTasks: "Tareas Prioritarias",
      energyTrends: "Tendencias de Energía",
      dailyRecommendation: "Recomendación Diaria",
      viewAll: "Ver todas",
      noTasks: "No hay tareas prioritarias para hoy",
      aiSuggests: "La IA sugiere:",
      confidence: "Confianza",
      manageTasksAndProgress: "Gestiona tus tareas y sigue tu progreso",
      thisWeek: "Esta Semana",
    },

    // Tasks
    tasks: {
      title: "Tareas",
      createTask: "Crear Tarea",
      editTask: "Editar Tarea",
      newTask: "Nueva Tarea",
      taskName: "Nombre de la tarea",
      description: "Descripción",
      category: "Categoría",
      priority: "Prioridad",
      status: "Estado",
      deadline: "Fecha límite",
      estimatedTime: "Tiempo estimado (minutos)",
      urgency: "Urgencia",
      impact: "Impacto",
      energyRequired: "Energía Requerida",
      high: "Alta",
      medium: "Media",
      low: "Baja",
      pending: "Pendiente",
      inProgress: "En Progreso",
      completed: "Completada",
      postponed: "Pospuesta",
      all: "Todas",
      filterByStatus: "Filtrar por estado",
      filterByPriority: "Filtrar por prioridad",
      startTask: "Iniciar tarea",
      completeTask: "Marcar como Completa",
      deleteTask: "Eliminar tarea",
      deleteConfirm: "¿Estás seguro de que quieres eliminar esta tarea?",
      noTasksFound: "No se encontraron tareas",
      createTaskToStart: "Crea una nueva tarea para comenzar",
      score: "Puntaje",
      aiPriorityCalculation: "Cálculo de Prioridad IA",
      aiPriorityDesc:
        "Basado en urgencia, impacto y fecha límite, esta tarea recibirá un puntaje de prioridad automáticamente",
      taskTitlePlaceholder: "Ingresa el título de la tarea",
      taskDescriptionPlaceholder: "Ingresa la descripción de la tarea",
      timeInMinPlaceholder: "Tiempo en minutos",
      noCategory: "La tarea no tiene una categoría asignada",
    },

    // Energy
    energy: {
      title: "Seguimiento de Energía",
      subtitle:
        "Rastrea tus niveles de energía para recibir mejores recomendaciones de tareas",
      logEnergyLevel: "Registra tu Nivel de Energía",
      howAreYouFeeling: "¿Cómo te sientes en este momento?",
      lowEnergy: "Energía Baja",
      mediumEnergy: "Energía Media",
      highEnergy: "Energía Alta",
      currentMood: "Estado de Ánimo Actual (opcional)",
      moodPlaceholder: "ej., Concentrado, Cansado, Motivado...",
      notes: "Notas (opcional)",
      notesPlaceholder: "Agrega notas adicionales sobre tu nivel de energía...",
      logSuccess: "¡Nivel de energía registrado exitosamente!",
      aiInsights: "Insights de IA",
      weeklyTrend: "Tendencia Semanal",
      trendUp: "¡Tus niveles de energía están mejorando! Sigue así.",
      trendDown:
        "Tu energía parece más baja recientemente. Considera tomar descansos y priorizar el descanso.",
      trendStable:
        "Tus niveles de energía son estables. Mantén tu rutina actual.",
      recommendation: "Recomendación",
      recommendationHigh:
        "¡Tienes mucha energía! Este es un buen momento para abordar tareas desafiantes.",
      recommendationMedium:
        "Tu energía es moderada. Concéntrate en tareas de prioridad media y toma descansos regulares.",
      recommendationLow:
        "Tu energía es baja. Prioriza el descanso y concéntrate solo en tareas esenciales.",
      avgEnergy: "Energía Promedio",
      totalLogs: "Registros Totales",
      highDays: "Días Altos",
      energyHistory: "Historial de Energía",
      noLogsYet:
        "No hay registros de energía todavía. ¡Comienza a rastrear tus niveles de energía!",
      mood: "Estado de Ánimo",
      thisWeek: "Esta Semana",
      weeklyOverview: "Resumen Semanal de Energía",
      last14Days: "Niveles de Energía (Últimos 14 días)",
      noData: "Sin datos",
      energyLabel: "Energía",
      medShort: "Med",
    },

    // Recommendations
    recommendations: {
      title: "Recomendaciones de IA",
      subtitle:
        "Obtén recomendaciones de tareas personalizadas impulsadas por IA",
      dailyRecommendation: "Recomendación Diaria",
      confidence: "coincidencia",
      whyThisTask: "¿Por qué esta tarea?",
      accept: "Aprobada",
      reject: "Rechazar",
      pending: "Pendiente",
      accepted: "Aprobar",
      rejected: "Rechazada",
      postponed: "Pospuesta",
      yourStats: "Tus Estadísticas",
      total: "Pendientes",
      acceptanceRate: "Tasa de Aceptación",
      completionRate: "Porciento Aprovadas",
      howItWorks: "¿Cómo Funcionan las Recomendaciones de IA?",
      howItWorksDesc:
        "Nuestra IA analiza las prioridades de tus tareas, patrones de energía y rendimiento histórico para generar recomendaciones diarias personalizadas.",
      keyFactors: "Factores Clave",
      recommendationHistory: "Posibles de Recomendaciones",
      noHistoryYet: "No hay recomendaciones pendientes",
      completed: "Completada",
      notCompleted: "No completada", 
      factors: {
      "priorityScoreTitle": "Puntuación de Prioridad",
      "priorityScoreDesc": "Las tareas con mayor urgencia e impacto son priorizadas",
      "energyMatchTitle": "Coincidencia de Energía",
      "energyMatchDesc": "Las tareas se adaptan a tus niveles de energía actuales",
      "completionHistoryTitle": "Historial de Finalización",
      "completionHistoryDesc": "Tus patrones de finalización pasados influyen en las recomendaciones",
      "deadlineProximityTitle": "Proximidad de Plazo",
      "deadlineProximityDesc": "Los plazos próximos se tienen en cuenta en la decisión"
    },
    pendingRecoments: "Recomendaciones Pendientes",
    recommendationReasons: [
      "Esta tarea coincide con tu nivel de energía actual y plazos próximos.",
      "Basado en tu historial de productividad, esta tarea es ideal para este momento.",
      "Esta tarea tiene alta prioridad y se alinea con tus objetivos a largo plazo.",
      "Considerando tu carga de trabajo actual, esta tarea es la más adecuada.",
      "El algoritmo ha identificado esta tarea como la que mejor se adapta a tu rutina.",
    ],
    approvalNote: "Al aprobar o rechazar una recomendación se completará la tarea recomendada.",
    },

    // Settings
    settings: {
      title: "Configuración",
      general: "General",
      appearance: "Apariencia",
      notifications: "Notificaciones",
      account: "Cuenta",
    },

    // Theme
    theme: {
      light: "Claro",
      dark: "Oscuro",
      toggleTheme: "Cambiar tema",
    },

    // Sidebar
    sidebar: {
      menu: "Menú",
      closeSidebar: "Cerrar barra lateral",
      toggleSidebar: "Alternar barra lateral",
      aiPowered: "Impulsado por IA",
      aiPoweredDescription:
        "SmartTask usa algoritmos inteligentes para ayudarte a priorizar tareas",
      saving: "Guardando...",
      failedToSave: "Error al guardar el registro",
      genericError: "Ocurrió un error al guardar",
      tools: "Herramientas",
    },

    // AI Explanation
    aiExplanation: {
      whyThisTask: "¿Por qué esta tarea?",
      aiAlgorithms:
        "SmartTask usa algoritmos inteligentes para analizar múltiples factores y recomendar la mejor tarea para ti cada día.",
      keyFactors: "Factores clave considerados:",
    },

    // Language
    language: {
      title: "Idioma",
      english: "Inglés",
      spanish: "Español",
      selectLanguage: "Seleccionar idioma",
    },

    //Categories
    category: {
      categoryTitleEdit: "Editar categoría",
      categoryTitleCreate: "Crear categoría",
      labelTitle: "Título",
      labelDescription: "Descripción",
      optionalText: "(opcional)",
      inputLabelTitlePlaceholder: "Título de la tarea",
      inputLabelDescriptionPlaceholder: "Descripción de la tarea",
      buttonCancel: "Cancelar",
      buttonSave: "Guardar",
      buttonCreate: "Crear",
      srOnlyEditCategory: "Editar categoría",
      srOnlyDeleteCategory: "Eliminar categoría",
      deleteConfirm: "¿Estás seguro de que quieres eliminar esta categoría?",
      deleteConfirmDescription: "Esta acción no se puede deshacer. Esto eliminará permanentemente la categoría y la quitará de todas las tareas asociadas.",
      pageTitle: "Categorías",
      pageDescription:
        "Administra todas tus categorías para clasificar tus tareas",
      emptyStateTitle: "No tienes categorías",
    },
    summarizer: {
      summarizer: "Resumidor",
      placeholderSummarizer: "Introduce el texto que deseas resumir...",
      buttonLoading: "Resumiendo...",
      buttonSubmit: "Generar resumen",
      generatedSummary: "Resumen generado",
      keyPhrases: "Palabras clave",
    },
    useCases: {
      title: "Casos de Uso",
      subtitle: "Procesa imágenes para generar reportes PDF de casos de uso.",
      uploadTitle: "Subir Imagen",
      uploadDesc: "Sube una imagen para generar un reporte PDF. Formatos soportados: JPG, PNG.",
      descriptionLabel: "Descripción (Opcional)",
      descriptionPlaceholder: "Ingresa una descripción...",
      selectedFile: "Seleccionado",
      processing: "Procesando...",
      generatePdf: "Generar PDF",
      generatedTitle: "PDF Generado",
      generatedDesc: "Descarga el reporte PDF procesado.",
      successMessage: "¡PDF generado exitosamente!",
      downloadButton: "Descargar PDF",
      clearButton: "Limpiar",
      emptyState: "El PDF aparecerá aquí después del procesamiento",
    },
    fileDropzone: {
      title: "Elige archivos o arrastra y suelta",
      description: "Arrastra archivos aquí o haz clic para buscar en tu dispositivo",
      browseButton: "Explorar Archivos",
      attachedFiles: "Archivos Adjuntos",
      ready: "Listo",
      removeFile: "Eliminar archivo",
    },
  },
};

// This ensures filters work correctly when switching languages
export const categoryMappings = {
  en: {
    high: "high",
    medium: "medium",
    low: "low",
    pending: "pending",
    inProgress: "in_progress",
    completed: "completed",
    postponed: "postponed",
    accepted: "accepted",
    rejected: "rejected",
  },
  es: {
    alta: "high",
    media: "medium",
    baja: "low",
    pendiente: "pending",
    enProgreso: "in_progress",
    completada: "completed",
    pospuesta: "postponed",
    aceptada: "accepted",
    rechazada: "rejected",
  },
};

// Reverse mappings: from English key to translated display value
export const reverseMappings = {
  en: {
    high: "High",
    medium: "Medium",
    low: "Low",
    pending: "Pending",
    in_progress: "In Progress",
    completed: "Completed",
    postponed: "Postponed",
    accepted: "Accepted",
    rejected: "Rejected",
  },
  es: {
    high: "Alta",
    medium: "Media",
    low: "Baja",
    pending: "Pendiente",
    in_progress: "En Progreso",
    completed: "Completada",
    postponed: "Pospuesta",
    accepted: "Aceptada",
    rejected: "Rechazada",
  },
};

export function useTranslation() {
  const language = useStore((state) => state.language);
  return translations[language];
}

export function useLanguage() {
  const language = useStore((state) => state.language);
  return language;
}

// Helper to get translated value for status/priority/etc
export function getTranslatedValue(
  key: string,
  language: Language = "en"
): string {
  return (
    reverseMappings[language][key as keyof typeof reverseMappings.en] || key
  );
}

// Helper to get original English key from translated value
export function getEnglishKey(
  translatedValue: string,
  language: Language = "es"
): string {
  if (language === "en") return translatedValue.toLowerCase().replace(" ", "_");

  const mapping = Object.entries(reverseMappings.es).find(
    ([_, value]) => value.toLowerCase() === translatedValue.toLowerCase()
  );

  return mapping ? mapping[0] : translatedValue;
}
