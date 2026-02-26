import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [user, setUser] = useState(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/api/tasks");
      setTasks(res.data);
    } catch (error) {
      navigate("/login");
    }
  };

  const fetchMe = async () => {
    try {
      const res = await api.get("/api/users/me");
      setUser(res.data);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchMe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingId) {
        await api.put(`/api/tasks/${editingId}`, { title });
        setEditingId(null);
      } else {
        await api.post("/api/tasks", { title });
      }

      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingId(task.id);
  };

  const handleCancelEdit = () => {
    setTitle("");
    setEditingId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="topbar">
  <div className="user-menu">
    <button
      className="user-chip"
      type="button"
      onClick={() => setOpenUserMenu((v) => !v)}
    >
      Usuario
    </button>

    {openUserMenu && (
      <div className="user-popover">
        <div className="user-title">Cuenta</div>

        <div className="user-line">
          <span className="user-k">Nombre</span>
          <span className="user-v">{user?.name || "-"}</span>
        </div>

        <div className="user-line">
          <span className="user-k">Email</span>
          <span className="user-v">{user?.email || "-"}</span>
        </div>

        <button
          className="btn-secondary user-logout"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    )}
  </div>
</div>

      <div className="app-container">
        <div className="card">
          <h1>Mis Tareas</h1>

          <form onSubmit={handleSubmit} className="task-form">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escribí una tarea..."
            />

            <button className="btn-primary" type="submit">
              {editingId ? "Actualizar" : "Agregar"}
            </button>

            {editingId && (
              <button className="btn-secondary" type="button" onClick={handleCancelEdit}>
                Cancelar
              </button>
            )}
          </form>

          {tasks.length === 0 && <p className="empty-state">No tenés tareas todavía</p>}

          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <span>{task.title}</span>
              <div className="task-buttons">
                <Link to={`/tasks/${task.id}`}>
                <button className="btn-secondary" type="button">
                           Ver
                </button>
                </Link>
                <button className="btn-secondary" type="button" onClick={() => handleEdit(task)}>
                  Editar
                </button>
                <button className="btn-danger" type="button" onClick={() => handleDelete(task.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;