import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Slider from "react-slick";
import "../styles/Productos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "../context/AuthContext";
import { useProduct, useProducts } from "../hooks/useProducts";

export default function DetalleProducto() {
  const { id } = useParams();
  const { usuario } = useAuth();

  // Hooks de TanStack Query
  const { data: producto, isLoading: loadingProducto, isError } = useProduct(id);
  const { data: todosLosProductos = [] } = useProducts();

  const [cantidad, setCantidad] = useState(1);

  // Lógica de productos relacionados
  const productosRelacionados = producto ? [
    ...todosLosProductos.filter(
      (p) => p.categoria?.id === producto.categoria?.id && String(p.id) !== String(id)
    ),
    ...todosLosProductos.filter(
      (p) => p.categoria?.id !== producto.categoria?.id
    )
  ].slice(0, 6) : [];

  const agregarAlCarrito = () => {
    if (!usuario) {
      alert("❌ Debes iniciar sesión para añadir productos al carrito");
      return;
    }

    if (!producto) return;

    const carritoActual = JSON.parse(localStorage.getItem("carritoHuertoHogar")) || [];
    const existente = carritoActual.find((item) => String(item.id) === String(producto.id));

    // Preparar objeto para carrito (asegurando imagen base64 si es necesario)
    const productoCarrito = {
      ...producto,
      // Si la imagen viene sin prefijo, se lo agregamos para que se vea en el carrito si este usa img src directo
      // Pero mejor guardamos la data tal cual y el componente de carrito que se encargue del src
      cantidad,
      unid: producto.unid?.name || "unidad"
    };

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carritoActual.push(productoCarrito);
    }

    localStorage.setItem("carritoHuertoHogar", JSON.stringify(carritoActual));
    window.dispatchEvent(new Event("carritoActualizado"));
    alert(`✅ ${producto.nombre} añadido al carrito`);

    setCantidad(1);
  };

  if (loadingProducto) {
    return (
      <div className="container my-5">
        <div className="text-center my-5">
          <div className="spinner-border text-verde" role="status" />
          <p className="mt-2 text-secondary">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (isError || !producto) {
    return (
      <div className="container my-5">
        <div className="text-center my-5">
          <i className="bi bi-exclamation-triangle display-1 text-danger"></i>
          <h3 className="text-danger">Producto no encontrado o error de carga</h3>
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
              src={producto.imagen ? `data:image/jpeg;base64,${producto.imagen}` : '/img/placeholder.jpg'}
              alt={producto.nombre}
              className="img-fluid rounded"
              onError={(e) => { e.target.src = '/img/placeholder.jpg'; }}
            />
          </div>

          {/* Información del producto */}
          <div className="col-md-6 d-flex flex-column justify-content-start producto-info">
            <h2>{producto.nombre}</h2>
            <p className="text-secondary">Código: {producto.id}</p>
            <p>{producto.descripcion}</p>
            <span className="priceUnit">
              ${producto.precio.toLocaleString()} CLP/{producto.unid?.name || 'unid'}
            </span>

            {producto.stock <= 5 && (
              <p className="text-warning fw-bold mt-2">¡Quedan pocas unidades! (Stock: {producto.stock})</p>
            )}

            <div className="d-flex align-items-center mb-3 mt-3">
              <input
                type="number"
                min="1"
                max={producto.stock}
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                className="form-control"
                style={{ width: "15%" }}
              />
            </div>

            <button
              className="btn btn-primary btn-agregar-carrito"
              onClick={agregarAlCarrito}
              disabled={producto.stock === 0}
            >
              {producto.stock === 0 ? "Sin Stock" : "Añadir al carrito"}
            </button>
          </div>
        </div>

        {/* Información de la categoría */}
        {producto.categoria && (
          <div className="row mt-5">
            <div className="col">
              <p className="fw-semibold">
                Categoría: <span>{producto.categoria.name}</span>
              </p>
              {/* Backend category model doesn't have description currently */}
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
                      src={prod.imagen ? `data:image/jpeg;base64,${prod.imagen}` : '/img/placeholder.jpg'}
                      className="card-img-top"
                      alt={prod.nombre}
                      onError={(e) => { e.target.src = '/img/placeholder.jpg'; }}
                    />
                  </Link>
                  <div className="card-body">
                    <h6 className="card-title">{prod.nombre}</h6>
                    <p className="price card-text text-success fw-bold">
                      ${prod.precio.toLocaleString()} CLP/{prod.unid?.name || 'unid'}
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

