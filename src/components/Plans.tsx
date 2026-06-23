import React, { useState } from 'react';
import { Check, Star, CheckCircle2, Zap } from 'lucide-react';
import { waLink } from '../utils/whatsapp';
import { trackClick } from '../utils/track';

type Billing = 'monthly' | 'semiannual';

const mpCheckoutUrl = (planId: string) =>
  `https://www.mercadopago.com.br/subscriptions/checkout?preapproval_plan_id=${planId}`;

/** Rota /consulta envia pro WhatsApp; demais rotas abrem o checkout do cartão. */
const isWhatsappRoute = () => {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.replace(/^\/+/, '').split('/')[0].toLowerCase() === 'consulta';
};

const Plans = () => {
  const [billing, setBilling] = useState<Billing>('monthly');
  const isSemi = billing === 'semiannual';
  const whatsappRoute = isWhatsappRoute();

  const mainPlans = [
    {
      name: 'Essencial',
      price: 397,
      priceSemiannual: 2144 as number | null,
      mpPlanId: '5390bcd7d7a64fa799542b16d7c8c9e1',
      mpPlanIdSemi: '8705b302648b410c80cdba5e6c46bff3' as string | null,

      description: 'Para médico solo ou consultório com 1 profissional',
      popular: false,
      color: 'blue',
      features: [
        'Chatbot WhatsApp com menus e botões',
        'Agendamento automatizado 24h',
        'Paciente agenda sem falar com recepcionista',
        'Lembretes automáticos de consulta',
        'Painel de aprovação de agendamentos',
        'Histórico completo de conversas',
        'Respostas rápidas personalizadas',
        'Gestão de fila de espera',
        'Reagendamento automático de no-show',
        '1 médico · 1 agenda',
      ],
      ctaText: 'Teste grátis de 7 dias',
      ctaLink: waLink('plan_essencial'),
    },
    {
      name: 'Profissional',
      price: 597,
      priceSemiannual: 3224 as number | null,
      mpPlanId: '5d5bd8ab00bf4684a3120ed8fb95ed69',
      mpPlanIdSemi: '0b1b2cc5720e442cada42faf9eb4f50e' as string | null,

      description: 'Para quem usa Google Calendar ou sistema de gestão',
      popular: true,
      color: 'purple',
      features: [
        'Tudo do Essencial',
        'Integração Google Calendar',
        'Integração Gestão DS',
        'Integração iFood (sob consulta)',
        'Integração Doctoralia (sob consulta)',
        'Cancelamentos atualizam o calendário automaticamente',
        'Gestão de fila de espera',
        'Reagendamento automático de no-show',
        'Múltiplos atendentes no painel',
        'Notificações de confirmação por WhatsApp',
        'Relatórios mensais de atendimento',
        'Suporte prioritário via WhatsApp',
      ],
      ctaText: 'Teste grátis de 7 dias',
      ctaLink: waLink('plan_profissional'),
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

          <div className="inline-flex items-center gap-1 bg-gray-100 p-1 rounded-full">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                !isSemi ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBilling('semiannual')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
                isSemi ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Semestral
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                10% OFF
              </span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-12">
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
                    {isSemi && plan.priceSemiannual ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-slate-900">R$ {plan.priceSemiannual.toLocaleString('pt-BR')}</span>
                          <span className="text-slate-500">/semestre</span>
                        </div>
                        <p className="text-sm text-green-600 font-medium mt-1">
                          Equivale a R$ {Math.round(plan.priceSemiannual / 6)}/mês · economize R$ {(plan.price * 6 - plan.priceSemiannual).toLocaleString('pt-BR')}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">Cobrança a cada 6 meses · Cancele quando quiser</p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-slate-900">R$ {plan.price}</span>
                          <span className="text-slate-500">/mês</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Cobrança mensal · Cancele quando quiser</p>
                      </>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, fi) => (
                      <div key={fi} className="flex items-start gap-3">
                        <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {(() => {
                    const planId = isSemi ? plan.mpPlanIdSemi : plan.mpPlanId;
                    // /consulta -> WhatsApp. Caso contrário, checkout do cartão.
                    // Sem plano (ex: Essencial anual) -> cai no WhatsApp.
                    const href = whatsappRoute || !planId ? plan.ctaLink : mpCheckoutUrl(planId);
                    const dest = whatsappRoute || !planId ? 'whatsapp' : 'checkout';
                    const label = `${plan.name.toLowerCase()}_${isSemi ? 'semestral' : 'mensal'}_${dest}`;
                    return (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackClick(label)}
                        className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-colors block ${colors.btn}`}
                      >
                        {plan.ctaText}
                      </a>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} className="text-green-500" />
              Incluído em todos os planos:
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
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Zap size={18} className="text-sky-500" />
              Implementação rápida:
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
