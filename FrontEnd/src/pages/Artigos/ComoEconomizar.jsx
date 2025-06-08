import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap, Thermometer, Lightbulb, Droplets, Wind, Clock, Leaf, CheckCircle, AlertTriangle } from 'lucide-react';
import Navbar from "../Navbar";
import Footer from "../footer";

export default function ComoEconomizar() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Botão Voltar */}
        <Link 
          to="/artigos" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Voltar aos Artigos
        </Link>

    

        {/* Conteúdo do Artigo */}
        <article className="bg-white rounded-2xl shadow-lg p-8">
          {/* Introdução */}
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              A economia de energia não é apenas uma questão financeira, mas também uma responsabilidade ambiental. 
              Com o aumento constante das tarifas de energia elétrica, cada kilowatt-hora economizado representa 
              uma redução significativa na conta mensal. Este guia apresenta estratégias práticas e comprovadas 
              para reduzir seu consumo energético sem abrir mão do conforto e qualidade de vida da sua família.
            </p>

            {/* Impacto da Economia */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-yellow-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">O Impacto da Economia de Energia</h2>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-6 mb-6">
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">30-50%</div>
                    <div className="text-sm text-gray-600">Redução possível na conta de luz</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">R$ 200-800</div>
                    <div className="text-sm text-gray-600">Economia mensal média</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">25%</div>
                    <div className="text-sm text-gray-600">Redução na emissão de CO²</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Iluminação */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-yellow-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Iluminação Eficiente</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Troca de Lâmpadas</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm text-gray-700">Substitua incandescentes por LED</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm text-gray-700">LEDs consomem 80% menos energia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm text-gray-700">Duração 25x maior que incandescentes</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" size={16} />
                      <span className="text-sm text-gray-700">Investimento se paga em 6 meses</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Uso Inteligente</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="text-blue-500" size={16} />
                      <span className="text-sm text-gray-700">Aproveite luz natural ao máximo</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="text-blue-500" size={16} />
                      <span className="text-sm text-gray-700">Use sensores de presença</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="text-blue-500" size={16} />
                      <span className="text-sm text-gray-700">Desligue luzes ao sair do ambiente</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Wind className="text-blue-500" size={16} />
                      <span className="text-sm text-gray-700">Mantenha ambientes bem ventilados</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Ar Condicionado */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="text-red-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Climatização Inteligente</h2>
              </div>

              <div className="border-l-4 border-red-500 pl-6 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  O ar-condicionado representa em média 40-60% do consumo total de uma residência. 
                  Pequenos ajustes podem gerar grandes economias sem comprometer o conforto.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Temperatura Ideal</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">Verão</span>
                        <span className="text-2xl font-bold text-red-500">23-25°C</span>
                      </div>
                      <p className="text-sm text-gray-600">Cada grau a menos aumenta o consumo em 8%</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">Inverno</span>
                        <span className="text-2xl font-bold text-blue-500">20-22°C</span>
                      </div>
                      <p className="text-sm text-gray-600">Cada grau a mais aumenta o consumo em 8%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Dicas de Uso</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 mt-0.5" size={16} />
                      <span className="text-sm text-gray-700">Mantenha portas e janelas fechadas</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 mt-0.5" size={16} />
                      <span className="text-sm text-gray-700">Limpe filtros mensalmente</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 mt-0.5" size={16} />
                      <span className="text-sm text-gray-700">Use timer e modo econômico</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 mt-0.5" size={16} />
                      <span className="text-sm text-gray-700">Instale em locais sombreados</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 mt-0.5" size={16} />
                      <span className="text-sm text-gray-700">Prefira modelos inverter</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Eletrodomésticos */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-purple-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Eletrodomésticos Eficientes</h2>
              </div>

              <div className="space-y-6">
                {/* Geladeira */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">🧊 Geladeira e Freezer</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Temperatura Ideal</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Geladeira: 3°C a 5°C</li>
                        <li>• Freezer: -18°C a -15°C</li>
                        <li>• Não abra desnecessariamente</li>
                        <li>• Não guarde alimentos quentes</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Manutenção</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Limpe as serpentinas traseiras</li>
                        <li>• Verifique borrachas de vedação</li>
                        <li>• Mantenha distância da parede</li>
                        <li>• Descongele quando necessário</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Máquina de Lavar */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">👕 Máquina de Lavar</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Uso Eficiente</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Use água fria sempre que possível</li>
                        <li>• Lave com carga completa</li>
                        <li>• Escolha ciclos econômicos</li>
                        <li>• Evite pré-lavagem desnecessária</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Secagem Natural</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Prefira varal ao invés da secadora</li>
                        <li>• Use ventilação natural</li>
                        <li>• Torça bem as roupas antes</li>
                        <li>• Aproveite o sol da manhã</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Chuveiro */}
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">🚿 Chuveiro Elétrico</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Temperatura</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Use posição "morno" ao invés de "quente"</li>
                        <li>• Banhos de até 8 minutos</li>
                        <li>• Desligue ao se ensaboar</li>
                        <li>• Instale economizador de água</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Alternativas</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Considere aquecedor solar</li>
                        <li>• Chuveiro a gás (mais econômico)</li>
                        <li>• Aquecimento central</li>
                        <li>• Banho frio no verão</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Standby e Eletrônicos */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-orange-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Consumo Fantasma (Standby)</h2>
              </div>

              <div className="bg-orange-50 rounded-lg p-6 mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Aparelhos em standby podem representar até 15% do consumo total da casa. 
                  Pequenos LEDs e displays consomem energia 24 horas por dia, 365 dias por ano.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Maiores Vilões</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center bg-white rounded p-2">
                        <span className="text-sm text-gray-700">TV em standby</span>
                        <span className="text-sm font-medium text-red-600">5-15W</span>
                      </div>
                      <div className="flex justify-between items-center bg-white rounded p-2">
                        <span className="text-sm text-gray-700">Computador em sleep</span>
                        <span className="text-sm font-medium text-red-600">10-25W</span>
                      </div>
                      <div className="flex justify-between items-center bg-white rounded p-2">
                        <span className="text-sm text-gray-700">Carregadores na tomada</span>
                        <span className="text-sm font-medium text-red-600">2-5W</span>
                      </div>
                      <div className="flex justify-between items-center bg-white rounded p-2">
                        <span className="text-sm text-gray-700">Micro-ondas</span>
                        <span className="text-sm font-medium text-red-600">3-8W</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Soluções Práticas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm text-gray-700">Use filtros de linha com interruptor</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm text-gray-700">Desligue aparelhos da tomada</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm text-gray-700">Retire carregadores quando não usar</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-500" size={16} />
                        <span className="text-sm text-gray-700">Configure computadores para hibernar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Energia Renovável */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="text-green-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Alternativas Sustentáveis</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Energia Solar</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Investimento que se paga em 4-7 anos e reduz a conta em até 95%. 
                    Painéis fotovoltaicos são a melhor opção para independência energética.
                  </p>
                  <Link 
                    to="/artigos/energia-solar"
                    className="inline-block bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    Saiba Mais sobre Energia Solar
                  </Link>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Aquecimento Solar</h3>
                  <p className="text-gray-700 text-sm mb-4">
                    Especialmente para aquecimento de água. Pode reduzir em até 80% 
                    o consumo do chuveiro elétrico, um dos maiores vilões da conta de luz.
                  </p>
                  <div className="text-sm text-blue-600 font-medium">
                    ✓ ROI em 2-4 anos • ✓ Vida útil 20+ anos
                  </div>
                </div>
              </div>
            </section>

            {/* Plano de Ação */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Plano de Ação: 30 Dias para Economizar</h2>
              
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-blue-600 mb-2">Semana 1</div>
                  <div className="text-sm text-gray-700">
                    Troque todas as lâmpadas por LED e identifique equipamentos em standby
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-green-600 mb-2">Semana 2</div>
                  <div className="text-sm text-gray-700">
                    Ajuste temperatura do ar-condicionado e geladeira. Limpe filtros
                  </div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-orange-600 mb-2">Semana 3</div>
                  <div className="text-sm text-gray-700">
                    Instale filtros de linha com interruptor. Otimize uso da máquina de lavar
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-xl font-bold text-purple-600 mb-2">Semana 4</div>
                  <div className="text-sm text-gray-700">
                    Compare a conta de luz e calcule a economia. Planeje próximos investimentos
                  </div>
                </div>
              </div>
            </section>

            {/* Calculadora de Economia */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Economia Estimada</h2>
              
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Implementando todas as dicas deste guia, uma família típica pode economizar:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">25-35%</div>
                    <div className="text-sm text-gray-600">Redução no consumo</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">R$ 150-600</div>
                    <div className="text-sm text-gray-600">Economia mensal</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">R$ 1.800-7.200</div>
                    <div className="text-sm text-gray-600">Economia anual</div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    * Valores baseados em residência com consumo médio de 300-500 kWh/mês
                  </p>
                </div>
              </div>
            </section>

            {/* Conclusão */}
            <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Conclusão</h2>
              <p className="text-gray-700 leading-relaxed">
                Economizar energia é mais simples do que parece e traz benefícios imediatos para seu bolso 
                e para o meio ambiente. Pequenas mudanças de hábito, quando aplicadas consistentemente, 
                podem reduzir significativamente sua conta de luz sem comprometer o conforto da sua família. 
                Comece implementando as dicas mais fáceis hoje mesmo e vá incorporando outras gradualmente. 
                Cada kilowatt-hora economizado é dinheiro que fica no seu bolso e menos impacto no planeta!
              </p>
            </div>
          </div>
        </article>

        {/* Navegação para outros artigos */}
        <div className="mt-8 text-center">
          <Link 
            to="/artigos" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Ver Mais Artigos
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}