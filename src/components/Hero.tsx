import React from 'react';
import { Check, MessageCircle, Clock, Bell, ChevronRight, CalendarCheck, TrendingUp, Users } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

// ── Mini WhatsApp phone ───────────────────────────────────────────────────────

function WaBubble({ text, isBot, time }: { text: string; isBot: boolean; time: string }) {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-1.5`}>
      <div className={`max-w-[88%] px-2.5 py-1.5 rounded-lg text-[10px] leading-relaxed shadow-sm ${
        isBot ? 'bg-white text-gray-800 rounded-tl-none' : 'bg-[#dcf8c6] text-gray-800 rounded-tr-none'
      }`}>
        <p className="whitespace-pre-line">{text}</p>
        <div className={`flex items-center gap-1 mt-0.5 ${isBot ? '' : 'justify-end'}`}>
          <span className="text-[8px] text-gray-400">{time}</span>
          {!isBot && <span className="text-[8px] text-sky-500">✓✓</span>}
        </div>
      </div>
    </div>
  );
}

function MiniPhone() {
  return (
    <div className="bg-slate-900 rounded-[2.2rem] p-3 shadow-2xl border-[5px] border-slate-800 w-56 flex-shrink-0">
      {/* Status bar */}
      <div className="flex justify-between items-center px-2 py-0.5 text-white text-[8px] mb-1">
        <span className="font-medium">9:41</span>
        <span>●●● 🔋</span>
      </div>

      <div className="bg-white rounded-[1.7rem] overflow-hidden h-[340px] flex flex-col">
        {/* WA header */}
        <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center gap-2 flex-shrink-0">
          <div className="w-7 h-7 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
            <MessageCircle size={13} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[11px]">Clínica Demo</p>
            <p className="text-[8px] text-green-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              online agora
            </p>
          </div>
        </div>

        {/* Chat */}
        <div className="flex-1 overflow-hidden p-2.5 space-y-1" style={{ backgroundColor: '#e5ddd5' }}>
          <div className="flex justify-center mb-1.5">
            <span className="bg-white/80 text-gray-500 text-[7px] px-2.5 py-0.5 rounded-full shadow-sm">hoje</span>
          </div>

          <WaBubble
            isBot time="09:01"
            text={`Olá, *Maria*! 👋\n\nSou o assistente da *Clínica Demo*.\nComo posso te ajudar?`}
          />

          {/* List button */}
          <div className="flex justify-start mb-1">
            <div className="w-full bg-white border border-[#53bdeb] rounded-lg py-1.5 text-[10px] font-medium text-[#0277bd] flex items-center justify-center gap-1.5 shadow-sm">
              <span className="text-xs">≡</span> Ver opções
            </div>
          </div>

          <WaBubble isBot={false} time="09:02" text="📅 Agendar consulta" />

          <WaBubble isBot time="09:02" text="Qual dia você prefere?" />

          <div className="space-y-0.5">
            {['📅 Amanhã', '📅 Próxima terça'].map(l => (
              <div key={l} className="bg-white border border-[#53bdeb] rounded-lg py-1.5 text-[10px] font-medium text-[#0277bd] flex items-center justify-center shadow-sm">
                {l}
              </div>
            ))}
          </div>

          <WaBubble isBot={false} time="09:03" text="Amanhã" />

          <WaBubble
            isBot time="09:03"
            text={`✅ *Consulta confirmada!*\n\n📅 26/03 às 14:00\n🔔 Lembrete 24h antes`}
          />
        </div>

        {/* Input bar */}
        <div className="flex-shrink-0 bg-[#f0f0f0] px-2.5 py-2 flex items-center gap-1.5 border-t border-gray-200">
          <div className="flex-1 bg-white rounded-full px-3 py-1 text-[9px] text-gray-400">
            Selecione uma opção ↑
          </div>
          <div className="w-7 h-7 bg-[#25D366] rounded-full flex items-center justify-center opacity-40">
            <MessageCircle size={12} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mini Dashboard card ───────────────────────────────────────────────────────

function MiniDashboard() {
  const rows = [
    { name: 'Maria Silva',   time: 'Hoje 14:00', badge: 'confirmado', badgeCls: 'bg-sky-100 text-sky-700' },
    { name: 'João Santos',   time: 'Hoje 15:30', badge: 'pendente',   badgeCls: 'bg-yellow-100 text-yellow-700' },
    { name: 'Ana Oliveira',  time: 'Amanhã 9:00',badge: 'confirmado', badgeCls: 'bg-sky-100 text-sky-700' },
    { name: 'Pedro Costa',   time: 'Amanhã 11h', badge: 'pendente',   badgeCls: 'bg-yellow-100 text-yellow-700' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-60 flex-shrink-0">
      {/* Browser bar */}
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

      <div className="flex" style={{ height: '186px' }}>
        {/* Sidebar azul — identidade DoctorChatBot */}
        <div className="w-9 bg-sky-700 flex flex-col items-center py-3 gap-3 flex-shrink-0">
          <div className="w-6 h-6 bg-sky-500 rounded-lg flex items-center justify-center">
            <CalendarCheck size={13} className="text-white" />
          </div>
          <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
            <Bell size={11} className="text-white/60" />
          </div>
          <div className="w-6 h-6 bg-white/10 rounded-lg flex items-center justify-center">
            <TrendingUp size={11} className="text-white/60" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-2.5 overflow-hidden flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-800">Agendamentos</p>
            <div className="bg-sky-500 text-white text-[8px] px-1.5 py-0.5 rounded-md font-semibold">+ Novo</div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-1">
            {[['8', 'Hoje'], ['2', 'Pendentes'], ['94%', 'Taxa']] .map(([v, l]) => (
              <div key={l} className="bg-sky-50 rounded-md p-1 text-center">
                <p className="text-[11px] font-bold text-sky-700">{v}</p>
                <p className="text-[7px] text-sky-500">{l}</p>
              </div>
            ))}
          </div>

          {/* Rows */}
          <div className="space-y-1 overflow-hidden">
            {rows.map(r => (
              <div key={r.name} className="flex items-center justify-between px-1.5 py-1 bg-gray-50 rounded-lg">
                <div className="min-w-0">
                  <p className="text-[9px] font-semibold text-gray-800 truncate">{r.name}</p>
                  <p className="text-[8px] text-gray-400">{r.time}</p>
                </div>
                <span className={`text-[7px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0 ml-1 ${r.badgeCls}`}>
                  {r.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Toast de notificação ──────────────────────────────────────────────────────

function NotificationToast() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-sky-100 px-4 py-3 flex items-center gap-3 w-72">
      <div className="w-9 h-9 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
        <CalendarCheck size={18} className="text-sky-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-gray-800">Consulta confirmada ✅</p>
        <p className="text-[11px] text-gray-500 truncate">Maria Silva · 26/03 às 14:00</p>
      </div>
      <span className="text-[10px] text-sky-400 font-medium flex-shrink-0">agora</span>
    </div>
  );
}

// ── Stat chip ─────────────────────────────────────────────────────────────────

function StatChip({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-3">
      <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-sky-600" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-800">{value}</p>
        <p className="text-[11px] text-gray-500">{label}</p>
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
      {/* Blobs decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -right-48 w-[500px] h-[500px] bg-sky-100 rounded-full opacity-60 blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-[500px] h-[500px] bg-sky-50 rounded-full opacity-70 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── Esquerda — copy ── */}
          <div className="mb-16 lg:mb-0">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
              Bot de agendamento para clínicas
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Agendamento pelo{' '}
              <span className="text-sky-600">WhatsApp</span>{' '}
              <br className="hidden lg:block" />
              sem digitar nada
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Paciente escolhe dia e hora em menus interativos nativos do WhatsApp.
              Bot confirma, agenda e envia lembretes automáticos. Sua equipe só atende.
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

            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-6">
              {[
                'Agenda em 3 toques',
                'Lembretes 24h + 12h',
                'Zero digitação',
                'Dashboard em tempo real',
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check size={16} className="text-sky-500 flex-shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Direita — mockups ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="flex flex-col gap-4 items-center lg:items-end w-full max-w-[540px]">

              {/* Linha 1 — toast de notificação */}
              <div className="self-start lg:self-center">
                <NotificationToast />
              </div>

              {/* Linha 2 — phone + dashboard */}
              <div className="flex items-start gap-4 justify-center">
                <MiniPhone />
                <div className="hidden sm:block pt-6">
                  <MiniDashboard />
                </div>
              </div>

              {/* Linha 3 — stat chips */}
              <div className="grid grid-cols-3 gap-2 w-full">
                <StatChip icon={CalendarCheck} value="142" label="agendamentos/mês" />
                <StatChip icon={Users} value="94%" label="taxa confirmação" />
                <StatChip icon={Clock} value="24/7" label="bot ativo" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
