import React from 'react';
import { Check, MessageCircle, ChevronRight, CalendarCheck, Users, Bell, BarChart2 } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

// ── Bolha WhatsApp ────────────────────────────────────────────────────────────

function Bubble({ text, from, time }: { text: string; from: 'bot' | 'user'; time: string }) {
  const isBot = from === 'bot';
  const parts = text.split(/(\*[^*]+\*)/g).map((c, i) =>
    c.startsWith('*') && c.endsWith('*')
      ? <strong key={i}>{c.slice(1, -1)}</strong>
      : <span key={i}>{c}</span>
  );
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-[12px] leading-snug shadow-sm ${
        isBot ? 'bg-white text-gray-800 rounded-tl-none' : 'bg-[#dcf8c6] text-gray-800 rounded-tr-none'
      }`}>
        <p className="whitespace-pre-line">{parts}</p>
        <div className={`flex items-center gap-1 mt-0.5 ${isBot ? '' : 'justify-end'}`}>
          <span className="text-[9px] text-gray-400">{time}</span>
          {!isBot && <span className="text-[9px] text-sky-500">✓✓</span>}
        </div>
      </div>
    </div>
  );
}

// ── Phone mockup ──────────────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div className="bg-slate-900 rounded-[2.6rem] p-[12px] shadow-2xl border-[5px] border-slate-800 w-[264px] flex-shrink-0">
      <div className="flex justify-between items-center px-2 pt-1 pb-1.5 text-white text-[10px]">
        <span className="font-semibold">9:41</span>
        <span className="text-white/70">●●● WiFi 🔋</span>
      </div>

      <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col" style={{ height: 440 }}>
        {/* WA header */}
        <div className="bg-[#075E54] px-3 py-2.5 flex items-center gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle size={15} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-white text-[13px]">Clínica Demo</p>
            <p className="text-[10px] text-green-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              online agora
            </p>
          </div>
        </div>

        {/* conversa */}
        <div className="flex-1 flex flex-col gap-2 px-2.5 py-2.5 overflow-hidden" style={{ backgroundColor: '#e5ddd5' }}>
          <div className="flex justify-center">
            <span className="bg-white/80 text-gray-500 text-[10px] px-3 py-0.5 rounded-full">hoje</span>
          </div>

          <Bubble from="bot" time="09:01"
            text={"Olá, *Maria*! 👋\n\nSou o assistente da *Clínica Demo*. Como posso ajudar?"} />

          <div className="bg-white border border-[#53bdeb] rounded-xl py-1.5 text-[12px] font-medium text-[#0277bd] flex items-center justify-center gap-1.5 shadow-sm">
            <span className="text-sm">≡</span> Ver opções
          </div>

          <Bubble from="user" time="09:02" text="📅 Agendar consulta" />
          <Bubble from="bot"  time="09:02" text="Qual dia você prefere?" />

          <div className="flex flex-col gap-1">
            {['📅 Amanhã — 26/03', '📅 Terça — 27/03', '📅 Quarta — 28/03'].map(l => (
              <div key={l} className="bg-white border border-[#53bdeb] rounded-xl py-1.5 text-[11px] font-medium text-[#0277bd] flex items-center justify-center shadow-sm">{l}</div>
            ))}
          </div>

          <Bubble from="user" time="09:03" text="📅 Amanhã — 26/03" />
          <Bubble from="bot"  time="09:03"
            text={"✅ *Consulta confirmada!*\n\n📅 26/03 às 14:00\n🔔 Lembrete 24h e 12h antes"} />
        </div>

        {/* input decorativo */}
        <div className="flex-shrink-0 bg-[#f0f0f0] px-2.5 py-2 flex items-center gap-1.5 border-t border-gray-200">
          <div className="flex-1 bg-white rounded-full px-3 py-1 text-[10px] text-gray-400">Selecione uma opção ↑</div>
          <div className="w-7 h-7 bg-[#25D366] rounded-full flex items-center justify-center opacity-40">
            <MessageCircle size={12} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard mockup ──────────────────────────────────────────────────────────

function DashboardMockup() {
  const rows = [
    { name: 'Maria Silva',  time: 'Hoje 14:00',  badge: 'confirmado', cls: 'bg-sky-100 text-sky-700' },
    { name: 'João Santos',  time: 'Hoje 15:30',  badge: 'pendente',   cls: 'bg-yellow-100 text-yellow-700' },
    { name: 'Ana Oliveira', time: 'Amanhã 09:00', badge: 'confirmado', cls: 'bg-sky-100 text-sky-700' },
    { name: 'Pedro Costa',  time: 'Amanhã 11:00', badge: 'pendente',   cls: 'bg-yellow-100 text-yellow-700' },
    { name: 'Lucia Ferraz', time: 'Amanhã 14:30', badge: 'confirmado', cls: 'bg-sky-100 text-sky-700' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-[252px] flex-shrink-0">
      {/* browser chrome */}
      <div className="bg-gray-50 px-3 py-2 flex items-center gap-2 border-b border-gray-100">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded px-2 py-0.5 text-[8px] text-gray-400 border border-gray-200 text-center truncate">
          app.doctorchatbot.com.br
        </div>
      </div>

      <div className="flex" style={{ height: 408 }}>
        {/* sidebar */}
        <div className="w-10 bg-sky-700 flex flex-col items-center py-3 gap-3 flex-shrink-0">
          <div className="w-7 h-7 bg-sky-500 rounded-lg flex items-center justify-center">
            <CalendarCheck size={14} className="text-white" />
          </div>
          <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
            <Bell size={12} className="text-white/60" />
          </div>
          <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
            <BarChart2 size={12} className="text-white/60" />
          </div>
          <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
            <Users size={12} className="text-white/60" />
          </div>
        </div>

        {/* conteúdo */}
        <div className="flex-1 flex flex-col p-3 gap-2.5 overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-gray-800">Agendamentos</p>
            <div className="bg-sky-500 text-white text-[9px] px-2 py-0.5 rounded-lg font-semibold cursor-pointer">+ Novo</div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-3 gap-1.5">
            {[['8', 'Hoje'], ['3', 'Pendentes'], ['94%', 'Taxa']].map(([v, l]) => (
              <div key={l} className="bg-sky-50 rounded-xl p-1.5 text-center">
                <p className="text-[13px] font-bold text-sky-700">{v}</p>
                <p className="text-[8px] text-sky-500 leading-tight">{l}</p>
              </div>
            ))}
          </div>

          {/* lista */}
          <div className="flex flex-col gap-1 flex-1 overflow-hidden">
            {rows.map((r) => (
              <div key={r.name} className="flex items-center justify-between bg-gray-50 rounded-xl px-2 py-1.5 hover:bg-sky-50 transition-colors">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-bold text-sky-600">{r.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold text-gray-800 truncate">{r.name}</p>
                    <p className="text-[9px] text-gray-400">{r.time}</p>
                  </div>
                </div>
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0 ml-1 ${r.cls}`}>
                  {r.badge}
                </span>
              </div>
            ))}
          </div>

          {/* rodapé */}
          <div className="flex items-center gap-1.5 pt-1 border-t border-gray-100">
            <Bell size={10} className="text-sky-500" />
            <p className="text-[9px] text-gray-500">Lembretes automáticos ativos</p>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full ml-auto animate-pulse" />
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
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50/60 to-sky-100/40 py-20 lg:py-28">
      {/* blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-sky-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[500px] h-[500px] bg-sky-50 rounded-full opacity-60 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

          {/* ── Esquerda — copy ── */}
          <div className="mb-16 lg:mb-0">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
              Bot de agendamento para clínicas
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-[52px] font-bold text-slate-900 leading-tight mb-3">
              Sua agenda no{' '}
              <span className="text-sky-600">piloto automático</span>
            </h1>
            <p className="text-2xl lg:text-3xl font-semibold text-slate-400 mb-6">
              sem digitar nada
            </p>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Paciente agenda em 3 toques no WhatsApp. Bot confirma na hora e envia
              lembrete 24h antes. Menos faltas, agenda sempre cheia.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href={waLink('hero')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-sky-600 hover:bg-sky-700 text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-200"
              >
                <MessageCircle size={20} />
                Testar no WhatsApp agora
              </a>
              <button
                type="button"
                onClick={() => scrollToSection('dashboard')}
                className="border-2 border-slate-200 text-slate-700 hover:border-sky-300 hover:bg-sky-50 px-7 py-3.5 rounded-xl font-semibold text-base transition-colors flex items-center justify-center gap-2"
              >
                Ver o painel <ChevronRight size={18} />
              </button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
              {['Agenda em 3 toques', 'Lembretes 24h + 12h', 'Zero digitação', 'Dashboard em tempo real'].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <Check size={16} className="text-sky-500 flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Direita — phone + dashboard ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative flex items-start gap-4">

              {/* phone */}
              <div className="relative z-10 flex-shrink-0">
                <PhoneMockup />

                {/* badge topo-esquerda */}
                <div className="absolute -top-3 -left-4 bg-white rounded-2xl px-3 py-2 shadow-lg border border-sky-100 flex items-center gap-2 z-20">
                  <div className="w-7 h-7 bg-sky-100 rounded-full flex items-center justify-center">
                    <span className="text-sm">🤖</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-800">Bot ativo</p>
                    <p className="text-[9px] text-sky-600">24h / 7 dias</p>
                  </div>
                </div>

                {/* badge base-esquerda */}
                <div className="absolute -bottom-3 -left-4 bg-white rounded-2xl px-3 py-2 shadow-lg border border-green-100 flex items-center gap-2 z-20">
                  <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center">
                    <Bell size={13} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-800">Lembrete enviado</p>
                    <p className="text-[9px] text-green-600">automático · 24h antes</p>
                  </div>
                </div>
              </div>

              {/* dashboard — ao lado direito, levemente abaixado */}
              <div className="hidden lg:block flex-shrink-0 mt-6 relative z-0">
                <DashboardMockup />

                {/* badge topo-direita */}
                <div className="absolute -top-3 -right-4 bg-white rounded-2xl px-3 py-2 shadow-lg border border-sky-100 flex items-center gap-2 z-20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-[10px] font-bold text-gray-700">Ao vivo</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
