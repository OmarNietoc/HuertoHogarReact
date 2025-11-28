import { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, Alert, Spinner } from 'react-bootstrap';
import { shoppyService } from '../../services/shoppyService';
import '../../styles/AdminUsers.css';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditar, setShowEditar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showRegistrar, setShowRegistrar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });

  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);

  // Estado para nuevo usuario
  const [nuevoUsuario, setNuevoUsuario] = useState({
    email: '',
    name: '',
    password: '',
    role: 2, // Default to USER (2)
    status: 1, // Default to Active (1)
    phone: '',
    region: '',
    comuna: '',
    imagen: null,
    firebaseId: null
  });

  // Estado para editar usuario
  const [editUsuario, setEditUsuario] = useState({
    id: null,
    email: '',
    name: '',
    password: '',
    role: 2,
    status: 1,
    phone: '',
    region: '',
    comuna: '',
    imagen: null,
    firebaseId: null
  });

  const userEmail = localStorage.getItem('userEmail');

  // Cargar usuarios y regiones al montar el componente
  useEffect(() => {
    cargarUsuarios();
    cargarRegiones();
  }, []);

  const cargarUsuarios = async () => {
    setLoading(true);
    try {
      const data = await shoppyService.getUsers();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      mostrarAlerta('Error al cargar usuarios', 'danger');
    } finally {
      setLoading(false);
    }
  };

  const cargarRegiones = async () => {
    try {
      const data = await shoppyService.getRegions();
      setRegiones(data);
    } catch (error) {
      console.error("Error al cargar regiones:", error);
    }
  };

  const cargarComunas = async (regionId) => {
    if (!regionId) {
      setComunas([]);
      return;
    }
    try {
      const data = await shoppyService.getComunasByRegion(regionId);
      setComunas(data);
    } catch (error) {
      console.error("Error al cargar comunas:", error);
      setComunas([]);
    }
  };

  const mostrarAlerta = (message, type = 'danger') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Funciones para modales
  const abrirEditar = async (usuario) => {
    setUsuarioSeleccionado(usuario);

    // Cargar comunas si el usuario tiene región
    if (usuario.region) {
      await cargarComunas(usuario.region.id);
    } else {
      setComunas([]);
    }

    setEditUsuario({
      id: usuario.id,
      email: usuario.email,
      name: usuario.name,
      password: usuario.password,
      role: usuario.role.id,
      status: usuario.status,
      phone: usuario.phone || '',
      region: usuario.region ? usuario.region.id : '',
      comuna: usuario.comuna ? usuario.comuna.id : '',
      imagen: usuario.imagen,
      firebaseId: usuario.firebaseId
    });
    setShowEditar(true);
  };

  const abrirEliminar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setShowEliminar(true);
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    try {
      const userToUpdate = {
        ...editUsuario,
        role: parseInt(editUsuario.role),
        region: editUsuario.region ? parseInt(editUsuario.region) : null,
        comuna: editUsuario.comuna ? parseInt(editUsuario.comuna) : null
      };

      await shoppyService.updateUser(usuarioSeleccionado.id, userToUpdate);

      setShowEditar(false);
      mostrarAlerta('Usuario actualizado exitosamente', 'success');
      cargarUsuarios();
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      mostrarAlerta('Error al actualizar usuario', 'danger');
    }
  };

  const handleEliminar = async () => {
    try {
      await shoppyService.deleteUser(usuarioSeleccionado.id);
      setShowEliminar(false);
      mostrarAlerta('Usuario eliminado exitosamente', 'success');
      cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      mostrarAlerta('Error al eliminar usuario', 'danger');
    }
  };

  const handleRegistrar = async (e) => {
    e.preventDefault();
    try {
      const userToCreate = {
        ...nuevoUsuario,
        role: parseInt(nuevoUsuario.role),
        region: nuevoUsuario.region ? parseInt(nuevoUsuario.region) : null,
        comuna: nuevoUsuario.comuna ? parseInt(nuevoUsuario.comuna) : null
      };

      await shoppyService.createUser(userToCreate);

      setShowRegistrar(false);
      setNuevoUsuario({
        email: '', name: '', password: '', role: 2, status: 1, phone: '', region: '', comuna: '', imagen: null, firebaseId: null
      });
      mostrarAlerta('Usuario registrado exitosamente', 'success');
      cargarUsuarios();
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      mostrarAlerta('Error al registrar usuario. Verifique que el email no exista.', 'danger');
    }
  };

  const handleNuevoUsuarioChange = (field, value) => {
    setNuevoUsuario(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'region') {
      cargarComunas(value);
      setNuevoUsuario(prev => ({ ...prev, comuna: '' }));
    }
  };

  const handleEditUsuarioChange = (field, value) => {
    setEditUsuario(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'region') {
      cargarComunas(value);
      setEditUsuario(prev => ({ ...prev, comuna: '' }));
    }
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
        <h1 className="mb-4">Gestión de Usuarios (Shoppy)</h1>

        <div className="mt-4 text-end mb-3">
          <Button variant="success" onClick={() => { setShowRegistrar(true); setComunas([]); }}>
            <i className="bi bi-person-plus"></i> Registrar nuevo usuario
          </Button>
        </div>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        ) : (
          <div className="table-responsive">
            <Table striped hover className="align-middle">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.name}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className={`badge ${usuario.role?.name === 'ROLE_ADMIN' ? 'bg-danger' : 'bg-info'}`}>
                        {usuario.role?.name || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${usuario.status === 1 ? 'bg-success' : 'bg-secondary'}`}>
                        {usuario.status === 1 ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => abrirEditar(usuario)}>
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => abrirEliminar(usuario)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </section>

      {/* Modal Editar */}
      <Modal show={showEditar} onHide={() => setShowEditar(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditar}>
          <Modal.Body>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={editUsuario.name}
                  onChange={(e) => handleEditUsuarioChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editUsuario.email}
                  onChange={(e) => handleEditUsuarioChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="text"
                  value={editUsuario.password}
                  onChange={(e) => handleEditUsuarioChange('password', e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  value={editUsuario.phone}
                  onChange={(e) => handleEditUsuarioChange('phone', e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Región</Form.Label>
                <Form.Select
                  value={editUsuario.region}
                  onChange={(e) => handleEditUsuarioChange('region', e.target.value)}
                >
                  <option value="">Seleccione Región</option>
                  {regiones.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Comuna</Form.Label>
                <Form.Select
                  value={editUsuario.comuna}
                  onChange={(e) => handleEditUsuarioChange('comuna', e.target.value)}
                  disabled={!editUsuario.region}
                >
                  <option value="">Seleccione Comuna</option>
                  {comunas.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  value={editUsuario.role}
                  onChange={(e) => handleEditUsuarioChange('role', e.target.value)}
                  required
                >
                  <option value="1">Admin (1)</option>
                  <option value="2">User (2)</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  value={editUsuario.status}
                  onChange={(e) => handleEditUsuarioChange('status', e.target.value)}
                  required
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Form.Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditar(false)}>Cancelar</Button>
            <Button variant="primary" type="submit">Guardar cambios</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Eliminar */}
      <Modal show={showEliminar} onHide={() => setShowEliminar(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás seguro de que deseas eliminar a <strong>{usuarioSeleccionado?.email}</strong>?</p>
          <p className="text-danger small">Esta acción no se puede deshacer.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEliminar(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleEliminar}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Registrar */}
      <Modal show={showRegistrar} onHide={() => setShowRegistrar(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Registrar Nuevo Usuario</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleRegistrar}>
          <Modal.Body>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Label>Nombre *</Form.Label>
                <Form.Control
                  type="text"
                  value={nuevoUsuario.name}
                  onChange={(e) => handleNuevoUsuarioChange('name', e.target.value)}
                  placeholder="Nombre completo"
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Email *</Form.Label>
                <Form.Control
                  type="email"
                  value={nuevoUsuario.email}
                  onChange={(e) => handleNuevoUsuarioChange('email', e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Contraseña *</Form.Label>
                <Form.Control
                  type="password"
                  value={nuevoUsuario.password}
                  onChange={(e) => handleNuevoUsuarioChange('password', e.target.value)}
                  placeholder="Contraseña"
                  required
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  value={nuevoUsuario.phone}
                  onChange={(e) => handleNuevoUsuarioChange('phone', e.target.value)}
                  placeholder="+56 9 ..."
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Región</Form.Label>
                <Form.Select
                  value={nuevoUsuario.region}
                  onChange={(e) => handleNuevoUsuarioChange('region', e.target.value)}
                >
                  <option value="">Seleccione Región</option>
                  {regiones.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Comuna</Form.Label>
                <Form.Select
                  value={nuevoUsuario.comuna}
                  onChange={(e) => handleNuevoUsuarioChange('comuna', e.target.value)}
                  disabled={!nuevoUsuario.region}
                >
                  <option value="">Seleccione Comuna</option>
                  {comunas.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Rol *</Form.Label>
                <Form.Select
                  value={nuevoUsuario.role}
                  onChange={(e) => handleNuevoUsuarioChange('role', e.target.value)}
                  required
                >
                  <option value="2">User (2)</option>
                  <option value="1">Admin (1)</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Estado *</Form.Label>
                <Form.Select
                  value={nuevoUsuario.status}
                  onChange={(e) => handleNuevoUsuarioChange('status', e.target.value)}
                  required
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </Form.Select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowRegistrar(false)}>Cancelar</Button>
            <Button variant="success" type="submit">
              <i className="bi bi-person-plus"></i> Registrar Usuario
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
