import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 py-6">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>© {new Date().getFullYear()} NRG Control - Monitoramento de Energia</p>
      </div>
    </footer>
  );
};

export default Footer;
