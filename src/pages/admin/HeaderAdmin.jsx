import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function HeaderAdmin() {
  const { usuario, logout } = useAuth();

  const cerrarSesion = () => {
    logout();
    console.log("Sesión cerrada");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/admin">
          <img src="/img/logo.jpg" alt="del campo al hogar" className="logo-navbar" end/>
        </NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarAdmin">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarAdmin">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/admin" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/usuarios" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} end>
                Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/productos" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")} end>
                Productos
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {usuario?.rol === "admin" && (
              <Link to="/" className="btn btn-outline-primary me-2">
                Ir a tienda
              </Link>
            )}

            <span className="me-2 text-secondary">Bienvenido, </span>
            <span className="user-email me-3 text-verde fw-bold">{usuario?.nombre || usuario?.email}</span>
            <Link to="/">
            <button className="btn btn-outline-primary me-2" onClick={cerrarSesion}>
              <i className="bi bi-box-arrow-right"></i> Cerrar sesión
            </button>
            </Link>
            

          </div>
        </div>
      </div>
    </nav>
  );
}
