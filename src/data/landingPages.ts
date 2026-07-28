// Modelo de dados das landing pages programáticas (nicho × estado, nicho × capital).
// Nunca editar `landingPages` à mão — só via NICHE_TEMPLATES / BRAZILIAN_STATES / CAPITALS + buildStatePage/buildCityPage.

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

// Piloto: só nesses locais o bloco de parceiro aparece, de propósito —
// ver CLAUDE.md, decisão de não escalar link parceiro pra todas as páginas de uma vez.
// Fase 1 (estados): só SP e RJ. Fase 2 (capitais): nenhuma por enquanto.
const PARTNER_PILOT_STATES = new Set(['sao-paulo', 'rio-de-janeiro']);

// ---------------------------------------------------------------------------
// Capitais — segundo nível de página (nicho × cidade), foco hiperlocal (bairros)
// pra não repetir o ângulo já usado na página de estado.
// ---------------------------------------------------------------------------

export interface CityInfo {
  label: string;
  uf: string;
  slug: string;
  stateSlug: string;
  preposition: 'no' | 'na' | 'em';
  in: string;
  districts: [string, string];
  localFlavor: string;
}

const RAW_CAPITALS: Omit<CityInfo, 'slug' | 'in'>[] = [
  { label: 'São Paulo', uf: 'SP', stateSlug: 'sao-paulo', preposition: 'em', districts: ['Zona Sul', 'Zona Leste'], localFlavor: 'cada região da cidade funciona quase como um mercado próprio, com concorrência bairro a bairro' },
  { label: 'Rio de Janeiro', uf: 'RJ', stateSlug: 'rio-de-janeiro', preposition: 'no', districts: ['Zona Sul', 'Zona Norte'], localFlavor: 'a distância entre bairros pesa na hora de remarcar consulta, e falha de agenda custa caro' },
  { label: 'Belo Horizonte', uf: 'MG', stateSlug: 'minas-gerais', preposition: 'em', districts: ['Savassi', 'Pampulha'], localFlavor: 'clínicas de bairro competem direto com redes maiores do centro' },
  { label: 'Salvador', uf: 'BA', stateSlug: 'bahia', preposition: 'em', districts: ['Barra', 'Itaigara'], localFlavor: 'a agenda enche e esvazia com o fluxo de turistas do litoral' },
  { label: 'Porto Alegre', uf: 'RS', stateSlug: 'rio-grande-do-sul', preposition: 'em', districts: ['Moinhos de Vento', 'Zona Sul'], localFlavor: 'paciente costuma manter o mesmo médico por anos, então falha de comunicação pesa mais' },
  { label: 'Curitiba', uf: 'PR', stateSlug: 'parana', preposition: 'em', districts: ['Batel', 'Água Verde'], localFlavor: 'clínicas de especialidade cresceram rápido fora do centro histórico' },
  { label: 'Recife', uf: 'PE', stateSlug: 'pernambuco', preposition: 'no', districts: ['Boa Viagem', 'Casa Forte'], localFlavor: 'clínicas recebem paciente de fora da cidade, o que torna o lembrete por WhatsApp ainda mais crítico' },
  { label: 'Fortaleza', uf: 'CE', stateSlug: 'ceara', preposition: 'em', districts: ['Aldeota', 'Meireles'], localFlavor: 'expansão de clínicas particulares aumentou a disputa por horário de recepção' },
  { label: 'Belém', uf: 'PA', stateSlug: 'para', preposition: 'em', districts: ['Nazaré', 'Umarizal'], localFlavor: 'calor e trânsito fazem o paciente atrasar ou faltar sem avisar' },
  { label: 'Florianópolis', uf: 'SC', stateSlug: 'santa-catarina', preposition: 'em', districts: ['Centro', 'Norte da Ilha'], localFlavor: 'demanda varia bastante entre alta e baixa temporada' },
  { label: 'São Luís', uf: 'MA', stateSlug: 'maranhao', preposition: 'em', districts: ['Renascença', 'Cohama'], localFlavor: 'clínicas particulares ainda concorrem em boa parte com atendimento por telefone' },
  { label: 'Goiânia', uf: 'GO', stateSlug: 'goias', preposition: 'em', districts: ['Setor Bueno', 'Setor Marista'], localFlavor: 'crescimento rápido de clínicas particulares nos setores mais centrais' },
  { label: 'Manaus', uf: 'AM', stateSlug: 'amazonas', preposition: 'em', districts: ['Adrianópolis', 'Ponta Negra'], localFlavor: 'confirmar consulta por telefone é lento, e o WhatsApp já é o canal que o paciente prefere' },
  { label: 'Vitória', uf: 'ES', stateSlug: 'espirito-santo', preposition: 'em', districts: ['Praia do Canto', 'Jardim Camburi'], localFlavor: 'ilha pequena, então cada clínica sente rápido quando a agenda desorganiza' },
  { label: 'João Pessoa', uf: 'PB', stateSlug: 'paraiba', preposition: 'em', districts: ['Manaíra', 'Tambaú'], localFlavor: 'clínicas de porte médio competem por reputação no boca a boca do bairro' },
  { label: 'Natal', uf: 'RN', stateSlug: 'rio-grande-do-norte', preposition: 'em', districts: ['Ponta Negra', 'Petrópolis'], localFlavor: 'fluxo de turistas na cidade também aparece na agenda das clínicas' },
  { label: 'Cuiabá', uf: 'MT', stateSlug: 'mato-grosso', preposition: 'em', districts: ['Jardim Aclimação', 'Centro Político Administrativo'], localFlavor: 'calor extremo na cidade faz falta na consulta ser ainda mais comum' },
  { label: 'Maceió', uf: 'AL', stateSlug: 'alagoas', preposition: 'em', districts: ['Ponta Verde', 'Jatiúca'], localFlavor: 'clínicas próximas ao litoral disputam o mesmo público de alta renda' },
  { label: 'Teresina', uf: 'PI', stateSlug: 'piaui', preposition: 'em', districts: ['Jóquei', 'Fátima'], localFlavor: 'boa parte das clínicas particulares ainda não automatizou a confirmação de consulta' },
  { label: 'Brasília', uf: 'DF', stateSlug: 'distrito-federal', preposition: 'em', districts: ['Asa Sul', 'Águas Claras'], localFlavor: 'distância entre regiões administrativas torna reagendamento por telefone mais demorado' },
];

