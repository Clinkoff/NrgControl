import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Homepage from "./pages/HomePage.jsx";
import Artigos from "./pages/Artigos.jsx";
import EnergiaSolar from "./pages/Artigos/EnergiaSolar.jsx";
import DiminuirGastos from "./pages/Artigos/DiminuirGastos.jsx";
import ComoEconomizar from "./pages/Artigos/ComoEconomizar.jsx";
import ConsumoInteligente from "./pages/Artigos/ConsumoInteligente.jsx";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/registro",
    element: <RegisterForm />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/artigos",
    element: <Artigos />,
  },
  {
    path: "/Homepage",
    element: <Homepage />,
  },
  {
    path: "/",
    element: <Homepage />, // Página inicial padrão
  },
  {
    path: "/artigos/energia-solar", 
    element: <EnergiaSolar /> }, 
  {
    path: "/artigos/diminuir-gastos",
    element: <DiminuirGastos />,
  }, {
    path: "/artigos/como-economizar",
    element: <ComoEconomizar />,
  }, {
    path: "/artigos/consumo-inteligente",
    element: <ConsumoInteligente />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
