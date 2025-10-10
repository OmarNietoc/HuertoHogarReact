import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import '../styles/Blogs.css';

export default function Blogs() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/posts.json")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error al cargar posts:", err));
  }, []);

  return (
    <>
      {/* 🌿 Hero con video */}
      <section className="blog-hero position-relative text-center text-white">
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/videos/cooking.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay d-flex flex-column justify-content-center align-items-center">
          <h1 className="display-4 fw-bold text-white">Del Huerto a tu Mesa</h1>
          <p className="lead mt-2">Consejos, recetas e inspiración natural</p>
        </div>
      </section>

      {/* 📰 Contenido del blog */}
      <section className="bg-light container my-5 rounded shadow-sm p-3">
        <h2 className="text-center mb-4 text-verde">Tips y recetas</h2>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-verde" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                className="col-md-6 col-lg-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="card shadow-sm border-0 rounded-4 h-100 overflow-hidden bg-light">
                  <img
                    src={post.img}
                    alt={post.title}
                    className="card-img-top"
                    style={{ objectFit: "cover", height: "220px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-verde fw-semibold">
                      {post.title}
                    </h5>
                    <p className="card-text text-muted flex-grow-1">
                      {post.desc}
                    </p>



                    <motion.ul
                      className="mt-3 text-muted"
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      {post.content.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </motion.ul>
                    
                    <motion.div
                      className="ver-mas text-center mt-3 fw-semibold text-verde"
                      whileHover={{ scale: 1.1 }}
                    >
                      Detalles ▲
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
