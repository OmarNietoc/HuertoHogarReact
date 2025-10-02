import { Link } from "react-router-dom";


export default function Header() {
  function cerrarSesion() {
    console.log("Cerrando sesión...");
    // lógica para logout
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src="/img/logo.jpg" alt="del campo al hogar" className="logo-navbar" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link active" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/productos">Productos</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blogs">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          </ul>
          <div id="LoginRegister" className="d-none d-flex align-items-center">
            <Link to="/login" className="btn btn-outline-primary me-2">Ingresar</Link>
            <Link to="/registro" className="btn btn-primary me-3">Registrarse</Link>
            <Link to="/carrito" className="btn btn-link position-relative cart-icon">
              <i className="bi bi-cart3" style={{ fontSize: "1.5rem" }}></i>
              <span className="cart-count">0</span>
            </Link>
          </div>
          <div id="userLoggedIn" className="d-flex align-items-center d-none">
            <div id="panelAdmin" className="d-none d-flex align-items-center">
              <Link to="/home" className="btn btn-outline-primary me-2">Ir a Panel Admin</Link>
            </div>
            <span className="me-2 text-secondary">Bienvenido, </span>
            <span className="user-email me-3 text-verde fw-bold"></span>
            <Link to="/carrito" className="btn btn-link position-relative cart-icon me-2">
              <i className="bi bi-cart3" style={{ fontSize: "1.5rem" }}></i>
              <span className="cart-count">0</span>
            </Link>
            <button className="btn btn-outline-primary me-2" onClick={cerrarSesion}>
              <i className="bi bi-box-arrow-right"></i> Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
