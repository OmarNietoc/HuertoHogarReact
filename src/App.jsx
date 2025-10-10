import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Login from './pages/Login'
import './styles/Global.css'
import './styles/Variables.css'
import Header from './pages/Header'
import Footer from './pages/Footer'
import DetalleProducto from './pages/DetalleProducto'
import Nosotros from './pages/Nosotros'
import Blogs from './pages/Blogs'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main className='container my-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/login' element={<Login />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path='/nosotros' element={<Nosotros />} />
          <Route path='/blogs' element ={<Blogs />} />
        </Routes>
      </main>



      <Footer />
    </>
  )
}

export default App
