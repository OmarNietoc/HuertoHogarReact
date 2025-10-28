import { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, Alert } from 'react-bootstrap';
import '../../styles/AdminProductos.css';

export default function AdminProductos() {
    const [productos, setProductos] = useState([]);
    const [showEditar, setShowEditar] = useState(false);
    const [showEliminar, setShowEliminar] = useState(false);
    const [showRegistrar, setShowRegistrar] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [indexSeleccionado, setIndexSeleccionado] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [nuevoProducto, setNuevoProducto] = useState({
    id: '',
    nombre: '',
    precio: '',
    categoria: '',
    descripcion: '',
    imagen: '',
    oferta: '',
    unid: 'kg'
    });
    const [medidas, setMedidas] = useState([]);

    // Cargar productos al montar el componente
    // Cargar productos y medidas al montar el componente
    useEffect(() => {
    cargarProductos();
    cargarMedidas();
    }, []);

    const cargarMedidas = async () => {
    try {
        const response = await fetch('/data/medidas.json');
        if (response.ok) {
        const medidasData = await response.json();
        setMedidas(medidasData);
        }
    } catch (error) {
        console.error('Error cargando medidas:', error);
        // Medidas por defecto si falla la carga
        setMedidas(["kg", "500g", "L", "unidad"]);
    }
    };

    const cargarProductos = () => {
        const productosStorage = JSON.parse(localStorage.getItem("productosHuertoHogar")) || [];
        
        // Si no hay productos en localStorage, cargar desde el JSON
        if (productosStorage.length === 0) {
        cargarProductosDesdeJSON();
        } else {
        setProductos(productosStorage);
        }
    };

    const cargarProductosDesdeJSON = async () => {
        try {
        const response = await fetch('/data/productos.json');
        if (response.ok) {
            const productosJSON = await response.json();
            setProductos(productosJSON);
            guardarProductos(productosJSON);
        }
        } catch (error) {
        console.error('Error cargando productos desde JSON:', error);
        }
    };

    const guardarProductos = (nuevosProductos) => {
        localStorage.setItem("productosHuertoHogar", JSON.stringify(nuevosProductos));
        setProductos(nuevosProductos);
    };

    const mostrarAlerta = (message, type = 'danger') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
    };

    // Funciones para modales
    const abrirEditar = (index) => {
        setProductoSeleccionado(productos[index]);
        setIndexSeleccionado(index);
        setShowEditar(true);
    };

    const abrirEliminar = (index) => {
        setProductoSeleccionado(productos[index]);
        setIndexSeleccionado(index);
        setShowEliminar(true);
    };

    const handleEditar = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const productosActualizados = [...productos];
        productosActualizados[indexSeleccionado] = {
        ...productosActualizados[indexSeleccionado],
        nombre: formData.get('nombre'),
        precio: parseInt(formData.get('precio')),
        categoria: formData.get('categoria'),
        id: formData.get('id'),
        descripcion: formData.get('descripcion'),
        imagen: formData.get('imagen'),
        oferta: formData.get('oferta'),
        unid: formData.get('unid')
        };

        guardarProductos(productosActualizados);
        setShowEditar(false);
        mostrarAlerta('Producto actualizado exitosamente', 'success');
    };

    const handleEliminar = () => {
        const productosActualizados = productos.filter((_, index) => index !== indexSeleccionado);
        guardarProductos(productosActualizados);
        setShowEliminar(false);
        mostrarAlerta('Producto eliminado exitosamente', 'success');
    };

    const handleRegistrar = (e) => {
        e.preventDefault();

        // Verificar si ya existe un producto con ese ID
        if (productos.some(p => p.id === nuevoProducto.id)) {
        mostrarAlerta('Ya existe un producto con ese ID');
        return;
        }

        const producto = {
        id: nuevoProducto.id,
        nombre: nuevoProducto.nombre,
        precio: parseInt(nuevoProducto.precio),
        categoria: nuevoProducto.categoria,
        descripcion: nuevoProducto.descripcion,
        imagen: nuevoProducto.imagen,
        oferta: nuevoProducto.oferta,
        unid: nuevoProducto.unid
        };

        const productosActualizados = [...productos, producto];
        guardarProductos(productosActualizados);
        setShowRegistrar(false);
        setNuevoProducto({
        id: '', nombre: '', precio: '', categoria: '', descripcion: '', imagen: '', oferta: '',unid: 'kg'
        });
        mostrarAlerta('Producto agregado exitosamente', 'success');
    };

    const handleNuevoProductoChange = (field, value) => {
        setNuevoProducto(prev => ({
        ...prev,
        [field]: value
        }));
    };

    return (
        <>
        {/* Alert */}
        {alert.show && (
            <Alert variant={alert.type} className="position-fixed top-0 end-0 m-3" style={{ zIndex: 1050, minWidth: '300px' }}>
            {alert.message}
            </Alert>
        )}

        <section className="bg-light p-4 rounded shadow-sm w-100">
            <h1 className="mb-4 text-marron">Gestión de Productos</h1>

            <div className="table-responsive">
            <Table striped hover className="align-middle">
                <thead className="table-dark">
                <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>ID</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {productos.map((producto, index) => (
                    <tr key={index}>
                    <td>
                        <img 
                        src={producto.imagen || '/img/placeholder-product.jpg'} 
                        alt={producto.nombre} 
                        className="product-img"
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        onError={(e) => {
                            e.target.src = '/img/placeholder-product.jpg';
                        }}
                        />
                    </td>
                    <td>{producto.nombre}</td>
                    <td>
                        <span className={`badge badge-categoria badge-${producto.categoria}`}>
                        {producto.categoria}
                        </span>
                    </td>
                    <td>
                        <span className="price-badge">${producto.precio?.toLocaleString('es-CL')} CLP</span>
                    </td>
                    <td>{producto.id}</td>
                    <td>
                        <Button variant="warning" size="sm" className="me-2" onClick={() => abrirEditar(index)}>
                        <i className="bi bi-pencil"></i>
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => abrirEliminar(index)}>
                        <i className="bi bi-trash"></i>
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            </div>

            <div className="mt-4 text-end">
            <Button variant="success" onClick={() => setShowRegistrar(true)}>
                <i className="bi bi-plus-circle"></i> Agregar Nuevo Producto
            </Button>
            </div>
        </section>

        {/* Modal Editar */}
        <Modal show={showEditar} onHide={() => setShowEditar(false)} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Editar Producto</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleEditar}>
            <Modal.Body>
                {productoSeleccionado && (
                <div className="row g-3">
                    <div className="col-md-6">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control type="text" name="nombre" defaultValue={productoSeleccionado.nombre} required />
                    </div>
                    <div className="col-md-6">
                    <Form.Label>Precio (CLP) *</Form.Label>
                    <Form.Control type="number" name="precio" defaultValue={productoSeleccionado.precio} min="0" step="100" required />
                    </div>
                    <div className="col-md-6">
                    <Form.Label>Categoría *</Form.Label>
                    <Form.Select name="categoria" defaultValue={productoSeleccionado.categoria} required>
                        <option value="">Seleccionar categoría...</option>
                        <option value="frutas">Frutas Frescas</option>
                        <option value="verduras">Verduras Orgánicas</option>
                        <option value="organicos">Productos Orgánicos</option>
                        <option value="lacteos">Productos Lácteos</option>
                    </Form.Select>
                    </div>
                    <div className="col-md-6">
                    <Form.Label>ID del Producto *</Form.Label>
                    <Form.Control type="text" name="id" defaultValue={productoSeleccionado.id} required />
                    </div>
                    <div className="col-12">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={3} name="descripcion" defaultValue={productoSeleccionado.descripcion} />
                    </div>
                    <div className="col-md-6">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control type="text" name="imagen" defaultValue={productoSeleccionado.imagen} placeholder="https://..." />
                    </div>
                    <div className="col-md-6">
                    <Form.Label>Unidad de Medida *</Form.Label>
                    <Form.Select name="unid" defaultValue={productoSeleccionado.unid || 'unidad'} required>
                        <option value="">Seleccionar medida...</option>
                        {medidas.map((medida) => (
                        <option key={medida} value={medida}>{medida}</option>
                        ))}
                    </Form.Select>
                    </div>

                    <div className="col-md-6">
                    <Form.Label>Etiqueta Especial</Form.Label>
                    <Form.Select name="oferta" defaultValue={productoSeleccionado.oferta}>
                        <option value="">Ninguna</option>
                        <option value="Oferta">Oferta</option>
                        <option value="Nuevo">Nuevo</option>
                        <option value="Popular">Popular</option>
                    </Form.Select>
                    </div>
                </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditar(false)}>Cancelar</Button>
                <Button variant="primary" type="submit">Guardar Cambios</Button>
            </Modal.Footer>
            </Form>
        </Modal>

        {/* Modal Eliminar */}
        <Modal show={showEliminar} onHide={() => setShowEliminar(false)} centered>
            <Modal.Header closeButton>
            <Modal.Title>Eliminar Producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>¿Estás seguro de que deseas eliminar el producto <strong>{productoSeleccionado?.nombre}</strong>?</p>
            <p className="text-danger">Esta acción no se puede deshacer.</p>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEliminar(false)}>Cancelar</Button>
            <Button variant="danger" onClick={handleEliminar}>Eliminar</Button>
            </Modal.Footer>
        </Modal>

        {/* Modal Registrar */}
        <Modal show={showRegistrar} onHide={() => setShowRegistrar(false)} size="lg">
            <Modal.Header closeButton>
            <Modal.Title>Agregar Nuevo Producto</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleRegistrar}>
            <Modal.Body>
                <div className="row g-3">
                <div className="col-md-6">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={nuevoProducto.nombre}
                    onChange={(e) => handleNuevoProductoChange('nombre', e.target.value)}
                    required 
                    />
                </div>
                <div className="col-md-6">
                    <Form.Label>Precio (CLP) *</Form.Label>
                    <Form.Control 
                    type="number" 
                    value={nuevoProducto.precio}
                    onChange={(e) => handleNuevoProductoChange('precio', e.target.value)}
                    min="0" 
                    step="100" 
                    required 
                    />
                </div>
                <div className="col-md-6">
                    <Form.Label>Categoría *</Form.Label>
                    <Form.Select 
                    value={nuevoProducto.categoria}
                    onChange={(e) => handleNuevoProductoChange('categoria', e.target.value)}
                    required
                    >
                    <option value="">Seleccionar categoría...</option>
                    <option value="frutas">Frutas Frescas</option>
                    <option value="verduras">Verduras Orgánicas</option>
                    <option value="organicos">Productos Orgánicos</option>
                    <option value="lacteos">Productos Lácteos</option>
                    </Form.Select>
                </div>
                <div className="col-md-6">
                    <Form.Label>ID del Producto *</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={nuevoProducto.id}
                    onChange={(e) => handleNuevoProductoChange('id', e.target.value)}
                    required 
                    />
                </div>
                <div className="col-12">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={3}
                    value={nuevoProducto.descripcion}
                    onChange={(e) => handleNuevoProductoChange('descripcion', e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={nuevoProducto.imagen}
                    onChange={(e) => handleNuevoProductoChange('imagen', e.target.value)}
                    placeholder="https://..." 
                    />
                </div>
                <div className="col-md-6">
                    <Form.Label>Unidad de Medida *</Form.Label>
                    <Form.Select 
                        value={nuevoProducto.unid}
                        onChange={(e) => handleNuevoProductoChange('unid', e.target.value)}
                        required
                    >
                        <option value="">Seleccionar medida...</option>
                        {medidas.map((medida) => (
                        <option key={medida} value={medida}>{medida}</option>
                        ))}
                    </Form.Select>
                </div>

                <div className="col-md-6">
                    <Form.Label>Etiqueta Especial</Form.Label>
                    <Form.Select 
                    value={nuevoProducto.oferta}
                    onChange={(e) => handleNuevoProductoChange('oferta', e.target.value)}
                    >
                    <option value="">Ninguna</option>
                    <option value="Oferta">Oferta</option>
                    <option value="Nuevo">Nuevo</option>
                    <option value="Popular">Popular</option>
                    </Form.Select>
                </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowRegistrar(false)}>Cancelar</Button>
                <Button variant="success" type="submit">
                <i className="bi bi-plus-circle"></i> Agregar Producto
                </Button>
            </Modal.Footer>
            </Form>
        </Modal>
        </>
    );
    }