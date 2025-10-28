// src/pages/Productos.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Productos.css";

function Productos() {
  //Estados principales
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState("all");
  const [busqueda, setBusqueda] = useState("");

  //Cargar productos desde localStorage o JSON
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // PRIMERO intentar cargar desde localStorage (productos agregados/editados)
        const productosStorage = JSON.parse(localStorage.getItem("productosHuertoHogar"));
        
        if (productosStorage && productosStorage.length > 0) {
          console.log("📦 Productos cargados desde localStorage:", productosStorage);
          setProductos(productosStorage);
          setLoading(false);
        } else {
          // SI NO HAY en localStorage, cargar desde JSON por defecto
          console.log("🔄 No hay productos en localStorage, cargando desde JSON...");
          const response = await fetch("/data/productos.json");
          const data = await response.json();
          setProductos(data);
          
          // Guardar en localStorage para futuras cargas
          localStorage.setItem("productosHuertoHogar", JSON.stringify(data));
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Error cargando productos:", error);
        setLoading(false);
      }
    };
    
    fetchProductos();
  }, []);

  // Escuchar cambios en localStorage para actualizar en tiempo real
  useEffect(() => {
    const handleStorageChange = () => {
      const productosStorage = JSON.parse(localStorage.getItem("productosHuertoHogar"));
      if (productosStorage) {
        console.log("🔄 Productos actualizados desde localStorage");
        setProductos(productosStorage);
      }
    };

    // Escuchar eventos de storage (cuando se modifica desde otra pestaña/ventana)
    window.addEventListener('storage', handleStorageChange);
    
    // También verificar periódicamente (para cambios en la misma pestaña)
    const interval = setInterval(() => {
      const productosStorage = JSON.parse(localStorage.getItem("productosHuertoHogar"));
      if (productosStorage && JSON.stringify(productosStorage) !== JSON.stringify(productos)) {
        console.log("🔄 Productos actualizados (misma pestaña)");
        setProductos(productosStorage);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [productos]);

  //Filtros combinados
  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria = categoria === "all" || p.categoria === categoria;
    const coincideBusqueda = p.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

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

        {/*Estado de carga */}
        {loading && (
          <div id="loading" className="text-center my-5">
            <div className="spinner-border text-verde" role="status" />
            {/* Solo un texto visible → evita duplicado del test */}
            <p className="mt-2 text-secondary" aria-label="loading-text">
              Cargando productos...
            </p>
          </div>
        )}

        {/*Lista de productos */}
        {!loading && productosFiltrados.length > 0 && (
          <div className="row">
            <AnimatePresence>
              {productosFiltrados.map((producto) => (
                <motion.div
                  key={producto.id}
                  className="col-12 col-sm-6 col-md-4 mb-4"
                  data-category={producto.categoria}
                  layout
                  layoutId={`producto-${producto.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card product-card h-100 shadow-sm">
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
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/*Sin productos disponibles */}
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
