// src/utils/validators.js

export const validarNombre = (valor) => {
  if (!valor.trim() || valor.length > 20 || valor.length < 3) {
    return "El nombre es requerido y debe contener entre 3 y 20 caracteres.";
  }
  return "";
};

export const validarCorreo = (valor) => {
  const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!regex.test(valor)) {
    return "Correo inválido. Solo se permiten @duoc.cl, @profesor.duoc.cl y @gmail.com.";
  }
  return "";
};

export const validarComentario = (valor) => {
  if (!valor.trim() || valor.length > 500) {
    return "El comentario es requerido y no puede superar los 500 caracteres.";
  }
  return "";
};

export const validarPassword = (valor) => {
  if (!valor || valor.length < 6) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  return "";
};

export const validarUsuario = (valor) => {
  if (!valor.trim()) {
    return "El usuario es obligatorio.";
  }
  return "";
};
