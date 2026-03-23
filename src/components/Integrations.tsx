import React from 'react';
import { CheckCircle, Webhook } from 'lucide-react';

type Integration = {
  logos: string[];
  name: string;
  description: string;
  status: 'available' | 'conditional';
};

const Integrations = () => {
  const integrations: Integration[] = [
    {
      logos: ['/gestao_ds_logo.jfif'],
      name: 'GestãoDS',
      description: 'Integração direta via API/Webhook com sincronização em tempo real',
      status: 'available',
    },
    {
      logos: ['/iclinic.png', '/feegow.png', '/shosp.png'],
      name: 'iClinic, Feegow, Shosp',
      description: 'Integração quando API disponível. Validamos na ativação',
      status: 'conditional',
    },
    {
      logos: ['/ninsaude.jfif', '/zenfisio.png'],
      name: 'Ninsaúde, ZenFisio',
      description: 'Conectores especializados para gestão de fisioterapia e saúde',
      status: 'conditional',
    },
    {
      logos: ['/google-calander.png'],
      name: 'Google Calendar / iCal',
      description: 'Sincronização automática com calendários existentes',
      status: 'available',
    },
    {
      logos: ['/zapier.png'],
      name: 'Zapier',
      description: 'Automações sem código para conectar centenas de ferramentas',
      status: 'available',
    },
    {
      logos: ['/google-sheets.png'],
      name: 'CSV / Planilha',
      description: 'Importação e exportação rápida para backup e relatórios',
      status: 'available',
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
                {/* Logo(s) */}
                <div className="flex items-center gap-2">
                  {integration.logos.map((src, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center overflow-hidden p-1"
                    >
                      <img
                        src={src}
                        alt={integration.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
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
