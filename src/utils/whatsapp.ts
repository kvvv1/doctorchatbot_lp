// Número principal (landing padrão)
const WHATSAPP_NUMBER = "5531991666106";

// Número do atendimento secundário (rota /consulta). Se vazio, usa o principal.
const WHATSAPP_NUMBER_X1 = "5531991666106";

const DEFAULT_MSG_BASE = "Olá! Quero saber mais sobre o DoctorChatBot e ver uma demonstração.";

// Mapa slug-público -> código-interno de rastreio.
// URL mostra a chave; o WhatsApp marca o valor.
const ROUTE_CAMPAIGN: Record<string, string> = {
  consulta: "x1",
};

/** Código de campanha interno pela rota atual. "" = landing principal. */
function getCampaign(): string {
  if (typeof window === "undefined") return "";
  const slug = window.location.pathname.replace(/^\/+/, "").split("/")[0].toLowerCase();
  return ROUTE_CAMPAIGN[slug] ?? "";
}

export function waLink(source: string = "site"): string {
  const campaign = getCampaign();
  const isX1 = campaign === "x1";

  const number = isX1 && WHATSAPP_NUMBER_X1 ? WHATSAPP_NUMBER_X1 : WHATSAPP_NUMBER;
  const origin = campaign ? `${campaign}_${source}` : source;

  const msg = `${DEFAULT_MSG_BASE}\n\n— origem: ${origin}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}
