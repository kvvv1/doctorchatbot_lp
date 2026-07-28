# DoctorChatBot — Landing Page

Vite + React 18 + TypeScript + Tailwind + react-router-dom v6 + react-helmet-async.

## Hosting real (não é Vercel)

VPS próprio (`80.241.218.217`, nginx + pm2), não Vercel — `vercel.json`/`public/vercel.json` na raiz do repo são vestígio de uma tentativa antiga e não fazem nada em produção.

- nginx (`/etc/nginx/sites-available/doctorchatbot.com.br`) proxeia `/` pro processo pm2 `doctor-landing` (porta 3011, `pm2 serve` servindo `/opt/doctor-landing/dist`), `/api/track` e `/painel` pro processo `doctor-admin` (porta 3012).
- `location /informacoes/` tem bloco próprio no nginx servindo direto do disco (`try_files $uri $uri/index.html /index.html`) — necessário porque `pm2 serve` só resolve `index.html` automático na raiz do site, não em subpastas (crasha com 500 se pedir a pasta sem o arquivo exato).
- **Deploy é manual**: sem CI, sem auto-deploy no push do GitHub. Processo: `npm run build` local → `tar czf` do `dist/` → enviar por SSH (SFTP simples trava nesse servidor por algum motivo — usar `tar` via `ssh2` exec, streaming stdin) → extrair em `/opt/doctor-landing/dist` (fazer backup do dist anterior antes) → **não precisa restart do pm2** pra arquivos estáticos novos (mas rodar `pm2 restart doctor-landing` não faz mal se algo parecer não atualizar).
- Sempre `nginx -t` antes de `systemctl reload nginx` se mexer na config.

## Estrutura da home

Single-page, sem seção via router — `Home` (dentro de `App.tsx`) faz scroll-into-view (`Hero`, `Features`, `HowItWorks`, `Integrations`, `Plans`, `ROICalculator`, `Testimonials`, `FAQ`, `FinalCTA`, `Footer`). CTA de WhatsApp da home centralizado em `src/utils/whatsapp.ts` (`waLink`).

## Landing pages programáticas (nicho × estado, nicho × capital)

Engine de páginas de SEO/tráfego pago geradas de templates fixos — ver `list.md` pra controle de quais (nicho, local) já existem. Baseado na estratégia documentada pela Codexy (parceira técnica) — ver artifact `a777ca82-4dd5-45dc-8a6c-28f93b3c80fe`.

**Modelo de dados** (`src/data/landingPages.ts`):
- `StateInfo` (20 estados) e `CityInfo` (20 capitais) — cada um com slug, preposição PT-BR precomputada (`in`), e um ângulo de conteúdo próprio (`regionalNote` pro estado, `districts`+`localFlavor` hiperlocal pra capital) pra não gerar texto repetido entre os dois níveis.
- `NicheTemplate`: copy fixa (painPoints, benefits, faq, subheadline, partner) + pares de função `state*`/`city*` (headline, introParagraph, whatsappMessage, seoTitle, seoDescription) — cada nível tem sua própria função porque o ângulo de texto é diferente, não é só trocar o nome do local.
- `buildStatePage`/`buildCityPage` geram `landingPages`, o único array flat que rotas/prerender/sitemap enxergam.

**Slugs**: estado → `chatbot-para-{nicheSlug}-{estado}`; capital → `chatbot-para-{nicheSlug}-cidade-{capital}` (segmento `cidade` evita colisão com o slug de estado, mesmo quando capital e estado têm nome igual — São Paulo, Rio de Janeiro).

**Rota única dinâmica**: `/informacoes/:slug` → `getLandingPageBySlug`. Slug inválido → `NotFound` + `noindex` (renderizado client-side, HTTP fica 200 por limitação do fallback estático — aceitável, mas não é um 404 real).

**Pipeline de build**: `vite build` → `vite build --ssr src/entry-server.tsx --outDir dist-ssr` → `node scripts/prerender.mjs` (gera `dist/informacoes/<slug>/index.html` com head único) → `tsx scripts/generate-sitemap.tsx`.

**SEO por página**: title/description/canonical/OG/twitter:card únicos via `react-helmet-async`, hero renderizado como `<img>` real (não CSS background) com `alt` único, `FAQPage` JSON-LD a partir do próprio array `faq`. `public/robots.txt` aponta pro `sitemap.xml`.

### Decisões tomadas

- **Teto de páginas**: 60 combinado (estado+capital), checar `landingPages.length` antes de adicionar `NicheTemplate` novo. Atual: 40 (20+20), ver `list.md`.
- **Bloco parceiro (Codexy)**: só São Paulo e Rio de Janeiro nível-estado, piloto. Nenhuma página de capital tem — decisão explícita de não escalar o link ainda (risco de padrão de link scheme se repetido em dezenas de páginas quase-clones).
- **Risco de canibalização**: São Paulo, Rio de Janeiro e Brasília têm capital com nome igual (ou quase, no caso de Brasília/DF) ao estado — página de capital usa ângulo hiperlocal (bairros) pra diferenciar, mas são os 3 pares a observar no Search Console se uma passar a competir com a outra pela mesma busca.
- **Imagens**: só 7 dos 20 estados têm hero image própria gerada (ver `docs/image-generation-brief.md`); os outros 13 estados e as 20 capitais caem no fallback gradiente até imagem própria ser gerada.

### Guardrails

- Nunca editar `landingPages` à mão — só via `NicheTemplate` + `StateInfo`/`CityInfo`.
- Novo nicho = 1 tarefa de conteúdo (o template com par state*/city*), não N tarefas por local.
- Antes de cada deploy: `npm run build` local, checar `dist/informacoes/<slug>/index.html` tem title/OG únicos, `sitemap.xml` completo, testar 2-3 URLs em produção depois do upload.
