# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`ai-dream-decoder` is an AI-powered dream interpretation app. The project is in early development.

## Intended Stack

Based on installed skills, the planned stack is:

- **Framework**: Next.js (App Router) with React
- **Auth**: Clerk (`clerk-nextjs-patterns` skill)
- **Database**: Neon Serverless Postgres (`neon-postgres` skill)
- **Deployment**: Vercel
- **AI**: Google Gemini via `GOOGLE_API_KEY`

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
