import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validarNombre, validarCorreo, validarPassword } from "../utils/validators";
import { shoppyService } from "../services/shoppyService";

export default function Registro() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
        phone: "",
        region: "",
        comuna: "",
        rememberMe: false
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);

    const { login } = useAuth();
    const navigate = useNavigate();

    // Cargar regiones
    useEffect(() => {
        const cargarRegiones = async () => {
            try {
                const data = await shoppyService.getRegions();
                setRegiones(data);
            } catch (error) {
                console.error("Error cargando regiones:", error);
            }
        };

        cargarRegiones();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }

        // Actualizar comunas cuando cambia la región
        if (name === "region") {
            cargarComunas(value);
            setFormData(prev => ({ ...prev, comuna: "" }));
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
            console.error("Error cargando comunas:", error);
            setComunas([]);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validar nombre
        if (!validarNombre(formData.fullName)) {
            newErrors.fullName = "El nombre debe tener entre 3 y 20 caracteres";
        }

        // Validar email
        if (!validarCorreo(formData.email)) {
            newErrors.email = "Correo inválido. Solo se permiten: @duoc.cl, @profesor.duoc.cl y @gmail.com";
        }

        // Validar confirmación de email
        if (formData.email !== formData.confirmEmail) {
            newErrors.confirmEmail = "Los correos no coinciden";
        }

        // Validar contraseña
        if (!validarPassword(formData.password)) {
            newErrors.password = "La contraseña debe tener entre 4 y 10 caracteres";
        }

        // Validar confirmación de contraseña
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        // Validar región
        if (!formData.region) {
            newErrors.region = "Debes seleccionar una región";
        }

        // Validar comuna
        if (!formData.comuna) {
            newErrors.comuna = "Debes seleccionar una comuna";
        }

        // Validar términos y condiciones
        if (!formData.rememberMe) {
            newErrors.rememberMe = "Debes aceptar los términos y condiciones";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        setErrors(formErrors);

        // Si no hay errores, proceder con el registro
        if (Object.keys(formErrors).length === 0) {
            registrarUsuario();
        }
    };

    const registrarUsuario = async () => {
        try {
            // Crear nuevo usuario
            const nuevoUsuario = {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                region: parseInt(formData.region),
                comuna: parseInt(formData.comuna),
                role: 2, // 2 = ROLE_USER (según import.sql o lógica backend)
                status: 1 // 1 = Activo
            };

            await shoppyService.createUser(nuevoUsuario);

            // Iniciar sesión automáticamente (si el backend devuelve token al registrar, o hacemos login manual)
            // El endpoint register devuelve solo mensaje. Deberíamos hacer login o redirigir a login.
            // Para mejor UX, redirigiremos a login con mensaje de éxito o intentamos login automático.
            // Dado que createUser no devuelve token, vamos a redirigir a login.

            // Opcional: Hacer login automático
            try {
                const loginData = await shoppyService.login({ email: formData.email, password: formData.password });
                const usuarioLogueado = {
                    id: loginData.id,
                    nombre: loginData.username,
                    email: loginData.email,
                    rol: loginData.roles.includes("ROLE_ADMIN") ? "admin" : "cliente",
                    token: loginData.token
                };
                login(usuarioLogueado);
                navigate("/");
            } catch (loginError) {
                console.error("Error en login automático:", loginError);
                navigate("/login");
            }

        } catch (error) {
            console.error("Error al registrar usuario:", error);
            if (error.response && error.response.data && error.response.data.message) {
                setErrors({ email: error.response.data.message });
            } else {
                setErrors({ email: "Error al registrar usuario. Intente nuevamente." });
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <main className="login-container d-flex align-items-center pt-5 pb-3">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="login-card">
                            <h2 className="text-center mb-4 text-marron">Registrarse</h2>

                            <form onSubmit={handleSubmit}>
                                {/* Nombre Completo */}
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Nombre Completo</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-person"></i></span>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                                            id="fullName"
                                            name="fullName"
                                            placeholder="Ej: Juan Pérez"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            minLength="3"
                                            maxLength="100"
                                            required
                                        />
                                    </div>
                                    {errors.fullName && <div className="invalid-feedback d-block">{errors.fullName}</div>}
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                            id="email"
                                            name="email"
                                            placeholder="usuario@ejemplo.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-text">Solo correos @duoc.cl, @profesor.duoc.cl y @gmail.com</div>
                                    {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                                </div>

                                {/* Confirmar Email */}
                                <div className="mb-3">
                                    <label htmlFor="confirmEmail" className="form-label">Confirmar Correo Electrónico</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-envelope-check"></i></span>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.confirmEmail ? 'is-invalid' : ''}`}
                                            id="confirmEmail"
                                            name="confirmEmail"
                                            placeholder="Reingresa tu correo"
                                            value={formData.confirmEmail}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {errors.confirmEmail && <div className="invalid-feedback d-block">{errors.confirmEmail}</div>}
                                </div>

                                {/* Contraseña */}
                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-lock"></i></span>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                            id="password"
                                            name="password"
                                            placeholder="********"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            minLength="4"
                                            maxLength="10"
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                    </div>
                                    <div className="form-text">Entre 4 y 10 caracteres</div>
                                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                                </div>

                                {/* Confirmar Contraseña */}
                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-lock-fill"></i></span>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            placeholder="********"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            minLength="4"
                                            maxLength="10"
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            type="button"
                                            onClick={toggleConfirmPasswordVisibility}
                                        >
                                            <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                    </div>
                                    <div className="form-text">Debe coincidir con la contraseña ingresada</div>
                                    {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                                </div>

                                {/* Teléfono */}
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Número de Teléfono (opcional)</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="bi bi-telephone"></i></span>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            placeholder="+56 9 1234 5678"
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Región */}
                                <div className="mb-3">
                                    <label htmlFor="region" className="form-label">Región</label>
                                    <select
                                        id="region"
                                        className={`form-select ${errors.region ? 'is-invalid' : ''}`}
                                        name="region"
                                        value={formData.region}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seleccione una región</option>
                                        {regiones.map(region => (
                                            <option key={region.id} value={region.id}>{region.name}</option>
                                        ))}
                                    </select>
                                    {errors.region && <div className="invalid-feedback d-block">{errors.region}</div>}
                                </div>

                                {/* Comuna */}
                                <div className="mb-3">
                                    <label htmlFor="comuna" className="form-label">Comuna</label>
                                    <select
                                        id="comuna"
                                        className={`form-select ${errors.comuna ? 'is-invalid' : ''}`}
                                        name="comuna"
                                        value={formData.comuna}
                                        onChange={handleChange}
                                        required
                                        disabled={!formData.region}
                                    >
                                        <option value="">Seleccione una comuna</option>
                                        {comunas.map(comuna => (
                                            <option key={comuna.id} value={comuna.id}>{comuna.name}</option>
                                        ))}
                                    </select>
                                    {errors.comuna && <div className="invalid-feedback d-block">{errors.comuna}</div>}
                                </div>

                                {/* Términos y condiciones */}
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className={`form-check-input ${errors.rememberMe ? 'is-invalid' : ''}`}
                                        id="rememberMe"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="rememberMe">
                                        Acepto <Link to="/tyc">términos y condiciones</Link>
                                    </label>
                                    {errors.rememberMe && <div className="invalid-feedback d-block">{errors.rememberMe}</div>}
                                </div>

                                {/* Botón de registro */}
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Registrarse</button>
                                </div>

                                {/* Enlace a login */}
                                <div className="text-center mt-3">
                                    <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}