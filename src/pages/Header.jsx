import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import "../styles/Carrito.css";
import { useState, useEffect } from "react";
export default function Header() {

  const { usuario, logout } = useAuth();
  const [carritoCount, setCarritoCount] = useState(0);


  function cerrarSesion() {
    logout();
    console.log("Sesión cerrada");
  }

    // ✅ Función para calcular el total de productos
  const obtenerConteoCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carritoHuertoHogar")) || [];
    const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    setCarritoCount(total);
  };

  // ✅ useEffect para escuchar cambios
  useEffect(() => {
    obtenerConteoCarrito();

    // Detecta cambios en otras pestañas
    const handleStorageChange = (e) => {
      if (e.key === "carritoHuertoHogar") {
        obtenerConteoCarrito();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Detecta cambios locales (cuando se usa dispatchEvent)
    window.addEventListener("carritoActualizado", obtenerConteoCarrito);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("carritoActualizado", obtenerConteoCarrito);
    };
  }, []);


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

          {/* Mostramos contenido condicional según el login */}
          {!usuario ? (
            // Sección visible cuando el usuario NO está logueado
            <div className="d-flex align-items-center">
              <Link to="/login" className="btn btn-outline-primary me-2">
                Ingresar
              </Link>
              <Link to="/registro" className="btn btn-primary me-3">
                Registrarse
              </Link>
              {/* <Link
                to="/carrito"
                className="btn btn-link position-relative cart-icon"
              >
                <i className="bi bi-cart3" style={{ fontSize: "1.5rem" }}></i>
                <span className="cart-count">0</span>
              </Link> */}
            </div>
          ) : (
            // Sección visible cuando el usuario SÍ está logueado
            <div className="d-flex align-items-center">
              {/* Si es admin, podrías mostrar su panel */}
              {usuario.rol === "admin" && (
                <Link to="/admin" className="btn btn-outline-primary me-2">
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
                {carritoCount > 0 && (
                  <span className="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {carritoCount}
                  </span>
                )}
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
