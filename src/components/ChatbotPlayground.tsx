import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, RotateCcw, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

type ChatStep =
  | 'menu'
  | 'agendar_nome'
  | 'agendar_dia'
  | 'agendar_hora'
  | 'reagendar_dia'
  | 'reagendar_hora'
  | 'cancelar_confirmar'
  | 'cancelar_encaixe'
  | 'atendente'
  | 'ver_agendamentos'
  | 'confirmar_presenca'
  | 'final';

interface ChatState {
  step: ChatStep;
  name?: string;
  day?: string;
  time?: string;
}

const MENU_TEXT = `Olá! 👋 Sou o assistente virtual da *Clínica Demo*.

Como posso te ajudar hoje?

1️⃣ Agendar uma consulta
2️⃣ Remarcar consulta
3️⃣ Cancelar consulta
4️⃣ Falar com atendente
5️⃣ Ver meus agendamentos

Digite o número da opção ou descreva o que precisa. 😊`;

const DEMO_APPOINTMENTS = [
  { date: '25/03/2025', time: '14:00', status: 'Aguardando confirmação ⏳' },
  { date: '10/04/2025', time: '09:30', status: 'Confirmada ✅' },
];

const ChatbotPlayground = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>({ step: 'menu' });
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const addBotMessage = useCallback((text: string, delay = 900) => {
    setIsTyping(true);
    setIsDisabled(true);
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { id: `${Date.now()}-${Math.random()}`, text, isBot: true, timestamp: new Date() },
        ]);
        setIsTyping(false);
        setIsDisabled(false);
        resolve();
      }, delay);
    });
  }, []);

  const addUserMessage = useCallback((text: string) => {
    setMessages(prev => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, text, isBot: false, timestamp: new Date() },
    ]);
  }, []);

  // Inicializa o chat
  useEffect(() => {
    addBotMessage(MENU_TEXT, 600);
  }, []);

  const handleInput = (text: string, stateOverride?: Partial<ChatState>) => {
    if (isDisabled || !text.trim()) return;
    addUserMessage(text.trim());
    setInputValue('');
    processMessage(text.trim(), stateOverride);
  };

  const processMessage = async (text: string, stateOverride?: Partial<ChatState>) => {
    const currentStep = stateOverride?.step ?? chatState.step;
    const currentState = { ...chatState, ...stateOverride };

    setIsDisabled(true);

    switch (currentStep) {
      case 'menu': {
        const n = text.toLowerCase();
        if (n === '1' || n.includes('agendar') || n.includes('marcar')) {
          setChatState({ step: 'agendar_nome' });
          await addBotMessage('Ótimo! Vou agendar sua consulta. 😊\n\nPor favor, me informe seu *nome completo*:');
        } else if (n === '2' || n.includes('remarcar') || n.includes('reagendar')) {
          setChatState({ step: 'reagendar_dia' });
          await addBotMessage('Entendido! Vou remarcar sua consulta.\n\nQual o *novo dia* desejado?\n(ex: 28/03 ou quinta-feira)');
        } else if (n === '3' || n.includes('cancelar') || n.includes('desmarcar')) {
          setChatState({ step: 'cancelar_confirmar' });
          await addBotMessage('Você deseja *cancelar* sua consulta?\n\nDigite *SIM* para confirmar ou *NÃO* para voltar ao menu.');
        } else if (n === '4' || n.includes('atendente') || n.includes('humano') || n.includes('pessoa')) {
          setChatState({ step: 'atendente' });
          await addBotMessage('Certo! Vou transferir você para um de nossos *atendentes*. 👨‍⚕️\n\n⏳ Aguarde um momento, alguém da nossa equipe entrará em contato em breve.\n\nHorário de atendimento: *Segunda a Sexta, 8h às 18h*');
          setTimeout(async () => {
            await addBotMessage('✅ *Atendente conectado!*\n\n_Esta é uma simulação. No sistema real, um humano assumiria a conversa agora e o bot seria desativado automaticamente._ 💬', 1200);
          }, 500);
        } else if (n === '5' || n.includes('ver') || n.includes('minha consulta') || n.includes('agendamento')) {
          setChatState({ step: 'ver_agendamentos' });
          await addBotMessage('🔍 Buscando seus agendamentos...');
          setTimeout(async () => {
            const lines = DEMO_APPOINTMENTS.map(
              (a, i) => `${i + 1}. 📅 ${a.date} às ${a.time} — ${a.status}`
            ).join('\n');
            await addBotMessage(`Seus próximos agendamentos: 📋\n\n${lines}\n\nPrecisa remarcar ou cancelar?\n1️⃣ Remarcar   2️⃣ Cancelar   3️⃣ Menu principal`, 1000);
          }, 300);
        } else {
          await addBotMessage('Desculpe, não entendi. Por favor, escolha uma das opções:\n\n1️⃣ Agendar consulta\n2️⃣ Remarcar consulta\n3️⃣ Cancelar consulta\n4️⃣ Falar com atendente\n5️⃣ Ver meus agendamentos');
        }
        break;
      }

      case 'agendar_nome': {
        const name = text.trim();
        setChatState(prev => ({ ...prev, step: 'agendar_dia', name }));
        await addBotMessage(`Obrigado, *${name}*! 👍\n\nQual dia você prefere para a consulta?\nPode digitar a data (ex: 25/03) ou o dia da semana (ex: segunda-feira).`);
        break;
      }

      case 'agendar_dia': {
        const day = text.trim();
        setChatState(prev => ({ ...prev, step: 'agendar_hora', day }));
        await addBotMessage(`Perfeito! Anotei o dia *${day}*.\n\nQual horário você prefere?\n(ex: 14h ou 14:30)`);
        break;
      }

      case 'agendar_hora': {
        const time = text.trim();
        const name = currentState.name || 'Paciente';
        const day = currentState.day || 'a definir';
        setChatState(prev => ({ ...prev, step: 'final', time }));
        await addBotMessage(`✅ *Consulta agendada com sucesso!*\n\n📋 Paciente: ${name}\n📅 Data: ${day}\n🕐 Horário: ${time}\n\nSua solicitação foi enviada como *pendente* para o painel da clínica.\nNossa equipe irá confirmar em breve. 🏥`);
        setTimeout(async () => {
          await addBotMessage('Posso ajudar em mais alguma coisa?\n\n1️⃣ Voltar ao menu principal', 1000);
          setChatState({ step: 'final' });
        }, 300);
        break;
      }

      case 'reagendar_dia': {
        const day = text.trim();
        setChatState(prev => ({ ...prev, step: 'reagendar_hora', day }));
        await addBotMessage(`Novo dia anotado: *${day}*\n\nQual o *novo horário*?\n(ex: 15h ou 15:30)`);
        break;
      }

      case 'reagendar_hora': {
        const time = text.trim();
        const day = currentState.day || 'a definir';
        setChatState({ step: 'final' });
        await addBotMessage(`✅ *Consulta remarcada com sucesso!*\n\n📅 Novo dia: ${day}\n🕐 Novo horário: ${time}\n\nEm breve nossa equipe confirmará a alteração. Obrigado! 😊`);
        setTimeout(async () => {
          await addBotMessage('Posso ajudar em mais alguma coisa?\n\n1️⃣ Voltar ao menu principal', 1000);
        }, 300);
        break;
      }

      case 'cancelar_confirmar': {
        const n = text.toLowerCase();
        const yes = n === 'sim' || n === 's' || n.includes('confirmo') || n.includes('ok');
        const no = n === 'não' || n === 'nao' || n === 'n';
        if (yes) {
          setChatState({ step: 'cancelar_encaixe' });
          await addBotMessage('Consulta cancelada. ✅\n\nGostaria de entrar na *lista de espera* caso surja um horário mais cedo?\n\nDigite *SIM* ou *NÃO*');
        } else if (no) {
          setChatState({ step: 'menu' });
          await addBotMessage('Ok! Sua consulta está *mantida*. 👍\n\nPosso ajudar em algo mais?');
        } else {
          await addBotMessage('Não entendi. Por favor, digite *SIM* para cancelar ou *NÃO* para manter sua consulta.');
        }
        break;
      }

      case 'cancelar_encaixe': {
        const n = text.toLowerCase();
        const yes = n === 'sim' || n === 's' || n.includes('ok');
        const no = n === 'não' || n === 'nao' || n === 'n';
        if (yes) {
          setChatState({ step: 'final' });
          await addBotMessage('✅ Consulta cancelada com sucesso.\n\nVocê foi adicionado à *lista de espera*. Avisaremos assim que surgir um horário disponível! 📲');
        } else if (no) {
          setChatState({ step: 'final' });
          await addBotMessage('✅ Consulta cancelada.\n\nSe precisar agendar novamente no futuro, é só chamar! Obrigado. 😊');
        } else {
          await addBotMessage('Por favor, digite *SIM* ou *NÃO*');
        }
        break;
      }

      case 'ver_agendamentos': {
        const n = text.toLowerCase();
        if (n === '1' || n.includes('remarcar')) {
          setChatState({ step: 'reagendar_dia' });
          await addBotMessage('Entendido! Qual o *novo dia* desejado?\n(ex: 28/03 ou quinta-feira)');
        } else if (n === '2' || n.includes('cancelar')) {
          setChatState({ step: 'cancelar_confirmar' });
          await addBotMessage('Você deseja *cancelar* sua consulta?\n\nDigite *SIM* para confirmar ou *NÃO* para voltar ao menu.');
        } else {
          setChatState({ step: 'menu' });
          await addBotMessage(MENU_TEXT);
        }
        break;
      }

      case 'atendente':
      case 'confirmar_presenca':
      case 'final': {
        // Qualquer mensagem volta ao menu
        setChatState({ step: 'menu' });
        await addBotMessage(MENU_TEXT);
        break;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleInput(inputValue);
  };

  const resetSimulation = () => {
    setMessages([]);
    setChatState({ step: 'menu' });
    setIsTyping(false);
    setIsDisabled(false);
    setInputValue('');
    setTimeout(() => addBotMessage(MENU_TEXT, 400), 100);
  };

  const getQuickReplies = (): { label: string; value: string }[] => {
    switch (chatState.step) {
      case 'menu':
        return [
          { label: '1️⃣ Agendar consulta', value: '1' },
          { label: '2️⃣ Remarcar', value: '2' },
          { label: '3️⃣ Cancelar', value: '3' },
          { label: '4️⃣ Atendente', value: '4' },
          { label: '5️⃣ Meus agendamentos', value: '5' },
        ];
      case 'agendar_dia':
        return [
          { label: 'Hoje', value: 'Hoje' },
          { label: 'Amanhã', value: 'Amanhã' },
          { label: 'Próxima segunda', value: 'Próxima segunda' },
          { label: 'Próxima terça', value: 'Próxima terça' },
        ];
      case 'agendar_hora':
      case 'reagendar_hora':
        return [
          { label: '09:00', value: '09:00' },
          { label: '11:00', value: '11:00' },
          { label: '14:00', value: '14:00' },
          { label: '16:30', value: '16:30' },
        ];
      case 'cancelar_confirmar':
      case 'cancelar_encaixe':
      case 'confirmar_presenca':
        return [
          { label: '✅ Sim', value: 'Sim' },
          { label: '❌ Não', value: 'Não' },
        ];
      case 'reagendar_dia':
        return [
          { label: 'Amanhã', value: 'Amanhã' },
          { label: 'Próxima quarta', value: 'Próxima quarta' },
          { label: 'Próxima sexta', value: 'Próxima sexta' },
        ];
      case 'ver_agendamentos':
        return [
          { label: '1️⃣ Remarcar', value: '1' },
          { label: '2️⃣ Cancelar', value: '2' },
          { label: '3️⃣ Menu', value: '3' },
        ];
      case 'atendente':
      case 'final':
        return [{ label: '↩️ Voltar ao menu', value: 'menu' }];
      default:
        return [];
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  const renderText = (text: string) => {
    const parts = text.split(/(\*[^*]+\*|_[^_]+_)/g);
    return parts.map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <strong key={i}>{part.slice(1, -1)}</strong>;
      }
      if (part.startsWith('_') && part.endsWith('_')) {
        return <em key={i}>{part.slice(1, -1)}</em>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  const quickReplies = getQuickReplies();

  return (
    <section id="playground" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Simulação interativa
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Experimente o bot agora
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Esta é a experiência real do paciente no WhatsApp. Interaja como se fosse ele.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Phone Mockup */}
          <div className="max-w-sm mx-auto w-full">
            {/* Phone Frame */}
            <div className="bg-slate-800 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-700">
              {/* Status bar */}
              <div className="flex justify-between items-center px-5 py-1 text-white text-xs mb-1">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <span>●●●</span>
                  <span>WiFi</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="bg-white rounded-[2.2rem] overflow-hidden h-[580px] flex flex-col">
                {/* WhatsApp Header */}
                <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight">Clínica Demo</p>
                    <p className="text-xs text-green-300">online agora</p>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Video size={18} />
                    <Phone size={18} />
                    <MoreVertical size={18} />
                  </div>
                </div>

                {/* Chat background */}
                <div
                  className="flex-1 overflow-y-auto p-3 space-y-1"
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5ddd5' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    backgroundColor: '#e5ddd5',
                  }}
                  aria-live="polite"
                >
                  {/* Date divider */}
                  <div className="flex justify-center mb-2">
                    <span className="bg-white/80 text-gray-500 text-xs px-3 py-1 rounded-full shadow-sm">
                      hoje
                    </span>
                  </div>

                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} mb-1`}
                    >
                      <div
                        className={`max-w-[82%] px-3 py-2 rounded-lg shadow-sm text-sm ${
                          message.isBot
                            ? 'bg-white text-gray-800 rounded-tl-none'
                            : 'bg-[#dcf8c6] text-gray-800 rounded-tr-none'
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed text-[13px]">
                          {renderText(message.text)}
                        </p>
                        <div className={`flex items-center gap-1 mt-0.5 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                          <span className="text-[10px] text-gray-400">
                            {formatTime(message.timestamp)}
                          </span>
                          {!message.isBot && (
                            <span className="text-[10px] text-blue-500">✓✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start mb-1">
                      <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm">
                        <div className="flex space-x-1 items-center">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <div className="bg-[#f0f0f0] px-2 py-2 flex items-center gap-2">
                  <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={isDisabled}
                      placeholder="Digite uma mensagem..."
                      className="flex-1 text-sm outline-none bg-transparent text-gray-800 placeholder-gray-400 disabled:opacity-50"
                      aria-label="Campo de mensagem"
                    />
                  </div>
                  <button
                    onClick={() => handleInput(inputValue)}
                    disabled={isDisabled || !inputValue.trim()}
                    className="w-10 h-10 bg-[#25D366] hover:bg-[#20ba5a] disabled:opacity-40 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label="Enviar mensagem"
                  >
                    <Send size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Reset button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={resetSimulation}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm transition-colors"
              >
                <RotateCcw size={14} />
                Reiniciar simulação
              </button>
            </div>
          </div>

          {/* Right panel: Quick Replies + Info */}
          <div className="space-y-6">
            {/* Quick replies */}
            {quickReplies.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#25D366] rounded-full"></span>
                  Respostas rápidas (clique para enviar)
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply.value}
                      onClick={() => !isDisabled && handleInput(reply.label, { step: chatState.step })}
                      disabled={isDisabled}
                      className="bg-white border-2 border-[#25D366] text-[#075E54] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#25D366] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Feature callouts */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
              <h3 className="font-bold text-slate-900 text-base">O que o bot faz de verdade:</h3>

              <div className="space-y-3">
                {[
                  { icon: '📅', text: 'Agenda consultas pelo WhatsApp 24h por dia, sem precisar de atendente' },
                  { icon: '🔄', text: 'Remarca e cancela com confirmação automática via mensagem' },
                  { icon: '👨‍⚕️', text: 'Transfere para atendente humano e desativa o bot automaticamente' },
                  { icon: '📋', text: 'Mostra os próximos agendamentos do paciente' },
                  { icon: '⏰', text: 'Envia lembretes automáticos 24h e 1h antes da consulta' },
                  { icon: '✅', text: 'Solicita confirmação de presença para reduzir no-show' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
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

        {/* Disclaimer */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-700 border border-yellow-200 px-4 py-2 rounded-full text-sm">
            <span>⚠️</span>
            Simulação demonstrativa — não envia mensagens reais ao WhatsApp
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotPlayground;
