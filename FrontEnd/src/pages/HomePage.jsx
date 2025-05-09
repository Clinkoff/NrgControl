import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/usuarios/protegido",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.text();
          setUserData(data);
        } else {
          setAuthError("Sessão expirada. Faça login novamente.");
          navigate("/login");
        }
      } catch (err) {
        console.error("Erro ao verificar autenticação:", err);
        setAuthError("Erro de conexão com o servidor");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl">
          <p className="text-red-400 text-lg mb-4">{authError}</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
          >
            Ir para Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Header */}
      <div className="w-full px-6 py-4 flex justify-between items-center bg-white/10 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white">NRG Control</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair
        </button>
      </div>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Bem-vindo, {userData?.split(" ")[3] || "Usuário"}
            </h2>
            <p className="text-xl text-blue-200">
              Monitoramento inteligente de energia
            </p>
          </div>

          {/* Cards de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl hover:transform hover:scale-105 transition-all">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-3 bg-blue-600 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Consumo Atual</h3>
              </div>
              <p className="text-3xl font-bold text-blue-400">150 kWh</p>
              <span className="text-blue-200">+2.5% em relação ao mês passado</span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl hover:transform hover:scale-105 transition-all">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-3 bg-green-600 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Custo Mensal</h3>
              </div>
              <p className="text-3xl font-bold text-green-400">R$ 250,00</p>
              <span className="text-green-200">-1.2% em relação ao mês passado</span>
            </div>
          </div>

          {/* Gráfico Simulado */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-2xl animate-fade-in-up">
            <h3 className="text-xl font-semibold text-white mb-4">Histórico de Consumo</h3>
            <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
              <span className="text-blue-200">Gráfico interativo (em desenvolvimento)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;