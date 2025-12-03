# 📋 SmartTask - Gestor Inteligente de Tareas

**SmartTask** es un sistema de gestión de tareas inteligente, potenciado por IA, diseñado para ayudarte a priorizar y completar tus tareas de forma eficiente según tus niveles de energía y plazos de vencimiento.

## Integrantes del equipo

* Daryll Lorenzo Alfonso - [https://github.com/DaryllLorenzo](https://github.com/DaryllLorenzo)
* Roberto José Martínez Barrios - [https://github.com/AzerXP](https://github.com/AzerXP)
* Eduardo Marcelo Mazzola Fernández - [https://github.com/Marceloski1](https://github.com/Marceloski1)
* Carlos Miguel Piedra Álvarez - [https://github.com/cStoneDev](https://github.com/cStoneDev)
* Andy Clemente Gago - [https://github.com/AndyCG03](https://github.com/AndyCG03)

## Objetivo y visión
Muelita sobre de lo que es la app guiarnos por el textico de arriba mas potente

## Documentación más detallada de todo lo desarrollado por el equipo

Visitar repositorio: [https://github.com/Marceloski1/smart-task-avancode-documentation](https://github.com/Marceloski1/smart-task-avancode-documentation)

## ✨ Características

- 🤖 **Priorización inteligente de tareas** usando algoritmos de IA
- ⚡ **Seguimiento de niveles de energía** con recomendaciones personalizadas
- 💡 **Recomendaciones diarias impulsadas por IA** para optimizar tu productividad
- 📂 **Gestión de tareas** con categorías y etiquetas personalizables
- 🌙 **Modo oscuro** con tema personalizable
- 📱 **Diseño responsivo** para escritorio, tablet y móvil
- 📊 **Análisis e insights en tiempo real** sobre tu progreso
- 📈 **Gráficos de energía semanal** para visualizar tu productividad
- 🔐 **Autenticación segura** con validación de formularios

## 🛠️ Stack Tecnológico

| Categoría | Tecnología | Versión |
|-----------|-----------|---------|
| **Framework** | Next.js (App Router) | 15.5.6+ |
| **Lenguaje** | TypeScript | ^6 |
| **Estilizado** | Tailwind CSS | ^4.1.9 |
| **Gestión de Estado** | Zustand | latest |
| **Validación** | Zod | 3.25.76 |
| **Componentes UI** | shadcn/ui + Radix UI | latest |
| **Animaciones** | Framer Motion | latest |
| **Gráficos** | Recharts | latest |
| **Testing** | Jest + React Testing Library | latest |
| **Notificaciones** | Sonner | ^1.7.4 |

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js**: versión 20 o superior
- **npm** como manejador de paquetes
- Git para control de versiones

### Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Marceloski1/smart-task.git
   cd smart-task
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en tu navegador**
   - Navega a [http://localhost:3000](http://localhost:3000)

### Scripts Disponibles

```bash
npm run dev              # Inicia servidor de desarrollo
npm run build            # Compila para producción
npm start                # Inicia servidor en modo producción
npm run lint             # Ejecuta ESLint para validar código
```

## 📁 Estructura del Proyecto

```
smart-task/
├── app/
│   ├── (auth)/                 # Rutas de autenticación (login/registro)
│   ├── (dashboard)/            # Rutas protegidas del dashboard
│   │   ├── dashboard/          # Vista principal del dashboard
│   │   ├── tasks/              # Gestor de tareas
│   │   ├── energy/             # Seguimiento de energía
│   │   └── recommendations/    # IA recommendations
│   ├── layout.tsx              # Layout raíz
│   ├── page.tsx                # Página principal
│   └── globals.css             # Estilos globales
│
├── components/
│   ├── ui/                     # Componentes de UI reutilizables (shadcn)
│   │   ├── button.tsx, card.tsx, dialog.tsx, etc.
│   ├── auth/                   # Componentes de autenticación
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── dashboard/              # Componentes del dashboard
│   │   ├── stats-cards.tsx
│   │   ├── energy-chart.tsx
│   │   ├── priority-tasks.tsx
│   │   └── ai-recommendation.tsx
│   ├── tasks/                  # Componentes de tareas
│   │   ├── task-card.tsx
│   │   ├── task-dialog.tsx
│   │   └── task-filters.tsx
│   ├── energy/                 # Componentes de energía
│   │   ├── energy-form.tsx
│   │   ├── energy-history.tsx
│   │   └── energy-weekly-chart.tsx
│   ├── layout/                 # Componentes de layout
│   │   ├── app-header.tsx
│   │   ├── app-sidebar.tsx
│   │   └── protected-layout.tsx
│   └── theme-provider.tsx      # Proveedor de temas
│
├── lib/
│   ├── types.ts                # Esquemas Zod y tipos TypeScript
│   ├── store.ts                # Store global de Zustand
│   ├── mock-data.ts            # Datos simulados para desarrollo
│   ├── utils.ts                # Funciones auxiliares
│   └── i18n.ts                 # Configuración i18n (internacionalización)
│
├── hooks/
│   ├── use-mobile.ts           # Hook para detectar dispositivos móviles
│   └── use-toast.ts            # Hook para notificaciones Toast
│
├── __tests__/                  # Tests unitarios e integración
│   ├── components/
│   ├── lib/
│   └── README.md
│
├── public/                     # Archivos estáticos
├── styles/                     # Estilos adicionales
├── .github/workflows/          # GitHub Actions CI/CD
│   ├── ci.yml                  # Pipeline de CI (lint, tests, build)
│   └── deploy.yml              # Pipeline de despliegue a Cloudflare Pages
│
├── jest.config.js              # Configuración de Jest
├── jest.setup.js               # Setup de Jest
├── tsconfig.json               # Configuración de TypeScript
├── tailwind.config.js          # Configuración de Tailwind CSS
├── next.config.mjs             # Configuración de Next.js
└── package.json                # Dependencias y scripts
```

## 🗄️ Datos de Prueba

La aplicación actualmente utiliza datos simulados locales almacenados en `lib/mock-data.ts`. La estructura de datos está diseñada para coincidir fácilmente con el esquema del backend planificado (PostgreSQL + Redis) para una integración futura sin cambios mayores. 
.......Redis por definir

## 🔌 Integración con servicios

### Backend
Esta aplicación consume de una api desarrollada sobre el framework fastapi de python, api documentada en el siguiente repositorio: [https://github.com/AndyCG03/backend-smart-task](https://github.com/AndyCG03/backend-smart-task) y publicada utilizando los servicios de onrender en ARREGLAR URL ---->>>>> [https://backend-smart.onrender.com/docs](https://backend-smart.onrender.com/docs)

### Servicio de resumidor (Pipeline de Scikit-learn)
Esta aplicación consume de un servicio de resumidor extractivo, el cual fue desarrollado a modo de pipeline con base de scikit-learn y técnicas de procesamiento de lenguaje natural, el procedimiento está documentado en el siguiente repositorio: [https://github.com/DaryllLorenzo/Pipeline-de-Resumen](https://github.com/DaryllLorenzo/Pipeline-de-Resumen). Se consume este servicio a través de una api desarrollada sobre el framework fastapi, y fue publicada utilizando los servicios de onrender en [https://pipeline-resumen-fast-api.onrender.com/docs](https://pipeline-resumen-fast-api.onrender.com/docs)

### Servicio de detección de elementos en diagramas de casos de uso
Esta aplicación consume de un serivicio de detección de elementos en diagramas de casos de uso de sistemas. Se basa en un pipeline de utilizando bibliotecas populares para el trabajo con visión de computadora OpenCV y detección de textos en imágenes con easyocr. La documentación y el proyecto se encuentra en el repositorio: [https://github.com/DaryllLorenzo/Pipeline-OpenCV-OCR](https://github.com/DaryllLorenzo/Pipeline-OpenCV-OCR). Se consume este servicio a través de una api desarrollada sobre el framework fastapi, y fue publicada utilizando los servicios de onrender en [https://pipeline-opencv-ocr-fast-api.onrender.com/docs](https://pipeline-opencv-ocr-fast-api.onrender.com/docs)


## 🚀 Despliegue

### Cloudflare Pages (Actual)

La aplicación está configurada para desplegarse en **Cloudflare Pages** con un pipeline CI/CD automático vía GitHub Actions.

**Secretos Requeridos:**
- `CLOUDFLARE_API_TOKEN` - Token de API de Cloudflare
- `CLOUDFLARE_ACCOUNT_ID` - ID de cuenta de Cloudflare

**Workflow:**
- Los cambios en `main` disparan automáticamente el despliegue
- Los PRs a `main` y `develop` ejecutan linting y tests

### Vercel (Alternativa)

Para desplegar en Vercel en lugar de Cloudflare:

1. **Instalar Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Desplegar**
   ```bash
   vercel
   ```

O conecta tu repositorio de GitHub directamente a Vercel para despliegues automáticos.

## 🧪 Testing

El proyecto incluye pruebas unitarias e integración configuradas con **Jest** y **React Testing Library**.

```bash
# Ejecutar todos los tests
npm run test:coverage

# Ejecutar tests en modo watch
npm run test:watch
```

Los tests se encuentran en la carpeta `__tests__/` y se ejecutan automáticamente en el pipeline de CI.

## 📝 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo `LICENSE` para más detalles.

## 📧 Contacto

- **Autor**: Pokefurro
- **GitHub**: [@Marceloski1](https://github.com/Marceloski1)

---
