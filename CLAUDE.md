# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`ai-dream-decoder` is an AI-powered dream interpretation app. Users enter a dream description and receive an AI-generated artistic image and a brief psychological interpretation, both produced simultaneously by Google Gemini.

## Current Stack

The MVP has been implemented with the following stack:

- **Framework**: Next.js 15 (App Router) with TypeScript strict
- **UI**: Ant Design v6 + Lucide React icons (dark theme via `ConfigProvider`)
- **AI**: Google Gemini via `GOOGLE_API_KEY` (text: `gemini-2.0-flash-exp`, image: `gemini-2.0-flash-preview-image-generation`)
- **Auth**: Clerk — planned, not yet integrated (`clerk-nextjs-patterns` skill)
- **Database**: Neon Serverless Postgres — planned, not yet integrated (`neon-postgres` skill)
- **Deployment**: Vercel
- **Testing**: Jest + Testing Library (unit) + Playwright (E2E)
- **Quality**: ESLint (flat config) + Prettier + TypeScript strict

## Architecture

Hexagonal Architecture (Ports & Adapters). Key rule: **the UI never calls Gemini directly** — all AI calls go through `/api/dream/interpret` (API Route) which keeps the API key server-side.

```
Browser → useDreamInterpreter (hook)
        → POST /api/dream/interpret   ← server-side gateway
        → IDreamService (interface/port)
        → GeminiDreamService (adapter) → Google Gemini API
```

Integration points for future services:
- **Clerk**: add `src/app/middleware.ts` + auth check in the API route
- **Neon**: add `IDreamRepository` interface + `NeonDreamRepository` adapter

See `docs/architecture.md` for the full diagram.

## Key Files

| Path | Role |
|---|---|
| `src/domain/interfaces/IDreamService.ts` | Port — service contract |
| `src/domain/entities/Dream.ts` | Core TypeScript types |
| `src/services/gemini/GeminiDreamService.ts` | Real Gemini adapter |
| `src/services/gemini/MockDreamService.ts` | Mock adapter for tests |
| `src/hooks/useDreamInterpreter.ts` | Client-side orchestration |
| `src/app/api/dream/interpret/route.ts` | Server-side API gateway |
| `src/components/providers/AntdProvider.tsx` | Ant Design dark theme |
| `designs/wireframes.pen` | UX wireframes (Pencil) |
| `designs/design-system.md` | Ant Design tokens + component guide |
| `docs/architecture.md` | Architecture diagram + decisions |

## Development Notes

- **Ant Design v6**: use `orientation` instead of `direction` on `<Space>` component
- **ESLint**: uses flat config (`eslint.config.mjs`) with `typescript-eslint` — do NOT use `FlatCompat` with `next/typescript` (causes circular refs)
- **Jest**: `jest.setup.ts` includes `ResizeObserver` polyfill required by Ant Design TextArea
- **Sub-agents**: in-process teammates do not have Bash permissions — the orchestrator must run CLI commands directly

## Agent Teams

Agent teams are enabled for this project. See `.claude/settings.json`. Use `Shift+Down` to cycle between teammates in in-process mode.

## Installed Skills

Skills live in `.agents/skills/` and are invoked via `/skill-name`:

| Skill | Purpose |
|---|---|
| `vercel-react-best-practices` | React/Next.js performance patterns |
| `clerk-nextjs-patterns` | Clerk auth with middleware, Server Actions, caching |
| `neon-postgres` | Neon DB connection, branching, Drizzle ORM |
| `frontend-design` | Production-grade UI components |
| `ui-ux-pro-max` | Full UI/UX design system generation |
| `web-design-guidelines` | Accessibility and design audits |
| `architecture-patterns` | Clean/Hexagonal Architecture, DDD |
