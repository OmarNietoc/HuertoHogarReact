import { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, Alert } from 'react-bootstrap';
import '../../styles/AdminProductos.css';
import {
    useProducts,
    useCreateProduct,
    useUpdateProduct,
    useDeleteProduct,
    useCategories,
    useUnits
} from '../../hooks/useProducts';

export default function AdminProductos() {
    // Hooks de datos
    const { data: productos = [], isLoading, isError } = useProducts();
    const { data: categorias = [] } = useCategories();
    const { data: unidades = [] } = useUnits();

    // Hooks de mutación
    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();
    const deleteMutation = useDeleteProduct();

    // Estados de UI
    const [showEditar, setShowEditar] = useState(false);
    const [showEliminar, setShowEliminar] = useState(false);
    const [showRegistrar, setShowRegistrar] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    // Estado para formulario (Crear/Editar)
    const [formData, setFormData] = useState({
        id: '',
        nombre: '',
        precio: '',
        categoriaId: '',
        descripcion: '',
        imagen: '', // Base64 string
        unidadId: '',
        stock: 0,
        stockMinimo: 0,
        activo: true
    });

    const mostrarAlerta = (message, type = 'danger') => {
        setAlert({ show: true, message, type });
        setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
    };

    // Helper para colores de categoría
    const getCategoryBadgeVariant = (categoryName) => {
        if (!categoryName) return 'secondary';
        const name = categoryName.toLowerCase();
        if (name.includes('fruta')) return 'danger';
        if (name.includes('verdura')) return 'success';
        if (name.includes('lacteo') || name.includes('lácteo')) return 'info text-dark';
        if (name.includes('organico') || name.includes('orgánico')) return 'warning text-dark';
        if (name.includes('bebida')) return 'primary';
        return 'secondary';
    };

    // Resetear form
    const resetForm = () => {
        setFormData({
            id: '',
            nombre: '',
            precio: '',
            categoriaId: '',
            descripcion: '',
            imagen: '',
            unidadId: '',
            stock: 0,
            stockMinimo: 0,
            activo: true
        });
    };

    // Manejo de Imagen con validación de tamaño
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validar tamaño (max 800KB para evitar error 413/500 en backend)
            if (file.size > 800 * 1024) {
                mostrarAlerta('La imagen es demasiado grande. Máximo 800KB.', 'warning');
                e.target.value = null; // Limpiar input
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                // Quitar prefijo data:image/...;base64,
                const base64String = reader.result.replace(/^data:image\/[a-z]+;base64,/, "");
                setFormData(prev => ({ ...prev, imagen: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setFormData(prev => ({ ...prev, imagen: '' }));
    };

    // Abrir Modales
    const abrirEditar = (producto) => {
        setProductoSeleccionado(producto);
        setFormData({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            categoriaId: producto.categoria?.id || '',
            descripcion: producto.descripcion,
            imagen: producto.imagen || '',
            unidadId: producto.unid?.id || '',
            stock: producto.stock || 0,
            stockMinimo: producto.stockMinimo || 0,
            activo: producto.activo
        });
        setShowEditar(true);
    };

    const abrirEliminar = (producto) => {
        setProductoSeleccionado(producto);
        setShowEliminar(true);
    };

    // Handlers de Acción
    const handleRegistrar = async (e) => {
        e.preventDefault();

        // Validaciones Frontend
        if (!formData.imagen) {
            mostrarAlerta('La imagen es obligatoria.', 'warning');
            return;
        }
        if (productos.some(p => p.id === formData.id)) {
            mostrarAlerta('El ID del producto ya existe. Use uno único.', 'warning');
            return;
        }

        try {
            await createMutation.mutateAsync({
                ...formData,
                categoriaId: Number(formData.categoriaId),
                unidadId: Number(formData.unidadId)
            });
            mostrarAlerta('Producto agregado exitosamente', 'success');
            setShowRegistrar(false);
            resetForm();
        } catch (error) {
            console.error("Error creating product:", error);
            const msg = error.response?.data?.message || error.message || 'Error al crear producto';
            mostrarAlerta(`Error: ${msg}`);
        }
    };

    const handleEditar = async (e) => {
        e.preventDefault();

        // Validaciones Frontend
        if (!formData.imagen) {
            mostrarAlerta('La imagen es obligatoria. No se puede guardar sin imagen.', 'warning');
            return;
        }

        try {
            await updateMutation.mutateAsync({
                id: productoSeleccionado.id,
                data: {
                    ...formData,
                    categoriaId: Number(formData.categoriaId),
                    unidadId: Number(formData.unidadId)
                }
            });
            mostrarAlerta('Producto actualizado exitosamente', 'success');
            setShowEditar(false);
        } catch (error) {
            console.error("Error updating product:", error);
            const msg = error.response?.data?.message || error.message || 'Error al actualizar producto';
            mostrarAlerta(`Error: ${msg}`);
        }
    };

    const handleEliminar = async () => {
        try {
            await deleteMutation.mutateAsync(productoSeleccionado.id);
            mostrarAlerta('Producto eliminado exitosamente', 'success');
            setShowEliminar(false);
        } catch (error) {
            console.error("Error deleting product:", error);
            mostrarAlerta('Error al eliminar producto.');
        }
    };

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    if (isLoading) return <div className="text-center my-5"><div className="spinner-border text-verde" /></div>;
    if (isError) return <div className="text-center my-5 text-danger">Error al cargar productos</div>;

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
                                <th>Stock</th>
                                <th>ID</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td>
                                        <img
                                            src={producto.imagen ? `data:image/jpeg;base64,${producto.imagen}` : '/img/placeholder-product.jpg'}
                                            alt={producto.nombre}
                                            className="product-img"
                                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = '/img/placeholder-product.jpg'; }}
                                        />
                                    </td>
                                    <td>{producto.nombre}</td>
                                    <td>
                                        <span className={`badge bg-${getCategoryBadgeVariant(producto.categoria?.name)}`}>
                                            {producto.categoria?.name || 'Sin Categoría'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="price-badge">${producto.precio?.toLocaleString('es-CL')} CLP</span>
                                    </td>
                                    <td>
                                        <span className={`badge ${producto.stock <= producto.stockMinimo ? 'bg-danger' : 'bg-success'}`}>
                                            {producto.stock}
                                        </span>
                                    </td>
                                    <td>{producto.id}</td>
                                    <td>
                                        <Button variant="warning" size="sm" className="me-2" onClick={() => abrirEditar(producto)}>
                                            <i className="bi bi-pencil"></i>
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={() => abrirEliminar(producto)}>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <div className="mt-4 text-end">
                    <Button variant="success" onClick={() => { resetForm(); setShowRegistrar(true); }}>
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
                        <div className="row g-3">
                            <div className="col-md-6">
                                <Form.Label>Nombre *</Form.Label>
                                <Form.Control type="text" value={formData.nombre} onChange={(e) => handleChange('nombre', e.target.value)} required />
                            </div>
                            <div className="col-md-6">
                                <Form.Label>Precio (CLP) *</Form.Label>
                                <Form.Control type="number" value={formData.precio} onChange={(e) => handleChange('precio', e.target.value)} min="0" required />
                            </div>
                            <div className="col-md-6">
                                <Form.Label>Categoría *</Form.Label>
                                <Form.Select value={formData.categoriaId} onChange={(e) => handleChange('categoriaId', e.target.value)} required>
                                    <option value="">Seleccionar...</option>
                                    {categorias.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </Form.Select>
                            </div>
                            <div className="col-md-6">
                                <Form.Label>ID (No editable)</Form.Label>
                                <Form.Control type="text" value={formData.id} disabled />
                            </div>

                            <div className="col-md-6">
                                <Form.Label>Stock *</Form.Label>
                                <Form.Control type="number" value={formData.stock} onChange={(e) => handleChange('stock', e.target.value)} min="0" required />
                            </div>
                            <div className="col-md-6">
                                <Form.Label>Stock Mínimo</Form.Label>
                                <Form.Control type="number" value={formData.stockMinimo} onChange={(e) => handleChange('stockMinimo', e.target.value)} min="0" />
                            </div>

                            <div className="col-12">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" rows={3} value={formData.descripcion} onChange={(e) => handleChange('descripcion', e.target.value)} />
                            </div>

                            {/* Image Upload */}
                            <div className="col-12">
                                <Form.Label>Imagen del Producto *</Form.Label>
                                <div className="d-flex align-items-center gap-3">
                                    {formData.imagen && (
                                        <div className="position-relative">
                                            <img
                                                src={`data:image/jpeg;base64,${formData.imagen}`}
                                                alt="Preview"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                                onClick={handleRemoveImage}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    )}
                                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                                </div>
                                {!formData.imagen && <small className="text-danger">La imagen es obligatoria.</small>}
                            </div>

                            <div className="col-md-6">
                                <Form.Label>Unidad de Medida *</Form.Label>
                                <Form.Select value={formData.unidadId} onChange={(e) => handleChange('unidadId', e.target.value)} required>
                                    <option value="">Seleccionar...</option>
                                    {unidades.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                                </Form.Select>
                            </div>
                        </div>
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
                                <Form.Label>ID del Producto *</Form.Label>
                                <Form.Control type="text" value={formData.id} onChange={(e) => handleChange('id', e.target.value)} required />
                            </div>
                            <div className="col-md-6">
                                <Form.Label>Nombre *</Form.Label>
                                <Form.Control type="text" value={formData.nombre} onChange={(e) => handleChange('nombre', e.target.value)} required />
                            </div>
                            <div className="col-md-6">
                                <Form.Label>Precio (CLP) *</Form.Label>
                                <Form.Control type="number" value={formData.precio} onChange={(e) => handleChange('precio', e.target.value)} min="0" required />
                            </div>
                            <div className="col-md-6">
                                <Form.Label>Categoría *</Form.Label>
                                <Form.Select value={formData.categoriaId} onChange={(e) => handleChange('categoriaId', e.target.value)} required>
                                    <option value="">Seleccionar...</option>
                                    {categorias.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </Form.Select>
                            </div>

                            <div className="col-md-6">
                                <Form.Label>Stock *</Form.Label>
                                <Form.Control type="number" value={formData.stock} onChange={(e) => handleChange('stock', e.target.value)} min="0" required />
                            </div>
                            <div className="col-md-6">
                                <Form.Label>Stock Mínimo</Form.Label>
                                <Form.Control type="number" value={formData.stockMinimo} onChange={(e) => handleChange('stockMinimo', e.target.value)} min="0" />
                            </div>

                            <div className="col-12">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control as="textarea" rows={3} value={formData.descripcion} onChange={(e) => handleChange('descripcion', e.target.value)} />
                            </div>

                            {/* Image Upload */}
                            <div className="col-12">
                                <Form.Label>Imagen del Producto *</Form.Label>
                                <div className="d-flex align-items-center gap-3">
                                    {formData.imagen && (
                                        <div className="position-relative">
                                            <img
                                                src={`data:image/jpeg;base64,${formData.imagen}`}
                                                alt="Preview"
                                                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                                            />
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                                                onClick={handleRemoveImage}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </Button>
                                        </div>
                                    )}
                                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} required={!formData.imagen} />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <Form.Label>Unidad de Medida *</Form.Label>
                                <Form.Select value={formData.unidadId} onChange={(e) => handleChange('unidadId', e.target.value)} required>
                                    <option value="">Seleccionar...</option>
                                    {unidades.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
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