export const CAPITALS: CityInfo[] = RAW_CAPITALS.map((c) => ({
  ...c,
  slug: slugify(c.label),
  in: `${c.preposition} ${c.label}`,
}));

export interface NicheTemplate {
  nicheSlug: string;
  niche: string;
  eyebrow: string;
  heroImageAlt: (locationLabel: string) => string;
  subheadline: string;
  painPoints: FeatureItem[];
  benefits: FeatureItem[];
  faq: FaqItem[];
  partner?: PartnerRecommendation;
  stateHeadline: (state: StateInfo) => string;
  stateIntroParagraph: (state: StateInfo) => string;
  stateWhatsappMessage: (state: StateInfo) => string;
  stateSeoTitle: (state: StateInfo) => string;
  stateSeoDescription: (state: StateInfo) => string;
  cityHeadline: (city: CityInfo) => string;
  cityIntroParagraph: (city: CityInfo) => string;
  cityWhatsappMessage: (city: CityInfo) => string;
  citySeoTitle: (city: CityInfo) => string;
  citySeoDescription: (city: CityInfo) => string;
}

const CLINICAS_MEDICAS: NicheTemplate = {
  nicheSlug: 'clinicas-medicas',
  niche: 'Clínicas Médicas',
  eyebrow: 'Automação de Agenda para Clínicas',
  heroImageAlt: (locationLabel) => `Recepção de clínica médica moderna em ${locationLabel} — DoctorChatBot`,
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

  // ---- estado ----
  stateHeadline: (state) => `Chatbot para Clínicas Médicas ${state.in}`,
  stateIntroParagraph: (state) =>
    `${state.label} é ${state.regionalNote}. Em ${state.cities[0]} e ${state.cities[1]}, clínicas médicas que ainda confirmam consulta por telefone perdem tempo de recepção e deixam horário vago quando o paciente esquece. O DoctorChatBot automatiza confirmação, lembrete e reagendamento direto no WhatsApp, adaptado à rotina de clínicas ${state.in}.`,
  stateWhatsappMessage: (state) =>
    `Olá! Tenho uma clínica médica ${state.in} e quero saber mais sobre o DoctorChatBot.\n\n— origem: informacoes_${state.slug}`,
  stateSeoTitle: (state) => `Chatbot para Clínicas Médicas ${state.in} | DoctorChatBot`,
  stateSeoDescription: (state) =>
    `Automatize agendamento, confirmação e lembrete de consulta no WhatsApp para clínicas médicas ${state.in}. Reduza no-show e libere sua recepção.`,

  // ---- capital (ângulo hiperlocal, por bairro — não repete o texto do estado) ----
  cityHeadline: (city) => `Chatbot para Clínicas Médicas ${city.in}`,
  cityIntroParagraph: (city) =>
    `${city.in.charAt(0).toUpperCase() + city.in.slice(1)}, ${city.localFlavor}. De ${city.districts[0]} a ${city.districts[1]}, clínicas médicas perdem horário de agenda todos os dias por falta de confirmação automática. O DoctorChatBot cuida da confirmação, do lembrete e do reagendamento direto no WhatsApp, sem depender da recepção correr atrás de cada paciente.`,
  cityWhatsappMessage: (city) =>
    `Olá! Tenho uma clínica médica ${city.in} e quero saber mais sobre o DoctorChatBot.\n\n— origem: informacoes_cidade_${city.slug}`,
  citySeoTitle: (city) => `Chatbot para Clínicas Médicas ${city.in} | DoctorChatBot`,
  citySeoDescription: (city) =>
    `Reduza faltas e automatize agendamento no WhatsApp para clínicas médicas ${city.in}. Confirmação e lembrete automáticos, sem sobrecarregar a recepção.`,
};

