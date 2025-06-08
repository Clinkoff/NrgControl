import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PiggyBank, Calculator, TrendingDown, ShoppingCart, Home, Lightbulb, Target, CheckCircle } from 'lucide-react';
import Navbar from '../Navbar';
import Footer from "../footer";

export default function DiminuirGastos() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
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
              Em tempos de economia instável e inflação crescente, saber como diminuir gastos sem comprometer 
              a qualidade de vida tornou-se uma habilidade essencial. Este guia apresenta estratégias práticas 
              e comprovadas para reduzir seus custos mensais de forma inteligente, mantendo o conforto e bem-estar 
              da sua família enquanto constrói uma reserva financeira sólida.
            </p>

            {/* Análise Inicial */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="text-blue-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Primeiro Passo: Conhecer Seus Gastos</h2>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                Antes de cortar gastos, é fundamental entender para onde seu dinheiro está indo. 
                A maioria das pessoas subestima seus gastos em até 30%, especialmente com pequenas compras do dia a dia.
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Método dos 30 Dias:</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Semana 1:</strong> Anote todos os gastos, por menor que sejam</p>
                  <p><strong>Semana 2:</strong> Categorize os gastos (essenciais, importantes, dispensáveis)</p>
                  <p><strong>Semana 3:</strong> Identifique padrões e gastos desnecessários</p>
                  <p><strong>Semana 4:</strong> Implemente as primeiras mudanças</p>
                </div>
              </div>
            </section>

            {/* Estratégias por Categoria */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <TrendingDown className="text-green-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Estratégias por Categoria de Gasto</h2>
              </div>

              <div className="space-y-8">
                {/* Alimentação */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <ShoppingCart className="text-orange-600" size={24} />
                    <h3 className="text-xl font-semibold text-gray-800">Alimentação (Economia: 20-30%)</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Planejamento de Compras</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Faça lista de compras e siga à risca</li>
                        <li>• Compre no atacado para itens não perecíveis</li>
                        <li>• Aproveite promoções e compare preços</li>
                        <li>• Evite ir ao mercado com fome</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Cozinhe em Casa</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Prepare marmitas para o trabalho</li>
                        <li>• Cozinhe em lotes nos fins de semana</li>
                        <li>• Aproveite sobras criativemente</li>
                        <li>• Limite delivery a ocasiões especiais</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Contas da Casa */}
                <div className="border-l-4 border-blue-500 pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Home className="text-blue-600" size={24} />
                    <h3 className="text-xl font-semibold text-gray-800">Contas da Casa (Economia: 15-25%)</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Energia Elétrica</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Troque lâmpadas por LED</li>
                        <li>• Desligue aparelhos da tomada</li>
                        <li>• Use ar-condicionado com moderação</li>
                        <li>• Aproveite luz natural ao máximo</li>
                      </ul>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Água e Gás</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Conserte vazamentos imediatamente</li>
                        <li>• Banhos mais curtos e mornos</li>
                        <li>• Reaproveite água da chuva</li>
                        <li>• Use panela de pressão para cozinhar</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Transporte */}
                <div className="border-l-4 border-green-500 pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="text-green-600" size={24} />
                    <h3 className="text-xl font-semibold text-gray-800">Transporte (Economia: 25-40%)</h3>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Alternativas Inteligentes:</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Transporte Público</h5>
                        <p className="text-sm text-gray-700">Pode reduzir custos em até 70% comparado ao carro próprio</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Carona Solidária</h5>
                        <p className="text-sm text-gray-700">Divida custos com colegas de trabalho</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Bicicleta</h5>
                        <p className="text-sm text-gray-700">Zero custo de combustível e manutenção mínima</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800 mb-1">Home Office</h5>
                        <p className="text-sm text-gray-700">Negocie dias de trabalho remoto</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cortes Inteligentes */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-yellow-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Cortes Inteligentes Sem Impacto na Qualidade</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Assinaturas e Serviços</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>Cancele assinaturas não utilizadas mensalmente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>Compartilhe streamings com família/amigos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>Negocie planos de celular e internet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>Use aplicativos gratuitos para exercícios</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Entretenimento e Lazer</h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>Aproveite eventos gratuitos da cidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>Organize encontros em casa</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>Use bibliotecas públicas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                      <span>Explore parques e trilhas gratuitas</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Regra 50-30-20 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <PiggyBank className="text-pink-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Regra 50-30-20 para Organização</h2>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-6">
                  Organize seu orçamento seguindo esta regra simples e eficaz para garantir 
                  equilíbrio entre necessidades, desejos e futuro financeiro:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">50%</div>
                    <div className="text-sm font-semibold text-gray-800 mb-2">NECESSIDADES</div>
                    <div className="text-xs text-gray-600">Moradia, alimentação, transporte, contas básicas</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
                    <div className="text-sm font-semibold text-gray-800 mb-2">DESEJOS</div>
                    <div className="text-xs text-gray-600">Entretenimento, jantar fora, hobbies, compras</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">20%</div>
                    <div className="text-sm font-semibold text-gray-800 mb-2">POUPANÇA</div>
                    <div className="text-xs text-gray-600">Reserva de emergência, investimentos, aposentadoria</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Dicas Avançadas */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Dicas Avançadas para Economizar Mais</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">🏪 Aproveite Programas de Fidelidade</h3>
                  <p className="text-gray-700 text-sm">
                    Cadastre-se em programas de pontos de supermercados, farmácias e postos de gasolina. 
                    Acumule pontos nas compras essenciais e troque por descontos.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">📱 Use Aplicativos de Cashback</h3>
                  <p className="text-gray-700 text-sm">
                    Apps como Méliuz, Picpay e bancos digitais oferecem dinheiro de volta em compras. 
                    Pequenos percentuais se acumulam ao longo do tempo.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">🔄 Renegocie Contratos Anualmente</h3>
                  <p className="text-gray-700 text-sm">
                    Seguros, planos de saúde, internet e telefone sempre têm margem para negociação. 
                    Reserve um dia do ano para rever todos os contratos.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">💡 Automatize Suas Economias</h3>
                  <p className="text-gray-700 text-sm">
                    Configure transferências automáticas para poupança no dia do pagamento. 
                    "Pague-se primeiro" antes que o dinheiro seja gasto impulsivamente.
                  </p>
                </div>
              </div>
            </section>

            {/* Resultados Esperados */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultados Esperados</h2>
              
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Implementando essas estratégias de forma consistente, é possível reduzir os gastos 
                  mensais entre 20% a 35% sem comprometer significativamente a qualidade de vida. 
                  Isso representa uma economia anual considerável que pode ser direcionada para:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">📈 Construção de Reserva</h3>
                    <p className="text-sm text-gray-700">
                      6 meses de gastos guardados para emergências
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">🎯 Realização de Sonhos</h3>
                    <p className="text-sm text-gray-700">
                      Viagens, casa própria, carro novo ou outros objetivos
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">💰 Investimentos</h3>
                    <p className="text-sm text-gray-700">
                      Fazer o dinheiro trabalhar para você no longo prazo
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">🛡️ Tranquilidade</h3>
                    <p className="text-sm text-gray-700">
                      Dormir melhor sabendo que as finanças estão controladas
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Conclusão */}
            <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Conclusão</h2>
              <p className="text-gray-700 leading-relaxed">
                Diminuir gastos não significa viver com menos qualidade, mas sim fazer escolhas mais conscientes 
                e inteligentes com seu dinheiro. Pequenas mudanças de hábito, quando aplicadas consistentemente, 
                geram grandes resultados ao longo do tempo. Comece implementando 2-3 estratégias desta semana 
                e vá incorporando outras gradualmente. Sua conta bancária e sua tranquilidade financeira 
                agradecerão no futuro!
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