import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

interface Tab {
  id: string;
  name: string;
  image: string;
  description: string;
}

const tabs: Tab[] = [
  {
    id: 'pendentes',
    name: 'Pendentes',
    image: '/assets/dashboard_pendentes.png',
    description: 'Pedidos aguardando ação, com busca e filtro por data/serviço.'
  },
  {
    id: 'aprovar',
    name: 'Aprovar 1-clique',
    image: '/assets/dashboard_aprovar.png',
    description: 'Selecione e aprove. O paciente recebe confirmação automaticamente.'
  },
  {
    id: 'lembretes',
    name: 'Lembretes',
    image: '/assets/dashboard_lembretes.png',
    description: 'T-24h/T-2h e reenvio se não lido.'
  },
  {
    id: 'relatorios',
    name: 'Relatórios',
    image: '/assets/dashboard_relatorios.png',
    description: 'Funil conversa→pendente→aprovado e horários de pico.'
  }
];

const DashboardShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveTab(index);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setActiveTab((prev) => (prev + 1) % tabs.length);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
    }
  };

  const openLightbox = () => {
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleLightboxKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  };

  // Focus trap for lightbox
  React.useEffect(() => {
    if (lightboxOpen) {
      const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const modal = document.querySelector('[role="dialog"]');
      if (modal) {
        const firstFocusableElement = modal.querySelector(focusableElements) as HTMLElement;
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement;

        const trapFocus = (e: KeyboardEvent) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
              }
            }
          }
        };

        document.addEventListener('keydown', trapFocus);
        firstFocusableElement?.focus();

        return () => {
          document.removeEventListener('keydown', trapFocus);
        };
      }
    }
  }, [lightboxOpen]);

  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Painel simples para aprovar em 1 clique
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Visualize todos os pedidos de agendamento, aprove com um clique e automatize lembretes.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto" role="tablist">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === index
                      ? 'border-sky-500 text-sky-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  role="tab"
                  aria-selected={activeTab === index}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            {tabs.map((tab, index) => (
              <div
                key={tab.id}
                role="tabpanel"
                id={`panel-${tab.id}`}
                aria-labelledby={`tab-${tab.id}`}
                className={`${activeTab === index ? 'block' : 'hidden'}`}
              >
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{tab.name}</h3>
                <p className="text-lg text-slate-600 mb-6">{tab.description}</p>
                
                <div className="space-y-4">
                  {index === 0 && (
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                        Visualização clara de todos os pedidos pendentes
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                        Filtros por data, serviço e status
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                        Busca rápida por nome do paciente
                      </li>
                    </ul>
                  )}
                  
                  {index === 1 && (
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Aprovação em massa com um clique
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Confirmação automática via WhatsApp
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Histórico completo de ações
                      </li>
                    </ul>
                  )}

                  {index === 2 && (
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Lembretes automáticos T-24h e T-2h
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Reenvio inteligente se não lido
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Personalização de mensagens
                      </li>
                    </ul>
                  )}

                  {index === 3 && (
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Funil completo: conversa → pendente → aprovado
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Análise de horários de pico
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Métricas de conversão e no-show
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="lg:order-first">
            <div 
              className="relative group cursor-pointer"
              onClick={openLightbox}
            >
              {/* Placeholder screenshot */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl shadow-xl aspect-video flex items-center justify-center hover:shadow-2xl transition-shadow duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-8 h-8 bg-slate-400 rounded"></div>
                  </div>
                  <p className="text-slate-500 font-medium">Screenshot do {tabs[activeTab].name}</p>
                  <p className="text-sm text-slate-400 mt-1">Clique para ampliar</p>
                </div>
              </div>
              
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-2xl transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white bg-opacity-90 text-slate-700 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Clique para ampliar
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={waLink('dashboard')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
          >
            Falar com especialista
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onKeyDown={handleLightboxKeyDown}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 id="lightbox-title" className="text-lg font-semibold text-slate-900">
                {tabs[activeTab].name} - Dashboard
              </h3>
              <button
                onClick={closeLightbox}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Fechar modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              {/* Larger placeholder */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-slate-300 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <div className="w-12 h-12 bg-slate-400 rounded"></div>
                  </div>
                  <p className="text-slate-500 font-medium text-lg">Screenshot ampliado - {tabs[activeTab].name}</p>
                  <p className="text-slate-400 mt-2">{tabs[activeTab].description}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="p-4 border-t border-gray-200 flex items-center justify-between">
              <button
                onClick={() => setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={activeTab === 0}
              >
                <ChevronLeft size={18} />
                Anterior
              </button>
              
              <span className="text-sm text-gray-500">
                {activeTab + 1} de {tabs.length}
              </span>
              
              <button
                onClick={() => setActiveTab((prev) => (prev + 1) % tabs.length)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                disabled={activeTab === tabs.length - 1}
              >
                Próximo
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DashboardShowcase;