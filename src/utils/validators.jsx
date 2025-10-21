// src/utils/validators.js

export const validarNombre = (valor) => {
  if (!valor.trim() || valor.length > 20 || valor.length < 3) {
    return false;
  }
  return true;
};

export const validarCorreo = (valor) => {
  const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!regex.test(valor)) {
    return false;
  }
  return true;
};

export const validarComentario = (valor) => {
  if (!valor.trim() || valor.length > 500) {
    return false;
  }
  return true;
};

export const validarPassword = (valor) => {
  if (!valor || valor.length < 4 || valor.length > 10) {
    return false;
  }
  return true;
};

export const validarUsuario = (valor) => {
  if (!valor.trim()) {
    return false;
  }
  return true;
};
