import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";

export default function Home() {
  const { data: productos = [], isLoading } = useProducts();

  // Tomamos los primeros 3 productos como destacados
  const productosDestacados = productos.slice(0, 3);

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
          {isLoading && <p className="text-center my-5">Cargando productos...</p>}

          {!isLoading &&
            productosDestacados.map((producto) => (
              <div
                key={producto.id}
                className="col-12 col-sm-6 col-md-4 mb-4"
              >
                <div className="card product-card h-100">
                  {/* Oferta no existe en backend, usamos stock bajo como "destacado" visual */}
                  {producto.stock <= 5 && (
                    <span className="offer-badge badge bg-warning position-absolute m-2">
                      ¡Poco Stock!
                    </span>
                  )}

                  <Link to={`/productos/${producto.id}`}>
                    <img
                      src={producto.imagen ? `data:image/jpeg;base64,${producto.imagen}` : '/img/placeholder.jpg'}
                      className="card-img-top img-fluid"
                      alt={producto.nombre}
                      style={{ height: '250px', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/img/placeholder.jpg'; }}
                    />
                  </Link>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                      {producto.nombre}{" "}
                      <span className="badge bg-verde">{producto.id}</span>
                    </h5>
                    <p className="card-text text-truncate">{producto.descripcion}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="price">
                        ${producto.precio?.toLocaleString()} CLP/{producto.unid?.name || 'unid'}
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

      {/* Sección Descarga App Android */}
      <section className="bg-white py-5 my-5 rounded shadow-sm">
        <div className="container text-center px-3">
          <h2 className="fw-bold text-success mb-3">
            ¡Descarga nuestra App Móvil! 📱
          </h2>
          <p className="text-secondary mb-4">
            Lleva Huerto Hogar contigo y compra tus productos favoritos desde tu
            teléfono Android, fácil y rápido.
          </p>
          <a
            href="/app/huertohogar.apk"
            download
            className="btn btn-success btn-lg d-inline-flex align-items-center gap-2 px-4 py-2 shadow-sm"
          >
            <img
              src="/img/android.png"
              alt="Logo Android"
              width="28"
              height="28"
              className="me-2"
            />
            Descargar App Android
          </a>
          <p className="mt-3 text-muted small">
            Disponible solo para dispositivos Android.
          </p>
        </div>
      </section>


    </>
  );
}
