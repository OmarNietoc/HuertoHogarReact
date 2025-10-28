import { Link } from "react-router-dom";

export default function AdminHome() {
    return (
        <div className="container py-5">
        <div className="text-center mb-5">
            <h1 className="fw-bold text-success">¡Bienvenido Administrador!</h1>
            <p className="text-muted">
            Gestiona los usuarios y productos de Huerto Hogar desde este panel.
            </p>
        </div>

        <div className="row g-4 justify-content-center">
            {/* Card Usuarios */}
            <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                <i className="bi bi-people-fill fs-1 text-success mb-3"></i>
                <h5 className="card-title fw-bold">Gestión de Usuarios</h5>
                <p className="card-text text-muted">
                    Administra clientes, vendedores y otros administradores.
                </p>
                <Link to="/admin/usuarios" className="btn btn-success">
                    Ir a Usuarios
                </Link>
                </div>
            </div>
            </div>

            {/* Card Productos */}
            <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                <i className="bi bi-box-seam-fill fs-1 text-success mb-3"></i>
                <h5 className="card-title fw-bold">Gestión de Productos</h5>
                <p className="card-text text-muted">
                    Crea, edita o elimina productos del catálogo de la tienda.
                </p>
                <Link to="/admin/productos" className="btn btn-success">
                    Ir a Productos
                </Link>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}
