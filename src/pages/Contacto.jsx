// src/pages/Contacto.jsx
import { useState } from "react";
import useForm from "../hooks/useForm";
import {
  validarNombre,
  validarCorreo,
  validarComentario,
} from "../utils/validators";
import "../styles/Contacto.css";

export default function Contacto() {
  const [mensajeExito, setMensajeExito] = useState("");

  const initialValues = {
    nombre: "",
    correo: "",
    comentario: "",
  };

  // Función de validación modular para este formulario
  const validate = (values) => {
    return {
      nombre: validarNombre(values.nombre),
      correo: validarCorreo(values.correo),
      comentario: validarComentario(values.comentario),
    };
  };

  const onSubmit = (values) => {
    console.log("Formulario enviado:", values);
    setMensajeExito("✅ Gracias por tu mensaje, te responderemos pronto.");
  };

  const { values, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    validate,
    onSubmit
  );

  return (
    <section className="bg-light py-5 px-4 mt-5 rounded shadow-sm">
      <h2 className="fw-bold text-primary mb-4 text-center">
        Formulario de contacto
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Nombre */}
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label fw-semibold">
            Nombre <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
            id="nombre"
            name="nombre"
            maxLength={100}
            value={values.nombre}
            onChange={handleChange}
          />
          {errors.nombre && (
            <div className="invalid-feedback">{errors.nombre}</div>
          )}
        </div>

        {/* Correo */}
        <div className="mb-3">
          <label htmlFor="correo" className="form-label fw-semibold">
            Correo <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${errors.correo ? "is-invalid" : ""}`}
            id="correo"
            name="correo"
            maxLength={100}
            value={values.correo}
            onChange={handleChange}
          />
          {errors.correo && (
            <div className="invalid-feedback">{errors.correo}</div>
          )}
        </div>

        {/* Comentario */}
        <div className="mb-3">
          <label htmlFor="comentario" className="form-label fw-semibold">
            Comentario <span className="text-danger">*</span>
          </label>
          <textarea
            className={`form-control ${errors.comentario ? "is-invalid" : ""}`}
            id="comentario"
            name="comentario"
            rows={5}
            maxLength={500}
            value={values.comentario}
            onChange={handleChange}
          />
          {errors.comentario && (
            <div className="invalid-feedback">{errors.comentario}</div>
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            <i className="bi bi-send-fill me-1"></i> Enviar
          </button>
        </div>

        {mensajeExito && (
          <p className="text-success text-center mt-3">{mensajeExito}</p>
        )}
      </form>
    </section>
  );
}
