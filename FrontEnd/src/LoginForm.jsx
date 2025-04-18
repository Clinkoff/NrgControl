import "./Login.css";

function LoginForm() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Fundo dividido com gradiente */}
      <div className="absolute inset-0 flex">
        {/* Metade esquerda - Branca */}
        <div className="hidden md:block w-1/2 h-full" Id="DivEsquerda">
          <div className="h-full w-full flex items-center justify-center p-8">
            <div className="bg-white w-full h-4/5 rounded-3xl shadow-lg"></div>
          </div>
        </div>

        {/* Metade direita - Gradiente */}
        <div className="w-full md:w-1/2 h-full" id="DivDireita"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
        {/* Seção Esquerda - Conteúdo */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="max-w-md space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Uma forma diferente de monitorar seus gastos elétricos
            </h1>

            <p className="text-lg text-gray-600">
              Controle total da sua energia com visualização em tempo real e
              relatórios inteligentes
            </p>

            {/* Elemento decorativo (opcional) */}
            <div className="w-16 h-1 bg-blue-500 rounded-full"></div>
          </div>
        </div>

        {/* Seção Direita - Formulário */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <div className="w-full max-w-sm text-white">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold uppercase mb-2">NRG CONTROL</h2>
              <p className="italic opacity-90">
                A gestão de sua energia
                <br />a poucos passos de você
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Seu email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:bg-white/30 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  placeholder="Sua senha"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:bg-white/30 focus:outline-none transition"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  Entrar
                </button>
              </div>

              <p className="text-center text-sm">
                Ainda não tem uma conta?{" "}
                <a href="#" className="font-semibold hover:underline">
                  Crie Agora!
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
