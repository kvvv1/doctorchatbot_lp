import React from 'react';
import { CheckCircle, Webhook } from 'lucide-react';

// ── SVG Logos ──────────────────────────────────────────────────────────────

const GestaoDS = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="10" fill="#1346A8"/>
    <text x="20" y="16" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial, sans-serif" letterSpacing="0.3">GESTÃO</text>
    <text x="20" y="29" textAnchor="middle" fill="#7EB3FF" fontSize="11" fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="1">DS</text>
  </svg>
);

const IClinicGroup = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* iClinic — teal */}
    <rect x="1" y="1" width="17" height="17" rx="5" fill="#0EA5E9"/>
    <text x="9.5" y="14" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial">iC</text>
    {/* Feegow — blue */}
    <rect x="22" y="1" width="17" height="17" rx="5" fill="#2563EB"/>
    <text x="30.5" y="14" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial">Fg</text>
    {/* Shosp — indigo */}
    <rect x="11" y="22" width="18" height="17" rx="5" fill="#6366F1"/>
    <text x="20" y="35" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Arial">Sh</text>
  </svg>
);

const NinsaudeGroup = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Ninsaúde — teal */}
    <rect x="1" y="11" width="18" height="18" rx="5" fill="#0D9488"/>
    <text x="10" y="24" textAnchor="middle" fill="white" fontSize="11" fontWeight="900" fontFamily="Arial">Ni</text>
    {/* ZenFisio — purple */}
    <rect x="21" y="11" width="18" height="18" rx="5" fill="#7C3AED"/>
    <text x="30" y="24" textAnchor="middle" fill="white" fontSize="10" fontWeight="900" fontFamily="Arial">ZF</text>
  </svg>
);

const GoogleCalendar = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Body */}
    <rect x="3" y="7" width="34" height="30" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
    {/* Blue header */}
    <path d="M3 11C3 8.79 4.79 7 7 7H33C35.21 7 37 8.79 37 11V17H3V11Z" fill="#1A73E8"/>
    {/* Date number */}
    <text x="20" y="31" textAnchor="middle" fill="#1A73E8" fontSize="12" fontWeight="700" fontFamily="Arial">31</text>
    {/* Hook circles */}
    <rect x="12" y="4" width="3" height="6" rx="1.5" fill="#5F6368"/>
    <rect x="25" y="4" width="3" height="6" rx="1.5" fill="#5F6368"/>
    {/* Google colors stripe */}
    <rect x="3" y="14" width="9" height="3" fill="#EA4335"/>
    <rect x="12" y="14" width="8" height="3" fill="#FBBC04"/>
    <rect x="20" y="14" width="8" height="3" fill="#34A853"/>
    <rect x="28" y="14" width="9" height="3" fill="#4285F4"/>
  </svg>
);

const ZapierLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="10" fill="#FF4A00"/>
    {/* Z arrow */}
    <path d="M10 12H30L10 20H30" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 20L30 28H10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);


const SpreadsheetLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="10" fill="#16A34A"/>
    {/* Doc shape */}
    <rect x="8" y="6" width="19" height="24" rx="2" fill="white" opacity="0.2"/>
    <rect x="8" y="6" width="19" height="24" rx="2" stroke="white" strokeWidth="1.5" opacity="0.6"/>
    {/* Fold corner */}
    <path d="M22 6L27 6V11L22 6Z" fill="white" opacity="0.6"/>
    <line x1="8" y1="14" x2="27" y2="14" stroke="white" strokeWidth="1.2" opacity="0.7"/>
    <line x1="8" y1="19" x2="27" y2="19" stroke="white" strokeWidth="1.2" opacity="0.7"/>
    <line x1="8" y1="24" x2="27" y2="24" stroke="white" strokeWidth="1.2" opacity="0.7"/>
    <line x1="16" y1="6" x2="16" y2="30" stroke="white" strokeWidth="1.2" opacity="0.7"/>
    {/* CSV text */}
    <text x="31" y="33" textAnchor="middle" fill="white" fontSize="7" fontWeight="800" fontFamily="Arial">CSV</text>
  </svg>
);

// ── Component ───────────────────────────────────────────────────────────────

type Integration = {
  logo: React.ReactNode;
  name: string;
  description: string;
  status: 'available' | 'conditional';
  bg: string;
};

const Integrations = () => {
  const integrations: Integration[] = [
    {
      logo: <GestaoDS />,
      name: 'GestãoDS',
      description: 'Integração direta via API/Webhook com sincronização em tempo real',
      status: 'available',
      bg: 'bg-blue-50',
    },
    {
      logo: <IClinicGroup />,
      name: 'iClinic, Feegow, Shosp',
      description: 'Integração quando API disponível. Validamos na ativação',
      status: 'conditional',
      bg: 'bg-sky-50',
    },
    {
      logo: <NinsaudeGroup />,
      name: 'Ninsaúde, ZenFisio',
      description: 'Conectores especializados para gestão de fisioterapia e saúde',
      status: 'conditional',
      bg: 'bg-teal-50',
    },
    {
      logo: <GoogleCalendar />,
      name: 'Google Calendar / iCal',
      description: 'Sincronização automática com calendários existentes',
      status: 'available',
      bg: 'bg-white',
    },
    {
      logo: <ZapierLogo />,
      name: 'Zapier',
      description: 'Automações sem código para conectar centenas de ferramentas',
      status: 'available',
      bg: 'bg-orange-50',
    },
    {
      logo: <SpreadsheetLogo />,
      name: 'CSV / Planilha',
      description: 'Importação e exportação rápida para backup e relatórios',
      status: 'available',
      bg: 'bg-green-50',
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'available') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          <CheckCircle size={12} />
          Disponível
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
        <Webhook size={12} />
        Sob consulta
      </span>
    );
  };

  return (
    <section id="integracoes" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Integra com seu sistema — ou use nosso painel
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Conecte o DoctorChatBot ao que você já usa ou opere tudo no nosso dashboard.
            Você decide como quer trabalhar.
          </p>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle size={16} />
            A disponibilidade depende do seu sistema e do plano. Validamos a integração na ativação.
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${integration.bg} flex items-center justify-center shadow-sm border border-gray-100 p-1.5`}>
                  {integration.logo}
                </div>
                {getStatusBadge(integration.status)}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-3">
                {integration.name}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {integration.description}
              </p>
            </div>
          ))}
        </div>

        {/* Integration Process */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            Como funciona a integração
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Análise técnica</h4>
              <p className="text-slate-600 text-sm">
                Avaliamos seu sistema atual e identificamos a melhor forma de integração
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Configuração</h4>
              <p className="text-slate-600 text-sm">
                Nossa equipe configura e testa a integração antes do go-live
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">Suporte contínuo</h4>
              <p className="text-slate-600 text-sm">
                Monitoramento e ajustes conforme sua operação evolui
              </p>
            </div>
          </div>
        </div>

        {/* Alternative option */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Não tem sistema próprio? Sem problema!
            </h3>
            <p className="text-slate-600 mb-6">
              Use nosso dashboard completo para gerenciar agendamentos, pacientes e relatórios.
              É uma solução completa que funciona de forma independente.
            </p>
            <button
              onClick={() => {
                document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Ver o dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
