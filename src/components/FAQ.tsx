import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      question: 'Como o DoctorChatBot reduz o no-show?',
      answer: 'O sistema envia lembretes automáticos T-24h e T-2h com confirmação simples (1 para confirmar, 2 para reagendar). Se o paciente não lê a mensagem, reenviamos automaticamente. Além disso, o fluxo de agendamento já coleta o comprometimento do paciente durante a conversa inicial.'
    },
    {
      question: 'O DoctorChatBot funciona com qualquer tipo de clínica?',
      answer: 'Sim! Atendemos desde clínicas pequenas até grandes centros médicos. O sistema é flexível para dermatologia, odontologia, fisioterapia, psicologia e outras especialidades. Personalizamos os fluxos de conversa conforme sua área médica.'
    },
    {
      question: 'Como funciona a questão da LGPD?',
      answer: 'Somos 100% conformes com a LGPD. Todos os dados são criptografados, temos termo de consentimento automático, direito ao esquecimento implementado e auditoria completa. Você recebe certificação de conformidade e não precisa se preocupar com multas.'
    },
    {
      question: 'Posso testar antes de contratar?',
      answer: 'Claro! Oferecemos 7 dias de teste gratuito com implementação completa. Você pode testar todos os recursos com seus próprios pacientes. Nossa equipe faz toda a configuração e treinamento durante o período de teste.'
    },
    {
      question: 'Quanto tempo leva para implementar?',
      answer: 'A implementação completa leva de 3 a 5 dias úteis, incluindo configuração dos fluxos, treinamento da equipe e integração com seu sistema (se aplicável). Começamos com um piloto pequeno e expandimos gradualmente.'
    },
    {
      question: 'E se meu sistema não tiver integração disponível?',
      answer: 'Sem problema! Nosso dashboard funciona de forma independente e você pode exportar/importar dados via CSV. Também podemos desenvolver integrações customizadas para sistemas específicos (consulte condições no plano Premium).'
    },
    {
      question: 'O bot substitui o atendimento humano?',
      answer: 'Não, ele complementa! O bot cuida da parte repetitiva (agendamentos, lembretes, confirmações) para que sua equipe foque no atendimento clínico. A qualquer momento, o paciente pode pedir para falar com um atendente.'
    },
    {
      question: 'Quais são os custos extras além da mensalidade?',
      answer: 'Setup inicial de R$ 299-799 (uma vez) e excedente de R$ 0,05-0,10 por conversa além do limite do plano. Não há custos de treinamento, atualizações ou suporte técnico - tudo incluído na mensalidade.'
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-slate-600">
            Tire suas dúvidas sobre o DoctorChatBot
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <button
                onClick={() => toggleItem(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-inset rounded-xl"
                aria-expanded={openItems.includes(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-semibold text-slate-900 pr-8">
                  {item.question}
                </span>
                {openItems.includes(index) ? (
                  <ChevronUp size={20} className="text-sky-500 flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-slate-400 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div 
                  id={`faq-answer-${index}`}
                  className="px-6 pb-5"
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                >
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional help */}
        <div className="mt-12 text-center">
          <div className="bg-sky-50 border border-sky-100 rounded-2xl p-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Não encontrou a resposta que procurava?
            </h3>
            <p className="text-slate-600 mb-6">
              Nossa equipe está pronta para esclarecer qualquer dúvida sobre implementação, 
              funcionalidades ou integrações específicas.
            </p>
            <a
              href="https://wa.me/5531995531183?text=Olá! Tenho algumas dúvidas sobre o DoctorChatBot que não estão no FAQ. Podem me ajudar?%0A%0A— origem: faq"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Falar com especialista
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;