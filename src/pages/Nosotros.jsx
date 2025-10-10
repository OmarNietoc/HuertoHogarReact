import { Link } from "react-router-dom";

export default function Nosotros() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero-personal">
        <div className="container text-center">
          <h1 className="display-5 fw-bold text-white">
            Productos Frescos del Campo a tu Hogar
          </h1>
          <p className="lead">
            Disfruta de la mejor calidad y frescura con envío a domicilio en todo Chile
          </p>
        </div>
      </section>

        {/* Sección principal */}
        <section className="mb-5">
          <div className="row align-items-center bg-light rounded shadow-sm p-3">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="/img/huerto.jpg"
                alt="Huerto Hogar"
                className="img-fluid rounded shadow mb-3 mt-3"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold text-primary">Somos Huerto Hogar</h2>
              <p className="text-secondary">
                HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los
                productos del campo directamente a la puerta de nuestros clientes en Chile.
                Con más de 6 años de experiencia, operamos en más de 9 puntos a lo largo del país,
                incluyendo ciudades clave como Santiago, Puerto Montt, Villarica, Nacimiento,
                Viña del Mar, Valparaíso y Concepción.
              </p>
              <p className="text-secondary">
                Nuestra misión es conectar a las familias chilenas con el campo, promoviendo un
                estilo de vida saludable y sostenible.
              </p>
            </div>
          </div>
        </section>

        {/* Misión y Visión */}
        <section className="mb-5">
          <div className="row text-center">
            <div className="col-md-6 mb-4">
              <div className="p-4 border rounded h-100 shadow-sm bg-light">
                <i className="bi bi-leaf text-success display-5 mb-3"></i>
                <h3 className="fw-bold text-primary">Misión</h3>
                <p className="text-secondary">
                  Proporcionar productos frescos y de calidad directamente desde el campo hasta
                  la puerta de nuestros clientes, apoyando prácticas agrícolas sostenibles y
                  promoviendo una alimentación saludable en todos los hogares chilenos.
                </p>
                <img
                  src="/img/personal.jpg"
                  alt="Personal"
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="p-4 border rounded h-100 shadow-sm bg-light">
                <h3 className="fw-bold text-primary">Visión</h3>
                <p className="text-secondary">
                  Ser la tienda online líder en la distribución de productos frescos y naturales
                  en Chile, reconocida por nuestra calidad, servicio al cliente y compromiso con
                  la sostenibilidad, expandiendo nuestra presencia a nivel nacional e internacional.
                </p>
                <img
                  src="/img/vegetales.jpg"
                  alt="Vegetales"
                  className="img-fluid rounded shadow"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ubicaciones */}
        <section className="bg-light py-5 px-4 rounded shadow-sm">
          <h2 className="fw-bold text-center text-primary mb-4">Estamos presentes en</h2>
          <div className="row text-center justify-content-center">
            {[
              "Santiago",
              "Puerto Montt",
              "Villarica",
              "Nacimiento",
              "Viña del Mar",
              "Valparaíso",
              "Concepción",
            ].map((ciudad, index) => (
              <div key={index} className="col-6 col-md-3 mb-4">
                <i className="bi bi-geo-alt-fill text-success display-6"></i>
                <p className="text-secondary mt-2">{ciudad}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Botón de regreso */}
        <div className="text-center mt-5">
          <Link to="/" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left-circle me-2"></i> Volver al inicio
          </Link>
        </div>
   
    </>
  );
}
