import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("success");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!name || !email || !password) {
      setType("error");
      setMessage("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/users/register", {
        name,
        email,
        password,
      });

      setType("success");
      setMessage(
        "Cuenta creada correctamente. Te enviamos un email de verificación. Revisá tu bandeja o Mailtrap."
      );

      setName("");
      setEmail("");
      setPassword("");

    } catch (err) {
      setType("error");
      setMessage(
        err.response?.data?.error ||
          "No se pudo registrar. Revisá los datos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="auth-subtitle">
          Organizá tus tareas con un toque matcha & fresita ♡
        </p>

        {message && (
          <div className={`message ${type}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? "Creando..." : "Registrarse"}
          </button>
        </form>

        <p className="auth-link">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </p>
      </div>
    </div>
  );
}