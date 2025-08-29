import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-slate-900">
              Doctor<span className="text-sky-500">ChatBot</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('how-it-works')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              Como funciona
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              Recursos
            </button>
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => scrollToSection('integracoes')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              Integrações
            </button>
            <button 
              onClick={() => scrollToSection('plans')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              Planos
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-slate-600 hover:text-sky-500 transition-colors"
            >
              FAQ
            </button>
            <a
              href={waLink('header')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Quero ver na prática
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('how-it-works')}
                className="text-slate-600 hover:text-sky-500 text-left"
              >
                Como funciona
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="text-slate-600 hover:text-sky-500 text-left"
              >
                Recursos
              </button>
              <button 
                onClick={() => scrollToSection('dashboard')}
                className="text-slate-600 hover:text-sky-500 text-left"
              >
                Dashboard
              </button>
              <button 
                onClick={() => scrollToSection('integracoes')}
                className="text-slate-600 hover:text-sky-500 text-left"
              >
                Integrações
              </button>
              <button 
                onClick={() => scrollToSection('plans')}
                className="text-slate-600 hover:text-sky-500 text-left"
              >
                Planos
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-slate-600 hover:text-sky-500 text-left"
              >
                FAQ
              </button>
              <a
                href={waLink('header-mobile')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
              >
                Quero ver na prática
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;