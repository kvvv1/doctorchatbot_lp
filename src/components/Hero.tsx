import React from 'react';
import { Check, MessageCircle, Clock, Bell, ChevronRight } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

// ── Mini WhatsApp mockup (estático, decorativo) ──────────────────────────────

function WaBubble({ text, isBot, time }: { text: string; isBot: boolean; time: string }) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-1.5`}>
      <div className={`max-w-[85%] px-2.5 py-1.5 rounded-lg text-[10px] leading-relaxed shadow-sm ${
        isBot ? 'bg-white text-gray-800 rounded-tl-none' : 'bg-[#dcf8c6] text-gray-800 rounded-tr-none'
      }`}>
        <p className="whitespace-pre-line">{text}</p>
        <div className={`flex items-center gap-1 mt-0.5 ${isBot ? '' : 'justify-end'}`}>
          <span className="text-[8px] text-gray-400">{time}</span>
          {!isBot && <span className="text-[8px] text-blue-500">✓✓</span>}
        </div>
      </div>
    </div>
  );
}

function WaButton({ label }: { label: string }) {
  return (
    <div className="w-full bg-white border border-[#53bdeb] rounded-lg py-1.5 text-[10px] font-medium text-[#0277bd] flex items-center justify-center gap-1 shadow-sm mb-0.5">
      {label}
    </div>
  );
}

function MiniPhone() {
  return (
    <div className="bg-slate-800 rounded-[2rem] p-2.5 shadow-2xl border-4 border-slate-700 w-48">
      {/* Status bar */}
      <div className="flex justify-between items-center px-3 py-0.5 text-white text-[8px] mb-1">
        <span>9:41</span>
        <span>●●● 🔋</span>
      </div>

      <div className="bg-white rounded-[1.5rem] overflow-hidden h-[320px] flex flex-col">
        {/* WA header */}
        <div className="bg-[#075E54] text-white px-3 py-2 flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle size={11} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[10px]">Clínica Demo</p>
            <p className="text-[8px] text-green-300">online agora</p>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-hidden p-2 space-y-0.5" style={{ backgroundColor: '#e5ddd5' }}>
          <div className="flex justify-center mb-1">
            <span className="bg-white/80 text-gray-500 text-[7px] px-2 py-0.5 rounded-full">hoje</span>
          </div>

          <WaBubble
            isBot
            time="09:01"
            text={`Olá, *Maria*! 👋\n\nSou o assistente da *Clínica Demo*. Como posso ajudar?`}
          />

          {/* List button */}
          <div className="flex justify-start mb-1.5">
            <div className="max-w-[85%] w-full">
              <div className="w-full bg-white border border-[#53bdeb] rounded-lg py-1.5 text-[10px] font-medium text-[#0277bd] flex items-center justify-center gap-1 shadow-sm">
                <span>≡</span> Ver opções
              </div>
            </div>
          </div>

          <WaBubble isBot={false} time="09:02" text="📅 Agendar consulta" />

          <WaBubble
            isBot
            time="09:02"
            text={`Ótimo! Qual dia você prefere?`}
          />

          <div className="flex justify-start mb-1">
            <div className="max-w-[85%] w-full space-y-0.5">
              <WaButton label="📅 Amanhã" />
              <WaButton label="📅 Próxima terça" />
              <WaButton label="📅 Próxima quarta" />
            </div>
          </div>

          <WaBubble isBot={false} time="09:03" text="Amanhã" />

          <WaBubble
            isBot
            time="09:03"
            text={`✅ *Consulta confirmada!*\n\n📅 26/03 às 14:00\n\nLembretes 24h e 12h antes. 🔔`}
          />
        </div>

        {/* Input bar */}
        <div className="flex-shrink-0 bg-[#f0f0f0] px-2 py-1.5 flex items-center gap-1.5 border-t border-gray-200">
          <div className="flex-1 bg-white rounded-full px-3 py-1 text-[9px] text-gray-400">
            Selecione uma opção ↑
          </div>
          <div className="w-6 h-6 bg-[#25D366] rounded-full flex items-center justify-center opacity-40">
            <MessageCircle size={11} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mini Dashboard mockup (estático, decorativo) ──────────────────────────────

function MiniDashboard() {
  const rows = [
    { name: 'Maria Silva',    time: 'Hoje 14:00', status: 'pendente', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'João Santos',    time: 'Hoje 15:30', status: 'confirmado', color: 'bg-green-100 text-green-700' },
    { name: 'Ana Oliveira',   time: 'Amanhã 9:00', status: 'pendente', color: 'bg-yellow-100 text-yellow-700' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden w-64">
      {/* Browser chrome */}
      <div className="bg-gray-100 px-3 py-2 flex items-center gap-2 border-b border-gray-200">
        <div className="flex gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-2 py-0.5 text-[9px] text-gray-400 text-center border border-gray-200">
          app.doctorchatbot.com.br
        </div>
      </div>

      {/* Sidebar + content */}
      <div className="flex h-44">
        {/* Sidebar */}
        <div className="w-10 bg-[#075E54] flex flex-col items-center py-2 gap-3">
          <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm" />
          </div>
          <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
            <div className="w-3 h-2 bg-white/60 rounded-sm" />
          </div>
          <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
            <Bell size={10} className="text-white/60" />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-2.5 overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-bold text-gray-800">Agendamentos</p>
            <div className="bg-sky-500 text-white text-[8px] px-1.5 py-0.5 rounded font-medium">+ Novo</div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-1 mb-2">
            {[['8', 'Hoje'], ['3', 'Pendentes'], ['94%', 'Confirmados']].map(([val, lbl]) => (
              <div key={lbl} className="bg-gray-50 rounded p-1 text-center">
                <p className="text-[11px] font-bold text-gray-800">{val}</p>
                <p className="text-[7px] text-gray-500">{lbl}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="space-y-1">
            {rows.map((r) => (
              <div key={r.name} className="flex items-center justify-between bg-gray-50 rounded px-1.5 py-1">
                <div>
                  <p className="text-[9px] font-medium text-gray-800">{r.name}</p>
                  <p className="text-[8px] text-gray-500">{r.time}</p>
                </div>
                <div className={`text-[7px] px-1.5 py-0.5 rounded-full font-medium ${r.color}`}>
                  {r.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-sky-50 py-20 lg:py-28">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-sky-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-green-100 rounded-full opacity-40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

          {/* Left — copy */}
          <div className="mb-16 lg:mb-0">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Bot WhatsApp para clínicas
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Agendamento automático pelo{' '}
              <span className="text-[#25D366]">WhatsApp</span>{' '}
              com menus interativos
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Paciente seleciona dia e hora em menus nativos do WhatsApp — sem digitar nada.
              Bot confirma, agenda e envia lembretes automáticos. Sua equipe só atende.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href={waLink('hero')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-colors flex items-center justify-center gap-2 shadow-lg shadow-green-200"
              >
                <MessageCircle size={20} />
                Testar no WhatsApp agora
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('dashboard')}
                className="border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-white px-7 py-3.5 rounded-xl font-semibold text-base transition-colors flex items-center justify-center gap-2"
              >
                Ver o painel <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6">
              {[
                'Agenda em 3 toques',
                'Lembretes 24h + 12h',
                'Sem digitar nada',
                'Dashboard em tempo real',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check size={16} className="text-[#25D366] flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — mockups */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* WhatsApp phone — frente */}
              <div className="relative z-10">
                <MiniPhone />
              </div>

              {/* Dashboard card — atrás e à direita */}
              <div className="absolute -right-16 top-10 z-0 hidden sm:block opacity-90">
                <MiniDashboard />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -left-3 z-20 bg-white rounded-xl px-3 py-2 shadow-lg border border-gray-100 flex items-center gap-2">
                <Clock size={14} className="text-[#25D366]" />
                <span className="text-xs font-semibold text-slate-700">24/7 ativo</span>
              </div>

              <div className="absolute -bottom-3 left-8 z-20 bg-[#25D366] text-white rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
                <Bell size={13} />
                <span className="text-xs font-semibold">Lembrete enviado ✓</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
