import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Login.css";
import { validarCorreo, validarPassword } from "../utils/validators";
import { shoppyService } from "../services/shoppyService";

export default function Login() {
  const navigate = useNavigate();
  const { usuario, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [alerta, setAlerta] = useState(null);

  const mostrarAlerta = (mensaje, tipo = "info") => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => setAlerta(null), 2500);
  };

  const manejarLogin = async (e) => {
    e.preventDefault();

    if (!validarCorreo(email)) {
      mostrarAlerta("El correo no es valido", "danger");
      return;
    }

    if (!validarPassword(password)) {
      mostrarAlerta("La contraseña debe tener entre 4 y 10 caracteres", "danger");
      return;
    }

    try {
      const data = await shoppyService.login({ email, password });

      // Mapear respuesta del backend al formato esperado por el contexto
      const usuarioLogueado = {
        id: data.id,
        nombre: data.username, // El backend devuelve username (email) o nombre? Revisar JwtResponse
        email: data.email,
        rol: data.roles.includes("ROLE_ADMIN") ? "admin" : "cliente",
        token: data.token
      };

      login(usuarioLogueado);
      localStorage.setItem("isAdmin", usuarioLogueado.rol === "admin");

      mostrarAlerta(
        usuarioLogueado.rol === "admin"
          ? "✅ Bienvenido Administrador"
          : "👋 Inicio de sesión exitoso",
        "success"
      );

      setTimeout(() => {
        navigate(usuarioLogueado.rol === "admin" ? "/admin" : "/");
      }, 1200);

    } catch (error) {
      console.error("Error en login:", error);
      if (error.response && error.response.status === 401) {
        mostrarAlerta("Correo o contraseña incorrectos", "danger");
      } else {
        mostrarAlerta("Error al iniciar sesión. Intente más tarde.", "danger");
      }
    }
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
