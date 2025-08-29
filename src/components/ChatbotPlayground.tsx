import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, RotateCcw } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatState {
  step: 'welcome' | 'action' | 'service' | 'date' | 'time' | 'confirm' | 'final';
  selectedAction?: string;
  selectedService?: string;
  selectedDate?: string;
  selectedTime?: string;
}

const ChatbotPlayground = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatState, setChatState] = useState<ChatState>({ step: 'welcome' });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    addBotMessage('Olá! Sou o DoctorChatBot. Posso ajudar a agendar sua consulta?');
  }, []);

  const addBotMessage = (text: string, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleQuickReply = (text: string, nextStep: string, value?: string) => {
    addUserMessage(text);

    switch (nextStep) {
      case 'service':
        setChatState(prev => ({ ...prev, step: 'service', selectedAction: value }));
        setTimeout(() => {
          addBotMessage('Perfeito! Para qual especialidade você gostaria de agendar?');
        }, 500);
        break;
      case 'date':
        setChatState(prev => ({ ...prev, step: 'date', selectedService: value }));
        setTimeout(() => {
          addBotMessage(`Ótimo! ${value} é uma excelente escolha. Qual data você prefere?`);
        }, 500);
        break;
      case 'time':
        setChatState(prev => ({ ...prev, step: 'time', selectedDate: value }));
        setTimeout(() => {
          addBotMessage(`Perfeito! Para ${value}, temos os seguintes horários disponíveis:`);
        }, 500);
        break;
      case 'confirm':
        setChatState(prev => ({ ...prev, step: 'confirm', selectedTime: value }));
        setTimeout(() => {
          const { selectedService, selectedDate, selectedTime } = chatState;
          addBotMessage(`Vou confirmar seus dados:\n\n📅 Especialidade: ${selectedService}\n📅 Data: ${selectedDate}\n🕐 Horário: ${value}\n\nPosso confirmar o agendamento?`);
        }, 500);
        break;
      case 'final':
        setChatState(prev => ({ ...prev, step: 'final' }));
        setTimeout(() => {
          addBotMessage('Pronto! Seu pedido foi enviado como pendente para aprovação no painel. Você receberá a confirmação no WhatsApp em breve.');
        }, 1000);
        break;
      case 'attendant':
        setTimeout(() => {
          addBotMessage('Vou transferir você para um dos nossos atendentes. Aguarde um momento...');
        }, 500);
        break;
    }
  };

  const resetSimulation = () => {
    setMessages([]);
    setChatState({ step: 'welcome' });
    setIsTyping(false);
    setTimeout(() => {
      addBotMessage('Olá! Sou o DoctorChatBot. Posso ajudar a agendar sua consulta?');
    }, 500);
  };

  const renderQuickReplies = () => {
    switch (chatState.step) {
      case 'welcome':
        return (
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => handleQuickReply('Agendar consulta', 'service', 'agendar')}
              className="bg-sky-500 text-white px-4 py-2 rounded-full text-sm hover:bg-sky-600 transition-colors"
              role="button"
              aria-pressed="false"
            >
              Agendar consulta
            </button>
            <button
              onClick={() => handleQuickReply('Falar com atendente', 'attendant')}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-300 transition-colors"
              role="button"
              aria-pressed="false"
            >
              Falar com atendente
            </button>
          </div>
        );
      
      case 'service':
        return (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {['Dermatologia', 'Odontologia', 'Fisioterapia', 'Outro'].map((service) => (
              <button
                key={service}
                onClick={() => handleQuickReply(service, 'date', service)}
                className="bg-green-500 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors"
                role="button"
                aria-pressed="false"
              >
                {service}
              </button>
            ))}
          </div>
        );

      case 'date':
        return (
          <div className="flex flex-wrap gap-2 mt-4">
            {['Hoje', 'Amanhã', 'Próxima terça'].map((date) => (
              <button
                key={date}
                onClick={() => handleQuickReply(date, 'time', date)}
                className="bg-sky-500 text-white px-4 py-2 rounded-full text-sm hover:bg-sky-600 transition-colors"
                role="button"
                aria-pressed="false"
              >
                {date}
              </button>
            ))}
          </div>
        );

      case 'time':
        return (
          <div className="flex flex-wrap gap-2 mt-4">
            {['09:00', '15:30', '17:00'].map((time) => (
              <button
                key={time}
                onClick={() => handleQuickReply(time, 'confirm', time)}
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition-colors"
                role="button"
                aria-pressed="false"
              >
                {time}
              </button>
            ))}
          </div>
        );

      case 'confirm':
        return (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => handleQuickReply('Confirmar', 'final')}
              className="bg-green-500 text-white px-6 py-2 rounded-full text-sm hover:bg-green-600 transition-colors"
              role="button"
              aria-pressed="false"
            >
              ✅ Confirmar
            </button>
            <button
              onClick={() => resetSimulation()}
              className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full text-sm hover:bg-gray-300 transition-colors"
              role="button"
              aria-pressed="false"
            >
              🔄 Reagendar
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="playground" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Veja o chatbot em ação
          </h2>
          <p className="text-xl text-slate-600 mb-4">
            Simule a conversa como se fosse o paciente. Ao final, o pedido vai para Pendentes no painel.
          </p>
          
          {/* Disclaimer Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            Apenas simulação — não envia mensagens reais
          </div>
        </div>

        {/* Smartphone Mock */}
        <div className="max-w-md mx-auto">
          <div className="bg-gray-900 rounded-3xl p-2 shadow-2xl">
            <div className="bg-white rounded-2xl h-[600px] flex flex-col">
              {/* Phone Header */}
              <div className="bg-green-500 text-white p-4 rounded-t-2xl flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle size={20} className="text-green-500" />
                </div>
                <div>
                  <p className="font-semibold">DoctorChatBot</p>
                  <p className="text-sm text-green-100">online</p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    </div>
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Replies */}
              <div className="p-4 border-t border-gray-100">
                {renderQuickReplies()}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={resetSimulation}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors"
              aria-label="Resetar simulação"
            >
              <RotateCcw size={18} />
              Resetar simulação
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href={waLink('playground')}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center gap-2"
          >
            <MessageCircle size={20} />
            Pedir teste no meu número
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChatbotPlayground;