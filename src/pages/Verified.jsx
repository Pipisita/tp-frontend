import { Link } from "react-router-dom";

export default function Verified() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Cuenta verificada</h1>
        <p className="auth-subtitle">
          Listo. Tu cuenta ya está activada. Ya podés iniciar sesión.
        </p>

        <Link to="/login">
          <button className="btn-primary" type="button">
            Ir al login
          </button>
        </Link>
      </div>
    </div>
  );
}