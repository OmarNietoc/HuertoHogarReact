// src/setupTests.js
//Configuración global de pruebas con Karma + Jasmine + React Testing Library

import '@testing-library/dom';
import { cleanup } from '@testing-library/react';

//Limpieza automática del DOM después de cada test
afterEach(() => {
  cleanup();
});

//(Opcional) Mock de fetch global (evita errores en componentes con fetch)
if (!window.fetch) {
  window.fetch = () =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    });
}

console.log('setupTests.js cargado correctamente (Karma + Jasmine)');
