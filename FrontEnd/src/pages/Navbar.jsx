import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ selectedInterval }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/artigos', label: 'Artigos' },
  ];

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("user");
        navigate("/login");
      } else {
        console.error("Logout falhou");
      }
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo e título */}
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">NRG Control</h1>
        </div>

        {/* Links + Intervalo + Botão de Logout */}
        <div className="flex items-center space-x-6">
          {/* Navegação */}
          <nav className="hidden md:flex items-center space-x-4">
            {links.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Intervalo */}
          {selectedInterval && (
            <div className="hidden md:flex items-center space-x-2 text-gray-300">
              <span>Monitoramento</span>
              <span>|</span>
              <span className="text-blue-400">{selectedInterval}</span>
            </div>
          )}

          {/* Botão Sair */}
          <button
            onClick={handleLogout}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
