import React from 'react';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-sky-700 to-sky-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/20">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Pronto para ver na prática?
          </h2>
          
          <p className="text-xl text-sky-100 mb-8 leading-relaxed max-w-2xl mx-auto">
            Transforme seus agendamentos em uma máquina de conversão. 
            Reduza no-show, economize tempo e foque no que realmente importa: 
            cuidar dos seus pacientes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2 text-sky-100">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Setup em 5 dias</span>
            </div>
            <div className="flex items-center gap-2 text-sky-100">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>7 dias de teste grátis</span>
            </div>
            <div className="flex items-center gap-2 text-sky-100">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Suporte completo</span>
            </div>
          </div>

          <a
            href={waLink('cta_final')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white hover:bg-gray-50 text-sky-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <MessageCircle size={24} />
            Quero ver na prática
            <ArrowRight size={20} />
          </a>

          <div className="mt-8 text-sky-100 text-sm">
            <p>💬 Resposta em até 5 minutos • 🚀 Implementação garantida</p>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;