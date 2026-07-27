import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { waLink } from '../../utils/whatsapp';

const InformacoesNavbar = () => (
  <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
    <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-slate-900">
        Doctor<span className="text-sky-500">ChatBot</span>
      </Link>
      <a
        href={waLink('informacoes_header')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
      >
        <MessageCircle size={16} />
        Falar no WhatsApp
      </a>
    </nav>
  </header>
);

export default InformacoesNavbar;
