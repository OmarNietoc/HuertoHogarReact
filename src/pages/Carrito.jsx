import { useEffect, useState } from "react";
import "../styles/Carrito.css";

export default function Carrito() {

  const [cupon, setCupon] = useState("");
  const [descuento, setDescuento] = useState(0);

  // Inicializar carrito desde localStorage
const [carrito, setCarrito] = useState(() => {
    return JSON.parse(localStorage.getItem("carritoHuertoHogar")) || [];
});

  // Guardar carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carritoHuertoHogar", JSON.stringify(carrito));
    // Dispara evento para actualizar contador en el header
    window.dispatchEvent(new Event("carritoActualizado"));
  }, [carrito]);

  const cambiarCantidad = (index, cantidad) => {
    const nuevaCantidad = Math.max(1, cantidad);
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = nuevaCantidad;
    setCarrito(nuevoCarrito);
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    setCarrito(nuevoCarrito);
  };

  const aplicarCupon = () => {
    let desc = 0;
    if (cupon === "HUERTO10") desc = 0.1;
    if (cupon === "FRESH20") desc = 0.2;
    setDescuento(desc);
  };

  const totalCompra = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const totalConDescuento = totalCompra - totalCompra * descuento;

  const pagar = () => {
    if (carrito.length === 0) {
      alert("⚠️ Tu carrito está vacío. Agrega productos antes de pagar.");
      return;
    }
    alert("✅ Gracias por tu compra. Tu pedido está en camino.");
    setCarrito([]);
    setCupon("");
    setDescuento(0);
  };

  return (
    <div className="row my-5">
      <div className="col-lg-9">
        {carrito.length === 0 ? (
          <div className="bg-light py-5 px-4 rounded shadow-sm text-center">
            <h2 className="fw-bold text-primary">Tu carrito está vacío 🛒</h2>
          </div>
        ) : (
          <div className="list-group" id="productos-carrito">
            {carrito.map((producto, index) => (
              <div key={producto.id} className="list-group-item mb-3">
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img src={producto.imagen} alt={producto.nombre} className="img-fluid rounded" />
                  </div>
                  <div className="col-md-5 d-flex align-items-start">
                    <div>
                      <h5>{producto.nombre}</h5>
                      <p className="text-muted">{producto.descripcion || ""}</p>
                    </div>
                  </div>
                  <div className="col-md-4 text-end">
                    <button
                      className="btn btn-outline-danger btn-sm me-2 mb-2"
                      onClick={() => eliminarProducto(index)}
                      title="Eliminar"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                    <p className="fw-bold subtotal">
                      Subtotal: ${(producto.precio * producto.cantidad).toLocaleString()}
                    </p>
                    <input
                      type="number"
                      min="1"
                      value={producto.cantidad}
                      className="form-control mt-3"
                      onChange={(e) => cambiarCantidad(index, parseInt(e.target.value) || 1)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="col-lg-3">
        <div className="bg-light p-4 rounded shadow-sm">
          <h4 className="fw-bold mb-3">Resumen</h4>
          <div className="d-flex justify-content-between mb-2">
            <span>Total:</span>
            <span id="total-compra">
              ${totalConDescuento.toLocaleString()}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="cupon" className="form-label">Ingrese cupón de descuento:</label>
            <input
              type="text"
              id="cupon"
              className="form-control"
              placeholder="Opcional"
              value={cupon}
              onChange={(e) => setCupon(e.target.value)}
            />
            <button className="btn btn-outline-primary mt-2 w-100" onClick={aplicarCupon}>
              Aplicar cupón
            </button>
          </div>

          <button className="btn btn-primary w-100" onClick={pagar}>
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}
