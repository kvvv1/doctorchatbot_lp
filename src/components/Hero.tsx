import React from 'react';
import { Check, MessageCircle, ChevronRight, CalendarCheck, Users, Clock, Bell } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

// ── Bolha de mensagem WhatsApp ────────────────────────────────────────────────

function Bubble({
  text, from, time,
}: {
  text: string; from: 'bot' | 'user'; time: string;
}) {
  const isBot = from === 'bot';

  // Destaca palavras em negrito marcadas com *
  const renderText = (t: string) =>
    t.split(/(\*[^*]+\*)/g).map((chunk, i) =>
      chunk.startsWith('*') && chunk.endsWith('*')
        ? <strong key={i}>{chunk.slice(1, -1)}</strong>
        : <span key={i}>{chunk}</span>
    );

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`max-w-[82%] px-3 py-2 rounded-2xl text-[13px] leading-snug shadow-sm ${
        isBot
          ? 'bg-white text-gray-800 rounded-tl-none'
          : 'bg-[#dcf8c6] text-gray-800 rounded-tr-none'
      }`}>
        <p className="whitespace-pre-line">{renderText(text)}</p>
        <div className={`flex items-center gap-1 mt-0.5 ${isBot ? '' : 'justify-end'}`}>
          <span className="text-[10px] text-gray-400">{time}</span>
          {!isBot && <span className="text-[10px] text-sky-500">✓✓</span>}
        </div>
      </div>
    </div>
  );
}

function WaBtn({ label }: { label: string }) {
  return (
    <div className="bg-white border border-[#53bdeb] rounded-xl py-2 text-[13px] font-medium text-[#0277bd] flex items-center justify-center shadow-sm">
      {label}
    </div>
  );
}

// ── Mockup do celular ─────────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    /* frame do celular */
    <div className="relative mx-auto" style={{ width: 300 }}>
      {/* corpo do celular */}
      <div className="bg-slate-900 rounded-[3rem] p-[14px] shadow-[0_32px_80px_rgba(0,0,0,0.35)] border-[6px] border-slate-800">
        {/* barra de status */}
        <div className="flex justify-between items-center px-3 pt-1 pb-2 text-white text-[11px]">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1 text-white/80">
            <span>●●●</span>
            <span>WiFi</span>
            <span>🔋</span>
          </div>
        </div>

        {/* tela */}
        <div className="bg-white rounded-[2.2rem] overflow-hidden flex flex-col" style={{ height: 480 }}>

          {/* cabeçalho WhatsApp */}
          <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-white text-[14px] leading-tight">Clínica Demo</p>
              <p className="text-[11px] text-green-300 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
                online agora
              </p>
            </div>
          </div>

          {/* conversa */}
          <div
            className="flex-1 flex flex-col gap-2 px-3 py-3 overflow-hidden"
            style={{ backgroundColor: '#e5ddd5' }}
          >
            <div className="flex justify-center">
              <span className="bg-white/80 text-gray-500 text-[11px] px-3 py-0.5 rounded-full shadow-sm">
                hoje
              </span>
            </div>

            <Bubble
              from="bot" time="09:01"
              text={"Olá, *Maria*! 👋\n\nSou o assistente da *Clínica Demo*.\nComo posso te ajudar?"}
            />

            {/* botão de lista */}
            <div className="bg-white border border-[#53bdeb] rounded-xl py-2 text-[13px] font-medium text-[#0277bd] flex items-center justify-center gap-2 shadow-sm">
              <span className="text-base leading-none">≡</span> Ver opções
            </div>

            <Bubble from="user" time="09:02" text="📅 Agendar consulta" />

            <Bubble from="bot" time="09:02" text="Ótimo! Qual dia você prefere?" />

            <div className="flex flex-col gap-1.5">
              <WaBtn label="📅 Amanhã — seg, 26/03" />
              <WaBtn label="📅 Terça — 27/03" />
              <WaBtn label="📅 Quarta — 28/03" />
            </div>

            <Bubble from="user" time="09:03" text="📅 Amanhã — seg, 26/03" />

            <Bubble
              from="bot" time="09:03"
              text={"✅ *Consulta confirmada!*\n\n👤 Maria Silva\n📅 26/03 às 14:00\n\n🔔 Você receberá lembretes *24h* e *12h* antes pelo WhatsApp."}
            />
          </div>

          {/* barra de input (decorativa) */}
          <div className="flex-shrink-0 bg-[#f0f0f0] px-3 py-2.5 flex items-center gap-2 border-t border-gray-200">
            <div className="flex-1 bg-white rounded-full px-4 py-1.5 text-[12px] text-gray-400 select-none">
              Selecione uma opção ↑
            </div>
            <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center opacity-40 flex-shrink-0">
              <MessageCircle size={16} className="text-white" />
            </div>
          </div>

        </div>
      </div>

      {/* badge flutuante — topo esquerda */}
      <div className="absolute -top-4 -left-6 bg-white rounded-2xl px-3 py-2.5 shadow-xl border border-sky-100 flex items-center gap-2.5 z-10">
        <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center">
          <Clock size={15} className="text-sky-600" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-800">Disponível</p>
          <p className="text-[10px] text-sky-600 font-medium">24h / 7 dias</p>
        </div>
      </div>

      {/* badge flutuante — base direita */}
      <div className="absolute -bottom-4 -right-6 bg-white rounded-2xl px-3 py-2.5 shadow-xl border border-green-100 flex items-center gap-2.5 z-10">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <Bell size={15} className="text-green-600" />
        </div>
        <div>
          <p className="text-[11px] font-bold text-gray-800">Lembrete enviado</p>
          <p className="text-[10px] text-green-600 font-medium">24h antes · automático</p>
        </div>
      </div>
    </div>
  );
}

// ── Stat chip ─────────────────────────────────────────────────────────────────

function StatChip({ icon: Icon, value, label }: {
  icon: React.ElementType; value: string; label: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-3">
      <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon size={18} className="text-sky-600" />
      </div>
      <div>
        <p className="text-sm font-bold text-gray-900">{value}</p>
        <p className="text-[11px] text-gray-500 leading-tight">{label}</p>
      </div>
    </div>
  );
}

// ── Hero principal ────────────────────────────────────────────────────────────

const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sky-50/70 to-sky-100/50 py-20 lg:py-28">
      {/* blobs de fundo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-60 -right-60 w-[600px] h-[600px] bg-sky-100 rounded-full opacity-50 blur-3xl" />
        <div className="absolute -bottom-60 -left-60 w-[600px] h-[600px] bg-sky-50 rounded-full opacity-60 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">

          {/* ── Esquerda — copy ── */}
          <div className="mb-20 lg:mb-0">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse" />
              Bot de agendamento para clínicas
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-[56px] font-bold text-slate-900 leading-tight mb-6">
              Agendamento pelo{' '}
              <span className="text-sky-600">WhatsApp</span>
              <br className="hidden lg:block" />
              {' '}sem digitar nada
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Paciente escolhe dia e hora em menus interativos nativos do WhatsApp.
              Bot confirma, agenda e envia lembretes automáticos.
              Sua equipe só atende.
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

          {/* ── Direita — phone grande + stats ── */}
          <div className="flex flex-col items-center lg:items-end gap-8">

            {/* Phone mockup — herói visual */}
            <PhoneMockup />

            {/* Stat chips abaixo do phone */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-sm lg:max-w-none">
              <StatChip icon={CalendarCheck} value="142"  label="agendamentos/mês" />
              <StatChip icon={Users}         value="94%"  label="taxa confirmação" />
              <StatChip icon={CalendarCheck} value="↓82%" label="no-show reduzido" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
