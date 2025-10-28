import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import "../styles/Productos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../context/AuthContext"; 

export default function DetalleProducto() {
    const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { usuario } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // PRIMERO: Intentar cargar desde localStorage
        const productosStorage = JSON.parse(localStorage.getItem("productosHuertoHogar"));
        let productosData = [];

        if (productosStorage && productosStorage.length > 0) {
          console.log("📦 Cargando productos desde localStorage");
          productosData = productosStorage;
        } else {
          // FALLBACK: Cargar desde JSON si no hay en localStorage
          console.log("🔄 Cargando productos desde JSON");
          const productosRes = await fetch("/data/productos.json");
          productosData = await productosRes.json();
          
          // Guardar en localStorage para futuras cargas
          localStorage.setItem("productosHuertoHogar", JSON.stringify(productosData));
        }

        // Cargar categorías
        const categoriasRes = await fetch("/data/categorias.json");
        const categoriasData = await categoriasRes.json();

        // Buscar producto actual
        const encontrado = productosData.find((p) => String(p.id) === String(id));
        
        if (!encontrado) {
          setError("Producto no encontrado");
          setLoading(false);
          return;
        }

        setProducto(encontrado);

        // Categoría del producto
        const cat = categoriasData.find((c) => c.id === encontrado.categoria);
        setCategoria(cat);

        // Productos relacionados: mismos primero, luego otros, máximo 6
        const relacionados = [
          ...productosData.filter(
            (p) => p.categoria === encontrado.categoria && String(p.id) !== String(id)
          ),
          ...productosData.filter(
            (p) => p.categoria !== encontrado.categoria
          )
        ].slice(0, 6);

        setProductosRelacionados(relacionados);

      } catch (error) {
        console.error("❌ Error cargando datos:", error);
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Escuchar cambios en localStorage para actualizar en tiempo real
  useEffect(() => {
    const handleStorageChange = () => {
      const productosStorage = JSON.parse(localStorage.getItem("productosHuertoHogar"));
      if (productosStorage && producto) {
        const productoActualizado = productosStorage.find((p) => String(p.id) === String(id));
        if (productoActualizado && JSON.stringify(productoActualizado) !== JSON.stringify(producto)) {
          console.log("🔄 Producto actualizado desde localStorage");
          setProducto(productoActualizado);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Verificar periódicamente cambios en la misma pestaña
    const interval = setInterval(() => {
      const productosStorage = JSON.parse(localStorage.getItem("productosHuertoHogar"));
      if (productosStorage && producto) {
        const productoActualizado = productosStorage.find((p) => String(p.id) === String(id));
        if (productoActualizado && JSON.stringify(productoActualizado) !== JSON.stringify(producto)) {
          console.log("🔄 Producto actualizado (misma pestaña)");
          setProducto(productoActualizado);
        }
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [id, producto]);

  const agregarAlCarrito = () => {
    if (!usuario) {
      alert("❌ Debes iniciar sesión para añadir productos al carrito");
      return;
    }

    if (!producto) return;

    const carritoActual = JSON.parse(localStorage.getItem("carritoHuertoHogar")) || [];
    const existente = carritoActual.find((item) => String(item.id) === String(producto.id));

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carritoActual.push({ 
        ...producto, 
        cantidad,
        // Asegurar que tenemos todos los campos necesarios
        unid: producto.unid || "unidad"
      });
    }

    localStorage.setItem("carritoHuertoHogar", JSON.stringify(carritoActual));
    window.dispatchEvent(new Event("carritoActualizado"));
    alert(`✅ ${producto.nombre} añadido al carrito`);
    
    // Resetear cantidad
    setCantidad(1);
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center my-5">
          <div className="spinner-border text-verde" role="status" />
          <p className="mt-2 text-secondary">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="text-center my-5">
          <i className="bi bi-exclamation-triangle display-1 text-danger"></i>
          <h3 className="text-danger">{error}</h3>
          <Link to="/productos" className="btn btn-primary mt-3">
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className="container my-5">
        <div className="text-center my-5">
          <i className="bi bi-question-circle display-1 text-secondary"></i>
          <h3 className="text-marron">Producto no encontrado</h3>
          <Link to="/productos" className="btn btn-primary mt-3">
            Volver a Productos
          </Link>
        </div>
      </div>
    );
  }

  // Configuración del carrusel
  const settings = {
    dots: false,
    infinite: productosRelacionados.length > 4,
    speed: 500,
    slidesToShow: Math.min(productosRelacionados.length, 4),
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: Math.min(productosRelacionados.length, 3) } },
      { breakpoint: 768, settings: { slidesToShow: Math.min(productosRelacionados.length, 2) } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <section className="bg-light py-5 px-4 rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/productos" className="btn btn-primary me-3">
            <i className="bi bi-arrow-left me-1"></i> Volver
          </Link>
        </div>

        <div className="row g-4">
          {/* Imagen del producto */}
          <div className="col-md-6">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded"
            />
          </div>

          {/* Información del producto */}
          <div className="col-md-6 d-flex flex-column justify-content-start producto-info">
            <h2>{producto.nombre}</h2>
            <p className="text-secondary">Código: {producto.id}</p>
            <p>{producto.descripcion}</p>
            <span className="priceUnit">
              ${producto.precio.toLocaleString()} CLP/{producto.unid}
            </span>

            <div className="d-flex align-items-center mb-3 mt-3">
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                className="form-control"
                style={{ width: "15%" }}
              />
            </div>

            <button
              className="btn btn-primary btn-agregar-carrito"
              onClick={agregarAlCarrito}
            >
              Añadir al carrito
            </button>
          </div>
        </div>

        {/* Información de la categoría */}
        {categoria && (
          <div className="row mt-5">
            <div className="col">
              <p className="fw-semibold">
                Categoría: <span>{categoria.nombre}</span>
              </p>
              <p>{categoria.descripcion}</p>
            </div>
          </div>
        )}
      </section>

      {/* Carrusel de productos relacionados */}
      {productosRelacionados.length > 0 && (
        <section className="mt-5 fluid">
            <h5>Otros usuarios también llevaron:</h5>
          
          <Slider {...settings}>
            {productosRelacionados.map((prod) => (
              <div key={prod.id} className="px-2">
                <div className="card producto-relacionado">
                  <Link to={`/productos/${prod.id}`}>
                    <img
                      src={prod.imagen}
                      className="card-img-top"
                      alt={prod.nombre}
                    />
                  </Link>
                  <div className="card-body">
                    <h6 className="card-title">{prod.nombre}</h6>
                    <p className="price card-text text-success fw-bold">
                      ${prod.precio.toLocaleString()} CLP/{prod.unid}
                    </p>
                    <Link to={`/productos/${prod.id}`} className="btn btn-outline-primary btn-sm">
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      )}
  </>
  );

}
