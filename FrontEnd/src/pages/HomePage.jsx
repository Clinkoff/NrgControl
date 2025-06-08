import React from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import Footer from "./footer";

function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      
      {/* Carrossel Section */}
      <div className="py-8 px-4">
        <Carousel />
      </div>
      
      <div className="flex justify-center items-center py-10 px-4">
        <div className="bg-gradient-to-br from-[#0F2A63] via-[#1a3a7a] to-[#0d1f54] text-white rounded-3xl shadow-2xl w-full max-w-6xl p-8 md:p-12 space-y-10 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24"></div>
          
          {/* Legenda de status */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 relative z-10">
            <div className="flex flex-wrap gap-6">
              <span className="flex items-center space-x-3 group cursor-pointer">
                <span className="w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"></span>
                <span className="text-sm font-medium group-hover:text-red-200 transition-colors">Urgente</span>
              </span>
              <span className="flex items-center space-x-3 group cursor-pointer">
                <span className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"></span>
                <span className="text-sm font-medium group-hover:text-yellow-200 transition-colors">Alerta</span>
              </span>
              <span className="flex items-center space-x-3 group cursor-pointer">
                <span className="w-5 h-5 bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300"></span>
                <span className="text-sm font-medium group-hover:text-green-200 transition-colors">Normal</span>
              </span>
            </div>
            <div className="text-sm bg-gradient-to-r from-white to-gray-100 text-[#0F2A63] rounded-xl px-4 py-2 shadow-lg font-semibold">
              📅 {new Date().toLocaleDateString("pt-BR")}
            </div>
          </div>

          {/* Título */}
          <div className="text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent mb-2">
              Resumo Semanal
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mx-auto"></div>
          </div>

          {/* Informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {/* Consumo total */}
            <div className="group cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/20">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">💡</div>
                <h3 className="font-bold text-lg">Consumo Total da Semana</h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <p className="text-sm leading-relaxed">
                    Você consumiu <span className="text-yellow-300 font-bold text-lg">220 kWh</span> nesta semana
                  </p>
                  <p className="text-xs text-blue-200 mt-2 italic">
                    📈 6% a mais que na semana passada
                  </p>
                </div>
              </div>
            </div>

            {/* Média diária */}
            <div className="group cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/20">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">📊</div>
                <h3 className="font-bold text-lg">Média Diária de Consumo</h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                  <p className="text-sm">
                    Média diária: <span className="text-green-300 font-bold text-xl">31,4 kWh</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Dia com maior e menor consumo */}
            <div className="group cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/20">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">⚡</div>
                <h3 className="font-bold text-lg">Maior e Menor Consumo</h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 space-y-2">
                  <p className="text-sm">
                    <span className="text-red-300">📈 Maior:</span> <span className="font-semibold">Quarta-feira, 38,2 kWh</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-green-300">📉 Menor:</span> <span className="font-semibold">Domingo, 19,6 kWh</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Horário de pico */}
            <div className="group cursor-pointer">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 space-y-4 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/20">
                <div className="text-5xl group-hover:scale-110 transition-transform duration-300">🌐</div>
                <h3 className="font-bold text-lg">Horário de Pico</h3>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30 space-y-2">
                  <p className="text-sm">
                    <span className="text-orange-300">⏰ Maior gasto:</span> <span className="font-semibold">15h - 18h</span>
                  </p>
                  <p className="text-xs text-blue-200 italic mt-2">
                    💡 Evite operação intensa neste horário
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Situação semanal + botão */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 pt-6 border-t border-white/20 relative z-10">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium">Situação semanal:</span>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg animate-pulse"></span>
                <span className="text-yellow-300 font-semibold">Alerta</span>
              </div>
            </div>
            <button className="bg-gradient-to-r from-white to-gray-100 text-[#0F2A63] font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-blue-50 hover:to-white group">
              <span className="flex items-center space-x-2">
                <span>Ver mais</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </button>
          </div>
        </div>
      </div>
                    <Footer />
    </div>
  );
}

export default Homepage;