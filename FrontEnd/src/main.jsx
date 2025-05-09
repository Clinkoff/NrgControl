import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./pages/LoginForm.jsx";
import RegisterForm from "./pages/RegisterForm.jsx";
import HomePage from "./pages/HomePage.jsx";

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
    element: <HomePage />,
  },
  {
    path: "/",
    element: <LoginForm />, // Página inicial padrão
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);