# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start development server (http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint code with Biome
npm run format       # Auto-format code with Biome
```

## Technology Stack

- **Framework**: Next.js 16 with App Router and React Server Components
- **API**: tRPC 11 with TanStack React Query
- **Database**: Prisma 7 with PostgreSQL (Neon)
- **Auth**: Better Auth with Polar for subscriptions
- **UI**: shadcn/ui components, Tailwind CSS 4, Radix primitives
- **Visual Editor**: @xyflow/react (React Flow)
- **AI**: Vercel AI SDK with Anthropic, OpenAI, Google providers
- **Job Queue**: Inngest
- **Linting/Formatting**: Biome (replaces ESLint + Prettier)

## Architecture

### tRPC Procedure Chain (`src/trpc/init.ts`)

Three procedure types with increasing authorization:
- `baseProcedure` - No auth required
- `protectedProcedure` - Requires authenticated session
- `premiumProcedure` - Requires active Polar subscription

### Feature-Based Structure

Features live in `src/features/` with co-located server routers, hooks, and components:
- `auth/` - Authentication logic
- `editor/` - Visual workflow editor
- `workflows/` - Workflow CRUD and management
- `subscriptions/` - Polar payment integration

### Database Models (Prisma)

Core entities:
- **User/Session/Account** - Better Auth models
- **Workflow** - User-owned workflow document
- **Node** - Workflow nodes with type (NodeType enum), position, and data (JSON)
- **Connection** - Edges between nodes (sourceId/targetId with handle positions)

### React Flow Integration

Workflow editor transforms Prisma models to React Flow format:
- Node types registered in `src/config/node-components.ts`
- `InitialNode` - Starting point with add button
- `WorkflowNode` - Wrapper with toolbar (settings/delete)
- Nodes and edges fetched via `workflows.getOne` tRPC procedure

### Entity UI Pattern (`src/components/entity-components.tsx`)

Reusable CRUD components: `EntityHeader`, `EntityContainer`, `EntitySearch`, `EntityPagination`, `EntityList`, `EntityItem`, and state views (`LoadingView`, `ErrorView`, `EmptyView`).

### Routing

- Root `/` redirects to `/workflows` (configured in next.config.ts)
- `(auth)` group - Login/signup pages
- `(dashboard)/(editor)` - Visual editor routes
- `(dashboard)/(rest)` - Standard CRUD routes

## Path Aliases

`@/*` maps to `./src/*`
