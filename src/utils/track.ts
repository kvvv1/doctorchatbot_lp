// Tracking leve de visitas/cliques -> serviço admin (/api/track)

function routeName(): string {
  const slug = window.location.pathname.replace(/^\/+/, '').split('/')[0].toLowerCase();
  if (slug === '') return 'principal';
  return slug; // 'consulta', etc
}

function send(payload: Record<string, unknown>) {
  try {
    const body = JSON.stringify(payload);
    // keepalive garante o envio mesmo se a página navegar (clique em link externo)
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* nunca quebra a UI */
  }
}

export function trackVisit() {
  const q = new URLSearchParams(window.location.search);
  send({
    type: 'visit',
    path: window.location.pathname,
    route: routeName(),
    referrer: document.referrer || null,
    utm_source: q.get('utm_source'),
    utm_medium: q.get('utm_medium'),
    utm_campaign: q.get('utm_campaign'),
  });
}

export function trackClick(label: string) {
  send({
    type: 'click',
    path: window.location.pathname,
    route: routeName(),
    label,
  });
}
