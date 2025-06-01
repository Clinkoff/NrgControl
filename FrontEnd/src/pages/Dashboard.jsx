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

function Dashboard() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const [consumoData, setConsumoData] = useState([]);
  const [currentConsumo, setCurrentConsumo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState("Dia");
  const [totalPower, setTotalPower] = useState(null);

  
  const getDateRange = useCallback(() => {
    const now = new Date();
    let startDate;
    switch (selectedInterval) {
      case "7 Dias":
        startDate = new Date(now.setDate(now.getDate() - 7)).toISOString();
        break;
      case "1 Mês":
        startDate = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
        break;
      case "Dia":
      default:
        startDate = new Date(now.setHours(0, 0, 0, 0)).toISOString();
        break;
    }
    return {
      startDate,
      endDate: new Date().toISOString(),
    };
  }, [selectedInterval]);

  useEffect(() => {
    const checkAuthAndFetchConsumo = async () => {
      try {
        const authResponse = await fetch("http://localhost:8080/api/usuarios/protegido", {
          method: "GET",
          credentials: "include",
        });

        if (!authResponse.ok) {
          setAuthError("Usuário não autenticado");
          navigate("/login");
          return;
        }

        const fetchData = async () => {
          try {
            // Consumo em tempo real
            const consumoResponse = await fetch("http://localhost:8080/api/consumo", {
              method: "GET",
              credentials: "include",
            });

            if (!consumoResponse.ok) {
              throw new Error(`Erro ao buscar consumo: ${consumoResponse.status} ${consumoResponse.statusText}`);
            }

            const currentData = await consumoResponse.json();
            setCurrentConsumo(currentData);

            // Dados históricos
            const { startDate, endDate } = getDateRange();
            const historicoResponse = await fetch(
              `http://localhost:8080/api/consumo/historico?startDate=${startDate}&endDate=${endDate}`,
              {
                method: "GET",
                credentials: "include",
              }
            );

            if (!historicoResponse.ok) {
              throw new Error(`Erro ao buscar histórico: ${historicoResponse.status} ${historicoResponse.statusText}`);
            }

            const historicalData = await historicoResponse.json();
            setConsumoData(historicalData);

            // Consumo total acumulado
            const totalResponse = await fetch(
              `http://localhost:8080/api/consumo/total?startDate=${startDate}&endDate=${endDate}`,
              {
                method: "GET",
                credentials: "include",
              }
            );

            if (!totalResponse.ok) {
              throw new Error(`Erro ao buscar total: ${totalResponse.status} ${totalResponse.statusText}`);
            }

            const total = await totalResponse.json();
            setTotalPower(total);
            setError(null);
          } catch (err) {
            console.error("Erro ao buscar dados:", err.message);
            setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
          }
        };

        await fetchData();
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
      } catch (err) {
        console.error("Erro ao conectar com o servidor:", err);
        setAuthError("Erro ao conectar com o servidor");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchConsumo();
  }, [navigate, selectedInterval, getDateRange]);

 
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
          <div className="mb-8 bg-red-500 bg-opacity-10 border border-red-500 text-red-300 px-6 py-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Controls & Summary */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-gray-400">Monitoramento de energia em tempo real</p>
          </div>
          
          <div className="flex flex-wrap gap-4">
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
                <p className="text-3xl font-bold text-white">{currentConsumo.cpuUsagePercent.toFixed(1)}</p>
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
                <p className="text-3xl font-bold text-white">{(currentConsumo.memoryUsageBytes / (1024 * 1024)).toFixed(1)}</p>
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
                <p className="text-3xl font-bold text-white">{currentConsumo.totalPowerWatts.toFixed(1)}</p>
                <p className="ml-1 text-xl text-gray-400">W</p>
              </div>
              <p className="text-sm text-gray-400 mt-1">Potência instantânea</p>
            </div>

            {currentConsumo.powerFromSensors > 0 && (
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
                  <p className="text-3xl font-bold text-white">{currentConsumo.powerFromSensors.toFixed(1)}</p>
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
                  <p className="text-3xl font-bold text-white">{totalPower.toFixed(2)}</p>
                  <p className="ml-2 text-xl text-gray-400">Wh</p>
                </div>
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