import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Dr. Carlos Mendes',
      role: 'Diretor Clínico',
      company: 'Clínica São Paulo',
      avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=faces',
      content: 'O DoctorChatBot reduziu nosso no-show em 78%. Agora conseguimos atender mais pacientes sem contratar mais pessoal. A equipe adora a praticidade do painel.',
      rating: 5,
      speciality: 'Dermatologia'
    },
    {
      name: 'Dra. Marina Silva',
      role: 'Proprietária',
      company: 'Fisio+ Rehabilitation',
      avatar: 'https://images.pexels.com/photos/5452292/pexels-photo-5452292.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=faces',
      content: 'Impressionante como nossos pacientes se adaptaram rapidamente. O bot é tão natural que muitos acham que estão falando com uma pessoa. Os lembretes automáticos são um game changer.',
      rating: 5,
      speciality: 'Fisioterapia'
    },
    {
      name: 'Dr. Roberto Costa',
      role: 'Coordenador',
      company: 'OdontoCenter',
      avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=faces',
      content: 'Economizamos 5 minutos por agendamento. Em uma clínica com 300 agendamentos/mês, isso representa 25 horas que investimos no atendimento. ROI incrível.',
      rating: 5,
      speciality: 'Odontologia'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Centenas de clínicas já transformaram seus agendamentos com o DoctorChatBot
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 relative"
            >
              {/* Quote icon */}
              <div className="absolute -top-3 left-6">
                <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                  <Quote size={12} className="text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 mt-2">
                {renderStars(testimonial.rating)}
              </div>

              {/* Content */}
              <blockquote className="text-slate-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold text-slate-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-600">
                    {testimonial.role}, {testimonial.company}
                  </div>
                  <div className="text-xs text-sky-600 font-medium">
                    {testimonial.speciality}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-sky-600 mb-2">300+</div>
            <div className="text-slate-600 text-sm">Clínicas ativas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">78%</div>
            <div className="text-slate-600 text-sm">Redução no-show</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">5min</div>
            <div className="text-slate-600 text-sm">Economia/agendamento</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.8/5</div>
            <div className="text-slate-600 text-sm">Avaliação média</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;