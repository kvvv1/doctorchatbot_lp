import React from 'react';
import { Check, Star } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

const Plans = () => {
  const plans = [
    {
      name: 'Start',
      price: 149,
      description: 'Ideal para clínicas pequenas',
      popular: false,
      features: [
        'Até 500 conversas/mês',
        'Painel básico de pendentes',
        'Lembretes automáticos',
        'Suporte por email',
        '1 usuário',
        'Relatórios básicos'
      ],
      ctaText: 'Começar',
      ctaLink: waLink('plan_start')
    },
    {
      name: 'Pro',
      price: 299,
      description: 'Para clínicas em crescimento',
      popular: true,
      features: [
        'Até 2.000 conversas/mês',
        'Painel completo com filtros',
        'Lembretes inteligentes',
        'Suporte prioritário',
        'Até 5 usuários',
        'Relatórios avançados',
        'Integrações básicas',
        'Personalização de fluxos'
      ],
      ctaText: 'Assinar Pro',
      ctaLink: waLink('plan_pro')
    },
    {
      name: 'Premium',
      price: 599,
      description: 'Para operações grandes',
      popular: false,
      features: [
        'Conversas ilimitadas',
        'Dashboard white-label',
        'IA personalizada',
        'Suporte dedicado',
        'Usuários ilimitados',
        'Relatórios personalizados',
        'Todas as integrações',
        'Multi-clínicas',
        'API própria'
      ],
      ctaText: 'Falar com vendas',
      ctaLink: waLink('plan_premium')
    }
  ];

  return (
    <section id="plans" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Planos que crescem com você
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Escolha o plano ideal para sua clínica. Todos incluem suporte completo e atualizações gratuitas.
          </p>
          
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
            <span>💡</span>
            Setup R$ 299–799. Excedente R$ 0,05–0,10/un.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-sky-500 shadow-sky-500/10' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} />
                    Mais popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-4xl font-bold text-slate-900">
                      R$ {plan.price}
                    </span>
                    <span className="text-slate-600">/mês</span>
                  </div>
                  <div className="text-sm text-slate-500">
                    Cobrança mensal
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <Check size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={plan.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-center transition-colors block ${
                    plan.popular
                      ? 'bg-sky-500 hover:bg-sky-600 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-slate-900'
                  }`}
                >
                  {plan.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-900 mb-4">
              ✅ O que está incluído em todos os planos:
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• Chatbot inteligente no WhatsApp</li>
              <li>• Painel de aprovação de agendamentos</li>
              <li>• Sistema de lembretes automáticos</li>
              <li>• Relatórios de performance</li>
              <li>• Atualizações e melhorias gratuitas</li>
              <li>• Treinamento da equipe incluído</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h3 className="font-semibold text-slate-900 mb-4">
              🚀 Implementação rápida:
            </h3>
            <ul className="space-y-2 text-slate-600 text-sm">
              <li>• Setup completo em até 5 dias úteis</li>
              <li>• Treinamento da equipe incluído</li>
              <li>• Migração de dados existentes</li>
              <li>• Teste gratuito por 7 dias</li>
              <li>• Suporte técnico especializado</li>
              <li>• Garantia de satisfação</li>
            </ul>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Ainda tem dúvidas sobre qual plano escolher?
          </p>
          <a
            href={waLink('plans_doubt')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-500 hover:text-sky-600 font-medium underline"
          >
            Fale conosco e receba uma recomendação personalizada
          </a>
        </div>
      </div>
    </section>
  );
};

export default Plans;