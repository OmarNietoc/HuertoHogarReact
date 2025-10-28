import { Link } from "react-router-dom";

export default function Politicas() {
    return (
        <div className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left me-1"></i> Volver al Inicio
            </Link>
        </div>

        <section className="bg-light py-5 px-4 rounded shadow-sm">
            <div className="row justify-content-center">
            <div className="col-lg-10">
                <section className="mb-5">
                <h2 className="fw-bold text-primary">1. Introducción</h2>
                <p className="text-secondary">
                    En Huerto Hogar respetamos tu privacidad y nos comprometemos a proteger los datos personales que compartes con nosotros. 
                    Esta política explica cómo recopilamos, usamos y protegemos tu información.
                </p>
                </section>

                <section className="mb-5">
                <h2 className="fw-bold text-primary">2. Información que recopilamos</h2>
                <ul className="text-secondary">
                    <li>Datos de contacto: nombre, correo electrónico, teléfono y dirección.</li>
                    <li>Información de acceso: correo y contraseña registrados.</li>
                    <li>Datos de compra: historial de pedidos y métodos de pago.</li>
                    <li>Preferencias de usuario: productos favoritos y navegación en el sitio.</li>
                </ul>
                </section>

                <section className="mb-5">
                <h2 className="fw-bold text-primary">3. Uso de la información</h2>
                <p className="text-secondary">La información recopilada se utiliza para:</p>
                <ul className="text-secondary">
                    <li>Procesar y entregar tus pedidos.</li>
                    <li>Gestionar tu cuenta de usuario.</li>
                    <li>Mejorar tu experiencia en el sitio web.</li>
                    <li>Enviar promociones, novedades y comunicaciones relacionadas.</li>
                </ul>
                </section>

                <section className="mb-5">
                <h2 className="fw-bold text-primary">4. Protección de datos</h2>
                <p className="text-secondary">
                    Implementamos medidas de seguridad técnicas y organizativas para proteger tu información contra 
                    accesos no autorizados, pérdida o alteración. Sin embargo, recuerda que ningún sistema es 100% seguro.
                </p>
                </section>

                <section className="mb-5">
                <h2 className="fw-bold text-primary">5. Compartir información</h2>
                <p className="text-secondary">
                    HuertoHogar no vende ni alquila tus datos personales. Podemos compartir tu información únicamente con:
                </p>
                <ul className="text-secondary">
                    <li>Proveedores de servicios de envío y pago.</li>
                    <li>Autoridades legales, si la ley lo requiere.</li>
                </ul>
                </section>

                <section className="mb-5">
                <h2 className="fw-bold text-primary">6. Derechos del usuario</h2>
                <p className="text-secondary">Tienes derecho a:</p>
                <ul className="text-secondary">
                    <li>Acceder, rectificar o eliminar tus datos personales.</li>
                    <li>Solicitar la limitación del uso de tus datos.</li>
                    <li>Retirar tu consentimiento en cualquier momento.</li>
                </ul>
                </section>

                <section>
                <h2 className="fw-bold text-primary">7. Contacto</h2>
                <p className="text-secondary">
                    Si tienes preguntas sobre esta política, puedes escribirnos a:{" "}
                    <strong>contacto@huertohogar.cl</strong>
                </p>
                </section>
            </div>
            </div>
        </section>
        </div>
    );
    }