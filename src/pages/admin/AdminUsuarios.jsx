import { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, Alert } from 'react-bootstrap';
import '../../styles/AdminUsers.css';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [showEditar, setShowEditar] = useState(false);
  const [showEliminar, setShowEliminar] = useState(false);
  const [showRegistrar, setShowRegistrar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [indexSeleccionado, setIndexSeleccionado] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [nuevoUsuario, setNuevoUsuario] = useState({
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    rol: '',
    telefono: '',
    direccion: '',
    region: '',
    comuna: '',
    terminos: false
  });

  const [regionesComunas, setRegionesComunas] = useState({});

useEffect(() => {
  const cargarRegionesComunas = async () => {
    try {
      const response = await fetch("/data/regionesComunas.json");
      const data = await response.json();
      setRegionesComunas(data);
    } catch (error) {
      console.error("Error al cargar regiones y comunas:", error);
    }
  };

  cargarRegionesComunas();
}, []);


  const userEmail = localStorage.getItem('userEmail');

  // Cargar usuarios al montar el componente
  useEffect(() => {
    cargarUsuarios();
  }, []);

const cargarUsuarios = async () => {
  try {
    // Leer usuarios guardados en localStorage
    let usuariosLocal = JSON.parse(localStorage.getItem("usuariosHuertoHogar")) || [];

    // Leer usuarios base desde /public/data/usuarios.json
    const response = await fetch("/data/usuarios.json");
    const usuariosBase = await response.json();

    // Fusionar los usuarios del JSON con los del localStorage
    if (Array.isArray(usuariosBase) && usuariosBase.length > 0) {
      usuariosLocal.forEach(usuario => {
        const index = usuariosBase.findIndex(u => u.email === usuario.email);
        if (index === -1) {
          usuariosBase.push(usuario);
        } else {
          usuariosBase.splice(index, 1, usuario);
        }
      });

      usuariosBase.forEach(usuarioBase => {
        const existe = usuariosLocal.some(u => u.email === usuarioBase.email);
        if (!existe) {
          usuariosLocal.push(usuarioBase);
        }
      });
    }

    // Guardar la fusión final en localStorage
    localStorage.setItem("usuariosHuertoHogar", JSON.stringify(usuariosLocal));

    // Actualizar el estado
    setUsuarios(usuariosLocal);
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
  }
};

  const guardarUsuarios = (nuevosUsuarios) => {
    localStorage.setItem("usuariosHuertoHogar", JSON.stringify(nuevosUsuarios));
    setUsuarios(nuevosUsuarios);
  };

  const mostrarAlerta = (message, type = 'danger') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 3000);
  };

  // Funciones para modales
  const abrirEditar = (index) => {
    setUsuarioSeleccionado(usuarios[index]);
    setIndexSeleccionado(index);
    setShowEditar(true);
  };

  const abrirEliminar = (index) => {
    setUsuarioSeleccionado(usuarios[index]);
    setIndexSeleccionado(index);
    setShowEliminar(true);
  };

  const handleEditar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const usuariosActualizados = [...usuarios];
    usuariosActualizados[indexSeleccionado] = {
      ...usuariosActualizados[indexSeleccionado],
      email: formData.get('email'),
      nombre: formData.get('nombre'),
      rol: formData.get('rol'),
      telefono: formData.get('telefono'),
      direccion: formData.get('direccion'),
      region: formData.get('region'),
      comuna: formData.get('comuna')
    };

    guardarUsuarios(usuariosActualizados);
    setShowEditar(false);
    mostrarAlerta('Usuario actualizado exitosamente', 'success');
  };

  const handleEliminar = () => {
    const usuariosActualizados = usuarios.filter((_, index) => index !== indexSeleccionado);
    guardarUsuarios(usuariosActualizados);
    setShowEliminar(false);
    mostrarAlerta('Usuario eliminado exitosamente', 'success');
  };

  const handleRegistrar = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Validaciones básicas
    if (nuevoUsuario.password !== nuevoUsuario.confirmPassword) {
      mostrarAlerta('Las contraseñas no coinciden');
      return;
    }

    if (nuevoUsuario.email !== nuevoUsuario.confirmEmail) {
      mostrarAlerta('Los emails no coinciden');
      return;
    }

    if (usuarios.some(user => user.email === nuevoUsuario.email)) {
      mostrarAlerta('Este correo ya está registrado');
      return;
    }

    const usuario = {
      email: nuevoUsuario.email,
      nombre: nuevoUsuario.nombre,
      password: nuevoUsuario.password,
      rol: nuevoUsuario.rol,
      telefono: nuevoUsuario.telefono,
      direccion: nuevoUsuario.direccion,
      region: nuevoUsuario.region,
      comuna: nuevoUsuario.comuna,
      fechaRegistro: new Date().toISOString()
    };

    const usuariosActualizados = [...usuarios, usuario];
    guardarUsuarios(usuariosActualizados);
    setShowRegistrar(false);
    setNuevoUsuario({
      email: '', confirmEmail: '', password: '', confirmPassword: '', nombre: '',
      rol: '', telefono: '', direccion: '', region: '', comuna: '', terminos: false
    });
    mostrarAlerta('Usuario registrado exitosamente', 'success');
  };

  const handleNuevoUsuarioChange = (field, value) => {
    setNuevoUsuario(prev => ({
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
        <h1 className="mb-4">Gestión de Usuarios</h1>

        <div className="table-responsive">
          <Table striped hover className="align-middle">
            <thead className="table-dark">
              <tr>
                <th>Email</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario, index) => {
                if (usuario.email === userEmail) return null;
                return (
                  <tr key={index}>
                    <td>{usuario.email}</td>
                    <td>{usuario.nombre}</td>
                    <td>
                      <span className={`badge ${usuario.rol === 'admin' ? 'bg-danger' : usuario.rol === 'vendedor' ? 'bg-warning text-dark' : 'bg-info'}`}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2" onClick={() => abrirEditar(index)}>
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => abrirEliminar(index)}>
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        <div className="mt-4 text-end">
          <Button variant="success" onClick={() => setShowRegistrar(true)}>
            <i className="bi bi-person-plus"></i> Registrar nuevo usuario
          </Button>
        </div>
      </section>

      {/* Modal Editar */}
      <Modal show={showEditar} onHide={() => setShowEditar(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditar}>
          <Modal.Body>
            {usuarioSeleccionado && (
              <div className="row g-3">
                <div className="col-md-6">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" defaultValue={usuarioSeleccionado.email} required />
                </div>
                <div className="col-md-6">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control type="text" name="nombre" defaultValue={usuarioSeleccionado.nombre} required />
                </div>
                <div className="col-md-6">
                  <Form.Label>Rol</Form.Label>
                  <Form.Select name="rol" defaultValue={usuarioSeleccionado.rol} required>
                    <option value="cliente">Cliente</option>
                    <option value="admin">Administrador</option>
                    <option value="vendedor">Vendedor</option>
                  </Form.Select>
                </div>
                <div className="col-md-6">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control type="tel" name="telefono" defaultValue={usuarioSeleccionado.telefono} />
                </div>
                <div className="col-12">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control type="text" name="direccion" defaultValue={usuarioSeleccionado.direccion} />
                </div>
                <div className="col-md-6">
                  <Form.Label>Región</Form.Label>
                  <Form.Select name="region" defaultValue={usuarioSeleccionado.region} required>
                    <option value="">Seleccione una región</option>
                    {Object.keys(regionesComunas).map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </Form.Select>
                </div>
                <div className="col-md-6">
                  <Form.Label>Comuna</Form.Label>
                  <Form.Select name="comuna" defaultValue={usuarioSeleccionado.comuna} required>
                    <option value="">Seleccione una comuna</option>
                    {usuarioSeleccionado.region && regionesComunas[usuarioSeleccionado.region]?.map(comuna => (
                      <option key={comuna} value={comuna}>{comuna}</option>
                    ))}
                  </Form.Select>
                </div>
              </div>
            )}
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
                <Form.Label>Confirmar Email *</Form.Label>
                <Form.Control 
                  type="email" 
                  value={nuevoUsuario.confirmEmail}
                  onChange={(e) => handleNuevoUsuarioChange('confirmEmail', e.target.value)}
                  placeholder="Confirmar email" 
                  required 
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Contraseña *</Form.Label>
                <Form.Control 
                  type="password" 
                  value={nuevoUsuario.password}
                  onChange={(e) => handleNuevoUsuarioChange('password', e.target.value)}
                  placeholder="Mínimo 4 caracteres" 
                  required 
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Confirmar Contraseña *</Form.Label>
                <Form.Control 
                  type="password" 
                  value={nuevoUsuario.confirmPassword}
                  onChange={(e) => handleNuevoUsuarioChange('confirmPassword', e.target.value)}
                  placeholder="Confirmar contraseña" 
                  required 
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Nombre Completo *</Form.Label>
                <Form.Control 
                  type="text" 
                  value={nuevoUsuario.nombre}
                  onChange={(e) => handleNuevoUsuarioChange('nombre', e.target.value)}
                  placeholder="Nombre y Apellido" 
                  required 
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Rol *</Form.Label>
                <Form.Select 
                  value={nuevoUsuario.rol}
                  onChange={(e) => handleNuevoUsuarioChange('rol', e.target.value)}
                  required
                >
                  <option value="">Seleccionar rol...</option>
                  <option value="cliente">Cliente</option>
                  <option value="admin">Administrador</option>
                  <option value="vendedor">Vendedor</option>
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control 
                  type="tel" 
                  value={nuevoUsuario.telefono}
                  onChange={(e) => handleNuevoUsuarioChange('telefono', e.target.value)}
                  placeholder="+56 9 1234 5678" 
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Dirección</Form.Label>
                <Form.Control 
                  type="text" 
                  value={nuevoUsuario.direccion}
                  onChange={(e) => handleNuevoUsuarioChange('direccion', e.target.value)}
                  placeholder="Calle, número, departamento" 
                />
              </div>
              <div className="col-md-6">
                <Form.Label>Región *</Form.Label>
                <Form.Select 
                  value={nuevoUsuario.region}
                  onChange={(e) => handleNuevoUsuarioChange('region', e.target.value)}
                  required
                >
                  <option value="">Seleccionar región...</option>
                  {Object.keys(regionesComunas).map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-md-6">
                <Form.Label>Comuna *</Form.Label>
                <Form.Select 
                  value={nuevoUsuario.comuna}
                  onChange={(e) => handleNuevoUsuarioChange('comuna', e.target.value)}
                  required
                >
                  <option value="">Seleccione una comuna</option>
                  {nuevoUsuario.region && regionesComunas[nuevoUsuario.region]?.map(comuna => (
                    <option key={comuna} value={comuna}>{comuna}</option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-12">
                <Form.Check 
                  type="checkbox"
                  checked={nuevoUsuario.terminos}
                  onChange={(e) => handleNuevoUsuarioChange('terminos', e.target.checked)}
                  label="Acepto los términos y condiciones *"
                  required
                />
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