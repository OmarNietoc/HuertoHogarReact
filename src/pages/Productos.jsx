// src/pages/Productos.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Productos.css";
import { useProducts } from "../hooks/useProducts";

function Productos() {
  // Usar el hook de TanStack Query
  const { data: productos = [], isLoading, isError } = useProducts();

  const [categoria, setCategoria] = useState("all");
  const [busqueda, setBusqueda] = useState("");

  // Helper para normalizar categorías del backend a las keys del frontend
  const getCategoryKey = (nombreCategoria) => {
    if (!nombreCategoria) return "otros";
    const lower = nombreCategoria.toLowerCase();
    if (lower.includes("frutas")) return "frutas";
    if (lower.includes("verduras")) return "verduras";
    if (lower.includes("orgánicos") || lower.includes("organicos")) return "organicos";
    if (lower.includes("lácteos") || lower.includes("lacteos")) return "lacteos";
    return "otros";
  };

  //Filtros combinados
  const productosFiltrados = productos.filter((p) => {
    // La categoría viene como objeto desde el backend: { id: 1, name: "Frutas Frescas" }
    const catKey = getCategoryKey(p.categoria?.name);
    const coincideCategoria = categoria === "all" || catKey === categoria;

    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  if (isError) {
    return (
      <div className="text-center my-5">
        <h3 className="text-danger">Error al cargar productos</h3>
        <p>Por favor, intenta nuevamente más tarde.</p>
      </div>
    );
  }

  return (
    <>
      {/*HERO SECTION */}
      <section className="hero-section text-center text-white">
        <div className="container">
          <h1 className="display-5 fw-bold">Nuestros Productos</h1>
          <p className="lead">
            Descubre la frescura y calidad de nuestros productos directamente
            del campo a tu hogar
          </p>
        </div>
      </section>

      {/*CONTENIDO PRINCIPAL */}
      <div className="container my-5">
        {/*Buscador */}
        <div className="product-search text-center mb-3">
          <input
            type="text"
            className="form-control w-50 mx-auto"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/*Filtros de categoría */}
        <div className="category-filter text-center mb-4">
          {["all", "frutas", "verduras", "organicos", "lacteos"].map((cat) => (
            <button
              key={cat}
              className={`btn btn-outline-primary category-btn ${categoria === cat ? "active" : ""
                }`}
              onClick={() => setCategoria(cat)}
            >
              {cat === "all"
                ? "Todos"
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/*Estado de carga */}
        {isLoading && (
          <div id="loading" className="text-center my-5">
            <div className="spinner-border text-verde" role="status" />
            <p className="mt-2 text-secondary" aria-label="loading-text">
              Cargando productos...
            </p>
          </div>
        )}

        {/*Lista de productos */}
        {!isLoading && productosFiltrados.length > 0 && (
          <div className="row">
            <AnimatePresence>
              {productosFiltrados.map((producto) => (
                <motion.div
                  key={producto.id}
                  className="col-12 col-sm-6 col-md-4 mb-4"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card product-card h-100 shadow-sm">
                    {producto.stock <= 5 && (
                      <span className="offer-badge badge bg-warning position-absolute m-2">
                        ¡Poco Stock!
                      </span>
                    )}

                    <Link to={`/productos/${producto.id}`}>
                      <img
                        src={producto.imagen ? `data:image/jpeg;base64,${producto.imagen}` : '/img/placeholder.jpg'}
                        className="card-img-top"
                        alt={producto.nombre}
                        style={{ height: '250px', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = '/img/placeholder.jpg'; }}
                      />
                    </Link>

                    <div className="card-body">
                      <h5 className="card-title">
                        {producto.nombre}{" "}
                        <span className="badge bg-verde">{producto.id}</span>
                      </h5>
                      <p className="card-text text-truncate">{producto.descripcion}</p>

                      <div className="d-flex justify-content-between align-items-center">
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/*Sin productos disponibles */}
        {!isLoading && productosFiltrados.length === 0 && (
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
