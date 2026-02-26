import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [error, setError] = useState(null);

  const taskId = useMemo(() => Number(id), [id]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/api/tasks");
        const found = res.data.find((t) => Number(t.id) === taskId);
        if (!found) {
          setError("Tarea no encontrada");
          return;
        }
        setTask(found);
      } catch (e) {
        navigate("/login");
      }
    };

    load();
  }, [taskId, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Detalle</h1>

        {error && <div className="message error">{error}</div>}

        {task && (
          <div className="task-detail">
            <div className="detail-row">
              <span className="detail-k">ID</span>
              <span className="detail-v">{task.id}</span>
            </div>

            <div className="detail-row">
              <span className="detail-k">Título</span>
              <span className="detail-v">{task.title}</span>
            </div>
          </div>
        )}

        <Link to="/" style={{ width: "100%" }}>
          <button className="btn-primary" type="button">
            Volver
          </button>
        </Link>
      </div>
    </div>
  );
}