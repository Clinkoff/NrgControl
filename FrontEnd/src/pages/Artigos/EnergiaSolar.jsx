import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Battery, Zap, DollarSign, Home, TrendingUp } from 'lucide-react';
import Navbar from "../Navbar";
import Footer from "../footer";

export default function EnergiaSolar() {
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
              A energia solar representa uma das maiores revoluções energéticas do século XXI. Com a crescente 
              preocupação ambiental e o aumento constante das tarifas de energia elétrica, investir em um sistema 
              de energia solar fotovoltaica tornou-se não apenas uma escolha sustentável, mas também uma decisão 
              financeiramente inteligente para milhões de brasileiros.
            </p>

            {/* Como Funciona */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Sun className="text-yellow-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Como Funciona a Energia Solar</h2>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                O sistema de energia solar fotovoltaica converte a luz do sol diretamente em energia elétrica 
                através de painéis solares compostos por células fotovoltaicas. O processo é surpreendentemente 
                simples e eficiente:
              </p>

              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">Processo de Geração:</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>1.</strong> Os painéis solares captam a radiação solar</p>
                  <p><strong>2.</strong> As células fotovoltaicas convertem luz em corrente contínua</p>
                  <p><strong>3.</strong> O inversor transforma a corrente contínua em alternada</p>
                  <p><strong>4.</strong> A energia é distribuída para sua casa ou injetada na rede elétrica</p>
                </div>
              </div>
            </section>

            {/* Vantagens */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-green-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Principais Vantagens</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="text-green-600" size={24} />
                    <h3 className="font-semibold text-gray-800">Economia Financeira</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Reduza sua conta de luz em até 95%. O investimento se paga em 4-7 anos, 
                    e o sistema dura mais de 25 anos.
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Home className="text-blue-600" size={24} />
                    <h3 className="font-semibold text-gray-800">Valorização do Imóvel</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Imóveis com energia solar são mais valorizados no mercado, 
                    com aumento médio de 8% no valor de venda.
                  </p>
                </div>

                <div className="bg-yellow-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Sun className="text-yellow-600" size={24} />
                    <h3 className="font-semibold text-gray-800">Energia Limpa</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    100% renovável e sustentável. Contribua para a preservação 
                    do meio ambiente sem emissão de gases poluentes.
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Battery className="text-purple-600" size={24} />
                    <h3 className="font-semibold text-gray-800">Independência Energética</h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    Reduza sua dependência da rede elétrica e proteja-se 
                    contra aumentos nas tarifas de energia.
                  </p>
                </div>
              </div>
            </section>

            {/* Tipos de Sistema */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-orange-500" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">Tipos de Sistema Solar</h2>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Sistema On-Grid (Conectado à Rede)</h3>
                  <p className="text-gray-700 mb-2">
                    Mais comum e econômico. Conectado à rede elétrica, permite injetar energia excedente 
                    e receber créditos da concessionária através do sistema de compensação.
                  </p>
                  <p className="text-sm text-green-600 font-medium">✓ Menor investimento inicial</p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Sistema Off-Grid (Isolado)</h3>
                  <p className="text-gray-700 mb-2">
                    Totalmente independente da rede elétrica. Utiliza baterias para armazenar energia. 
                    Ideal para locais remotos sem acesso à rede elétrica.
                  </p>
                  <p className="text-sm text-blue-600 font-medium">✓ Total independência energética</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Sistema Híbrido</h3>
                  <p className="text-gray-700 mb-2">
                    Combina as vantagens dos dois sistemas anteriores. Conectado à rede, mas com 
                    baterias de backup para situações de emergência.
                  </p>
                  <p className="text-sm text-orange-600 font-medium">✓ Máxima flexibilidade e segurança</p>
                </div>
              </div>
            </section>

            {/* Investimento */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Investimento e Retorno</h2>
              
              <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  O investimento em energia solar varia conforme o tamanho do sistema e consumo da residência. 
                  Para uma casa com consumo médio de 300 kWh/mês, o investimento gira em torno de R$ 15.000 a R$ 25.000.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">4-7 anos</div>
                    <div className="text-sm text-gray-600">Payback do investimento</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">25+ anos</div>
                    <div className="text-sm text-gray-600">Vida útil do sistema</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-600">95%</div>
                    <div className="text-sm text-gray-600">Redução na conta de luz</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Primeiros Passos */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Primeiros Passos para Instalar</h2>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Análise do Consumo</h3>
                    <p className="text-gray-700 text-sm">Analise suas últimas contas de luz para dimensionar o sistema ideal.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Visita Técnica</h3>
                    <p className="text-gray-700 text-sm">Profissional avalia o telhado, orientação solar e sombreamento.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Projeto e Financiamento</h3>
                    <p className="text-gray-700 text-sm">Elaboração do projeto técnico e escolha da forma de pagamento.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Instalação e Conexão</h3>
                    <p className="text-gray-700 text-sm">Instalação dos equipamentos e conexão com a rede elétrica.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Conclusão */}
            <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">Conclusão</h2>
              <p className="text-gray-700 leading-relaxed">
                A energia solar não é apenas uma tendência, é o futuro da geração de energia residencial. 
                Com benefícios que vão desde a economia financeira até a contribuição para um planeta mais 
                sustentável, investir em energia solar é uma decisão que beneficia você, sua família e as 
                futuras gerações. O momento ideal para fazer essa transição é agora!
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

