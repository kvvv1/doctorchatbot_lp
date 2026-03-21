import React, { useState } from 'react';
import { Calculator, TrendingUp } from 'lucide-react';
import { waLink } from '../utils/whatsapp';

const ROICalculator = () => {
  const [consultasMonth, setConsultasMonth] = useState(200);
  const [valorMedio, setValorMedio] = useState(200);
  const [noshowAtual, setNoshowAtual] = useState(18);
  const [noshowComBot, setNoshowComBot] = useState(6);

  const calcularROI = () => {
    const consultasPerdidas = (consultasMonth * noshowAtual) / 100;
    const consultasComBot = (consultasMonth * noshowComBot) / 100;
    const consultasRecuperadas = consultasPerdidas - consultasComBot;
    const valorRecuperado = consultasRecuperadas * valorMedio;
    
    return {
      consultasRecuperadas: Math.round(consultasRecuperadas),
      valorRecuperado: valorRecuperado
    };
  };

  const resultado = calcularROI();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <section id="roi-calculator" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Calcule seu ROI
          </h2>
          <p className="text-xl text-slate-600">
            Descubra quanto o DoctorChatBot pode economizar para sua clínica
          </p>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-green-50 rounded-2xl p-8 shadow-sm border border-sky-100">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator Inputs */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Calculator size={24} className="text-sky-500" />
                <h3 className="text-xl font-semibold text-slate-900">
                  Dados da sua clínica
                </h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Consultas por mês
                  </label>
                  <input
                    type="number"
                    value={consultasMonth}
                    onChange={(e) => setConsultasMonth(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Valor médio por consulta (R$)
                  </label>
                  <input
                    type="number"
                    value={valorMedio}
                    onChange={(e) => setValorMedio(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    No-show atual (%)
                  </label>
                  <input
                    type="number"
                    value={noshowAtual}
                    onChange={(e) => setNoshowAtual(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    No-show com bot (%)
                  </label>
                  <input
                    type="number"
                    value={noshowComBot}
                    onChange={(e) => setNoshowComBot(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={24} className="text-green-500" />
                <h3 className="text-xl font-semibold text-slate-900">
                  Seu potencial de economia
                </h3>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    {resultado.consultasRecuperadas}
                  </div>
                  <div className="text-slate-600">consultas recuperadas por mês</div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-sky-600 mb-2">
                    {formatCurrency(resultado.valorRecuperado)}
                  </div>
                  <div className="text-slate-600">economia mensal</div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-slate-900 mb-2">Resumo anual:</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Consultas recuperadas:</span>
                      <span className="font-medium">{resultado.consultasRecuperadas * 12}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Receita adicional:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(resultado.valorRecuperado * 12)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-500 text-center">
                  * Cálculo baseado na diferença entre taxa de no-show atual e projetada com o bot
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">
              Impressionado com o potencial? Vamos implementar na sua clínica:
            </p>
            <a
              href={waLink(`calculadora_roi_${resultado.consultasRecuperadas}consultas_${formatCurrency(resultado.valorRecuperado)}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Quero implementar agora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;