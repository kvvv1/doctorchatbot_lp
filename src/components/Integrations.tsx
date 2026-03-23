import React from 'react';
import { CheckCircle, Webhook, MessageCircle, ArrowRight } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

type Integration = {
  logo: string;
  name: string;
  description: string;
  status: 'available' | 'conditional';
};

const Integrations = () => {
  const integrations: Integration[] = [
    {
      logo: '/gestao_ds_logo.jfif',
      name: 'GestãoDS',
      description: 'Sincronização direta via API/Webhook em tempo real',
      status: 'available',
    },
    {
      logo: '/google-calander.png',
      name: 'Google Calendar',
      description: 'Sincronização automática com calendários existentes',
      status: 'available',
    },
    {
      logo: '/iclinic.png',
      name: 'iClinic',
      description: 'Integração via API quando disponível',
      status: 'conditional',
    },
    {
      logo: '/feegow.png',
      name: 'Feegow',
      description: 'Integração via API quando disponível',
      status: 'conditional',
    },
    {
      logo: '/ninsaude.jfif',
      name: 'Ninsaúde',
      description: 'Conector especializado para clínicas e saúde',
      status: 'conditional',
    },
    {
      logo: '/zenfisio.png',
      name: 'ZenFisio',
      description: 'Conector especializado para fisioterapia',
      status: 'conditional',
    },
    {
      logo: '/shosp.png',
      name: 'Shosp',
      description: 'Integração para gestão hospitalar',
      status: 'conditional',
    },
    {
      logo: '/zapier.png',
      name: 'Zapier',
      description: 'Automações sem código para centenas de ferramentas',
      status: 'conditional',
    },
    {
      logo: '/google-sheets.png',
      name: 'CSV / Planilha',
      description: 'Importação e exportação para backup e relatórios',
      status: 'available',
    },
  ];

  const getStatusBadge = (status: string) => {
    if (status === 'available') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
          <CheckCircle size={11} />
          Disponível
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
        <Webhook size={11} />
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
            <CheckCircle size={15} />
            Integrações "sob consulta" são desenvolvidas sob demanda. Fale com a gente.
          </div>
        </div>

        {/* Grid 3x3 */}
        <div className="grid md:grid-cols-3 gap-5 mb-5">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden p-1.5">
                  <img
                    src={integration.logo}
                    alt={integration.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                {getStatusBadge(integration.status)}
              </div>
              <h3 className="text-base font-semibold text-slate-900 mb-1">
                {integration.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {integration.description}
              </p>
            </div>
          ))}
        </div>

        {/* Card especial — largura total */}
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 rounded-2xl p-7 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-md">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              Usa outro sistema? A gente integra.
            </h3>
            <p className="text-sky-100 text-sm">
              Não encontrou seu sistema aqui? Desenvolvemos a integração assim que você fechar. Sem custo adicional nos planos Profissional e Clinic Pro.
            </p>
          </div>
          <a
            href={waLink('integracao_custom')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-white text-sky-700 px-5 py-3 rounded-xl font-semibold text-sm hover:bg-sky-50 transition-colors shadow"
          >
            <MessageCircle size={17} />
            Falar com a equipe
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Integrations;
