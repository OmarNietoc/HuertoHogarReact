import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Routes, Route, Link } from 'react-router-dom'

import LayoutTienda from './layouts/LayoutTienda';
import LayoutAdmin from './layouts/LayoutAdmin';
import Home from './pages/Home'
import Productos from './pages/Productos'
import Login from './pages/Login'
import './styles/Global.css'
import './styles/Variables.css'

import DetalleProducto from './pages/DetalleProducto'
import Nosotros from './pages/Nosotros'
import Blogs from './pages/Blogs'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'
import Politicas from './pages/Politicas'
import Tyc from './pages/Tyc'
import Registro from './pages/Registro'

import AdminHome from './pages/admin/AdminHome';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminProductos from './pages/admin/AdminProductos';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      {/* Rutas tienda */}
      <Route element={<LayoutTienda />}>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productos/:id" element={<DetalleProducto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/politicas" element={<Politicas />} />
        <Route path="/tyc" element={<Tyc />} />
        <Route path="/registro" element={<Registro />} />
      </Route>

      {/* Rutas admin */}
      <Route element={<LayoutAdmin />}>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/productos" element={<AdminProductos />} />
      </Route>
    </Routes>
  );
}

export default App
