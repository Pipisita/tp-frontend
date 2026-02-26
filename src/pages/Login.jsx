import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("error");
  const navigate = useNavigate();

  // 🔥 ESTE VA ARRIBA, antes del return
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      setType("success");
      setMessage("Login exitoso. Redirigiendo...");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      setType("error");
      setMessage(
        error.response?.data?.message || "Credenciales incorrectas"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Task List</h1>
        <p className="auth-subtitle">
          Hi again! Ingresa tus datos ♡
        </p>

        {message && (
          <div className={`message ${type}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-primary" type="submit">
            Iniciar sesión
          </button>
        </form>

        <p className="auth-link">
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;