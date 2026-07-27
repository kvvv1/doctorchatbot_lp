import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type FilledContext } from 'react-helmet-async';
import { AppRoutes } from './App';
import { landingPages } from './data/landingPages';

// SSR aqui só serve pro prerender estático (build time) — não é hydration em runtime.
React.useLayoutEffect = React.useEffect;

export const prerenderRoutes = ['/', ...landingPages.map((p) => `/informacoes/${p.slug}`)];

export function render(url: string) {
  const helmetContext = {} as FilledContext;
  const html = renderToStaticMarkup(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>,
  );
  return { html, helmet: helmetContext.helmet };
}
