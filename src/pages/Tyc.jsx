import { Link } from "react-router-dom";

export default function Tyc() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container my-5">
        <div className="d-flex justify-content-end mb-3 gap-2">
            <Link to="/" className="btn btn-outline-primary">
            <i className="bi bi-arrow-left me-1"></i> Volver
            </Link>
            <button className="btn btn-outline-primary" onClick={handlePrint}>
            <i className="bi bi-printer me-1"></i> Imprimir / Guardar PDF
            </button>
        </div>

        {/* Índice */}
        <div className="card shadow-sm mb-4">
            <div className="card-body">
            <h2 className="h4 mb-3">Índice</h2>
            <ol className="mb-0">
                <li><a href="#aceptacion">Aceptación de los Términos</a></li>
                <li><a href="#definiciones">Definiciones</a></li>
                <li><a href="#cuentas">Registro y Cuentas</a></li>
                <li><a href="#compras">Compras, Precios e Impuestos</a></li>
                <li><a href="#envios">Despachos y Entregas</a></li>
                <li><a href="#devoluciones">Devoluciones, Cambios y Reembolsos</a></li>
                <li><a href="#frescura">Calidad y Frescura de Productos</a></li>
                <li><a href="#propiedad">Propiedad Intelectual</a></li>
                <li><a href="#contenidos">Contenidos del Sitio y Blog</a></li>
                <li><a href="#reseñas">Reseñas y Conducta del Usuario</a></li>
                <li><a href="#privacidad">Privacidad y Datos Personales</a></li>
                <li><a href="#comunicaciones">Comunicaciones y Notificaciones</a></li>
                <li><a href="#responsabilidad">Limitaciones de Responsabilidad</a></li>
                <li><a href="#garantias">Garantías</a></li>
                <li><a href="#fuerza-mayor">Fuerza Mayor</a></li>
                <li><a href="#modificaciones">Modificaciones a estos Términos</a></li>
                <li><a href="#ley">Ley Aplicable y Jurisdicción</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ol>
            </div>
        </div>

        <section className="bg-light py-5 px-4 rounded shadow-sm">
            <section id="aceptacion" className="mb-4">
            <h2 className="h4">1. Aceptación de los Términos</h2>
            <p>
                Bienvenido a <strong>HuertoHogar</strong>. Al acceder y utilizar nuestro sitio web y servicios de comercio electrónico,
                aceptas cumplir estos Términos y Condiciones. Si no estás de acuerdo con algún punto, te pedimos no utilizar el sitio.
                Podremos solicitar aceptación expresa (p.ej., al crear una cuenta o confirmar una compra).
            </p>
            </section>

            <section id="definiciones" className="mb-4">
            <h2 className="h4">2. Definiciones</h2>
            <p><strong>“Sitio”</strong>: la web y recursos digitales de HuertoHogar.</p>
            <p><strong>“Usuario/Cliente”</strong>: persona que navega, se registra y/o compra.</p>
            <p><strong>“Productos”</strong>: bienes ofrecidos (frutas, verduras, lácteos y orgánicos).</p>
            <p><strong>“Cuenta”</strong>: registro de usuario con credenciales de acceso.</p>
            </section>

            <section id="cuentas" className="mb-4">
            <h2 className="h4">3. Registro y Cuentas</h2>
            <ul>
                <li>Debes proporcionar información veraz, completa y actualizada.</li>
                <li>Eres responsable de mantener la confidencialidad de tus credenciales y de toda actividad bajo tu cuenta.</li>
                <li>Podemos suspender o cerrar cuentas por uso indebido o incumplimiento de estos Términos.</li>
            </ul>
            </section>

            <section id="compras" className="mb-4">
            <h2 className="h4">4. Compras, Precios e Impuestos</h2>
            <ul>
                <li>Los precios se muestran en CLP e incluyen impuestos aplicables salvo que se indique lo contrario.</li>
                <li>Las ofertas y precios pueden variar sin previo aviso hasta la confirmación del pedido.</li>
                <li>Al confirmar el pedido, aceptas el detalle de productos, cantidades, precio y costos de despacho.</li>
                <li>En caso de errores evidentes de precio o stock, podremos anular el pedido y reembolsar pagos si correspondiera.</li>
            </ul>
            </section>

            <section id="envios" className="mb-4">
            <h2 className="h4">5. Despachos y Entregas</h2>
            <ul>
                <li>Realizamos envíos en Chile. Las zonas y plazos se informan al momento de la compra.</li>
                <li>Podrás elegir fecha estimada de entrega entre las opciones disponibles.</li>
                <li>Si no es posible entregar por dirección incorrecta o ausencia, podremos reprogramar con costo adicional.</li>
            </ul>
            </section>

            <section id="devoluciones" className="mb-4">
            <h2 className="h4">6. Devoluciones, Cambios y Reembolsos</h2>
            <ul>
                <li>Si un producto llega en mal estado, contáctanos dentro de las primeras 24 horas con evidencia (fotos).</li>
                <li>Los productos perecibles tienen condiciones especiales; evaluamos caso a caso para garantizar tu satisfacción.</li>
                <li>Los reembolsos (si aplican) se procesarán por el mismo medio de pago o mediante acuerdo con el cliente.</li>
            </ul>
            </section>

            <section id="frescura" className="mb-4">
            <h2 className="h4">7. Calidad y Frescura de Productos</h2>
            <p>
                Priorizamos productos frescos y de calidad, de origen local cuando sea posible. Las fotos son referenciales y pueden
                variar en color y presentación. La disponibilidad puede depender de la estacionalidad y stock.
            </p>
            </section>

            <section id="propiedad" className="mb-4">
            <h2 className="h4">8. Propiedad Intelectual</h2>
            <p>
                Todo el contenido del Sitio (textos, marcas, imágenes, logotipos y diseño) es propiedad de HuertoHogar o de sus
                licenciantes. Queda prohibido su uso no autorizado, copia o distribución sin permiso previo por escrito.
            </p>
            </section>

            <section id="contenidos" className="mb-4">
            <h2 className="h4">9. Contenidos del Sitio y Blog</h2>
            <p>
                La información (incluyendo recetas y artículos) tiene fines informativos y no sustituye recomendaciones profesionales.
                Podremos actualizar, corregir o retirar contenidos sin aviso previo.
            </p>
            </section>

            <section id="reseñas" className="mb-4">
            <h2 className="h4">10. Reseñas y Conducta del Usuario</h2>
            <ul>
                <li>Las reseñas deben ser veraces, respetuosas y sobre productos efectivamente adquiridos.</li>
                <li>Nos reservamos el derecho de moderar, editar o eliminar reseñas que infrinjan estos Términos.</li>
                <li>Está prohibido publicar spam, contenido ofensivo, ilegal o que infrinja derechos de terceros.</li>
            </ul>
            </section>

            <section id="privacidad" className="mb-4">
            <h2 className="h4">11. Privacidad y Datos Personales</h2>
            <p>
                Tratamos tus datos conforme a nuestra <Link to="/politicas">Política de Privacidad</Link>. Al usar el Sitio, consientes dicho
                tratamiento para finalidades como: gestión de tu cuenta, procesamiento de pedidos y comunicaciones del servicio.
            </p>
            </section>

            <section id="comunicaciones" className="mb-4">
            <h2 className="h4">12. Comunicaciones y Notificaciones</h2>
            <ul>
                <li>Podremos enviarte notificaciones sobre pedidos, cambios de estado y comunicaciones relacionadas al servicio.</li>
                <li>Puedes gestionar preferencias de marketing o darte de baja cuando estén disponibles dichas opciones.</li>
            </ul>
            </section>

            <section id="responsabilidad" className="mb-4">
            <h2 className="h4">13. Limitaciones de Responsabilidad</h2>
            <p>
                En la máxima medida permitida por la ley, HuertoHogar no será responsable por daños indirectos, incidentales, especiales
                o consecuentes derivados del uso del Sitio o de los productos, salvo dolo o culpa grave.
            </p>
            </section>

            <section id="garantias" className="mb-4">
            <h2 className="h4">14. Garantías</h2>
            <p>
                Salvo las garantías legales aplicables, los servicios se ofrecen "tal cual". No garantizamos disponibilidad ininterrumpida
                ni ausencia de errores en el Sitio.
            </p>
            </section>

            <section id="fuerza-mayor" className="mb-4">
            <h2 className="h4">15. Fuerza Mayor</h2>
            <p>
                No seremos responsables por incumplimientos ocasionados por eventos fuera de nuestro control razonable (p. ej., desastres naturales, cortes de servicios, huelgas, actos de autoridad).
            </p>
            </section>

            <section id="modificaciones" className="mb-4">
            <h2 className="h4">16. Modificaciones a estos Términos</h2>
            <p>
                Podremos actualizar estos Términos para reflejar cambios legales, operativos o del servicio. Publicaremos la versión vigente en esta página con su fecha de actualización.
            </p>
            </section>

            <section id="ley" className="mb-4">
            <h2 className="h4">17. Ley Aplicable y Jurisdicción</h2>
            <p>
                Estos Términos se rigen por las leyes de la República de Chile. Cualquier controversia será sometida a los tribunales competentes de Santiago, Chile.
            </p>
            </section>

            <section id="contacto" className="mb-4">
            <h2 className="h4">18. Contacto</h2>
            <address className="mb-0">
                <strong>HuertoHogar</strong><br/>
                Santiago, Chile<br/>
                <a href="mailto:contacto@huertohogar.cl">contacto@huertohogar.cl</a><br/>
                <a href="tel:+56223456789">+56 2 2345 6789</a>
            </address>
            </section>
        </section>
        </div>
    );
}