import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function DetalleProducto() {
  const { id } = useParams(); // obtenemos el id del producto desde la URL
  const [producto, setProducto] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [productosRelacionados, setProductosRelacionados] = useState([]);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosRes, categoriasRes] = await Promise.all([
          fetch("/data/productos.json"),
          fetch("/data/categorias.json"),
        ]);

        const productosData = await productosRes.json();
        const categoriasData = await categoriasRes.json();

        const encontrado = productosData.find((p) => String(p.id) === id);
        setProducto(encontrado);

        const cat = categoriasData.find((c) => c.id === encontrado?.categoria);
        setCategoria(cat);

        const relacionados = productosData.filter(
          (p) => p.categoria === encontrado?.categoria && p.id !== id
        );
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

  return (
    <main className="container my-5">
      <section className="bg-light py-5 px-4 rounded shadow-sm">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/productos" className="btn btn-primary me-3">
            <i className="bi bi-arrow-left me-1"></i> Volver
          </Link>
        </div>

        <div className="row g-4">
          <div className="col-md-6">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded"
            />
          </div>

          <div className="col-md-6 d-flex flex-column justify-content-start producto-info">
            <h2>{producto.nombre}</h2>
            <p className="text-secondary">Código: {producto.id}</p>
            <p>{producto.descripcion}</p>
            <h3 className="text-success fw-bold">${producto.precio.toLocaleString()}</h3>

            <div className="d-flex align-items-center mb-3">
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                className="form-control mt-3"
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

      {/* Productos relacionados */}
      {productosRelacionados.length > 0 && (
        <div className="row mt-4">
          <div className="col">
            <h5>Otros usuarios también llevaron:</h5>
            <div className="d-flex flex-wrap gap-3">
              {productosRelacionados.map((prod) => (
                <div key={prod.id} className="card" style={{ width: "14rem" }}>
                  <Link to={`/productos/${prod.id}`}>
                    <img
                      src={prod.imagen}
                      className="card-img-top"
                      alt={prod.nombre}
                    />
                  </Link>  

                  <div className="card-body">
                    <h6 className="card-title">{prod.nombre}</h6>
                    <p className="card-text text-success fw-bold">
                      ${prod.precio.toLocaleString()}
                    </p>
                    <Link to={`/productos/${prod.id}`} className="btn btn-outline-primary btn-sm">
                      Ver detalle
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
