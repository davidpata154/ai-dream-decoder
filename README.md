# AI Dream Decoder

An AI-powered dream interpretation app built with Next.js and Google Gemini.
Enter a dream description and receive an artistic image + psychological interpretation — generated simultaneously.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript strict |
| UI | Ant Design v6 + Lucide React |
| Fonts | Fraunces (titles) + DM Sans (body) via `next/font/google` |
| AI | Google Gemini (`gemini-2.0-flash-exp` + `gemini-2.0-flash-preview-image-generation`) |
| Testing | Jest + Testing Library (unit) + Playwright (E2E) |
| Quality | ESLint (flat config) + Prettier + TypeScript strict |
| Deployment | Vercel |

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
# .env.local already exists — set your Gemini API key:
GOOGLE_API_KEY=your_google_api_key_here
# Get yours at: https://aistudio.google.com/apikey
```

### 3. Run development server

```bash
npm run dev
# → http://localhost:3000
```

## Available Commands

### Development

```bash
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality

```bash
npm run type-check   # TypeScript type check (no emit)
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting without writing
```

### Testing

```bash
npm test                 # Run all Jest unit tests
npm run test:watch       # Run Jest in watch mode
npm run test:coverage    # Run Jest with coverage report
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # Run Playwright with interactive UI
```

## Architecture

The app follows **Hexagonal Architecture (Ports & Adapters)**. The UI never calls Gemini directly — all AI requests go through a Next.js API Route that keeps the API key server-side.

```
Browser → useDreamInterpreter (hook)
        → POST /api/dream/interpret   ← server-side (API key secure)
        → IDreamService (interface/port)
        → GeminiDreamService (adapter) → Google Gemini API
```

See [docs/architecture.md](docs/architecture.md) for the full diagram and architectural decisions.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts + AntdProvider
│   ├── page.tsx                # Home page — orchestrates UI states
│   ├── error.tsx               # Global error boundary
│   └── api/dream/interpret/
│       └── route.ts            # API Gateway → Gemini
├── components/
│   ├── DreamInput/             # RF-01: text input + character counter
│   ├── DreamResult/            # RF-04: image + interpretation card + tags
│   └── providers/
│       └── AntdProvider.tsx    # Ant Design dark theme (ConfigProvider)
├── domain/
│   ├── entities/Dream.ts       # Core TypeScript types
│   └── interfaces/IDreamService.ts  # Port: service contract
├── services/gemini/
│   ├── GeminiDreamService.ts   # Real Gemini adapter (production)
│   └── MockDreamService.ts     # Mock adapter (tests / dev)
├── hooks/
│   └── useDreamInterpreter.ts  # Client-side orchestration hook
└── lib/
    └── errors.ts               # DreamServiceError + error codes
```

## Design

| Artifact | Path |
|---|---|
| UX wireframes | `designs/wireframes.pen` |
| Design system + Ant Design tokens | `designs/design-system.md` |

Theme: dark mystical — `#0B0B0E` background, `#6366F1` indigo accent, Fraunces + DM Sans typography.

## Test Coverage

| File | Statements | Branches | Functions | Lines |
|---|---|---|---|---|
| `DreamInput.tsx` | 100% | 100% | 100% | 100% |
| `DreamResult.tsx` | 100% | 100% | 100% | 100% |
| `useDreamInterpreter.ts` | 100% | 87.5% | 100% | 100% |
| `MockDreamService.ts` | 100% | 100% | 100% | 100% |
| **Overall** | **98.47%** | **86.48%** | **100%** | **98.47%** |

## Future Integrations

The decoupled architecture is ready for:

- **Clerk** (Authentication): add `src/app/middleware.ts` + auth check in the API route
- **Neon Postgres** (Persistence): add `IDreamRepository` interface + `NeonDreamRepository` adapter to persist dream history
