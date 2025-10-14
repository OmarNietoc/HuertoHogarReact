import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // tu contexto de autenticación
import "../styles/Login.css";
import { validarCorreo, validarPassword } from "../utils/validators";


export default function Login() {
  const navigate = useNavigate();
 const { usuario, login } = useAuth(); // función que guarda usuario en contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [alerta, setAlerta] = useState(null);


  const mostrarAlerta = (mensaje, tipo = "info") => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => setAlerta(null), 2500);
  };

  const manejarLogin = (e) => {
    e.preventDefault();

    if (!validarCorreo(email)) {
      mostrarAlerta("❌ Correo inválido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com", "danger");
      return;
    }

    if (!validarPassword(password)) {
      mostrarAlerta("❌ La contraseña debe tener entre 4 y 10 caracteres", "danger");
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuariosHuertoHogar")) || [];
    if (window.usuariosArray) {
      usuarios = [...usuarios, ...window.usuariosArray];
    }

    const usuarioValido = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (!usuarioValido) {
      mostrarAlerta("❌ Correo o contraseña incorrectos", "danger");
      return;
    }

    // Guardar sesión
    login(usuarioValido);
    localStorage.setItem("isAdmin", usuarioValido.rol === "admin");
    // localStorage.setItem("isAdmin", usuarioValido.rol === "admin" ? "true" : "false");

    mostrarAlerta(
      usuarioValido.rol === "admin"
        ? "✅ Bienvenido Administrador"
        : "👋 Inicio de sesión exitoso",
      "success"
    );

    setTimeout(() => {
      navigate(usuarioValido.rol === "admin" ? "/admin" : "/");
    }, 1200);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="login-card p-4 shadow rounded">
            <h2 className="text-center mb-4 text-marron">Iniciar Sesión</h2>

            {alerta && (
              <div className={`alert alert-${alerta.tipo}`} role="alert">
                {alerta.mensaje}
              </div>
            )}

            <form onSubmit={manejarLogin}>
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="usuario@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-text">
                  Solo correos @duoc.cl, @profesor.duoc.cl y @gmail.com
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                  >
                    <i className={`bi ${mostrarPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                  </button>
                </div>
                <div className="form-text">Entre 4 y 10 caracteres</div>
              </div>

              <div className="form-check mb-3">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">
                  Recordar mi sesión
                </label>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Ingresar
                </button>
              </div>

              <div className="text-center mt-3">
                <a href="#" className="text-verde">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <div className="text-center mt-3">
                <p>
                  ¿No tienes cuenta?{" "}
                  <Link to="/registro" className="text-verde">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
