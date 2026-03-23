import React from 'react';
import { MessageSquare, Clock, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Converse pelo WhatsApp',
      description: 'O bot guia o paciente através de um fluxo intuitivo para coletar todas as informações necessárias para o agendamento.',
      color: 'from-sky-400 to-sky-600'
    },
    {
      icon: Clock,
      title: 'Consulta confirmada',
      description: 'O bot confirma na hora com base na disponibilidade da agenda. O paciente recebe a confirmação direto no WhatsApp, sem esperar.',
      color: 'from-sky-400 to-sky-600'
    },
    {
      icon: CheckCircle,
      title: 'Aprovação e lembretes',
      description: 'Confirmação em 1 clique e lembrete automático para reduzir no-show. O paciente recebe tudo no WhatsApp.',
      color: 'from-green-400 to-green-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Como funciona
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Três etapas simples que transformam a experiência de agendamento
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 -translate-y-1/2 z-0">
                    <div className="absolute right-0 top-1/2 w-2 h-2 bg-gray-300 rounded-full -translate-y-1/2"></div>
                  </div>
                )}

                <div className="relative z-10 text-center">
                  {/* Icon */}
                  <div className={`w-32 h-32 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl`}>
                    <IconComponent size={48} className="text-white" />
                  </div>

                  {/* Step number */}
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center font-bold text-slate-700 shadow-sm">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Resultado: Mais agendamentos, menos trabalho manual
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-bold text-green-600 mb-2">78%</div>
                <div className="text-sm text-slate-600">Redução no no-show</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-sky-600 mb-2">5min</div>
                <div className="text-sm text-slate-600">Economia por agendamento</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-sm text-slate-600">Disponibilidade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;