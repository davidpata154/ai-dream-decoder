# AI Dream Decoder — Architecture

## Overview

The application follows a **Hexagonal Architecture (Ports & Adapters)** pattern adapted for Next.js.
The core domain is completely decoupled from external services (Gemini, future Clerk, future Neon).

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                          BROWSER                                │
│                                                                 │
│  ┌──────────────┐     ┌───────────────┐     ┌───────────────┐  │
│  │  page.tsx    │────▶│  DreamInput   │     │  DreamResult  │  │
│  │  (HomePage)  │     │  (Component)  │     │  (Component)  │  │
│  └──────┬───────┘     └───────────────┘     └───────────────┘  │
│         │                                                       │
│         │ useDreamInterpreter (hook)                           │
│         ▼                                                       │
│  ┌──────────────┐                                               │
│  │ fetch POST   │                                               │
│  │ /api/dream/  │                                               │
│  │ interpret    │                                               │
│  └──────┬───────┘                                               │
└─────────│───────────────────────────────────────────────────────┘
          │ HTTP (API Key stays server-side)
┌─────────▼───────────────────────────────────────────────────────┐
│                        SERVER (Next.js)                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              API Route: route.ts                         │   │
│  │  (validates input, instantiates service, handles errors) │   │
│  └──────────────────────┬───────────────────────────────────┘   │
│                         │                                       │
│          ┌──────────────▼──────────────┐                        │
│          │      IDreamService          │  ← PORT (interface)    │
│          │  + interpretDream()         │                        │
│          │  + generateDreamImage()     │                        │
│          │  + generateDreamText()      │                        │
│          └──────┬──────────────┬───────┘                        │
│                 │              │                                │
│    ┌────────────▼──┐    ┌──────▼──────────┐                     │
│    │GeminiDream    │    │MockDreamService │  ← ADAPTERS         │
│    │Service        │    │(tests/dev)      │                     │
│    └───────┬───────┘    └─────────────────┘                     │
└────────────│────────────────────────────────────────────────────┘
             │
┌────────────▼────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
│                                                                 │
│   Google Gemini API                                             │
│   ├── gemini-2.0-flash-exp        (text generation)            │
│   └── gemini-2.0-flash-preview-image-generation (images)       │
│                                                                 │
│   [Future] Clerk (Authentication)                               │
│   [Future] Neon Postgres (Persistence)                          │
└─────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with fonts + AntdProvider
│   ├── page.tsx                  # Home page — orchestrates UI states
│   ├── error.tsx                 # Global error boundary
│   ├── globals.css               # CSS custom properties
│   └── api/dream/interpret/
│       └── route.ts              # API Gateway → Gemini
│
├── components/
│   ├── DreamInput/
│   │   ├── DreamInput.tsx        # RF-01: text input + validation
│   │   └── DreamInput.test.tsx
│   ├── DreamResult/
│   │   ├── DreamResult.tsx       # RF-04: image + interpretation display
│   │   └── DreamResult.test.tsx
│   └── providers/
│       └── AntdProvider.tsx      # Ant Design dark theme config
│
├── domain/                       # CORE — no framework imports
│   ├── entities/
│   │   └── Dream.ts              # DreamInterpretation, DreamRequest types
│   └── interfaces/
│       └── IDreamService.ts      # Port: service contract
│
├── services/
│   └── gemini/
│       ├── GeminiDreamService.ts # Adapter: real Gemini implementation
│       └── MockDreamService.ts   # Adapter: mock for tests
│
├── hooks/
│   └── useDreamInterpreter.ts    # Client-side orchestration hook
│
└── lib/
    └── errors.ts                 # DreamServiceError, error codes
```

## Key Architectural Decisions

### 1. API Route as Gateway (RNF-01)
The frontend never calls Gemini directly. All AI calls go through `/api/dream/interpret`,
which keeps `GOOGLE_API_KEY` server-side and provides a clean boundary for future auth middleware (Clerk).

### 2. IDreamService Interface (Hexagonal)
`GeminiDreamService` and `MockDreamService` both implement `IDreamService`.
To add a new AI provider, implement the interface — no changes to domain or UI.

### 3. Parallel AI Calls (RNF-03)
`interpretDream()` uses `Promise.all([generateDreamText(), generateDreamImage()])`
to minimize latency. Both Gemini calls run concurrently.

### 4. Future Integration Points
- **Clerk**: Add middleware to `app/middleware.ts` + wrap API route with auth check
- **Neon**: Add `DreamRepository` interface + `NeonDreamRepository` adapter to persist interpretations

## Data Flow

```
User types dream → DreamInput validates → onSubmit(description)
  → useDreamInterpreter.interpret() → POST /api/dream/interpret
    → GeminiDreamService.interpretDream()
      → Promise.all([generateDreamText(), generateDreamImage()])
        → Gemini API (text) + Gemini API (image) [PARALLEL]
      ← { interpretation, tags, imageUrl }
    ← DreamInterpretation JSON
  ← status: 'success', result: DreamInterpretation
→ DreamResult renders image + interpretation + tags
```
