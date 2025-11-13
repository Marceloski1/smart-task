# SmartTask - Intelligent Task Management

AI-powered task management system that helps you prioritize and complete your tasks efficiently based on your energy levels and deadlines.

## Features

- Intelligent task prioritization using AI algorithms
- Energy level tracking and recommendations
- Daily AI-powered task recommendations
- Task management with categories
- Dark mode support
- Responsive design
- Real-time analytics and insights

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Validation**: Zod
- **UI Components**: Material UI + shadcn/ui
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Testing**: Jest + React Testing Library

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository
\`\`\`bash
git clone <repository-url>
cd smarttask-app
\`\`\`

2. Install dependencies
\`\`\`bash
npm install
\`\`\`

3. Run the development server
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Deployment

### Cloudflare Pages

This app is configured for deployment on Cloudflare Pages. The CI/CD pipeline is set up via GitHub Actions.

**Required Secrets:**
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Vercel (Alternative)

To deploy on Vercel instead:

1. Install Vercel CLI
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy
\`\`\`bash
vercel
\`\`\`

Or connect your GitHub repository directly to Vercel for automatic deployments.

## Project Structure

\`\`\`
smarttask-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # UI components (shadcn)
│   ├── tasks/            # Task-related components
│   ├── energy/           # Energy tracking components
│   └── dashboard/        # Dashboard components
├── lib/                   # Utility functions
│   ├── types.ts          # Zod schemas & TypeScript types
│   ├── store.ts          # Zustand store
│   ├── mock-data.ts      # Mock data for development
│   └── utils.ts          # Helper functions
├── hooks/                 # Custom React hooks
└── __tests__/            # Test files
\`\`\`

## Mock Data

The app currently uses local mock data. The data structure is designed to match the planned PostgreSQL/Redis backend schema for easy future integration.

## Future Backend Integration

This frontend is prepared for integration with a FastAPI backend using:
- PostgreSQL for relational data
- Redis for caching and session management
- RESTful API endpoints

The mock data structure in `lib/mock-data.ts` matches the planned database schema.

## License

MIT
