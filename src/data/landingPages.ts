// Modelo de dados das landing pages programáticas (nicho × estado).
// Nunca editar `landingPages` à mão — só via NICHE_TEMPLATES / BRAZILIAN_STATES + buildLandingPage.

export interface FeatureItem {
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PartnerRecommendation {
  name: string;
  description: string;
  url: string;
}

export interface StateInfo {
  label: string;
  uf: string;
  slug: string;
  preposition: 'no' | 'na' | 'em';
  in: string;
  cities: [string, string];
  regionalNote: string;
}

const RAW_STATES: Omit<StateInfo, 'slug' | 'in'>[] = [
  { label: 'São Paulo', uf: 'SP', preposition: 'em', cities: ['São Paulo', 'Campinas'], regionalNote: 'o mercado com maior concorrência entre clínicas particulares do país' },
  { label: 'Rio de Janeiro', uf: 'RJ', preposition: 'no', cities: ['Rio de Janeiro', 'Niterói'], regionalNote: 'clínicas de bairro e redes particulares disputando a mesma agenda' },
  { label: 'Minas Gerais', uf: 'MG', preposition: 'em', cities: ['Belo Horizonte', 'Uberlândia'], regionalNote: 'um estado onde boa parte das clínicas fica fora da capital, espalhada pelo interior' },
  { label: 'Bahia', uf: 'BA', preposition: 'na', cities: ['Salvador', 'Feira de Santana'], regionalNote: 'agenda que varia forte com a sazonalidade turística do litoral' },
  { label: 'Rio Grande do Sul', uf: 'RS', preposition: 'no', cities: ['Porto Alegre', 'Caxias do Sul'], regionalNote: 'clínicas menores e familiares, com relação próxima entre médico e paciente' },
  { label: 'Paraná', uf: 'PR', preposition: 'no', cities: ['Curitiba', 'Londrina'], regionalNote: 'crescimento acelerado de clínicas de especialidade fora da capital' },
  { label: 'Pernambuco', uf: 'PE', preposition: 'em', cities: ['Recife', 'Caruaru'], regionalNote: 'polo de saúde do Nordeste, com pacientes vindos de outros estados' },
  { label: 'Ceará', uf: 'CE', preposition: 'no', cities: ['Fortaleza', 'Juazeiro do Norte'], regionalNote: 'expansão rápida de clínicas particulares na capital e no interior' },
  { label: 'Pará', uf: 'PA', preposition: 'no', cities: ['Belém', 'Santarém'], regionalNote: 'distâncias grandes entre cidades, onde o WhatsApp já é o canal principal de contato' },
  { label: 'Santa Catarina', uf: 'SC', preposition: 'em', cities: ['Florianópolis', 'Joinville'], regionalNote: 'renda per capita alta e demanda por clínicas de padrão premium' },
  { label: 'Maranhão', uf: 'MA', preposition: 'no', cities: ['São Luís', 'Imperatriz'], regionalNote: 'crescimento recente de clínicas particulares fora do sistema público' },
  { label: 'Goiás', uf: 'GO', preposition: 'em', cities: ['Goiânia', 'Anápolis'], regionalNote: 'clínicas atendendo tanto a região metropolitana quanto cidades do cerrado' },
  { label: 'Amazonas', uf: 'AM', preposition: 'no', cities: ['Manaus', 'Parintins'], regionalNote: 'um estado onde o canal digital de agendamento pesa mais que em qualquer outro, dado o tamanho do território' },
  { label: 'Espírito Santo', uf: 'ES', preposition: 'no', cities: ['Vitória', 'Vila Velha'], regionalNote: 'clínicas dividindo demanda entre litoral e Grande Vitória' },
  { label: 'Paraíba', uf: 'PB', preposition: 'na', cities: ['João Pessoa', 'Campina Grande'], regionalNote: 'concorrência forte entre clínicas de porte médio' },
  { label: 'Rio Grande do Norte', uf: 'RN', preposition: 'no', cities: ['Natal', 'Mossoró'], regionalNote: 'demanda sazonal puxada pelo turismo' },
  { label: 'Mato Grosso', uf: 'MT', preposition: 'no', cities: ['Cuiabá', 'Rondonópolis'], regionalNote: 'agenda que mistura pacientes urbanos e de propriedades rurais distantes' },
  { label: 'Alagoas', uf: 'AL', preposition: 'em', cities: ['Maceió', 'Arapiraca'], regionalNote: 'clínicas concentradas na faixa litorânea' },
  { label: 'Piauí', uf: 'PI', preposition: 'no', cities: ['Teresina', 'Parnaíba'], regionalNote: 'mercado em expansão, com poucas clínicas ainda usando agenda digital' },
  { label: 'Distrito Federal', uf: 'DF', preposition: 'no', cities: ['Brasília', 'Taguatinga'], regionalNote: 'alto poder aquisitivo e forte presença de clínicas particulares premium' },
];

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const BRAZILIAN_STATES: StateInfo[] = RAW_STATES.map((s) => ({
  ...s,
  slug: slugify(s.label),
  in: `${s.preposition} ${s.label}`,
}));

// Estados com hero image própria gerada (ver docs/image-generation-brief.md).
// Os demais caem no fallback visual (gradiente) até a imagem ser gerada.
export const STATES_WITH_IMAGE = new Set([
  'sao-paulo',
  'rio-de-janeiro',
  'minas-gerais',
  'bahia',
  'rio-grande-do-sul',
  'parana',
  'pernambuco',
]);

// Piloto: só nesses estados o bloco de parceiro aparece, de propósito —
// ver CLAUDE.md, decisão de não escalar link parceiro pras 20 páginas de uma vez.
const PARTNER_PILOT_STATES = new Set(['sao-paulo', 'rio-de-janeiro']);

export interface NicheTemplate {
  nicheSlug: string;
  niche: string;
  eyebrow: string;
  heroImageAlt: (state: StateInfo) => string;
  subheadline: string;
  painPoints: FeatureItem[];
  benefits: FeatureItem[];
  faq: FaqItem[];
  partner?: PartnerRecommendation;
  headline: (state: StateInfo) => string;
  introParagraph: (state: StateInfo) => string;
  whatsappMessage: (state: StateInfo) => string;
  seoTitle: (state: StateInfo) => string;
  seoDescription: (state: StateInfo) => string;
}

const CLINICAS_MEDICAS: NicheTemplate = {
  nicheSlug: 'clinicas-medicas',
  niche: 'Clínicas Médicas',
  eyebrow: 'Automação de Agenda para Clínicas',
  heroImageAlt: (state) => `Recepção de clínica médica moderna em ${state.label} — DoctorChatBot`,
  subheadline:
    'Agenda inteligente que confirma, lembra e reduz falta — sua equipe foca no paciente, o bot cuida do WhatsApp.',
  painPoints: [
    { title: 'No-show alto', description: 'Paciente esquece a consulta e a agenda fica com buraco sem aviso prévio.' },
    { title: 'Recepção sobrecarregada', description: 'Time perde tempo confirmando horário por telefone em vez de atender quem já está na clínica.' },
    { title: 'Remarcação manual', description: 'Cada remarcação vira troca de mensagens indo e voltando até fechar um novo horário.' },
  ],
  benefits: [
    { title: 'Confirmação automática', description: 'Bot confirma a consulta e lembra o paciente antes do horário, sem depender da recepção.' },
    { title: 'Reagendamento no WhatsApp', description: 'Paciente troca o horário sozinho, dentro das regras que a clínica define.' },
    { title: 'Painel de aprovação', description: 'Equipe acompanha e aprova agendamentos em um painel simples, sem planilha.' },
  ],
  faq: [
    { question: 'Preciso trocar de sistema de agenda?', answer: 'Não. O DoctorChatBot se integra ao sistema que a clínica já usa — a agenda continua no mesmo lugar.' },
    { question: 'Funciona pelo WhatsApp da clínica?', answer: 'Sim, o número usado já é o da clínica, sem precisar migrar contatos ou histórico de conversa.' },
    { question: 'Quanto tempo leva pra colocar no ar?', answer: 'Configuração inicial em poucos dias, com acompanhamento durante a primeira semana de uso.' },
  ],
  partner: {
    name: 'Codexy',
    description: 'Parceira técnica responsável pela automação e integração do DoctorChatBot.',
    url: 'https://codexy.com.br/',
  },
  headline: (state) => `Chatbot para Clínicas Médicas ${state.in}`,
  introParagraph: (state) =>
    `${state.label} é ${state.regionalNote}. Em ${state.cities[0]} e ${state.cities[1]}, clínicas médicas que ainda confirmam consulta por telefone perdem tempo de recepção e deixam horário vago quando o paciente esquece. O DoctorChatBot automatiza confirmação, lembrete e reagendamento direto no WhatsApp, adaptado à rotina de clínicas ${state.in}.`,
  whatsappMessage: (state) =>
    `Olá! Tenho uma clínica médica ${state.in} e quero saber mais sobre o DoctorChatBot.\n\n— origem: informacoes_${state.slug}`,
  seoTitle: (state) => `Chatbot para Clínicas Médicas ${state.in} | DoctorChatBot`,
  seoDescription: (state) =>
    `Automatize agendamento, confirmação e lembrete de consulta no WhatsApp para clínicas médicas ${state.in}. Reduza no-show e libere sua recepção.`,
};

export const NICHE_TEMPLATES: NicheTemplate[] = [CLINICAS_MEDICAS];

export interface LandingPageData {
  slug: string;
  nicheSlug: string;
  niche: string;
  eyebrow: string;
  stateLabel: string;
  stateUf: string;
  stateIn: string;
  headline: string;
  introParagraph: string;
  subheadline: string;
  heroImage: string | null;
  heroImageAlt: string;
  painPoints: FeatureItem[];
  benefits: FeatureItem[];
  faq: FaqItem[];
  partner?: PartnerRecommendation;
  whatsappMessage: string;
  seo: { title: string; description: string };
}

function buildLandingPage(template: NicheTemplate, state: StateInfo): LandingPageData {
  return {
    slug: `chatbot-para-${template.nicheSlug}-${state.slug}`,
    nicheSlug: template.nicheSlug,
    niche: template.niche,
    eyebrow: template.eyebrow,
    stateLabel: state.label,
    stateUf: state.uf,
    stateIn: state.in,
    headline: template.headline(state),
    introParagraph: template.introParagraph(state),
    subheadline: template.subheadline,
    heroImage: STATES_WITH_IMAGE.has(state.slug) ? `/images/${template.nicheSlug}/${state.slug}.webp` : null,
    heroImageAlt: template.heroImageAlt(state),
    painPoints: template.painPoints,
    benefits: template.benefits,
    faq: template.faq,
    partner: PARTNER_PILOT_STATES.has(state.slug) ? template.partner : undefined,
    whatsappMessage: template.whatsappMessage(state),
    seo: { title: template.seoTitle(state), description: template.seoDescription(state) },
  };
}

export const landingPages: LandingPageData[] = NICHE_TEMPLATES.flatMap((template) =>
  BRAZILIAN_STATES.map((state) => buildLandingPage(template, state)),
);

export function getLandingPageBySlug(slug?: string): LandingPageData | undefined {
  if (!slug) return undefined;
  return landingPages.find((p) => p.slug === slug);
}
