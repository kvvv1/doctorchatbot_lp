import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, RotateCcw, Phone, Video, MoreVertical, List } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

// ─── Types ────────────────────────────────────────────────────────────────────

type ChatStep =
  | 'menu'
  | 'agendar_dia'
  | 'agendar_hora'
  | 'reagendar_dia'
  | 'reagendar_hora'
  | 'cancelar_confirmar'
  | 'cancelar_encaixe'
  | 'atendente'
  | 'ver_agendamentos'
  | 'final';

interface ChatState {
  step: ChatStep;
  day?: string;
  time?: string;
}

interface TextMessage {
  kind: 'text';
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ButtonMessage {
  kind: 'buttons';
  id: string;
  text: string;
  buttons: { id: string; label: string }[];
  isBot: true;
  timestamp: Date;
  usedButtonId?: string;
}

interface ListMessage {
  kind: 'list';
  id: string;
  text: string;
  buttonLabel: string;
  sections: { title: string; rows: { id: string; title: string; description?: string }[] }[];
  isBot: true;
  timestamp: Date;
  selectedRowId?: string;
}

type Message = TextMessage | ButtonMessage | ListMessage;

// ─── Conteúdo estático ────────────────────────────────────────────────────────

const DEMO_NAME = 'João Silva';

const DEMO_APPOINTMENTS = [
  { date: '25/03', time: '14:00', status: 'Aguardando confirmação' },
  { date: '10/04', time: '09:30', status: 'Confirmada ✅' },
];

const MAIN_MENU_CONTENT = {
  kind: 'list' as const,
  text: `Olá, *${DEMO_NAME}*! 👋\n\nSou o assistente virtual da *Clínica Demo*.\n\nComo posso te ajudar hoje?`,
  buttonLabel: 'Ver opções',
  isBot: true as const,
  sections: [
    {
      title: 'Agendamento',
      rows: [
        { id: 'schedule',     title: '📅 Agendar consulta',    description: 'Marcar uma nova consulta' },
        { id: 'reschedule',   title: '🔄 Remarcar consulta',   description: 'Mudar data ou horário' },
        { id: 'cancel',       title: '❌ Cancelar consulta',   description: 'Cancelar um agendamento' },
      ],
    },
    {
      title: 'Atendimento',
      rows: [
        { id: 'attendant',    title: '👨‍⚕️ Falar com atendente', description: 'Conectar com nossa equipe' },
        { id: 'appointments', title: '📋 Meus agendamentos',   description: 'Ver suas próximas consultas' },
      ],
    },
  ],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const newId = () => `${Date.now()}-${Math.random()}`;
const now   = () => new Date();
const fmt   = (d: Date) => d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

function bold(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((p, i) =>
    p.startsWith('*') && p.endsWith('*')
      ? <strong key={i}>{p.slice(1, -1)}</strong>
      : <span key={i}>{p}</span>
  );
}

function makeList(partial: Omit<ListMessage, 'id' | 'timestamp'>): ListMessage {
  return { ...partial, id: newId(), timestamp: now() };
}
function makeButtons(partial: Omit<ButtonMessage, 'id' | 'timestamp'>): ButtonMessage {
  return { ...partial, id: newId(), timestamp: now() };
}
function makeText(text: string, isBot = true): TextMessage {
  return { kind: 'text', id: newId(), text, isBot, timestamp: now() };
}

// ─── Bubble components ────────────────────────────────────────────────────────

function TextBubble({ msg }: { msg: TextMessage }) {
  return (
    <div className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} mb-1`}>
      <div className={`max-w-[82%] px-3 py-2 rounded-lg shadow-sm text-[13px] leading-relaxed ${
        msg.isBot ? 'bg-white text-gray-800 rounded-tl-none' : 'bg-[#dcf8c6] text-gray-800 rounded-tr-none'
      }`}>
        <p className="whitespace-pre-line">{bold(msg.text)}</p>
        <div className={`flex items-center gap-1 mt-0.5 ${msg.isBot ? '' : 'justify-end'}`}>
          <span className="text-[10px] text-gray-400">{fmt(msg.timestamp)}</span>
          {!msg.isBot && <span className="text-[10px] text-blue-500">✓✓</span>}
        </div>
      </div>
    </div>
  );
}

function ButtonsBubble({ msg, onPick, disabled }: {
  msg: ButtonMessage;
  onPick: (btnId: string, label: string, msgId: string) => void;
  disabled: boolean;
}) {
  const used = !!msg.usedButtonId;
  return (
    <div className="flex justify-start mb-1">
      <div className="max-w-[82%] w-full">
        <div className="bg-white rounded-lg rounded-tl-none shadow-sm px-3 py-2 text-[13px] leading-relaxed text-gray-800 mb-0.5">
          <p className="whitespace-pre-line">{bold(msg.text)}</p>
          <span className="text-[10px] text-gray-400">{fmt(msg.timestamp)}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          {msg.buttons.map((btn) => (
            <button
              key={btn.id}
              type="button"
              disabled={used || disabled}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!used && !disabled) onPick(btn.id, btn.label, msg.id); }}
              className={`w-full bg-white border rounded-lg py-2 text-[13px] font-medium transition-all shadow-sm ${
                msg.usedButtonId === btn.id
                  ? 'border-[#25D366] text-[#075E54] bg-green-50'
                  : used || disabled
                  ? 'border-gray-200 text-gray-400 cursor-default'
                  : 'border-[#53bdeb] text-[#0277bd] hover:bg-blue-50 active:bg-blue-100 cursor-pointer'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ListBubble({ msg, onPick, disabled }: {
  msg: ListMessage;
  onPick: (rowId: string, title: string, msgId: string) => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);
  const used = !!msg.selectedRowId;
  const selectedTitle = msg.sections.flatMap(s => s.rows).find(r => r.id === msg.selectedRowId)?.title;

  return (
    <div className="flex justify-start mb-1">
      <div className="max-w-[82%] w-full">
        <div className="bg-white rounded-lg rounded-tl-none shadow-sm px-3 py-2 text-[13px] leading-relaxed text-gray-800 mb-0.5">
          <p className="whitespace-pre-line">{bold(msg.text)}</p>
          <span className="text-[10px] text-gray-400">{fmt(msg.timestamp)}</span>
        </div>

        {used ? (
          <div className="w-full bg-green-50 border border-[#25D366] rounded-lg py-2 text-[13px] font-medium text-[#075E54] flex items-center justify-center gap-1.5 shadow-sm">
            ✓ {selectedTitle}
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!disabled) setOpen(true); }}
            className={`w-full bg-white border border-[#53bdeb] rounded-lg py-2 text-[13px] font-medium text-[#0277bd] flex items-center justify-center gap-1.5 transition-colors shadow-sm ${
              disabled ? 'opacity-50 cursor-default' : 'hover:bg-blue-50 cursor-pointer'
            }`}
          >
            <List size={14} />
            {msg.buttonLabel}
          </button>
        )}

        {/* Bottom sheet */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setOpen(false)}>
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="relative bg-white w-full max-w-sm rounded-t-2xl shadow-xl z-10 max-h-[70vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-semibold text-gray-700">Selecione uma opção</span>
                <button type="button" onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">✕</button>
              </div>
              {msg.sections.map((section) => (
                <div key={section.title}>
                  <p className="px-4 pt-3 pb-1 text-[11px] font-bold text-[#25D366] uppercase tracking-wide">
                    {section.title}
                  </p>
                  {section.rows.map((row) => (
                    <button
                      key={row.id}
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(false); onPick(row.id, row.title, msg.id); }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <p className="text-[13px] font-medium text-gray-800">{row.title}</p>
                      {row.description && <p className="text-[11px] text-gray-400 mt-0.5">{row.description}</p>}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ChatbotPlayground() {
  const [messages, setMessages]   = useState<Message[]>([]);
  const [state, setState]         = useState<ChatState>({ step: 'menu' });
  const [isTyping, setIsTyping]   = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const chatAreaRef  = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);

  // Só rola o chat interno após o usuário ter interagido — nunca rola a página
  useEffect(() => {
    if (!hasInteracted.current) return;
    const el = chatAreaRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  // ── Adicionar mensagem bot com delay ──
  const addBot = useCallback((msg: Omit<Message, 'id' | 'timestamp'>): Promise<void> => {
    setIsTyping(true);
    setIsDisabled(true);
    return new Promise(resolve => {
      setTimeout(() => {
        setMessages(prev => [...prev, { ...msg, id: newId(), timestamp: now() } as Message]);
        setIsTyping(false);
        setIsDisabled(false);
        resolve();
      }, 800);
    });
  }, []);

  // ── Adicionar resposta do usuário ──
  const addUser = useCallback((label: string) => {
    // Remove leading emoji prefix para exibição
    const clean = label.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}]+\s*/u, '');
    setMessages(prev => [...prev, makeText(clean, false)]);
  }, []);

  // ── Marcar usado ──
  const markUsed = (msgId: string, selectedId: string) => {
    setMessages(prev => prev.map(m => {
      if (m.id !== msgId) return m;
      if (m.kind === 'buttons') return { ...m, usedButtonId: selectedId };
      if (m.kind === 'list')   return { ...m, selectedRowId: selectedId };
      return m;
    }));
  };

  // ── Voltar ao menu ──
  const backToMenu = async (text = 'Posso ajudar em mais alguma coisa? 😊') => {
    setState({ step: 'menu' });
    await addBot({ ...MAIN_MENU_CONTENT, text });
  };

  // ── Init ──
  useEffect(() => {
    setTimeout(() => {
      setMessages([makeList(MAIN_MENU_CONTENT)]);
    }, 400);
  }, []);

  // ── Handler: lista principal ──
  const onListPick = async (rowId: string, title: string, msgId: string) => {
    hasInteracted.current = true;
    markUsed(msgId, rowId);
    addUser(title);

    // Agendamento selecionado da lista
    if (rowId.startsWith('appt_')) {
      await addBot(makeButtons({
        kind: 'buttons', isBot: true,
        text: `O que deseja fazer com a consulta *${title.replace('📅 ', '')}*?`,
        buttons: [
          { id: 'from_list_reschedule', label: '🔄 Remarcar' },
          { id: 'from_list_cancel',     label: '❌ Cancelar' },
        ],
      }));
      return;
    }

    if (rowId === 'schedule') {
      setState({ step: 'agendar_dia' });
      await addBot(makeButtons({
        kind: 'buttons', isBot: true,
        text: `Ótimo! Vou agendar no nome de *${DEMO_NAME}*.\n\nQual dia você prefere para a consulta?`,
        buttons: [
          { id: 'day_hoje',   label: '📅 Hoje' },
          { id: 'day_amanha', label: '📅 Amanhã' },
          { id: 'day_terca',  label: '📅 Próxima terça' },
          { id: 'day_quarta', label: '📅 Próxima quarta' },
        ],
      }));

    } else if (rowId === 'reschedule') {
      setState({ step: 'reagendar_dia' });
      await addBot(makeButtons({
        kind: 'buttons', isBot: true,
        text: 'Vamos remarcar. Qual o *novo dia* desejado?',
        buttons: [
          { id: 'r_amanha',  label: '📅 Amanhã' },
          { id: 'r_semana',  label: '📅 Essa semana' },
          { id: 'r_proxima', label: '📅 Próxima semana' },
        ],
      }));

    } else if (rowId === 'cancel') {
      setState({ step: 'cancelar_confirmar' });
      await addBot(makeButtons({
        kind: 'buttons', isBot: true,
        text: 'Você deseja *cancelar* sua consulta?\n\nEsta ação não pode ser desfeita.',
        buttons: [
          { id: 'cancel_yes', label: '✅ Sim, cancelar' },
          { id: 'cancel_no',  label: '❌ Não, manter' },
        ],
      }));

    } else if (rowId === 'attendant') {
      setState({ step: 'atendente' });
      await addBot(makeText('Certo! Vou transferir você para um *atendente*. 👨‍⚕️\n\n⏳ Aguarde um momento...\n\nHorário: *Seg–Sex, 8h às 18h*'));
      setTimeout(async () => {
        await addBot(makeText('✅ *Atendente conectado!*\n\nNo sistema real, o bot é desativado aqui e um humano assume a conversa pelo *dashboard*. 💬'));
        setTimeout(() => backToMenu(), 2500);
      }, 500);

    } else if (rowId === 'appointments') {
      setState({ step: 'ver_agendamentos' });
      setIsTyping(true); setIsDisabled(true);
      setTimeout(async () => {
        setIsTyping(false); setIsDisabled(false);
        await addBot(makeList({
          kind: 'list', isBot: true,
          text: 'Seus próximos agendamentos: 📋\n\nSelecione um agendamento para ver as opções:',
          buttonLabel: 'Ver agendamentos',
          sections: [
            {
              title: 'Agendamentos',
              rows: DEMO_APPOINTMENTS.map((a, i) => ({
                id: `appt_${i}`,
                title: `📅 ${a.date} às ${a.time}`,
                description: a.status,
              })),
            },
          ],
        }));
      }, 900);
    }
  };

  // ── Handler: botões ──
  const onButtonPick = async (btnId: string, label: string, msgId: string) => {
    hasInteracted.current = true;
    markUsed(msgId, btnId);
    addUser(label);

    // Dias agendar
    const dayMapSchedule: Record<string, string> = {
      day_hoje: 'Hoje', day_amanha: 'Amanhã', day_terca: 'Próxima terça', day_quarta: 'Próxima quarta',
    };
    if (dayMapSchedule[btnId]) {
      setState(prev => ({ ...prev, step: 'agendar_hora', day: dayMapSchedule[btnId] }));
      await addBot(makeButtons({
        kind: 'buttons', isBot: true,
        text: `*${dayMapSchedule[btnId]}* anotado. Qual horário você prefere?`,
        buttons: [
          { id: 'bh_09', label: '🕘 09:00' },
          { id: 'bh_14', label: '🕑 14:00' },
          { id: 'bh_17', label: '🕔 17:00' },
        ],
      }));
      return;
    }

    // Horários agendar
    const timeMapSchedule: Record<string, string> = { bh_09: '09:00', bh_14: '14:00', bh_17: '17:00' };
    if (timeMapSchedule[btnId]) {
      const day = state.day || 'Amanhã';
      setState(prev => ({ ...prev, step: 'final' }));
      await addBot(makeText(`✅ *Consulta confirmada!*\n\n👤 Paciente: ${DEMO_NAME}\n📅 Data: ${day}\n🕐 Horário: ${timeMapSchedule[btnId]}\n\nVocê receberá lembretes *24h* e *12h* antes da consulta pelo WhatsApp. 🔔`));
      setTimeout(() => backToMenu(), 3000);
      return;
    }

    // Dias remarcar
    const dayMapReschedule: Record<string, string> = { r_amanha: 'Amanhã', r_semana: 'Essa semana', r_proxima: 'Próxima semana' };
    if (dayMapReschedule[btnId]) {
      setState(prev => ({ ...prev, step: 'reagendar_hora', day: dayMapReschedule[btnId] }));
      await addBot(makeButtons({
        kind: 'buttons', isBot: true,
        text: `*${dayMapReschedule[btnId]}* anotado. Qual o novo horário?`,
        buttons: [
          { id: 'rh_09', label: '🕘 09:00' },
          { id: 'rh_14', label: '🕑 14:00' },
          { id: 'rh_17', label: '🕔 17:00' },
        ],
      }));
      return;
    }

    // Horários remarcar
    const timeMapReschedule: Record<string, string> = { rh_09: '09:00', rh_14: '14:00', rh_17: '17:00' };
    if (timeMapReschedule[btnId]) {
      const day = state.day || 'Amanhã';
      setState({ step: 'final' });
      await addBot(makeText(`✅ *Consulta remarcada!*\n\n📅 Novo dia: ${day}\n🕐 Novo horário: ${timeMapReschedule[btnId]}\n\nVocê receberá lembretes *24h* e *12h* antes da consulta pelo WhatsApp. 🔔`));
      setTimeout(() => backToMenu(), 2500);
      return;
    }

    // Cancelar — confirmação
    if (btnId === 'cancel_yes') {
      setState({ step: 'cancelar_encaixe' });
      await addBot(makeButtons({
        kind: 'buttons', isBot: true,
        text: 'Consulta cancelada. ✅\n\nGostaria de entrar na *lista de espera* caso surja um horário mais cedo?',
        buttons: [
          { id: 'wl_yes', label: '✅ Sim, quero entrar' },
          { id: 'wl_no',  label: '❌ Não, obrigado' },
        ],
      }));
      return;
    }
    if (btnId === 'cancel_no') {
      setState({ step: 'menu' });
      await addBot(makeText('Ok! Sua consulta está *mantida*. 👍'));
      setTimeout(() => backToMenu(), 1500);
      return;
    }

    // Lista de espera
    if (btnId === 'wl_yes') {
      setState({ step: 'final' });
      await addBot(makeText('✅ Você foi adicionado à *lista de espera*.\n\nAvisaremos assim que surgir um horário disponível! 📲'));
      setTimeout(() => backToMenu(), 2500);
      return;
    }
    if (btnId === 'wl_no') {
      setState({ step: 'final' });
      await addBot(makeText('✅ Consulta cancelada.\n\nSe precisar agendar novamente, é só chamar! 😊'));
      setTimeout(() => backToMenu(), 2500);
      return;
    }

    // Da lista de agendamentos
    if (btnId === 'from_list_reschedule') {
      setState({ step: 'reagendar_dia' });
      await addBot(makeButtons({
        kind: 'buttons', isBot: true,
        text: 'Qual o *novo dia* desejado?',
        buttons: [
          { id: 'r_amanha',  label: '📅 Amanhã' },
          { id: 'r_semana',  label: '📅 Essa semana' },
          { id: 'r_proxima', label: '📅 Próxima semana' },
        ],
      }));
      return;
    }
    if (btnId === 'from_list_cancel') {
      setState({ step: 'cancelar_confirmar' });
      await addBot(makeButtons({
        kind: 'buttons', isBot: true,
        text: 'Você deseja *cancelar* sua consulta?',
        buttons: [
          { id: 'cancel_yes', label: '✅ Sim, cancelar' },
          { id: 'cancel_no',  label: '❌ Não, manter' },
        ],
      }));
      return;
    }
  };

  const reset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMessages([]);
    setState({ step: 'menu' });
    setIsTyping(false);
    setIsDisabled(false);
    setTimeout(() => setMessages([makeList(MAIN_MENU_CONTENT)]), 300);
  };

  return (
    <section id="playground" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Simulação interativa
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Experimente o bot agora
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Toque nas opções como o paciente faz — menus e botões nativos do WhatsApp, sem digitar nada.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Phone */}
          <div className="max-w-sm mx-auto w-full">
            <div className="bg-slate-800 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-700">
              {/* Status bar */}
              <div className="flex justify-between items-center px-5 py-1 text-white text-[11px] mb-1">
                <span>9:41</span>
                <span>●●● WiFi 🔋</span>
              </div>

              <div className="bg-white rounded-[2.2rem] overflow-hidden h-[580px] flex flex-col">
                {/* WA header */}
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 flex-shrink-0">
                  <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Clínica Demo</p>
                    <p className="text-xs text-green-300 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      online agora
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <Video size={17} /><Phone size={17} /><MoreVertical size={17} />
                  </div>
                </div>

                {/* Chat */}
                <div
                  ref={chatAreaRef}
                  className="flex-1 overflow-y-auto p-3 space-y-1"
                  style={{ backgroundColor: '#e5ddd5' }}
                  aria-live="polite"
                >
                  <div className="flex justify-center mb-2">
                    <span className="bg-white/80 text-gray-500 text-[10px] px-3 py-1 rounded-full shadow-sm">hoje</span>
                  </div>

                  {messages.map((msg) => {
                    if (msg.kind === 'text')    return <TextBubble    key={msg.id} msg={msg} />;
                    if (msg.kind === 'buttons') return <ButtonsBubble key={msg.id} msg={msg} onPick={onButtonPick} disabled={isDisabled} />;
                    if (msg.kind === 'list')    return <ListBubble    key={msg.id} msg={msg} onPick={onListPick}   disabled={isDisabled} />;
                    return null;
                  })}

                  {isTyping && (
                    <div className="flex justify-start mb-1">
                      <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm">
                        <div className="flex space-x-1 items-center h-3">
                          {[0, 150, 300].map(d => (
                            <div key={d} className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Barra inferior estática (decorativa — sem input real) */}
                <div className="flex-shrink-0 bg-[#f0f0f0] px-3 py-2 flex items-center gap-2 border-t border-gray-200">
                  <div className="flex-1 bg-white rounded-full px-4 py-2 text-[12px] text-gray-400 select-none">
                    Selecione uma opção acima ↑
                  </div>
                  <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center opacity-40">
                    <MessageCircle size={16} className="text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button type="button" onClick={reset} className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-xs transition-colors">
                <RotateCcw size={13} /> Reiniciar simulação
              </button>
            </div>
          </div>

          {/* Painel direito */}
          <div className="space-y-6">
            <div className="bg-[#075E54] rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-3">
                <List size={18} className="text-green-300" />
                <h3 className="font-bold text-base">Menus interativos nativos do WhatsApp</h3>
              </div>
              <p className="text-green-100 text-sm leading-relaxed">
                O paciente nunca precisa digitar. Toca no botão, seleciona da lista e confirma com um toque.
                Menos erros, mais conversões, experiência profissional.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">O que o bot faz de verdade:</h3>
              {[
                ['📋', 'Menu de lista nativo — paciente toca e seleciona, sem digitar'],
                ['🔘', 'Botões de resposta rápida em cada etapa do fluxo'],
                ['📅', 'Agendamento, remarcação e cancelamento com 3 toques'],
                ['👨‍⚕️', 'Transfere para atendente com 1 toque e desativa o bot automaticamente'],
                ['📋', 'Lista os próximos agendamentos do paciente pelo número'],
                ['⏰', 'Lembrete automático 24h e 1h antes com botão de confirmação'],
              ].map(([icon, text], i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-base flex-shrink-0">{icon}</span>
                  <p className="text-sm text-slate-600">{text}</p>
                </div>
              ))}
            </div>

            <a
              href={waLink('playground')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-4 rounded-xl font-bold text-base transition-colors w-full shadow-lg shadow-green-200"
            >
              <MessageCircle size={22} />
              Testar no meu WhatsApp agora
            </a>
            <p className="text-center text-xs text-slate-500">
              Sem compromisso · Configuração em 24h · Suporte incluído
            </p>
          </div>
        </div>

        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-2 rounded-full text-sm">
            ⚠️ Simulação demonstrativa — não envia mensagens reais
          </div>
        </div>
      </div>
    </section>
  );
}
