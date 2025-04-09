import "./Login.css";

function LoginForm() {
  return (
    <div className="min-h-screen w-full relative">
      <div
        className="absolute md:right-0 md:top-0 h-full w-full md:w-[35%] flex justify-center bg-gradient-to-b from-blue-900 to-indigo-900"
        id="GradienteDivDireita"
      >
        <div className="flex flex-col items-center pt-[10vh] md:pt-[15vh] w-full px-4">
          {/* Cabeçalho */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="uppercase text-white text-4xl md:text-6xl font-bold font-exo2 mb-4 drop-shadow-lg">
              NRG CONTROL
            </h1>
            <p className="text-gray-200 italic text-sm md:text-base px-4 mt-4 leading-relaxed drop-shadow-md">
              A gestão de sua energia<br />
              a poucos passos de você
            </p>
          </div>

          {/* Formulário */}
          <div className="w-full max-w-xs sm:max-w-sm space-y-6">
            {/* Campos */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white transition-all"
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm mb-2" htmlFor="senha">
                  Senha
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-white/90 focus:bg-white transition-all"
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                />
              </div>
            </div>

            {/* Ações */}
            <div className="space-y-6">
              <a href="#" className="block text-right text-xs text-cyan-300 hover:text-cyan-200 transition">
                Esqueci minha senha
              </a>

              <button
                type="submit"
                className="w-full bg-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-transform transform hover:scale-[1.02]"
              >
                Entrar
              </button>

              <p className="text-center text-sm text-gray-300">
                Ainda não tem uma conta?{" "}
                <a href="#" className="text-cyan-300 font-semibold hover:text-cyan-200 transition">
                  Crie Agora!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;