import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="py-5 mt-auto">
      <div className="container">
        <div className="row">
          {/* Columna logo */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-primary">
              <img
                src="/img/logo.jpg"
                alt="del campo al hogar"
                className="logo-navbar"
              />
            </h5>
            <p className="text-secondary">
              Llevando la frescura del campo a tu hogar desde 2017.
            </p>
          </div>

          {/* Columna enlaces */}
          <div className="col-md-4 mb-4 mb-md-0">
            <h5 className="text-primary">Enlaces rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/nosotros" className="nav-link">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/tyc" className="nav-link">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/politicas" className="nav-link">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna contacto */}
          <div className="col-md-4">
            <h5 className="text-primary">Contacto</h5>
            <ul className="list-unstyled">
              <li className="text-secondary">
                <i className="bi bi-geo-alt-fill me-2"></i>Santiago, Chile
              </li>
              <li className="text-secondary">
                <i className="bi bi-envelope-fill me-2"></i>contacto@huertohogar.cl
              </li>
              <li className="text-secondary">
                <i className="bi bi-telephone-fill me-2"></i>+56 2 2345 6789
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />
        <p className="text-center text-secondary mb-0">
          &copy; 2025 HuertoHogar. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
