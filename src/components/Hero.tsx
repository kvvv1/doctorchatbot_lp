import React from 'react';
import { Check, MessageCircle, Clock } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-sky-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Agenda inteligente que{' '}
              <span className="text-sky-500">trabalha por você</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              O bot confirma e lembra. Sua equipe foca no paciente. Fluxos de conversa 
              que convertem e escalam sua operação no WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a
                href={waLink('hero')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Quero ver na prática
              </a>
              <button
                onClick={() => scrollToSection('dashboard')}
                className="border-2 border-sky-500 text-sky-500 hover:bg-sky-50 px-8 py-3 rounded-xl font-semibold text-lg transition-colors"
              >
                Explorar o painel
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex items-center gap-2">
                <Check size={20} className="text-green-500" />
                <span className="text-slate-600">Aprovação em 10 segundos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={20} className="text-green-500" />
                <span className="text-slate-600">Fluxos que convertem</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-96 bg-gradient-to-br from-sky-400 to-sky-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-white text-center">
                  <MessageCircle size={80} className="mx-auto mb-4" />
                  <p className="text-xl font-semibold mb-2">WhatsApp Integration</p>
                  <p className="text-sky-100">Conversas inteligentes</p>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-green-500" />
                  <span className="text-sm font-medium text-slate-700">24/7 Ativo</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white rounded-xl p-3 shadow-lg">
                <span className="text-sm font-semibold">98% Aprovação</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;