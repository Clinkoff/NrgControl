import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Homepage from "./pages/HomePage.jsx";

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
    path: "/Homepage",
    element: <Homepage />,
  },
  {
    path: "/",
    element: <Homepage />, // Página inicial padrão
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);