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
  const { usuario, logout } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosRes, categoriasRes] = await Promise.all([
          fetch("/data/productos.json"),
          fetch("/data/categorias.json"),
        ]);

        const productosData = await productosRes.json();
        const categoriasData = await categoriasRes.json();

        // Producto actual
        const encontrado = productosData.find((p) => String(p.id) === id);
        setProducto(encontrado);

        // Categoría del producto
        const cat = categoriasData.find((c) => c.id === encontrado?.categoria);
        setCategoria(cat);

        // Productos relacionados: mismos primero, luego otros, máximo 6
        const relacionados = [
          ...productosData.filter(
            (p) => p.categoria === encontrado?.categoria && p.id !== id
          ),
          ...productosData.filter(
            (p) => p.categoria !== encontrado?.categoria
          )
        ].slice(0, 6);

        setProductosRelacionados(relacionados);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const agregarAlCarrito = () => {

  if (!usuario) {
      alert("❌ Debes iniciar sesión para añadir productos al carrito");
      return;
    }

    const carritoActual = JSON.parse(localStorage.getItem("carritoHuertoHogar")) || [];
    const existente = carritoActual.find((item) => item.id === producto.id);

    if (existente) {
      existente.cantidad += cantidad;
    } else {
      carritoActual.push({ ...producto, cantidad });
    }

    localStorage.setItem("carritoHuertoHogar", JSON.stringify(carritoActual));
    alert(`✅ ${producto.nombre} añadido al carrito`);  
  };

  if (loading) return <p className="text-center my-5">Cargando producto...</p>;
  if (!producto) return <p className="text-center my-5 text-danger">Producto no encontrado</p>;

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
