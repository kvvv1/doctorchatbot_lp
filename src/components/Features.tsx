import React from 'react';
import { 
  MessageCircle, 
  Calendar, 
  Bell, 
  BarChart3, 
  Users, 
  Shield 
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'Confirmação via WhatsApp',
      description: 'Sistema inteligente: 1 para confirmar, 2 para reagendar. Simples para o paciente, eficiente para você.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Calendar,
      title: 'Painel de pendentes',
      description: 'Visualize todos os pedidos em um só lugar. Organize por data, serviço e prioridade com filtros intuitivos.',
      color: 'from-sky-400 to-sky-600'
    },
    {
      icon: Bell,
      title: 'Lembretes inteligentes',
      description: 'Envios automáticos T-24h e T-2h com reenvio se não lido. Reduz significativamente o no-show.',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Relatórios completos',
      description: 'Acompanhe métricas de conversão, horários de pico e performance geral do seu atendimento.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Users,
      title: 'Multiusuário & permissões',
      description: 'Controle de acesso por perfil. Cada membro da equipe vê apenas o que precisa trabalhar.',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      icon: Shield,
      title: 'LGPD-ready',
      description: 'Conformidade total com a Lei Geral de Proteção de Dados. Seus dados e dos pacientes sempre seguros.',
      color: 'from-emerald-400 to-emerald-600'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Recursos que fazem a diferença
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Tudo que você precisa para automatizar agendamentos e focar no que realmente importa: cuidar dos seus pacientes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300"
              >
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent size={24} className="text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-sky-50 to-green-50 rounded-2xl p-8 border border-sky-100">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Quer ver todos esses recursos funcionando?
            </h3>
            <p className="text-slate-600 mb-6">
              Nossa equipe pode fazer uma demonstração personalizada para sua clínica
            </p>
            <a
              href="#playground"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Testar agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;