export const NICHE_TEMPLATES: NicheTemplate[] = [CLINICAS_MEDICAS];

export interface LandingPageData {
  slug: string;
  nicheSlug: string;
  niche: string;
  eyebrow: string;
  locationType: 'estado' | 'cidade';
  locationLabel: string;
  locationUf: string;
  locationIn: string;
  badge: string;
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

function buildStatePage(template: NicheTemplate, state: StateInfo): LandingPageData {
  return {
    slug: `chatbot-para-${template.nicheSlug}-${state.slug}`,
    nicheSlug: template.nicheSlug,
    niche: template.niche,
    eyebrow: template.eyebrow,
    locationType: 'estado',
    locationLabel: state.label,
    locationUf: state.uf,
    locationIn: state.in,
    badge: state.uf,
    headline: template.stateHeadline(state),
    introParagraph: template.stateIntroParagraph(state),
    subheadline: template.subheadline,
    heroImage: STATES_WITH_IMAGE.has(state.slug) ? `/images/${template.nicheSlug}/${state.slug}.webp` : null,
    heroImageAlt: template.heroImageAlt(state.label),
    painPoints: template.painPoints,
    benefits: template.benefits,
    faq: template.faq,
    partner: PARTNER_PILOT_STATES.has(state.slug) ? template.partner : undefined,
    whatsappMessage: template.stateWhatsappMessage(state),
    seo: { title: template.stateSeoTitle(state), description: template.stateSeoDescription(state) },
  };
}

function buildCityPage(template: NicheTemplate, city: CityInfo): LandingPageData {
  return {
    slug: `chatbot-para-${template.nicheSlug}-cidade-${city.slug}`,
    nicheSlug: template.nicheSlug,
    niche: template.niche,
    eyebrow: template.eyebrow,
    locationType: 'cidade',
    locationLabel: city.label,
    locationUf: city.uf,
    locationIn: city.in,
    badge: `${city.label}, ${city.uf}`,
    headline: template.cityHeadline(city),
    introParagraph: template.cityIntroParagraph(city),
    subheadline: template.subheadline,
    heroImage: null, // nenhuma capital tem hero image própria ainda — ver docs/image-generation-brief.md
    heroImageAlt: template.heroImageAlt(city.label),
    painPoints: template.painPoints,
    benefits: template.benefits,
    faq: template.faq,
    partner: undefined, // fase 2 (capitais): bloco parceiro não escalado ainda, ver CLAUDE.md
    whatsappMessage: template.cityWhatsappMessage(city),
    seo: { title: template.citySeoTitle(city), description: template.citySeoDescription(city) },
  };
}

export const landingPages: LandingPageData[] = NICHE_TEMPLATES.flatMap((template) => [
  ...BRAZILIAN_STATES.map((state) => buildStatePage(template, state)),
  ...CAPITALS.map((city) => buildCityPage(template, city)),
]);

export function getLandingPageBySlug(slug?: string): LandingPageData | undefined {
  if (!slug) return undefined;
  return landingPages.find((p) => p.slug === slug);
}
