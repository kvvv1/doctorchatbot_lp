import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span className="text-xl font-bold">
                Doctor<span className="text-sky-400">ChatBot</span>
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed max-w-md">
              Agenda inteligente que trabalha por você. Automatize agendamentos, 
              reduza no-show e foque no que realmente importa: cuidar dos seus pacientes.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-300 hover:text-sky-400 transition-colors text-left"
                >
                  Demonstração
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-300 hover:text-sky-400 transition-colors text-left"
                >
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('integracoes')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-300 hover:text-sky-400 transition-colors text-left"
                >
                  Integrações
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-300 hover:text-sky-400 transition-colors text-left"
                >
                  Planos
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-300 hover:text-sky-400 transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/5531995531183?text=Olá! Preciso de ajuda técnica com o DoctorChatBot.%0A%0A— origem: footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-sky-400 transition-colors"
                >
                  Suporte Técnico
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-300 hover:text-sky-400 transition-colors">
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm mb-4 md:mb-0">
            © {currentYear} DoctorChatBot. Todos os direitos reservados.
          </div>
          
          <div className="text-slate-400 text-sm">
            <span>Feito com ❤️ para transformar clínicas</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;