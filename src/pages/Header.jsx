import { NavLink, Link } from "react-router-dom";
import { useContext } from "react"; // 🧩 1️⃣ Importamos useContext
import { AuthContext } from "../context/AuthContext"; // 🧩 2️⃣ Importamos nuestro contexto
import "../styles/Carrito.css";
export default function Header() {
  // 🧩 3️⃣ Obtenemos el usuario y las funciones desde el contexto
  const { usuario, logout } = useContext(AuthContext);

  // 🧩 4️⃣ Reemplazamos la función anterior por la del contexto
  function cerrarSesion() {
    logout();
    console.log("Sesión cerrada");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src="/img/logo.jpg"
            alt="del campo al hogar"
            className="logo-navbar"
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/productos"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/nosotros"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/blogs"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contacto"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Contacto
              </NavLink>
            </li>
          </ul>

          {/* 🧩 5️⃣ Mostramos contenido condicional según el login */}
          {!usuario ? (
            // 👇 Sección visible cuando el usuario NO está logueado
            <div className="d-flex align-items-center">
              <Link to="/login" className="btn btn-outline-primary me-2">
                Ingresar
              </Link>
              <Link to="/registro" className="btn btn-primary me-3">
                Registrarse
              </Link>
              <Link
                to="/carrito"
                className="btn btn-link position-relative cart-icon"
              >
                <i className="bi bi-cart3" style={{ fontSize: "1.5rem" }}></i>
                <span className="cart-count">0</span>
              </Link>
            </div>
          ) : (
            // 👇 Sección visible cuando el usuario SÍ está logueado
            <div className="d-flex align-items-center">
              {/* Si es admin, podrías mostrar su panel */}
              {usuario.rol === "admin" && (
                <Link to="/home" className="btn btn-outline-primary me-2">
                  Ir a Panel Admin
                </Link>
              )}

              <span className="me-2 text-secondary">
                Bienvenido,&nbsp;
                <span className="text-verde fw-bold">
                  {usuario.nombre || usuario.email}
                </span>
              </span>

              <Link
                to="/carrito"
                className="btn btn-link position-relative cart-icon me-2"
              >
                <i className="bi bi-cart3" style={{ fontSize: "1.5rem" }}></i>
                <span className="cart-count">0</span>
              </Link>

              <button
                className="btn btn-outline-primary me-2"
                onClick={cerrarSesion}
              >
                <i className="bi bi-box-arrow-right"></i> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
