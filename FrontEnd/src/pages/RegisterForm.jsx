import "../assets/css/register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validação das senhas
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    // Validação de senha forte (mínimo 6 caracteres)
    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          nome: formData.name,
          email: formData.email,
          senha_hash: formData.password,
        }),
        credentials: "include",
      });

      const data = await response.text(); // Pode retornar o objeto Usuario diretamente

      if (response.ok) {
        console.log("Registro bem-sucedido:", data);
        // Redireciona para login após criar conta
        navigate("/"); // Vai para a página de login
      } else {
        setError("Erro ao criar conta");
      }
    } catch (err) {
      console.error("Erro:", err.message);
      setError("Erro ao conectar com o servidor");
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
            <div className="absolute w-8 h-8 bg-green-400 rounded-full opacity-50 animate-float delay-100"></div>
            <div className="absolute w-6 h-6 bg-green-300 rounded-full opacity-50 animate-float delay-300 top-1/4 left-3/4"></div>
            <div className="absolute w-10 h-10 bg-green-500 rounded-full opacity-50 animate-float delay-500 top-3/4 left-1/4"></div>
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
              Comece sua jornada de controle energético
            </h1>

            <p className="text-lg text-gray-600 animate-slide-in delay-200">
              Crie sua conta e tenha acesso completo ao monitoramento inteligente
              da sua energia elétrica
            </p>

            {/* Elementos decorativos Hover */}
            <div className="w-16 h-1 bg-green-500 rounded-full transition-all duration-300 hover:w-24 hover:bg-green-600 animate-slide-in delay-400"></div>
          </div>
        </div>

        {/* Div Direita - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-sm text-white">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold uppercase mb-2">NRG CONTROL</h2>
              <p className="italic opacity-90">
                Cadastre-se e tenha controle
                <br />
                total da sua energia
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <div className="text-red-500 text-center bg-red-100 p-2 rounded">{error}</div>}
              
              <div>
                <label className="block text-sm font-medium mb-1">Nome Completo</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome completo"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:bg-white/30 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Seu email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:bg-white/30 focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Sua senha (mín. 6 caracteres)"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:bg-white/30 focus:outline-none transition"
                  required
                  minLength="6"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Confirmar Senha</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirme sua senha"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:bg-white/30 focus:outline-none transition"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-white text-green-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Criando conta..." : "Criar Conta"}
                </button>
              </div>

              <p className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link to="/" className="font-semibold hover:underline">
                  Faça Login!
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;