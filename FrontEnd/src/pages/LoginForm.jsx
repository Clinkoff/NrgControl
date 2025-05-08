import "../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        console.log("Login bem-sucedido:", data);
        // Você pode armazenar o token ou sessão aqui, se necessário
        // Por exemplo, localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard"); // Redireciona para uma página de dashboard (ajuste conforme necessário)
      } else {
        // Exibe mensagem de erro
        setError(data.message || "Erro ao fazer login");
      }
    } catch (err) {
      console.error("Erro na requisição:", err); 
      setError("Erro ao conectar com o servidor: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Bg com gradiente e animação */}
      <div className="absolute inset-0 flex">
        {/* Div Esquerda */}
        <div className="hidden md:block w-1/2 h-full" id="DivEsquerda">
          <div className="h-full w-full flex items-center justify-center p-8 relative">
            <div className="bg-white w-full h-4/5 rounded-3xl shadow-lg"></div>
            {/* Orbes Flutuantes */}
            <div className="absolute w-8 h-8 bg-blue-400 rounded-full opacity-50 animate-float delay-100"></div>
            <div className="absolute w-6 h-6 bg-blue-300 rounded-full opacity-50 animate-float delay-300 top-1/4 left-3/4"></div>
            <div className="absolute w-10 h-10 bg-blue-500 rounded-full opacity-50 animate-float delay-500 top-3/4 left-1/4"></div>
          </div>
        </div>

        {/* Div Direita - Gradient */}
        <div className="w-full md:w-1/2 h-full" id="DivDireita"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
        {/* Div Esquerda - Conteúdo */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 animate-slide-in">
              Uma forma diferente de monitorar seus gastos elétricos
            </h1>

            <p className="text-lg text-gray-600 animate-slide-in delay-200">
              Controle total da sua energia com visualização em tempo real e
              relatórios inteligentes
            </p>

            {/* Elementos decorativos Hover */}
            <div className="w-16 h-1 bg-blue-500 rounded-full transition-all duration-300 hover:w-24 hover:bg-blue-600 animate-slide-in delay-400"></div>
          </div>
        </div>

        {/* Div Direita - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-sm text-white">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold uppercase mb-2">NRG CONTROL</h2>
              <p className="italic opacity-90">
                A gestão de sua energia
                <br />a poucos passos de você
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <div className="text-red-500 text-center">{error}</div>}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:bg-white/30 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:bg-white/30 focus:outline-none transition"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </button>
              </div>

              <p className="text-center text-sm">
                Ainda não tem uma conta?{" "}
                <Link to="/registro" className="font-semibold hover:underline">
                  Crie Agora!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
