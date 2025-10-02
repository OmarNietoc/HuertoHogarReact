import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Login from './pages/Login'
import PropYState from './pages/propYState'
import './styles/global.css'
import Header from './pages/Header'
import Footer from './pages/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>



      <Footer />
    </>
  )
}

export default App
