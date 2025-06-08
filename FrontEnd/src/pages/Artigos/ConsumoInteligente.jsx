import React from "react";
import Navbar from "../Navbar";
import Footer from "../footer";

export default function ConsumoInteligente() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <Link
          to="/artigos"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar aos Artigos
        </Link>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white rounded-3xl p-12 mb-8">
            <h1 className="text-5xl font-bold mb-6">Consumo Inteligente</h1>
            <p className="text-xl leading-relaxed">
              Transforme seu lar em um ambiente de consumo inteligente e
              eficiente com tecnologia e estratégias modernas
            </p>
          </div>

          <img
            src="../assets/imagem5.png"
            alt="Casa inteligente com dispositivos conectados para consumo eficiente"
            className="w-full max-w-3xl mx-auto rounded-2xl shadow-xl"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <article className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                O Futuro da Economia Doméstica
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A revolução tecnológica chegou às nossas casas, e com ela, a
                possibilidade de criar um ambiente de consumo verdadeiramente
                inteligente. Através de dispositivos conectados, automação
                residencial e análise de dados, é possível reduzir
                significativamente os gastos com energia enquanto aumenta o
                conforto e a praticidade do dia a dia.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <p className="text-blue-800 font-semibold">
                  Sabia que casas inteligentes podem reduzir até 30% do consumo
                  de energia?
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Dispositivos Essenciais para Casa Inteligente
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">
                    Termostatos Inteligentes
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Controle automático da temperatura baseado em horários,
                    presença e preferências, resultando em economia de até 25%
                    no aquecimento e refrigeração.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Programação por horários</li>
                    <li>• Detecção de presença</li>
                    <li>• Controle remoto via app</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    Iluminação LED Inteligente
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Lâmpadas que se ajustam automaticamente à luz natural, criam
                    ambientes personalizados e podem ser controladas
                    remotamente.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Ajuste automático de intensidade</li>
                    <li>• Múltiplas cores e tons</li>
                    <li>• Programação inteligente</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100">
                  <h3 className="text-xl font-semibold text-purple-800 mb-4">
                    Tomadas Inteligentes
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Monitore e controle o consumo de cada aparelho, programando
                    horários de funcionamento e eliminando o consumo fantasma.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Monitoramento de consumo</li>
                    <li>• Programação de horários</li>
                    <li>• Desligamento automático</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100">
                  <h3 className="text-xl font-semibold text-orange-800 mb-4">
                    Sensores de Movimento
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Automação baseada em presença que liga e desliga
                    dispositivos automaticamente, garantindo que nada fique
                    ligado desnecessariamente.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Detecção de presença</li>
                    <li>• Automação de iluminação</li>
                    <li>• Integração com outros dispositivos</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Estratégias de Automação
              </h2>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Programação por Horários
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Configure seus dispositivos para funcionar nos horários de
                    maior eficiência energética e menor custo da energia
                    elétrica.
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-green-600 mb-2">
                        Manhã (6h-9h)
                      </h4>
                      <p className="text-sm text-gray-600">
                        Aquecimento gradual, iluminação suave, preparação
                        automática do café
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-blue-600 mb-2">
                        Tarde (12h-18h)
                      </h4>
                      <p className="text-sm text-gray-600">
                        Aproveitamento da luz natural, climatização eficiente
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-semibold text-purple-600 mb-2">
                        Noite (19h-23h)
                      </h4>
                      <p className="text-sm text-gray-600">
                        Iluminação ambiente, modo economia, carregamento de
                        dispositivos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl">
                  <h3 className="text-2xl font-semibold text-green-800 mb-4">
                    Monitoramento em Tempo Real
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Acompanhe o consumo de energia de cada dispositivo e
                    identifique oportunidades de economia através de aplicativos
                    dedicados.
                  </p>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Benefícios do Monitoramento:
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Identificação de aparelhos com alto consumo</li>
                      <li>• Detecção de consumo fantasma</li>
                      <li>• Análise de padrões de uso</li>
                      <li>• Alertas de consumo excessivo</li>
                      <li>• Relatórios detalhados de economia</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Guia de Implementação
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-2xl">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-800 mb-2">
                      Análise do Consumo Atual
                    </h3>
                    <p className="text-gray-700">
                      Comece analisando sua conta de energia e identificando os
                      maiores gastos. Use um medidor de consumo para mapear o
                      uso de cada aparelho.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-2xl">
                  <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-800 mb-2">
                      Investimento Gradual
                    </h3>
                    <p className="text-gray-700">
                      Comece com dispositivos básicos como tomadas inteligentes
                      e lâmpadas LED. Expanda gradualmente para termostatos e
                      sistemas mais complexos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-purple-50 rounded-2xl">
                  <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-800 mb-2">
                      Integração e Automação
                    </h3>
                    <p className="text-gray-700">
                      Configure automações inteligentes e integre todos os
                      dispositivos em um sistema central para máxima eficiência.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 bg-orange-50 rounded-2xl">
                  <div className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-orange-800 mb-2">
                      Monitoramento e Otimização
                    </h3>
                    <p className="text-gray-700">
                      Acompanhe os resultados mensalmente e ajuste as
                      configurações para maximizar a economia sem comprometer o
                      conforto.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-2xl border border-yellow-200">
                <h2 className="text-3xl font-bold text-orange-800 mb-6">
                  Retorno do Investimento
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Investimento Inicial
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Kit básico: R$ 800 - R$ 1.500</li>
                      <li>• Sistema completo: R$ 3.000 - R$ 8.000</li>
                      <li>• Instalação profissional: R$ 500 - R$ 1.200</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Economia Mensal
                    </h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Redução de 20-30% na conta de luz</li>
                      <li>• Economia média: R$ 50 - R$ 200/mês</li>
                      <li>• Payback: 12 a 24 meses</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-lg">
                  <p className="text-center text-lg font-semibold text-green-600">
                    Em 2 anos, a economia pode pagar todo o investimento
                    inicial!
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center">
              <div className="bg-gradient-to-r from-slate-800 to-blue-900 text-white p-8 rounded-2xl">
                <h2 className="text-3xl font-bold mb-4">
                  Comece Sua Transformação Hoje
                </h2>
                <p className="text-xl mb-6">
                  O consumo inteligente não é apenas uma tendência, é o futuro.
                  Comece pequeno, pense grande e transforme sua casa em um
                  ambiente eficiente e econômico.
                </p>
              </div>
            </section>
          </article>
          <div className="mt-8 text-center">
            <Link
              to="/artigos"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Ver Mais Artigos
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
