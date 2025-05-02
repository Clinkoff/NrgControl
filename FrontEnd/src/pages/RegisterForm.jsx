import "../assets/css/register.css";
import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
    <p className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link to="/" className="font-semibold hover:underline">
                  Faça Login!
                </Link>
              </p>
    </div>
  );
}

export default RegisterForm;
