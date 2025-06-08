import { useEffect, useState, useCallback, useRef } from "react";
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
import Navbar from "./Navbar";
import consumoService from "../services/ConsumoService";
import Footer from "./footer";

// Componente de Card otimizado
const MetricCard = ({ title, value, unit, color, icon, timestamp }) => (
  <div
    className={`bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700 hover:border-${color}-500 transition-all duration-300`}
  >
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium text-gray-300">{title}</h3>
      <div className={`bg-${color}-500 bg-opacity-20 rounded-full p-2`}>
        {icon}
      </div>
    </div>
    <div className="flex items-baseline">
      <p className="text-3xl font-bold text-white">{value}</p>
      {unit && <p className="ml-1 text-xl text-gray-400">{unit}</p>}
    </div>
    <div className="mt-2 flex items-center gap-1">
      <div
        className={`w-1 h-1 bg-${color}-400 rounded-full animate-pulse`}
      ></div>
      <span className="text-xs text-gray-500">{timestamp}</span>
    </div>
  </div>
);

// Componente de Chart otimizado
const Chart = ({ data, dataKey, name, color, title }) => (
  <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
    <h3 className="text-xl font-medium text-gray-300 mb-6">{title}</h3>
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="timestamp"
            stroke="#9CA3AF"
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            tick={{ fill: "#9CA3AF" }}
          />
          <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
              borderRadius: "0.5rem",
            }}
            labelFormatter={(label) => new Date(label).toLocaleString()}
            itemStyle={{ color: "#D1D5DB" }}
            labelStyle={{ color: "#F9FAFB" }}
          />
          <Legend wrapperStyle={{ color: "#D1D5DB", paddingTop: "10px" }} />
          <Line
            type="monotone"
            dataKey={dataKey}
            name={name}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: color, stroke: "#1F2937", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// Ícones como constantes
const ICONS = {
  cpu: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    />
  ),
  cost: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  power: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  ),
  refresh: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  ),
};

