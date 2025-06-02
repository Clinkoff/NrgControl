import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from './Navbar';
import consumoService from '../services/ConsumoService';

function Dashboard() {
  
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const [consumoData, setConsumoData] = useState([]);
  const [currentConsumo, setCurrentConsumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState("Dia");
  const [totalPower, setTotalPower] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Função auxiliar para garantir valores numéricos seguros
  const safeNumber = (value, defaultValue = 0) => {
    const num = Number(value);
    return !isNaN(num) && isFinite(num) ? num : defaultValue;
  };

  // Função para buscar todos os dados
  const fetchAllData = useCallback(async () => {
    try {
      setRefreshing(true);
      setError(null);


      // Obter range de datas
      const { startDate, endDate } = consumoService.getDateRange(selectedInterval);

      // Buscar todos os dados em paralelo
      const dashboardData = await consumoService.getDashboardData(startDate, endDate);

      // Atualizar estados com verificações de segurança
      setCurrentConsumo(dashboardData.current || null);
      setConsumoData(consumoService.formatConsumoData(dashboardData.historico || []));
      setTotalPower(safeNumber(dashboardData.total));

    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      
      if (error.message.includes('401') || error.message.includes('403')) {
        setAuthError("Usuário não autenticado");
        navigate("/login");
      } else {
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      }
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }, [navigate, selectedInterval]);

  // Buscar apenas consumo atual (para updates em tempo real)
  const fetchCurrentConsumo = useCallback(async () => {
    try {
      // Verificar se a função existe antes de chamar
      if (typeof consumoService.getCurrentConsumo === 'function') {
        const current = await consumoService.getCurrentConsumo();
        setCurrentConsumo(current || null);
      } else {
        // Alternativa: buscar dados completos mas usar apenas o consumo atual
        const { startDate, endDate } = consumoService.getDateRange("Dia");
        const dashboardData = await consumoService.getDashboardData(startDate, endDate);
        setCurrentConsumo(dashboardData.current || null);
      }
    } catch (error) {
      console.error('Erro ao buscar consumo atual:', error);
      // Não mostrar erro para falhas pontuais do tempo real
    }
  }, []);

  // Effect para carregar dados iniciais e configurar intervalo
  useEffect(() => {
    let intervalId;

    const initializeDashboard = async () => {
      await fetchAllData();
      
      // Configurar atualização em tempo real apenas para consumo atual
      // Só configurar se não estiver carregando
      if (!loading) {
        intervalId = setInterval(fetchCurrentConsumo, 10000); // Aumentado para 10s para reduzir carga
      }
    };

    initializeDashboard();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchAllData, fetchCurrentConsumo, loading]);

  // Effect separado para recarregar quando o intervalo mudar
  useEffect(() => {
    if (!loading) {
      fetchAllData();
    }
  }, [selectedInterval, fetchAllData]);

  // Função para atualizar dados manualmente
  const handleRefresh = async () => {
    await fetchAllData();
  };

  // Renderização de erro de autenticação
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-300 px-8 py-6 rounded-lg shadow-lg">
          <p className="text-xl font-medium">{authError}</p>
          <button 
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Voltar ao login
          </button>
        </div>
      </div>
    );
  }

  // Renderização de loading
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-300 text-xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
    
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Error message */}
        {error && (
          <div className="mb-8 bg-red-500 bg-opacity-10 border border-red-500 text-red-300 px-6 py-4 rounded-lg flex justify-between items-center">
            <p>{error}</p>
            <button 
              onClick={handleRefresh}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Controls & Summary */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-gray-400">
              Monitoramento de energia em tempo real
              {refreshing && <span className="ml-2 text-blue-400">(Atualizando...)</span>}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              <svg className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Atualizar
            </button>

            <div className="relative">
              <select
                id="interval"
                value={selectedInterval}
                onChange={(e) => setSelectedInterval(e.target.value)}
                className="appearance-none bg-gray-800 border border-gray-700 text-white py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Dia">Dia</option>
                <option value="7 Dias">7 Dias</option>
                <option value="1 Mês">1 Mês</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Cards with current data */}
        {currentConsumo && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-300">CPU</h3>
                <div className="bg-blue-500 bg-opacity-20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold text-white">
                  {safeNumber(currentConsumo.cpuUsagePercent).toFixed(1)}
                </p>
                <p className="ml-1 text-xl text-gray-400">%</p>
              </div>
              <p className="text-sm text-gray-400 mt-1">Utilização atual</p>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-300">Memória</h3>
                <div className="bg-green-500 bg-opacity-20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold text-white">
                  {safeNumber(currentConsumo.memoryUsageBytes / (1024 * 1024)).toFixed(1)}
                </p>
                <p className="ml-1 text-xl text-gray-400">MB</p>
              </div>
              <p className="text-sm text-gray-400 mt-1">Uso de memória</p>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-300">Consumo Total</h3>
                <div className="bg-yellow-500 bg-opacity-20 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold text-white">
                  {safeNumber(currentConsumo.totalPowerWatts).toFixed(1)}
                </p>
                <p className="ml-1 text-xl text-gray-400">W</p>
              </div>
              <p className="text-sm text-gray-400 mt-1">Potência instantânea</p>
            </div>

            {/* Card adicional para Custo Estimado se disponível */}
            {currentConsumo.custoEstimado !== undefined && currentConsumo.custoEstimado !== null && (
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-red-500 transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-300">Custo/Hora</h3>
                  <div className="bg-red-500 bg-opacity-20 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-white">
                    R$ {safeNumber(currentConsumo.custoEstimado).toFixed(4)}
                  </p>
                </div>
                <p className="text-sm text-gray-400 mt-1">Estimativa por hora</p>
              </div>
            )}

            {currentConsumo.powerFromSensors !== undefined && safeNumber(currentConsumo.powerFromSensors) > 0 && (
              <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-300">Sensores</h3>
                  <div className="bg-purple-500 bg-opacity-20 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-white">
                    {safeNumber(currentConsumo.powerFromSensors).toFixed(1)}
                  </p>
                  <p className="ml-1 text-xl text-gray-400">W</p>
                </div>
                <p className="text-sm text-gray-400 mt-1">Consumo pelos sensores</p>
              </div>
            )}
          </div>
        )}

        {/* Total Power Card */}
        {totalPower !== null && (
          <div className="mb-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium text-gray-300">Consumo Total Acumulado</h3>
                <p className="text-sm text-gray-400">Período selecionado: {selectedInterval}</p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 px-6 py-4 rounded-lg">
                <div className="flex items-baseline">
                  <p className="text-3xl font-bold text-white">{safeNumber(totalPower).toFixed(2)}</p>
                  <p className="ml-2 text-xl text-gray-400">Wh</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  ≈ {(safeNumber(totalPower) / 1000).toFixed(3)} kWh
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {consumoData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-gray-300 mb-6">Uso da CPU (%)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={consumoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="#9CA3AF" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
                      tick={{fill: '#9CA3AF'}}
                    />
                    <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "0.5rem" }} 
                      labelFormatter={(label) => new Date(label).toLocaleString()} 
                      itemStyle={{color: "#D1D5DB"}}
                      labelStyle={{color: "#F9FAFB"}}
                    />
                    <Legend wrapperStyle={{color: "#D1D5DB", paddingTop: "10px"}} />
                    <Line 
                      type="monotone" 
                      dataKey="cpuUsagePercent" 
                      name="CPU (%)" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: "#3B82F6", stroke: "#1F2937", strokeWidth: 2 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <h3 className="text-xl font-medium text-gray-300 mb-6">Uso de Memória (MB)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={consumoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="#9CA3AF" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
                      tick={{fill: '#9CA3AF'}}
                    />
                    <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "0.5rem" }} 
                      labelFormatter={(label) => new Date(label).toLocaleString()} 
                      itemStyle={{color: "#D1D5DB"}}
                      labelStyle={{color: "#F9FAFB"}}
                    />
                    <Legend wrapperStyle={{color: "#D1D5DB", paddingTop: "10px"}} />
                    <Line 
                      type="monotone" 
                      dataKey="memoryUsageMb" 
                      name="Memória (MB)" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: "#10B981", stroke: "#1F2937", strokeWidth: 2 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 lg:col-span-2">
              <h3 className="text-xl font-medium text-gray-300 mb-6">Consumo Total (W)</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={consumoData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="timestamp" 
                      stroke="#9CA3AF" 
                      tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
                      tick={{fill: '#9CA3AF'}}
                    />
                    <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#1F2937", border: "1px solid #374151", borderRadius: "0.5rem" }} 
                      labelFormatter={(label) => new Date(label).toLocaleString()} 
                      itemStyle={{color: "#D1D5DB"}}
                      labelStyle={{color: "#F9FAFB"}}
                    />
                    <Legend wrapperStyle={{color: "#D1D5DB", paddingTop: "10px"}} />
                    <Line 
                      type="monotone" 
                      dataKey="totalPowerWatts" 
                      name="Potência (W)" 
                      stroke="#F59E0B" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: "#F59E0B", stroke: "#1F2937", strokeWidth: 2 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl text-gray-400">Aguardando dados históricos...</p>
            <p className="text-sm text-gray-500 mt-2">Os dados aparecerão aqui quando estiverem disponíveis.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© {new Date().getFullYear()} NRG Control - Monitoramento de Energia Inteligente</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;