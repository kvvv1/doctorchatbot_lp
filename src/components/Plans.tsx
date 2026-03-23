import React from 'react';
import { Check, Star } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

const Plans = () => {
  const mainPlans = [
    {
      name: 'Essencial',
      price: 397,
      description: 'Para clínicas que querem começar com automação',
      popular: false,
      color: 'blue',
      features: [
        'Chatbot interativo no WhatsApp (menus + botões)',
        'Agendamento automatizado 24h',
        'Respostas rápidas personalizadas',
        'Dashboard de conversas',
        'Histórico completo de mensagens',
        'Lembretes automáticos',
        '1 atendente simultâneo',
      ],
      ctaText: 'Começar agora',
      ctaLink: waLink('plan_essencial'),
    },
    {
      name: 'Profissional',
      price: 597,
      description: 'Para clínicas que desejam escalar o atendimento',
      popular: true,
      color: 'purple',
      features: [
        'Tudo do Essencial',
        'Integração Google Calendar',
        'Fluxos personalizados avançados',
        'Relatórios e métricas detalhadas',
        'Múltiplos atendentes simultâneos',
        'Notificações automáticas de confirmação',
        'Suporte prioritário',
      ],
      ctaText: 'Assinar Profissional',
      ctaLink: waLink('plan_profissional'),
    },
    {
      name: 'Clinic Pro',
      price: 997,
      description: 'Para clínicas de alto volume e multi-especialidades',
      popular: false,
      color: 'amber',
      features: [
        'Tudo do Profissional',
        'Gestão de múltiplas especialidades',
        'Automação completa de no-show',
        'Relatórios avançados e analytics',
        'API própria para integrações',
        'Atendentes ilimitados',
        'Suporte dedicado e onboarding',
        'Whitelabel (sem marca DoctorChatBot)',
      ],
      ctaText: 'Falar com vendas',
      ctaLink: waLink('plan_clinic_pro'),
    },
  ];

  const colorMap: Record<string, { border: string; badge: string; btn: string }> = {
    blue: {
      border: 'border-blue-200 hover:border-blue-400',
      badge: 'bg-blue-500 text-white',
      btn: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    purple: {
      border: 'border-purple-500 ring-2 ring-purple-100',
      badge: 'bg-purple-500 text-white',
      btn: 'bg-purple-600 hover:bg-purple-700 text-white',
    },
    amber: {
      border: 'border-amber-200 hover:border-amber-400',
      badge: 'bg-amber-500 text-white',
      btn: 'bg-amber-600 hover:bg-amber-700 text-white',
    },
  };

  return (
    <section id="plans" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Planos que crescem com você
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Escolha o plano ideal para sua clínica. Todos incluem suporte completo e atualizações gratuitas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {mainPlans.map((plan, index) => {
            const colors = colorMap[plan.color];
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-xl ${colors.border}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className={`${colors.badge} px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1`}>
                      <Star size={14} />
                      Mais escolhido
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                    <p className="text-slate-500 text-sm">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-slate-900">R$ {plan.price}</span>
                      <span className="text-slate-500">/mês</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Cobrança mensal · Cancele quando quiser</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, fi) => (
                      <div key={fi} className="flex items-start gap-3">
                        <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={plan.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-colors block ${colors.btn}`}
                  >
                    {plan.ctaText}
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-900 mb-4">
              ✅ Incluído em todos os planos:
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• Chatbot WhatsApp com menus e botões interativos</li>
              <li>• Painel de aprovação de agendamentos</li>
              <li>• Sistema de lembretes automáticos</li>
              <li>• Relatórios de performance mensais</li>
              <li>• Atualizações gratuitas sempre</li>
              <li>• Treinamento da equipe incluído</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-900 mb-4">
              🚀 Implementação rápida:
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• Setup completo em até 5 dias úteis</li>
              <li>• Treinamento da equipe incluso</li>
              <li>• Migração de dados existentes</li>
              <li>• Teste gratuito por 7 dias</li>
              <li>• Suporte técnico especializado</li>
              <li>• Pagamento seguro via Mercado Pago</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-slate-600 mb-3">Não sabe qual plano escolher?</p>
          <a
            href={waLink('plans_doubt')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 hover:text-sky-700 font-medium underline"
          >
            Fale conosco e receba uma recomendação personalizada →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Plans;