function Dashboard() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    authError: null,
    consumoData: [],
    currentConsumo: null,
    loading: true,
    error: null,
    selectedInterval: "Dia",
    totalPower: null,
    refreshing: false,
  });

  const intervalRef = useRef(null);
  const mountedRef = useRef(true);
  const lastUpdateRef = useRef(new Date());

  const safeNumber = (value) => (isNaN(Number(value)) ? 0 : Number(value));
  const updateState = (updates) =>
    mountedRef.current && setState((prev) => ({ ...prev, ...updates }));

  const fetchAllData = useCallback(
    async (showRefreshing = false, isAutoRefresh = false) => {
      try {
        if (showRefreshing && !isAutoRefresh) updateState({ refreshing: true });
        if (!isAutoRefresh) updateState({ error: null });

        const { startDate, endDate } = consumoService.getDateRange(
          state.selectedInterval
        );
        const dashboardData = await consumoService.getDashboardData(
          startDate,
          endDate
        );

        updateState({
          currentConsumo: dashboardData.current,
          consumoData: consumoService.formatConsumoData(
            dashboardData.historico
          ),
          totalPower: dashboardData.total?.totalWatts,
          loading: false,
          refreshing: false,
        });

        lastUpdateRef.current = new Date();
      } catch (error) {
        updateState({
          error: `Falha ao carregar dados: ${error.message}`,
          loading: false,
          refreshing: false,
        });

        if (error.message.includes("401") || error.message.includes("403")) {
          updateState({ authError: "Sessão expirada. Redirecionando..." });
          setTimeout(() => navigate("/login"), 3000);
        }
      }
    },
    [state.selectedInterval, navigate]
  );

  // Setup e cleanup
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Inicialização e auto-refresh
  useEffect(() => {
    fetchAllData(false, false);
  }, [fetchAllData]);

  useEffect(() => {
    if (!state.loading) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => fetchAllData(false, true), 10000);
    }
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [state.loading, fetchAllData]);

  useEffect(() => {
    if (!state.loading) fetchAllData(false, false);
  }, [state.selectedInterval, fetchAllData, state.loading]);

  // Configuração dos cards
  const getCardConfig = () => {
    if (!state.currentConsumo) return [];

    const timestamp = lastUpdateRef.current.toLocaleTimeString();
    const cards = [
      {
        title: "CPU",
        value: safeNumber(state.currentConsumo.cpuUsagePercent).toFixed(1),
        unit: "%",
        color: "blue",
        icon: (
          <svg
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {ICONS.cpu}
          </svg>
        ),
      },
      {
        title: "Custo Diário",
        value: `R$ ${safeNumber(
          state.currentConsumo.custoEstimadoPorDia
        ).toFixed(2)}`,
        color: "green",
        icon: (
          <svg
            className="h-6 w-6 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {ICONS.cost}
          </svg>
        ),
      },
      {
        title: "Consumo",
        value: safeNumber(state.currentConsumo?.consumoWatts).toFixed(1),
        unit: "W",
        color: "yellow",
        icon: (
          <svg
            className="h-6 w-6 text-yellow-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {ICONS.power}
          </svg>
        ),
      },
    ];

    // Adicionar cards condicionais
    if (state.currentConsumo.custoEstimado != null) {
      cards.push({
        title: "Custo/Hora",
        value: `R$ ${safeNumber(state.currentConsumo.custoEstimado).toFixed(
          4
        )}`,
        color: "red",
        icon: (
          <svg
            className="h-6 w-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {ICONS.cost}
          </svg>
        ),
      });
    }

    return cards.map((card) => ({ ...card, timestamp }));
  };

  // Configuração dos gráficos
  const chartConfigs = [
    {
      dataKey: "cpuUsagePercent",
      name: "CPU (%)",
      color: "#3B82F6",
      title: "Uso da CPU (%)",
    },
    {
      dataKey: "memoryUsageMb",
      name: "Memória (MB)",
      color: "#10B981",
      title: "Uso de Memória (MB)",
    },
    {
      dataKey: "totalPowerWatts",
      name: "Potência (W)",
      color: "#F59E0B",
      title: "Consumo (W)",
      fullWidth: true,
    },
  ];

  // Renders condicionais
  if (state.authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-300 px-8 py-6 rounded-lg">
          <p className="text-xl font-medium">{state.authError}</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Voltar ao login
          </button>
        </div>
      </div>
    );
  }

  if (state.loading) {
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

      <main className="container mx-auto px-4 py-8">
        {/* Error Alert */}
        {state.error && (
          <div className="mb-8 bg-red-500 bg-opacity-10 border border-red-500 text-red-300 px-6 py-4 rounded-lg flex justify-between items-center">
            <p>{state.error}</p>
            <button
              onClick={() => fetchAllData(true)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Dashboard</h2>
            <p className="text-gray-400">
              Monitoramento de energia em tempo real
              {state.refreshing && (
                <span className="ml-2 text-blue-400">(Atualizando...)</span>
              )}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => fetchAllData(true)}
              disabled={state.refreshing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition flex items-center gap-2"
            >
              <svg
                className={`h-4 w-4 ${state.refreshing ? "animate-spin" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {ICONS.refresh}
              </svg>
              Atualizar
            </button>

            <select
              value={state.selectedInterval}
              onChange={(e) =>
                updateState({ selectedInterval: e.target.value })
              }
              className="bg-gray-800 border border-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Dia">Dia</option>
              <option value="7 Dias">7 Dias</option>
              <option value="1 Mês">1 Mês</option>
            </select>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {getCardConfig().map((card, index) => (
            <MetricCard key={index} {...card} />
          ))}
        </div>

        {/* Total Power */}
        {state.totalPower !== null && (
          <div className="mb-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl shadow-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-medium text-gray-300">
                  Consumo Total Acumulado
                </h3>
                <p className="text-sm text-gray-400">
                  Período: {state.selectedInterval}
                </p>
              </div>
              <div className="bg-gray-900 bg-opacity-50 px-6 py-4 rounded-lg">
                <p className="text-3xl font-bold text-white">
                  {safeNumber(state.totalPower).toFixed(2)} Wh
                </p>
                <p className="text-sm text-gray-500">
                  ≈ {(safeNumber(state.totalPower) / 1000).toFixed(3)} kWh
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Charts */}
        {state.consumoData.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {chartConfigs.map((config, index) => (
              <div
                key={index}
                className={config.fullWidth ? "lg:col-span-2" : ""}
              >
                <Chart data={state.consumoData} {...config} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700 text-center">
            <p className="text-xl text-gray-400">
              Aguardando dados históricos...
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Dashboard;
