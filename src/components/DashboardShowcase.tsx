import React, { useState } from 'react';
import { Bell, MessageCircle, Check, X, Search, Filter, BarChart2, Calendar, Users, TrendingUp, ClipboardList } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

// ── Tipos ─────────────────────────────────────────────────────────────────────

type TabId = 'inbox' | 'agenda' | 'lembretes' | 'relatorios';

// ── Mockup: Inbox de agendamentos pendentes ───────────────────────────────────

const requests = [
  { id: 1, name: 'Maria Silva',   phone: '(31) 99999-0001', date: '26/03', time: '09:00', service: 'Consulta Clínica Geral', status: 'pendente' },
  { id: 2, name: 'João Santos',   phone: '(31) 99999-0002', date: '26/03', time: '11:00', service: 'Retorno',                status: 'pendente' },
  { id: 3, name: 'Ana Oliveira',  phone: '(31) 99999-0003', date: '27/03', time: '14:00', service: 'Consulta Cardiologia',  status: 'confirmado' },
  { id: 4, name: 'Pedro Costa',   phone: '(31) 99999-0004', date: '27/03', time: '16:30', service: 'Exame de Rotina',       status: 'pendente' },
];

function InboxMockup() {
  const [approved, setApproved] = useState<number[]>([]);
  const [rejected, setRejected] = useState<number[]>([]);

  const statusOf = (id: number) => {
    if (approved.includes(id)) return 'confirmado';
    if (rejected.includes(id)) return 'cancelado';
    return requests.find(r => r.id === id)?.status ?? 'pendente';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      {/* Browser chrome */}
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-3 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center border border-gray-200 max-w-xs mx-auto">
          app.doctorchatbot.com.br/dashboard/inbox
        </div>
      </div>

      <div className="flex h-72">
        {/* Sidebar */}
        <div className="w-14 bg-[#075E54] flex flex-col items-center py-4 gap-4 flex-shrink-0">
          <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
            <MessageCircle size={16} className="text-white" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <Calendar size={14} className="text-white/70" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <Bell size={14} className="text-white/70" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <BarChart2 size={14} className="text-white/70" />
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800 text-sm">Solicitações</h3>
              <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">
                {requests.filter(r => !approved.includes(r.id) && !rejected.includes(r.id) && r.status === 'pendente').length} pendentes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                <Search size={11} className="text-gray-400" />
                <span className="text-xs text-gray-400">Buscar...</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1">
                <Filter size={11} className="text-gray-400" />
                <span className="text-xs text-gray-400">Filtrar</span>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {requests.map((r) => {
              const s = statusOf(r.id);
              return (
                <div key={r.id} className="px-4 py-2.5 border-b border-gray-50 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-sky-600">{r.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-semibold text-gray-800 truncate">{r.name}</p>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                        s === 'confirmado' ? 'bg-green-100 text-green-700'
                        : s === 'cancelado' ? 'bg-red-100 text-red-600'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {s}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">{r.service} · {r.date} às {r.time}</p>
                  </div>
                  {s === 'pendente' && (
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => setApproved(a => [...a, r.id])}
                        className="w-7 h-7 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center transition-colors"
                        title="Confirmar"
                      >
                        <Check size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setRejected(a => [...a, r.id])}
                        className="w-7 h-7 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg flex items-center justify-center transition-colors"
                        title="Cancelar"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  )}
                  {s === 'confirmado' && (
                    <div className="w-7 h-7 bg-green-100 text-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Check size={13} />
                    </div>
                  )}
                  {s === 'cancelado' && (
                    <div className="w-7 h-7 bg-red-100 text-red-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <X size={13} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mockup: Agenda visual ─────────────────────────────────────────────────────

const agenda = [
  { time: '08:00', name: '',              service: '',                    color: '' },
  { time: '09:00', name: 'Maria Silva',   service: 'Consulta Geral',      color: 'bg-sky-100 border-sky-400 text-sky-800' },
  { time: '10:00', name: '',              service: '',                    color: '' },
  { time: '11:00', name: 'João Santos',   service: 'Retorno',             color: 'bg-purple-100 border-purple-400 text-purple-800' },
  { time: '12:00', name: 'Almoço',        service: '',                    color: 'bg-gray-100 border-gray-300 text-gray-500' },
  { time: '13:00', name: '',              service: '',                    color: '' },
  { time: '14:00', name: 'Ana Oliveira',  service: 'Consulta Cardiologia',color: 'bg-green-100 border-green-400 text-green-800' },
  { time: '15:00', name: '',              service: '',                    color: '' },
  { time: '16:00', name: 'Pedro Costa',   service: 'Exame de Rotina',     color: 'bg-orange-100 border-orange-400 text-orange-800' },
  { time: '17:00', name: '',              service: '',                    color: '' },
];

function AgendaMockup() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-3 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center border border-gray-200 max-w-xs mx-auto">
          app.doctorchatbot.com.br/dashboard/agenda
        </div>
      </div>

      <div className="flex h-72">
        <div className="w-14 bg-[#075E54] flex flex-col items-center py-4 gap-4 flex-shrink-0">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <MessageCircle size={14} className="text-white/70" />
          </div>
          <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
            <Calendar size={16} className="text-white" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <Bell size={14} className="text-white/70" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <BarChart2 size={14} className="text-white/70" />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-gray-800 text-sm">Agenda — Hoje, 26/03</h3>
            </div>
            <div className="bg-sky-500 text-white text-xs px-3 py-1 rounded-lg font-medium cursor-pointer hover:bg-sky-600">
              + Novo agendamento
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
            {agenda.map((slot) => (
              <div key={slot.time} className="flex items-stretch gap-2">
                <span className="text-[10px] text-gray-400 w-10 flex-shrink-0 pt-1 text-right">{slot.time}</span>
                <div className="flex-1">
                  {slot.name ? (
                    <div className={`border-l-2 rounded-r-lg px-2 py-1 ${slot.color}`}>
                      <p className="text-[11px] font-semibold truncate">{slot.name}</p>
                      {slot.service && <p className="text-[10px] opacity-70 truncate">{slot.service}</p>}
                    </div>
                  ) : (
                    <div className="border-l border-dashed border-gray-200 h-5" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mockup: Lembretes ─────────────────────────────────────────────────────────

const reminders = [
  { name: 'Maria Silva',  appt: 'Amanhã 09:00', type: '24h', sent: true,  read: true  },
  { name: 'João Santos',  appt: 'Amanhã 11:00', type: '24h', sent: true,  read: false },
  { name: 'Ana Oliveira', appt: 'Hoje 14:00',   type: '12h', sent: true,  read: true  },
  { name: 'Pedro Costa',  appt: 'Hoje 16:30',   type: '2h',  sent: false, read: false },
];

function LembretesMockup() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-3 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center border border-gray-200 max-w-xs mx-auto">
          app.doctorchatbot.com.br/dashboard/lembretes
        </div>
      </div>

      <div className="flex h-72">
        <div className="w-14 bg-[#075E54] flex flex-col items-center py-4 gap-4 flex-shrink-0">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <MessageCircle size={14} className="text-white/70" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <Calendar size={14} className="text-white/70" />
          </div>
          <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
            <Bell size={16} className="text-white" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <BarChart2 size={14} className="text-white/70" />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
            <h3 className="font-semibold text-gray-800 text-sm">Lembretes automáticos</h3>
            <div className="flex gap-2">
              {['24h', '12h', '2h'].map(t => (
                <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{t}</span>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {reminders.map((r, i) => (
              <div key={i} className="px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bell size={13} className="text-orange-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-gray-800">{r.name}</p>
                    <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">T-{r.type}</span>
                  </div>
                  <p className="text-[11px] text-gray-500">{r.appt}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  {r.sent ? (
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-[10px] text-green-600 font-medium flex items-center gap-1">
                        <Check size={10} /> Enviado
                      </span>
                      <span className={`text-[10px] ${r.read ? 'text-blue-500' : 'text-gray-400'}`}>
                        {r.read ? '✓✓ Lido' : '✓ Entregue'}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-gray-400">Agendado</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-[10px] text-gray-600">3 enviados</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-[10px] text-gray-600">2 lidos (66%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-gray-300 rounded-full" />
              <span className="text-[10px] text-gray-600">1 pendente</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mockup: Relatórios ────────────────────────────────────────────────────────

function RelatoriosMockup() {
  const bars = [
    { label: 'Seg', value: 72, color: 'bg-sky-400' },
    { label: 'Ter', value: 85, color: 'bg-sky-500' },
    { label: 'Qua', value: 60, color: 'bg-sky-400' },
    { label: 'Qui', value: 91, color: 'bg-sky-600' },
    { label: 'Sex', value: 78, color: 'bg-sky-500' },
    { label: 'Sáb', value: 45, color: 'bg-sky-300' },
  ];

  const funnel = [
    { label: 'Conversas',   value: 142, pct: 100, color: 'bg-slate-400' },
    { label: 'Solicitaram', value: 98,  pct: 69,  color: 'bg-sky-400' },
    { label: 'Confirmados', value: 87,  pct: 61,  color: 'bg-green-400' },
    { label: 'Compareceram',value: 81,  pct: 57,  color: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 flex items-center gap-3 border-b border-gray-200">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-400 text-center border border-gray-200 max-w-xs mx-auto">
          app.doctorchatbot.com.br/dashboard/relatorios
        </div>
      </div>

      <div className="flex h-72">
        <div className="w-14 bg-[#075E54] flex flex-col items-center py-4 gap-4 flex-shrink-0">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <MessageCircle size={14} className="text-white/70" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <Calendar size={14} className="text-white/70" />
          </div>
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
            <Bell size={14} className="text-white/70" />
          </div>
          <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
            <BarChart2 size={16} className="text-white" />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center justify-between bg-white flex-shrink-0">
            <h3 className="font-semibold text-gray-800 text-sm">Relatórios — Março 2025</h3>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={13} />
              <span className="text-xs font-semibold">+18% vs fev</span>
            </div>
          </div>

          <div className="flex-1 overflow-hidden px-4 py-3 grid grid-cols-2 gap-4">
            {/* Bar chart */}
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Agendamentos / semana</p>
              <div className="flex items-end gap-1.5 h-20">
                {bars.map(b => (
                  <div key={b.label} className="flex-1 flex flex-col items-center gap-0.5">
                    <div
                      className={`w-full ${b.color} rounded-t`}
                      style={{ height: `${b.value}%` }}
                    />
                    <span className="text-[8px] text-gray-400">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel */}
            <div>
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">Funil de conversão</p>
              <div className="space-y-1.5">
                {funnel.map(f => (
                  <div key={f.label}>
                    <div className="flex justify-between mb-0.5">
                      <span className="text-[9px] text-gray-600">{f.label}</span>
                      <span className="text-[9px] font-bold text-gray-800">{f.value}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${f.color} rounded-full`} style={{ width: `${f.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI cards */}
            <div className="col-span-2 grid grid-cols-3 gap-2">
              {[
                { icon: Users,     label: 'Pacientes',  value: '142',  sub: 'este mês' },
                { icon: Check,     label: 'Taxa conf.', value: '94%',  sub: 'confirmados' },
                { icon: TrendingUp,label: 'No-show',    value: '6%',   sub: 'abaixo da média' },
              ].map(({ icon: Icon, label, value, sub }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-2 text-center">
                  <Icon size={13} className="mx-auto mb-0.5 text-sky-500" />
                  <p className="text-[11px] font-bold text-gray-800">{value}</p>
                  <p className="text-[8px] text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tabs config ───────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; icon: LucideIcon; iconColor: string; description: string; bullets: { color: string; text: string }[]; mockup: React.ReactNode }[] = [
  {
    id: 'inbox',
    label: 'Solicitações',
    icon: ClipboardList,
    iconColor: 'text-sky-500',
    description: 'Todos os pedidos de agendamento chegam aqui. Confirme ou cancele com um clique — o paciente recebe a resposta no WhatsApp automaticamente.',
    bullets: [
      { color: 'bg-sky-500',   text: 'Aprovação em 1 clique com notificação automática' },
      { color: 'bg-sky-500',   text: 'Filtro por data, serviço e status' },
      { color: 'bg-sky-500',   text: 'Busca rápida por nome do paciente' },
    ],
    mockup: <InboxMockup />,
  },
  {
    id: 'agenda',
    label: 'Agenda',
    icon: Calendar,
    iconColor: 'text-purple-500',
    description: 'Visualize o dia completo com todos os horários ocupados e livres. Crie agendamentos manuais ou integre com Google Calendar.',
    bullets: [
      { color: 'bg-purple-500', text: 'Visão diária, semanal e mensal' },
      { color: 'bg-purple-500', text: 'Integração Google Calendar' },
      { color: 'bg-purple-500', text: 'Slots disponíveis alimentam o bot automaticamente' },
    ],
    mockup: <AgendaMockup />,
  },
  {
    id: 'lembretes',
    label: 'Lembretes',
    icon: Bell,
    iconColor: 'text-orange-500',
    description: 'Lembretes automáticos 24h e 12h antes da consulta. Se o paciente não ler, o sistema reenvia. Tudo rastreado com status de leitura.',
    bullets: [
      { color: 'bg-orange-500', text: 'Envio automático T-24h e T-12h' },
      { color: 'bg-orange-500', text: 'Reenvio inteligente se não lido' },
      { color: 'bg-orange-500', text: 'Status de entrega e leitura em tempo real' },
    ],
    mockup: <LembretesMockup />,
  },
  {
    id: 'relatorios',
    label: 'Relatórios',
    icon: BarChart2,
    iconColor: 'text-emerald-500',
    description: 'Acompanhe a taxa de conversão, comparecimento e horários de pico. Dados que ajudam a otimizar a agenda e reduzir no-show.',
    bullets: [
      { color: 'bg-emerald-500', text: 'Funil: conversa → agendado → confirmado → compareceu' },
      { color: 'bg-emerald-500', text: 'Gráfico de agendamentos por dia da semana' },
      { color: 'bg-emerald-500', text: 'Taxa de no-show e comparativo mensal' },
    ],
    mockup: <RelatoriosMockup />,
  },
];

// ── Main component ────────────────────────────────────────────────────────────

const DashboardShowcase = () => {
  const [active, setActive] = useState<TabId>('inbox');
  const tab = TABS.find(t => t.id === active)!;

  return (
    <section id="dashboard" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BarChart2 size={15} />
            Painel de controle
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Tudo numa tela, aprovação em 1 clique
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Sua equipe vê todos os agendamentos, confirma, cancela e acompanha lembretes — sem sair do painel.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="-mb-px flex gap-1 overflow-x-auto" role="tablist">
            {TABS.map(t => {
              const Icon = t.icon;
              const isActive = active === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(t.id)}
                  role="tab"
                  aria-selected={isActive}
                  className={`flex items-center gap-2 py-2.5 px-4 border-b-2 font-medium text-sm whitespace-nowrap transition-colors rounded-t-lg ${
                    isActive
                      ? 'border-sky-500 text-slate-800 bg-sky-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={15} className={isActive ? t.iconColor : 'text-gray-400'} />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Mockup — maior */}
          <div className="lg:col-span-3">
            {tab.mockup}
          </div>

          {/* Text */}
          <div className="lg:col-span-2 space-y-5">
            <p className="text-base text-slate-600 leading-relaxed">{tab.description}</p>
            <ul className="space-y-3">
              {tab.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${b.color}`} />
                  <span className="text-slate-600 text-sm">{b.text}</span>
                </li>
              ))}
            </ul>

            <a
              href={waLink('dashboard')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl font-semibold text-sm transition-colors w-full justify-center mt-4"
            >
              <MessageCircle size={16} />
              Quero ver uma demo ao vivo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardShowcase;
