import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("/data/productos.json");
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container text-center px-3">
          <h1 className="display-5 fw-bold text-white">
            Productos Frescos del Campo a tu Hogar
          </h1>
          <p className="lead">
            Disfruta de la mejor calidad y frescura con envío a domicilio en todo Chile
          </p>
          <Link to="/productos" className="btn btn-primary btn-lg mt-3">
            Ver Productos
          </Link>
        </div>
      </section>

      {/* Productos Destacados */}
      <div className="container mb-4">
        <div className="row">
          <div className="col-12 text-center bg-light py-3 rounded shadow-sm">
            <h2>Nuestros Productos Destacados</h2>
            <p className="text-secondary">Selección de lo mejor de nuestra huerta</p>
          </div>
        </div>

        <div className="row mt-3">
          {loading && <p className="text-center my-5">Cargando productos...</p>}

          {!loading &&
            productos
              .filter((producto) => producto.oferta)
              .map((producto) => (
                <div
                  key={producto.id}
                  className="col-12 col-sm-6 col-md-4 mb-4"
                  data-category={producto.categoria}
                >
                  <div className="card product-card h-100">
                    <span className="offer-badge badge position-absolute m-2">
                      {producto.oferta}
                    </span>
                    <Link to={`/productos/${producto.id}`}>
                      <img
                        src={producto.imagen}
                        className="card-img-top img-fluid"
                        alt={producto.nombre}
                      />
                    </Link>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        {producto.nombre}{" "}
                        <span className="badge bg-verde">{producto.id}</span>
                      </h5>
                      <p className="card-text">{producto.descripcion}</p>
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <span className="price">
                          ${producto.precio.toLocaleString()} CLP/{producto.unid}
                        </span>
                        <Link to={`/productos/${producto.id}`}>
                          <button className="btn btn-primary btn-agregar-carrito">
                            <i className="bi bi-cart-plus"></i> Añadir
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>

        <div className="text-center mt-4 py-3">
          <Link to="/productos" className="btn btn-outline-primary">
            Ver todos los productos
          </Link>
        </div>
      </div>

      {/* Sección informativa */}
      <section className="bg-light py-5 rounded shadow-sm my-5">
        <div className="container px-3">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <h2>¿Por qué elegir HuertoHogar?</h2>
              <p>
                Con más de 6 años de experiencia, conectamos directamente a los
                agricultores locales con tu hogar, garantizando la máxima frescura
                y calidad en cada entrega.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-verde me-2"></i>
                  Productos 100% frescos y naturales
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-verde me-2"></i>
                  Apoyo a agricultores locales
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-verde me-2"></i>
                  Envío a domicilio en todo Chile
                </li>
                <li className="mb-2">
                  <i className="bi bi-check-circle-fill text-verde me-2"></i>
                  Compromiso con la sostenibilidad
                </li>
              </ul>
              <Link to="/nosotros" className="btn btn-primary mt-3 py-2">
                Conoce más sobre nosotros
              </Link>
            </div>
            <div className="col-12 col-md-6">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Agricultura sostenible"
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
