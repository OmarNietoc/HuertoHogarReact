import apples2 from '../assets/img/products/apples2.jpg'
import apples from '../assets/img/products/apples.jpg'
import milk from '../assets/img/products/milk.jpg'
import honey from '../assets/img/products/honey.jpg'

export default function Home() {

    const productos = [
    {
        id: 'FR001',
        nombre: 'Manzanas Fuji',
        descripcion: 'Crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres.',
        precio: 1200,
        categoria: 'frutas',
        imagen: '/img/products/apples2.jpg',
        oferta: 'Oferta',
        unid: 'kg'
    },
    {
        id: 'FR002',
        nombre: 'Naranjas Valencia',
        descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes. Cultivadas en condiciones climáticas óptimas.',
        precio: 1000,
        categoria: 'frutas',
        imagen: '/img/products/oranges2.jpg',
        unid: 'kg'
    },
    {
        id: 'FR003',
        nombre: 'Plátanos Cavendish',
        descripcion: 'Maduros y dulces, perfectos para el desayuno o como snack energético. Ricos en potasio y vitaminas.',
        precio: 800,
        categoria: 'frutas',
        imagen: '/img/products/bananas.jpg',
        unid: 'kg'
    },
    {
        id: 'VR001',
        nombre: 'Zanahorias Orgánicas',
        descripcion: 'Cultivadas sin pesticidas en la Región de O\'Higgins. Excelente fuente de vitamina A y fibra, ideales para ensaladas y jugos.',
        precio: 900,
        categoria: 'verduras',
        imagen: '/img/products/carrots.jpg',
        unid: 'kg'
    },
    {
        id: 'VR002',
        nombre: 'Espinacas Frescas',
        descripcion: 'Frescas y nutritivas, perfectas para ensaladas y batidos verdes. Cultivadas bajo prácticas orgánicas que garantizan su calidad.',
        precio: 700,
        categoria: 'verduras',
        imagen: '/img/products/spinach.jpg',
        oferta:"Nuevo",
        unid: 'kg'
    },
    {
        id: 'VR003',
        nombre: 'Pimientos Tricolores',
        descripcion: 'Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos. Ricos en antioxidantes y vitaminas.',
        precio: 1500,
        categoria: 'verduras',
        imagen: '/img/products/peppers.jpg',
        oferta: 'Nuevo',
        unid: 'kg'
    },
    {
        id: 'PO001',
        nombre: 'Miel Orgánica',
        descripcion: 'Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable.',
        precio: 5000,
        categoria: 'organicos',
        imagen: '/img/products/honey.jpg',
        unid: '500g'
    },
    {
        id: 'PO003',
        nombre: 'Quinua Orgánica',
        descripcion: 'Quinua orgánica de alta calidad, rica en proteínas y nutrientes esenciales. Perfecta para una alimentación saludable.',
        precio: 3500,
        categoria: 'organicos',
        imagen: '/img/products/quinoa.jpg',
        unid: 'kg'
    },
    {
        id: 'PL001',
        nombre: 'Leche Entera',
        descripcion: 'Leche entera fresca de vacas criadas en praderas naturales. Rica en calcio y vitaminas esenciales.',
        precio: 1800,
        categoria: 'lacteos',
        imagen: '/img/products/milk.jpg',
        unid: 'L'
    }
];

    return (
        <>        
            <section className="hero-section">
                <div className="container text-center">
                    <h1 className="display-5 fw-bold text-white">Productos Frescos del Campo a tu Hogar</h1>
                    <p className="lead">Disfruta de la mejor calidad y frescura con envío a domicilio en todo Chile</p>
                    <a href="productos" className="btn btn-primary btn-lg mt-3">Ver Productos</a>
                </div>
            </section>

            <main className="container my-5">
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <h2>Nuestros Productos Destacados</h2>
                        <p className="text-secondary">Selección de lo mejor de nuestra huerta</p>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">

                        {productos.map((producto )=> {
                            if (!producto.oferta) return null;
                            const detalleProducto = 'detalle-producto.html?productId=' + producto.id;

                            return (       
                            <div key={producto.id} className="col-12 col-sm-6 col-md-4 mb-4 " data-category="frutas">
                                <div className="card product-card h-100">
                                    <span className="offer-badge badge position-absolute m-2">{producto.oferta}</span>
                                    <a href={detalleProducto}>
                                    <img src={producto.imagen} className="card-img-top" alt={producto.nombre} />
                                    </a>
                                <div className="card-body">
                                    <h5 className="card-title">{producto.nombre} <span className="badge bg-verde">{producto.id}</span></h5>
                                    <p className="card-text">{producto.descripcion}</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="price">${producto.precio} CLP/{producto.unid}</span>
                                        <a href="detalle-producto.html?productId=FR001">
                                            <button className="btn btn-primary btn-agregar-carrito">
                                                <i className="bi bi-cart-plus"></i> Añadir
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )})
                        }
{/* 
                        <div className="col-md-4 mb-4" data-category="frutas">
                            <div className="card product-card h-100">
                                <span className="offer-badge badge position-absolute m-2">Oferta</span>
                                <a href="detalle-producto.html?productId=FR001">
                                    <img src={apples2} className="card-img-top" alt="Manzanas Fuji" />
                                </a>
                                <div className="card-body">
                                    <h5 className="card-title">Manzanas Fuji <span className="badge bg-verde">FR001</span></h5>
                                    <p className="card-text">Crujientes y dulces, cultivadas en el Valle del Maule. Perfectas para meriendas saludables o como ingrediente en postres.</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="price">$1.200 CLP/kg</span>
                                        <a href="detalle-producto.html?productId=FR001">
                                            <button className="btn btn-primary btn-agregar-carrito">
                                                <i className="bi bi-cart-plus"></i> Añadir
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4" data-category="organicos">
                            <div className="card product-card h-100">
                                <a href="detalle-producto.html?productId=PO001">
                                    <img src={honey} className="card-img-top" alt="Miel Orgánica" />
                                </a>
                                <div className="card-body">
                                    <h5 className="card-title">Miel Orgánica <span className="badge bg-verde">PO001</span></h5>
                                    <p className="card-text">Miel pura y orgánica producida por apicultores locales. Rica en antioxidantes y con un sabor inigualable.</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="price">$5.000 CLP/500g</span>
                                        <a href="detalle-producto.html?productId=PO001">
                                            <button className="btn btn-primary btn-agregar-carrito">
                                                <i className="bi bi-cart-plus"></i> Añadir
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-4 product-item" data-category="lacteos">
                            <div className="card product-card h-100">
                                <a href="detalle-producto.html?productId=PL001">
                                    <img src={milk} className="card-img-top" alt="Leche Entera" />
                                </a>
                                <div className="card-body">
                                    <h5 className="card-title">Leche Entera <span className="badge bg-verde">PL001</span></h5>
                                    <p className="card-text">Leche entera fresca de vacas criadas en praderas naturales. Rica en calcio y vitaminas esenciales.</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="price">$1.800 CLP/L</span>
                                        <a href="detalle-producto.html?productId=PL001">
                                            <button className="btn btn-primary btn-agregar-carrito">
                                                <i className="bi bi-cart-plus"></i> Añadir
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                    </div>
                </div>
                <div className="text-center mt-4">
                    <a href="productos.html" className="btn btn-outline-primary">Ver todos los productos</a>
                </div>
            </main>

            <section className="bg-light py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h2>¿Por qué elegir HuertoHogar?</h2>
                            <p>Con más de 6 años de experiencia, conectamos directamente a los agricultores locales con tu hogar, garantizando la máxima frescura y calidad en cada entrega.</p>
                            <ul className="list-unstyled">
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-verde me-2"></i>Productos 100% frescos y naturales</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-verde me-2"></i>Apoyo a agricultores locales</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-verde me-2"></i>Envío a domicilio en todo Chile</li>
                                <li className="mb-2"><i className="bi bi-check-circle-fill text-verde me-2"></i>Compromiso con la sostenibilidad</li>
                            </ul>
                            <a href="nosotros.html" className="btn btn-primary mt-3">Conoce más sobre nosotros</a>
                        </div>
                        <div className="col-md-6">
                            <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Agricultura sostenible" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}