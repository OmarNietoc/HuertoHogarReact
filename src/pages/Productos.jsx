// src/pages/Productos.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("all");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    //Simulación temporal de carga local
    const fetchProductos = async () => {
      try {
        const response = await fetch("/data/productos.json"); // o endpoint
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  // Filtrado por categoría
  const filtrarPorCategoria = (prod) => {
    if (categoria === "all") return true;
    return prod.categoria === categoria;
  };

  // Filtrado por búsqueda
  const filtrarPorBusqueda = (prod) =>
    prod.nombre.toLowerCase().includes(busqueda.toLowerCase());

  // Productos finales tras filtros
  const productosFiltrados = productos.filter(
    (p) => filtrarPorCategoria(p) && filtrarPorBusqueda(p)
  );

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section text-center text-white">
        <div className="container">
          <h1 className="display-5 fw-bold">Nuestros Productos</h1>
          <p className="lead">
            Descubre la frescura y calidad de nuestros productos directamente
            del campo a tu hogar
          </p>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <div className="container my-5">
        {/* Buscador */}
        <div className="product-search text-center mb-3">
          <input
            type="text"
            className="form-control w-50 mx-auto"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Filtros por categoría */}
        <div className="category-filter text-center mb-4">
          {["all", "frutas", "verduras", "organicos", "lacteos"].map((cat) => (
            <button
              key={cat}
              className={`btn btn-outline-primary category-btn ${
                categoria === cat ? "active" : ""
              }`}
              onClick={() => setCategoria(cat)}
            >
              {cat === "all"
                ? "Todos"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Estado de carga */}
        {loading && (
          <div id="loading" className="text-center my-5">
            <div className="spinner-border text-verde" role="status">
              <span className="visually-hidden">Cargando productos...</span>
            </div>
            <p className="mt-2 text-secondary">Cargando productos...</p>
          </div>
        )}

        {/* Productos */}
        {!loading && productosFiltrados.length > 0 && (
          <div className="row">
            {productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="col-12 col-sm-6 col-md-4 mb-4"
                data-category={producto.categoria}
              >
                <div className="card product-card h-100">
                  {producto.oferta && (
                    <span className="offer-badge badge position-absolute m-2">
                      {producto.oferta}
                    </span>
                  )}

                  <Link to={`/productos/${producto.id}`}>
                    <img
                      src={producto.imagen}
                      className="card-img-top"
                      alt={producto.nombre}
                    />
                  </Link>

                  <div className="card-body">
                    <h5 className="card-title">
                      {producto.nombre}{" "}
                      <span className="badge bg-verde">{producto.id}</span>
                    </h5>
                    <p className="card-text">{producto.descripcion}</p>

                    <div className="d-flex justify-content-between align-items-center">
                      <span className="price">
                        ${producto.precio} CLP/{producto.unid}
                      </span>
                      <button className="btn btn-primary btn-agregar-carrito">
                        <i className="bi bi-cart-plus"></i> Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sin productos */}
        {!loading && productosFiltrados.length === 0 && (
          <div id="no-products" className="text-center my-5 bg-light py-3">
            <i className="bi bi-inbox display-1 text-secondary"></i>
            <h3 className="text-marron">No existen productos disponibles</h3>
            <p className="text-secondary">
              Pronto tendremos nuevos productos para ti.
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default Productos;
