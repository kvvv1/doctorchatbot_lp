# DoctorChatBot — Landing Page

Vite + React 18 + TypeScript + Tailwind. Hospedado na Vercel (`public/vercel.json`, `cleanUrls: true`). Deploy: push em `main` → auto-deploy.

## Estrutura atual

Single-page app, sem router — seções da home fazem scroll-into-view (`Hero`, `Features`, `HowItWorks`, `Integrations`, `Plans`, `ROICalculator`, `Testimonials`, `FAQ`, `FinalCTA`, `Footer`). CTA de WhatsApp centralizado em `src/utils/whatsapp.ts`.

## Programmatic landing pages (niche × estado) — EM CONSTRUÇÃO

Engine pra gerar N páginas de SEO/tráfego pago (uma por nicho de negócio × estado) a partir de 1 template por nicho, sem duplicar JSX por página. Baseado na estratégia documentada pela Codexy (parceira técnica) — ver artifact `a777ca82-4dd5-45dc-8a6c-28f93b3c80fe`.

**Stack extra necessária** (ainda não instalada): `react-router-dom` v6, `react-helmet-async`, `tsx` (devDependency).

**Modelo de dados** (`src/data/landingPages.ts`, a criar):
- `StateInfo`: label, uf, slug, preposition ("no"/"na"/"em"), campo `in` precomputado.
- `NicheTemplate`: copy fixa (painPoints, benefits, faq, heroImage) + funções regionalizadas (`headline`, `introParagraph`, `whatsappMessage`, `seoTitle`, `seoDescription`) + `partner?` opcional.
- `buildLandingPage(template, state)` gera `landingPages` flat array — único ponto que rotas/prerender/sitemap enxergam.

**Rota única dinâmica**: `/informacoes/:slug` → `getLandingPageBySlug`. Slug inválido → `NotFound` + `noindex`.

**Pipeline de build**: `vite build` (client) → `vite build --ssr src/entry-server.tsx --outDir dist-ssr` → `node scripts/prerender.mjs` (gera `dist/informacoes/<slug>/index.html` com head único via `react-helmet-async`) → `tsx scripts/generate-sitemap.tsx`.

**Hosting**: `vercel.json` precisa de rewrite pra `/informacoes/:slug` → `/informacoes/:slug/index.html` ANTES do catch-all `/(.*)`  → `/index.html`.

### Decisões tomadas (2026-07-27)

- **Fase 1**: 1 nicho ("Clínicas Médicas") × 20 estados. Cada página com peculiaridade real por estado (cidades, contexto regional) — não só nome do estado interpolado — pra evitar conteúdo fino/duplicado.
- **Teto de páginas**: checar `landingPages.length` antes de adicionar `NicheTemplate` novo. Não crescer por inércia.
- **Bloco parceiro (Codexy, `partner` field)**: só em 1-2 páginas piloto por enquanto, não em todas as 20. Motivo: link idêntico repetido em dezenas de páginas quase-clones é padrão de link scheme pro Google — testar piloto antes de decidir escalar.
- **Imagens**: heroImage único por nicho normalmente, mas aqui geradas variações regionais (ver `docs/image-generation-brief.md`) pra reforçar unicidade visual por estado.

### Guardrails

- Nunca editar entradas de `landingPages` à mão — só via `NicheTemplate` + `StateInfo`.
- Novo nicho = 1 tarefa de conteúdo (o template), não N tarefas por estado.
- Antes de cada deploy: `npm run build` local, checar `dist/informacoes/<slug>/index.html` tem title/OG únicos, `sitemap.xml` completo.
